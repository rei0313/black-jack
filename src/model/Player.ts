import { Card } from "./Card";
import { GameStatus } from "./GameStatus";

export class Player {

    private _handMoney: number = 1;
    private _allMoney!: number;
    private _cards!: Card[];
    private _points!: number;
    private _gameStatus!: GameStatus;

    constructor(newhandmoney: number, newallmoney: number, newcards: Card[], newpoints: number, newgameStatus: GameStatus) {
        this.handMoney = newhandmoney;
        this.allMoney = newallmoney;
        this.cards = newcards;
        this.points = newpoints;
        this.gameStatus = newgameStatus;
    }


    public get gameStatus(): GameStatus {
        return this._gameStatus;
    }
    public set gameStatus(value: GameStatus) {
        this._gameStatus = value;
    }

    public get handMoney(): number {
        return this._handMoney;
    }
    public set handMoney(value: number) {
        this._handMoney = value;
    }

    public get allMoney(): number {
        return this._allMoney;
    }
    public set allMoney(value: number) {
        this._allMoney = value;
    }
    public get cards(): Card[] {
        return this._cards;
    }
    public set cards(value: Card[]) {
        this._cards = value;
    }
    public get points(): number {
        return this._points;
    }
    public set points(value: number) {
        this._points = value;
    }

}


    //money
    //cards
    //poker points
    //isStand
    //isDoubledown


    //only get&set. change status in controller file
