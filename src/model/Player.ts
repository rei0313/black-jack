import { Card } from "./Card";

export class Player {

    private _money!: Number;
    private _cards!: Card[];
    private _points!: Number;
    private _isStand!: Boolean;
    private _isDoubledown!: Boolean;

    constructor(){
        //要補上
    }


    public get money(): Number {
        return this._money;
    }
    public set money(value: Number) {
        this._money = value;
    }
    public get cards(): Card[] {
        return this._cards;
    }
    public set cards(value: Card[]) {
        this._cards = value;
    }
    public get points(): Number {
        return this._points;
    }
    public set points(value: Number) {
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