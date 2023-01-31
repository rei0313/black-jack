import { Card } from "../model/Card";
import { Player } from "../model/Player";
// import { CardDao } from "../model/CardDao";
import { Dealer } from "../model/Dealer";
import { CardPoolController } from "./CardPoolController";
import { CardsStatus } from "../model/CardsStatus";
import { GameStatus } from "../model/GameStatus";

export class PlayerController {
    // private card!: Card;
    // private cardDao!: CardDao;
    private cardPool = new CardPoolController;

    private timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private getRandom(x: number): number {
        return Math.floor(Math.random() * x) + 1;
    };

    private getSymbol(): string {
        let symbolnum = this.getRandom(4);
        let symbol: string = "";

        switch (symbolnum) {
            case 1:
                symbol = 'clubs';
                break;
            case 2:
                symbol = 'diamonds';
                break;
            case 3:
                symbol = 'hearts';
                break;
            case 4:
                symbol = 'spades';
                break;
        }

        return symbol;
    };

    //new card のポイントの初期値は0なので、ポイントを付与する
    private getNewCardPoints(card: Card): Card {
        if (card.number === 1 || card.number === 11 || card.number === 12 || card.number === 13) {
            card.point = 10;
        } else {
            card.point = card.number;
        }
        return card;
    }



    private getNewCard(): Card {
        let newCard = new Card(this.getSymbol(), this.getRandom(13), false, false, 10);
        newCard = this.getNewCardPoints(newCard);
        return newCard;
    };

    //==========private method above, public method below(still under modifying)=============


    public countPoints(player: Player | Dealer): void {
        let points = player.cards.reduce((accumulator, currentValue) =>
            accumulator + currentValue.point, 0

        );
        console.log("adding");
        //如果有Ace且超過21點，則讓Ace=1點
        if (points > 21) {
            console.log("Over 21!!");
            player.cards.forEach((e) => {
                if (e.number === 1) {
                    console.log("Change Ace!!");
                    //測試中！
                    e.point = 1;
                }
            })
        }
        //重算一次
        points = player.cards.reduce((accumulator, currentValue) =>
            accumulator + currentValue.point, 0
        );

        player.points = points;
    }

    //純粹更改狀態，用endround計算賭注
    public check(player: Player, dealer: Dealer): void {
        //先計算點數
        this.countPoints(player);
        this.countPoints(dealer);

        if (player.points < 21 && player.cardsStatus === CardsStatus.none) {
            console.log('nothong happend');
            return;
        }

        if (player.points > 21) {
            player.cardsStatus = CardsStatus.isBust;
            player.gameStatus = GameStatus.lose;
            dealer.gameStatus = GameStatus.win;
            return;
        }

        if (player.points === 21) {
            player.cardsStatus = CardsStatus.isBlackJack;
            this.timeout(2000);
            player.gameStatus = GameStatus.blackjack;
            return;
        }

        //小於21沒有stand或doubledown，就什麼都不做


        if (dealer.points <= 21) {
            if (dealer.points > player.points) {
                dealer.gameStatus = GameStatus.win;
                player.gameStatus = GameStatus.lose;
            } else if (dealer.points < player.points) {
                dealer.gameStatus = GameStatus.lose;
                player.gameStatus = GameStatus.win;
            } else if (dealer.points > 21) {
                dealer.gameStatus = GameStatus.lose;
                player.gameStatus = GameStatus.win;
            } else {
                dealer.gameStatus = GameStatus.tie;
                player.gameStatus = GameStatus.tie;
            }

        } else {
            dealer.gameStatus = GameStatus.lose;
            player.gameStatus = GameStatus.win;
        }


    }




    public hit(player: Player | Dealer): void {  //can Dealer input here...?
        //残るカードのデータをゲット→ランダムで一枚のカードを作成
        //1~13 & 4symbol random->if existed, new another card
        //isHited=false一旦残し、アニメーションの様子を見ながら調整
        let lastedCards: Card[] = this.cardPool.getLastedCards();
        let newCard = this.getNewCard();

        for (let i = 0; i < lastedCards.length; i++) {
            if (lastedCards[i] == newCard) {
                newCard = this.getNewCard();
                i = 0;
            };
        }
        //give a new card to the player
        player.cards.push(newCard);
    }

    public async stand(player: Player, dealer: Dealer): Promise<void> {

        if (player.cardsStatus !== CardsStatus.isDoubledown) {
            player.cardsStatus = CardsStatus.isStand;
        }


        while (dealer.points < 17) {
            this.hit(dealer);
            await this.timeout(500);
            this.countPoints(dealer);
        }

        // this.check(player, dealer);

    }
    // 若閒家首兩張牌點數之和為11點，可以選擇加倍投注，但加注後僅獲發1張牌
    // 還沒做牌的判定!!
    public async doubleDown(player: Player, dealer: Dealer): Promise<void> {
        player.handMoney = 2;
        player.allMoney = player.allMoney - 1;
        //double moner
        this.hit(player);   //add a new card
        await this.timeout(500);
        this.stand(player, dealer);
        player.cardsStatus = CardsStatus.isDoubledown;
        //recount point
        // this.countPoints(player);

    }

    public newRound(player: Player, dealer: Dealer): void {

        player.cards = [];
        dealer.cards = [];
        player.cardsStatus = CardsStatus.none;
        player.gameStatus = GameStatus.playing;
        dealer.cardsStatus = CardsStatus.none;
        dealer.gameStatus = GameStatus.playing;

        player.cards = [this.getNewCard(), this.getNewCard()];

        let firstCard = this.getNewCard();
        firstCard.isFaceDown = true;

        dealer.cards = [firstCard, this.getNewCard()];
        this.countPoints(player);
        this.countPoints(dealer);
        player.handMoney = 1;
        player.allMoney = player.allMoney - 1;
        dealer.handMoney = 1;
        dealer.handMoney = dealer.handMoney - 1;

    }


    //金幣計算還有問題QQ
    public endRound(player: Player, dealer: Dealer): void {



        if (player.gameStatus === GameStatus.win) {
            //get dealer's handmoney
            player.handMoney = player.handMoney + dealer.handMoney;
            dealer.handMoney = 0;
            dealer.cards[0].isFaceDown = false;
            console.log('end round:win')
        } else if (player.gameStatus == GameStatus.lose) {
            //lose all handmoney
            dealer.handMoney = player.handMoney + dealer.handMoney;
            player.handMoney = 0;
            dealer.cards[0].isFaceDown = false;
            console.log('end round:lose')
        } else if (player.gameStatus === GameStatus.tie) {
            dealer.cards[0].isFaceDown = false;
            console.log('end round:tie')
        } else if (player.gameStatus === GameStatus.blackjack) {
            //check rules...
            player.handMoney = player.handMoney + dealer.handMoney;
            dealer.handMoney = 0;
            dealer.cards[0].isFaceDown = false;
            console.log('end round:black jack')
        } else {
            //standby
            console.log('endding round: do nothing');
            return;
        }

        //add hand money to all money
        player.allMoney = player.allMoney + player.handMoney;
        dealer.allMoney = dealer.allMoney + dealer.handMoney;


    }

    public setPlaying(player: Player, dealer: Dealer): void {
        player.gameStatus = GameStatus.playing;
        dealer.gameStatus = GameStatus.playing;
    }

    // public clearCardStyle(player: Player, dealer: Dealer): void {
    //     player.cardsStatus = CardsStatus.none;
    //     dealer.cardsStatus = CardsStatus.none;
    // }

    // public isBust(player: Player): void {
    //     this.countPoints(player);
    //     if (player.points > 21) {
    //         player.cardsStatus = CardsStatus.isBust;
    //     }
    // };

    // public isBlackJack(player: Player): void {
    //     this.countPoints(player);
    //     if (player.points == 21) {
    //         player.cardsStatus = CardsStatus.isBlackJack;
    //     }
    // }



    //the whole round flow
    /*
    if not player data -> init player data(set player money to init value)
    newRound(player & dealer get 2 cards)->

    if hit-> new one card, check if bust or blackjack -> endGame
                ->if stand-> dealer hit or endgame
                
    newRound


    */

    //split ->分成兩副手牌(有點複雜，有時間再寫)
    //optional: change hand money


    //Login
    //Logout


}