import { Card } from "../model/Card";

//一般遊玩時，不需要跟DB互動
//只有需要暫存遊戲進度、回復遊戲進度、存點數時才需要

//把卡片的資料塞在JSON裡

export class CardPoolController {


    //有關圖片的一些疑慮：如果放在front end，是否代表玩家要一口氣載入所有卡面才跑得動？
    //controller的東西暫時都塞在前端，等過完年再看要不要塞到後端
    private getCardUrl(card: Card) {
        // console.log(testCard.number + " " + testCard.symbol);
        let filename: string = "";

        switch (card.symbol) {
            case "clubs":
                filename = "c" + card.number;
                break;
            case "diamonds":
                filename = "d" + card.number;
                break;
            case "hearts":
                filename = "h" + card.number;
                break;
            case "spades":
                filename = "s" + card.number;
                break;
            default:
                console.log(`END`);
                return filename;
        }

        let cradpath = ".\\assets\\Cards\\" + filename + ".png";        //path應該要再修
        console.log(cradpath);
        return cradpath; //retrun a string
    }




    public initCards(): Card[] {


        let initCards: Card[] = [];
        return initCards;
    }


    //残るカードをゲット
    public getLastedCards(): Card[] {
        //do something with database
        //a testing data
        let lastedCards: Card[] = [new Card("hearts", 6, false, false, 6), new Card("diamonds", 2, false, false, 2)];
        return lastedCards;
    }

}