import { Card } from "../model/Card";

//一般遊玩時，不需要跟DB互動
//只有需要暫存遊戲進度、回復遊戲進度、存點數時才需要

export class CardDao {

    public getDefaultCardPool():Card[]{
        
        // 現在發牌在playcontroller發，好像不需要...？
        let defaultCards:Card[]=[];
        return defaultCards;
    }

}