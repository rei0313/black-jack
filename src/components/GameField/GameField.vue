<template>
  <div class="background">
    <div class="cards">
      <div v-for="card in testCards" :key="card.imgPath">
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
      <div class="bet"></div>
      <div class="money">
        <div class="moneyImg"></div>
      </div>
      <div class="playerData"></div>
    </div>
    <video autoplay muted loop id="backgroundVedio">
      <source
        src="../../../public/assets/Free Animation Loop Background_ Pixel Blocks.mp4"
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
when button active, a wired border shows...
*/

//temp!! importing written methods

let testPlayer1 = new Player(
  1,
  21,
  [],
  0,
  new GameStatus(false, false, false, false)
);
const playerControl = new PlayerController();

function hit(): void {
  playerControl.hit(testPlayer1);
  console.log(testPlayer1);
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
let testCards = [
  new Card("hearts", 6, false, false, 6),
  new Card("diamonds", 9, false, false, 9),
  new Card("spades", 1, false, false, 1),
  new Card("diamonds", 5, false, false, 5),
  new Card("clubs", 6, false, false, 6)
];

//表示できなくなってる；；
// let testCards = testPlayer1.cards;
</script>
<style scoped>
.cards {
  display: flex;
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
  background-image: url("../../../public/assets/UI/keyboard_203.png");
  width: 10rem;
  height: 3rem;
  background-size: 100%;
}

.btn:active {
  background-image: url("../../../public/assets/UI/keyboard_212.png");
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

@keyframes play {
  0% { background-position:  0  0; }
100% { background-position: -240px 0;  }
}
</style>