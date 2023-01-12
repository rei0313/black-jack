export class Card {

    private _symbol!: String;
    private _number!: Number;
    private _isHited: Boolean = false;

    constructor(newSymbol: String, newNumber: Number, newIsHited: Boolean = false) {
        this.symbol = newSymbol;
        this.number = newNumber;
        this.isHited = newIsHited;
    }

    public set symbol(v: String) {
        this._symbol = v;
    };

    public set number(v: Number) {
        this._number = v;
    }

    public set isHited(v: Boolean) {
        this._isHited = v;
    }


    get symbol(): String {
        return this._symbol;
    }

    get number(): Number {
        return this._number;
    }

    get isHited(): Boolean {
        return this._isHited;
    }

}