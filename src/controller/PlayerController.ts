import { Card } from "../model/Card";
import { Player } from "../model/Player";
import { CardDao } from "../model/CardDao";

export class Playercontroller {
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

    public hit(): Card {
        //残るカードのデータをゲット→ランダムで一枚のカードを作成
        //1~13 & 4symbol random->if existed, new another card
        //isHited=false一旦残し、アニメーションの様子を見ながら調整
        let lastedCards: Card[] = this.cardDao.getLastedCards();
        let newCard = new Card(this.getSymbol(), this.getRandom(13), false);

        for (let i = 0; i < lastedCards.length; i++) {
            if (lastedCards[i] == newCard) {
                newCard = new Card(this.getSymbol(), this.getRandom(13), false);
                i = 0;
            };
        }
        return newCard;
    }

    public stand(player:Player): void{
        //不用新增Card的properties，用player狀態操作<div>OneCards<div/>的class
        //視情況再包一層components
       //get set取值...?
        
    }
    
    //Stand
    //DoubleDown
    //Split(what is splite?)
    //Login
    //Logout


    //if Database needed, use DAO methods.
}