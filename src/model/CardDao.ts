import { Card } from "../model/Card";

export class CardDao {


    //残るカードをゲット
    public getLastedCards(): Card[] {
        //do something with database
        //a testing data
        let lastedCards: Card[] = [new Card("hearts", 6, false), new Card("diamonds", 2, false)];
        return lastedCards;
    }

}