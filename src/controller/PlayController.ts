import { Card } from "../model/Card";
import { Player } from "../model/Player";
// import { CardDao } from "../model/CardDao";
import { Dealer } from "../model/Dealer";
import { CardPoolController } from "./CardPoolController";

export class PlayerController {
    // private card!: Card;
    // private cardDao!: CardDao;
    private cardPool!: CardPoolController;

    private getRandom(x: number): number {
        return Math.floor(Math.random() * x) + 1;
    };

    private getSymbol(): String {
        let symbolnum = this.getRandom(4);
        let symbol: String = "";

        switch (symbolnum) {
            case 1:
                symbol = 'clubs';
            case 2:
                symbol = 'diamonds';
            case 3:
                symbol = 'hearts';
            case 4:
                symbol = 'spades';
        }

        return symbol;
    };

    //new card のポイントの初期値は0なので、ポイントを付与する
    private getNewCardPoints(card: Card): Card {
        if (card.number == 1 || card.number == 11 || card.number == 12 || card.number == 13) {
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

    private countPoints(player: Player): void {
        let points = player.cards.reduce((accumulator, currentValue) =>
            accumulator + currentValue.point, 0
        );
        player.points = points;
    }

    //==========private method above, public method below(still under modifying)=============



    public hit(player: Player): void {  //can Dealer input here...?
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
        this.countPoints(player);
    }

    public stand(player: Player): void {
        //不用新增Card的properties，用player狀態操作<div>OneCards<div/>的class
        //視情況再包一層components
        player.gameStatus.isStand = true;
    }


    // 若閒家首兩張牌點數之和為11點，可以選擇加倍投注，但加注後僅獲發1張牌
    // 還沒做牌的判定!!
    public doubleDown(player: Player): void {
        player.handMoney = player.handMoney * 2;    //double moner
        this.hit(player);   //add a new card
        player.gameStatus.isDoubledown = true;
        //recount point
        this.countPoints(player);

    }

    public newRound(player: Player, dealer: Dealer): void {
        //重複卡牌是否需要判斷？被ったかどうかを判定？
        //之後記得精簡寫法...這樣好醜
        //set player hand money to 1
        player.gameStatus.isBlackJack = false;
        player.gameStatus.isBust = false;
        player.gameStatus.isDoubledown = false;
        player.gameStatus.isStand = false;
        player.gameStatus.status = "playing";
        player.cards = [this.getNewCard(), this.getNewCard()];
        dealer.cards = [this.getNewCard(), this.getNewCard()];
        this.countPoints(player);
        this.countPoints(dealer);
        player.handMoney = 1;
        player.allMoney - 1;
        dealer.handMoney = 1;
        dealer.handMoney - 1;

    }

    //if card==A , it might count as 1 or 10(default 10)
    public changeAce(card: Card, player: Player): void {
        if (card.number == 1) {
            if (card.point == 10) {
                card.point = 1;
            } else {
                card.point = 10;
            }
        }
        this.countPoints(player);
    }



    public endRound(player: Player, dealer: Dealer): void {
        if (player.gameStatus.isBust == false || player.gameStatus.isBlackJack == false) {
            if (player.points > dealer.points) {
                player.gameStatus.status = "win";
            } else {
                player.gameStatus.status = "lose";
            }
        } else {
            console.log('Logical ERROR !!  PlayerController')
        }

        if (player.gameStatus.status == "win") {
            //get dealer's handmoney
            player.handMoney = player.handMoney + dealer.handMoney;
            dealer.handMoney = 0;
        } else if (player.gameStatus.status == "lose") {
            //lose all handmoney
            dealer.handMoney = player.handMoney + dealer.handMoney;
            player.handMoney = 0;
        } else {
            console.log('Logical erroe!! PlayerController')
        }

        //add hand money to all money
        player.allMoney = player.allMoney + player.handMoney;
        dealer.allMoney = dealer.allMoney + dealer.handMoney;


        //check points bigger or smaller
        //change status "win" or "lose"
        //give or take player's all money
    }

    public isBust(player: Player): void {
        this.countPoints(player);
        if (player.points > 21) {
            player.gameStatus.isBust = true;
        }
    };

    public isBlackJack(player: Player): void {
        this.countPoints(player);
        if (player.points == 21) {
            player.gameStatus.isBlackJack = true;
        }
    }



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