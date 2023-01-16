import { Player } from "./Player";

export class Dealer extends Player{
    //莊家如不足17點便需加牌直至超過或等於17點
    //若總點數大於17點，就必須停牌；如果莊家爆牌，便向沒有爆牌的閒家，賠出該閒家所投注的同等的注碼
}