export class Card {

    private _symbol!: string;
    private _number!: number;   //「!」の作用は...
    private _isHited: boolean = false;
    private _isFocus: boolean = false;
    private _point!: number;
    private _imgPath!: string;
    private _style!: string;
    private _isFaceDown!: boolean;


    //points: J,Q,K == 10; A == 1 or 10
    // using split() in PlayerController to change A's point




    constructor(newSymbol: string, newNumber: number, newIsHited: boolean = false, newIsFocus: boolean = false, newPoint: number) {
        this._symbol = newSymbol;
        this._number = newNumber;
        this._isHited = newIsHited;
        this._isFocus = newIsFocus;
        this._point = newPoint;
        this._imgPath = getCardUrl(newSymbol,newNumber);
        this._style = newIsHited ? "unHited" : "isHited";
        this._isFaceDown = false;
    }

    public set symbol(v: string) {
        this._symbol = v;
    };

    public set number(v: number) {
        this._number = v;
    }

    public set isHited(v: boolean) {
        this._isHited = v;
    }


    get symbol(): string {
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
    public get imgPath(): string {
        return this._imgPath;
    }
    public set imgPath(value: string) {
        this._imgPath = value;
    }
    public get style(): string {
        return this._style;
    }
    public set style(value: string) {
        this._style = value;
    }

    public get isFaceDown(): boolean {
        return this._isFaceDown;
    }
    public set isFaceDown(value: boolean) {
        this._isFaceDown = value;
    }

}

function getCardUrl(newSymbol: string, newNumber: number): string {
    let filename: string = "";

    switch (newSymbol) {
      case "clubs":
        filename = "c" + newNumber;
        break;
      case "diamonds":
        filename = "d" + newNumber;
        break;
      case "hearts":
        filename = "h" + newNumber;
        break;
      case "spades":
        filename = "s" + newNumber;
        break;
    }
  
    let cradpath = ".\\assets\\Cards\\" + filename + ".png";
    // console.log(cradpath);
    return cradpath;
}
