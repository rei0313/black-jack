export class Card {

    private _symbol!: String;
    private _number!: number;   //「!」の作用は...
    private _isHited: boolean = false;
    private _isFocus: boolean = false;
    private _point!: number;
    //points: J,Q,K == 10; A == 1 or 10
    // using split() in PlayerController to change A's point




    constructor(newSymbol: String, newNumber: number, newIsHited: boolean = false, newIsFocus: boolean = false, newPoint: number) {
        this.symbol = newSymbol;
        this.number = newNumber;
        this.isHited = newIsHited;
        this.isFocus = newIsFocus;
        this.point = newPoint;
    }

    public set symbol(v: String) {
        this._symbol = v;
    };

    public set number(v: number) {
        this._number = v;
    }

    public set isHited(v: boolean) {
        this._isHited = v;
    }


    get symbol(): String {
        return this._symbol;
    }

    get number(): number {
        return this._number;
    }

    get isHited(): boolean {
        return this._isHited;
    }

    public get isFocus(): boolean {
        return this._isFocus;
    }
    public set isFocus(value: boolean) {
        this._isFocus = value;
    }

    public get point(): number {
        return this._point;
    }
    public set point(value: number) {
        this._point = value;
    }

}