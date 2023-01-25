import { Card } from "./Card";
import { CardsStatus } from "./CardsStatus";
import { GameStatus } from "./GameStatus";

export class Player {

    private _name!: string;
    private _id!: number;
    private _handMoney: number = 1;
    private _allMoney!: number;
    private _cards!: Card[];
    private _points!: number;
    private _gameStatus!: GameStatus;
    private _cardsStatus!: CardsStatus;
    //gamestatus拆成兩個enum:一組控制牌組狀態、一組控制輸贏

    constructor(newName: string, newId: number, newhandmoney: number, newallmoney: number, newcards: Card[], newpoints: number, newgameStatus: GameStatus, newcardStatus: CardsStatus) {
        this._name = newName;
        this._id = newId;
        this.handMoney = newhandmoney;
        this.allMoney = newallmoney;
        this.cards = newcards;
        this.points = newpoints;
        this.gameStatus = newgameStatus;
        this.cardsStatus = newcardStatus;
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
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get cardsStatus(): CardsStatus {
        return this._cardsStatus;
    }
    public set cardsStatus(value: CardsStatus) {
        this._cardsStatus = value;
    }
}


    //money
    //cards
    //poker points
    //isStand
    //isDoubledown


    //only get&set. change status in controller file
