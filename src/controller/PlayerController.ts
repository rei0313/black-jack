import { Card } from "../model/Card";
import { Player } from "../model/Player";
import { CardDao } from "../model/CardDao";

export class PlayerController {
    private card!: Card;
    private cardDao!: CardDao;

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
    }

    private getNewCard(): Card {
        let newCard = new Card(this.getSymbol(), this.getRandom(13), false);
        return newCard;
    }



    public hit(player: Player): void {
        //残るカードのデータをゲット→ランダムで一枚のカードを作成
        //1~13 & 4symbol random->if existed, new another card
        //isHited=false一旦残し、アニメーションの様子を見ながら調整
        let lastedCards: Card[] = this.cardDao.getLastedCards();
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

    public stand(player: Player): void {        
        //不用新增Card的properties，用player狀態操作<div>OneCards<div/>的class
        //視情況再包一層components
        player.isStand = true;
    }

    public doubleDown(player: Player): void {
        player.handMoney = player.handMoney * 2;
        player.isDoubledown = true;
    }

    public strat(player: Player): void {
        //重複卡牌是否需要判斷？
        let newCards: Card[] = [this.getNewCard(), this.getNewCard()];
        player.cards = newCards;

    }

    
    //Split(what is splite?)
    //Login
    //Logout


    //if Database needed, use DAO methods.
}