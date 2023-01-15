import { Card } from "./Card";

export class Player {

    private _handMoney: number = 1;
    private _allMoney!: number;
    private _cards!: Card[];
    private _points!: number;
    private _isStand!: Boolean;
    private _isDoubledown!: Boolean;

    constructor() {
        //要補上
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
    public get isStand(): Boolean {
        return this._isStand;
    }
    public set isStand(value: Boolean) {
        this._isStand = value;
    }
    public get isDoubledown(): Boolean {
        return this._isDoubledown;
    }
    public set isDoubledown(value: Boolean) {
        this._isDoubledown = value;
    }


    //money
    //cards
    //poker points
    //isStand
    //isDoubledown


    //only get&set. change status in controller file
}