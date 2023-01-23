
export class GameStatus {
    [x: string]: any;

    private _isStand: boolean = false;
    private _isDoubledown: boolean = false;
    private _isBlackJack: boolean = false;
    private _isBust: boolean = false;
    private _status: string = "standby";
    //"win","lose","playing","standby"
    //not sure if all boolean would be better

    constructor (isStand: boolean, isDoubledown: boolean, isBlackJack: boolean, isBust: boolean) {
        this._isStand = isStand;
        this._isDoubledown = isDoubledown;
        this._isBlackJack = isBlackJack;
        this._isBust = isBust;
        this._status = "standby";

    }



    public get isStand(): boolean {
        return this._isStand;
    }
    public set isStand(value: boolean) {
        this._isStand = value;
    }
    public get isDoubledown(): boolean {
        return this._isDoubledown;
    }
    public set isDoubledown(value: boolean) {
        this._isDoubledown = value;
    }

    public get isBlackJack(): boolean {
        return this._isBlackJack;
    }
    public set isBlackJack(value: boolean) {
        this._isBlackJack = value;
    }

    public get isBust(): boolean {
        return this._isBust;
    }
    public set isBust(value: boolean) {
        this._isBust = value;
    }

    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }

}

