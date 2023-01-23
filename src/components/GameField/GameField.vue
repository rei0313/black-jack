<template>
  <div class="background">
    <div class="cards">
      <div v-for="card in testCards" :key="card.imgPath">
        <!-- let cardsStyle = (testPlayer1.gameStatus.isBust:"isBust "?"") -->
        <OneCard :card="card" />
      </div>
    </div>
    <div class="buttons">
      <button class="button" v-for="button in buttons" @click="button.method" :key="button.name">
        <p>{{button.name}}</p>
        <div class="btn"></div>
      </button>
    </div>
    <div class="playerStatus">
      <div class="bet">
        <div class="betImg"></div>
        <div class="subtitle">BET MONEY:</div>
        <div class="subNumber">{{ testPlayer1.handMoney }}</div>
      </div>
      <div class="money">
        <div class="moneyImg"></div>
        <div class="subtitle">HAND MONEY:</div>
        <div class="subNumber">{{testPlayer1.allMoney}}</div>
      </div>
      <div class="point">
        <div class="pointImg"></div>
        <div class="subtitle">POINT:</div>
        <div class="subNumber">{{testPlayer1.points}}</div>
      </div>
    </div>
    <div class="playerStatus">
      <div class="playerData">
        <div class="playerImg"></div>
        <div class="subtitle">PLAYER NAME:</div>
        <div class="subNumber">{{testPlayer1.name}}</div>
      </div>
    </div>
    <video autoplay muted loop id="backgroundVedio">
      <source
        src="../../../assets/Free Animation Loop Background_ Pixel Blocks.mp4"
        type="video/mp4"
      />
    </video>
  </div>
</template>
<script setup lang="ts">
import { Card } from "../../model/Card";
import OneCard from "./Cards/OneCard.vue"; //dont delete
import { addDoc, Timestamp, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { PlayerController } from "../../controller/PlayController";
import { Player } from "../../model/Player";
import { GameStatus } from "../../model/GameStatus";

/*issue of this file:
1. ゲームを始まるには無限ループが必要...？
2. また詰んだらdealerの画面を作ろう！
*/



let testPlayer1 = $ref(
  new Player(
    "testPlayer1",
    10001,
    1,
    21,
    [],
    0,
    new GameStatus(false, false, false, false)
  )
);
const playerControl = new PlayerController();

//compute this function!!
//using boolean is easier to build the game logic, but here I want to get string for dynamic class...
function getStyleString(player: Player) {
  let cardsStyle: string = "";
  if (player.gameStatus.isBlackJack) cardsStyle += "isBlackJack ";
  if (player.gameStatus.isBust) cardsStyle += "isBust ";
  if (player.gameStatus.isDoubledown) cardsStyle += "isDoubledown ";
  if (player.gameStatus.isStand) cardsStyle += "isStand ";
  // console.log(cardsStyle);
  return cardsStyle;
}

function hit(): void {
  playerControl.hit(testPlayer1);
  console.log(testPlayer1);
  // console.log(testPlayer1.gameStatus.isStand);
  // cardsStyle(testPlayer1);
}

function stand(): void {
  playerControl.stand(testPlayer1);
  console.log(testPlayer1);
}

function doubleDown(): void {
  playerControl.doubleDown(testPlayer1);
  console.log(testPlayer1);
}

function split(): void {}
//===========temp above
let buttons = [
  { name: "HIT", method: hit },
  { name: "STAND", method: stand },
  { name: "DOUBLE DOWN", method: doubleDown },
  { name: "SPLIT", method: split }
];

//しばらくはnew Cardで対応
// let testCards = [
//   new Card("hearts", 6, false, false, 6),
//   new Card("diamonds", 9, false, false, 9),
//   new Card("spades", 1, false, false, 1),
//   new Card("diamonds", 5, false, false, 5),
//   new Card("clubs", 6, false, false, 6)
// ];

//表示できなくなってる；；
let testCards = $computed(() => testPlayer1.cards);
</script>
<style scoped>
.cards {
  display: flex;
  justify-content: center;
  height: 350px;
  widows: 1200px;
}

.buttons {
  display: flex;
  text-align: center;
  justify-content: center;
}

.button {
  position: relative;
  text-align: center;
  margin-right: 50px;
  margin-left: 50px;
}

.button p {
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 17px;
  font-size: 20px;
  pointer-events: none;
}

.button:active p {
  top: 50%;
  left: 50%;
}

.btn {
  background-image: url("../../../assets/UI/keyboard_203.png");
  width: 10rem;
  height: 3rem;
  background-size: 100%;
}

.btn:active {
  background-image: url("../../../assets/UI/keyboard_212.png");
}

#backgroundVedio {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}

* {
  font-family: "Pixel";
}

.moneyImg {
  width: 48px;
  height: 48px;
  animation: play steps(5) 2s infinite;
  background-image: url("../../../public/assets/coins/MonedaD_Big.png");
}

.betImg {
  width: 48px;
  height: 48px;
  animation: play steps(5) 2s infinite;
  background-image: url("../../../public/assets/coins/MonedaP_Big.png");
}

.playerImg {
  width: 48px;
  height: 48px;
  animation: player-play steps(4) 2s infinite;
  background-image: url("../../../public/assets/coins/spr_coin_strip4_Big.png");
}

.pointImg {
  width: 48px;
  height: 48px;
  animation: play steps(5) 2s infinite;
  background-image: url("../../../public/assets/coins/MonedaR_Big.png");
}

@keyframes play {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -240px 0;
  }
}

@keyframes player-play {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -192px 0;
  }
}

.playerStatus,
.money,
.bet,
.playerData,
.point {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.subtitle {
  font-size: 40px;
  color: aliceblue;
  text-align: center;
  /* add this 2 to make text align center */
  display: flex;
  align-items: center;
}

.subNumber {
  font-size: 40px;
  color: rgb(255, 241, 40);
  text-align: right;
  /* add this 2 to make text align center */
  display: flex;
  align-items: center;
  /* width: 1px; */
}
</style>