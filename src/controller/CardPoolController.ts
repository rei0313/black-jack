import { Card } from "../model/Card";

//一般遊玩時，不需要跟DB互動
//只有需要暫存遊戲進度、回復遊戲進度、存點數時才需要

//把卡片的資料塞在JSON裡

export class CardPoolController {


    //有關圖片的一些疑慮：如果放在front end，是否代表玩家要一口氣載入所有卡面才跑得動？
    //controller的東西暫時都塞在前端，等過完年再看要不要塞到後端
   



    public initCards(): Card[] {
        let initCards: Card[] = [];
        return initCards;
    }


    //獲取卡池中剩下的卡片
    public getLastedCards(): Card[] {
        //透過控制遊戲邏輯的檔案儲存就好了
        //a testing data
        let lastedCards: Card[] = [new Card("hearts", 6, false, false, 6), new Card("diamonds", 2, false, false, 2)];
        return lastedCards;
    }

}