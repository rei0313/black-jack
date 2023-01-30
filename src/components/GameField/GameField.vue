<template>
  <div class="background">
    <div class="menuBlock" @click="toMenu">
      <div class="icon"></div>
      <div class="icontitle">BACK TO HOME</div>
    </div>
    <div class="cards">
      <div v-for="dealercard in dealerCards" :key="dealercard.imgPath" class="dealercards">
        <div class="back">
          <img src="../../../public/assets/Cards/back.png" class="oneCard" />
        </div>
        <div class="font">
          <DealerCard :dealercard="dealercard" />
        </div>
      </div>
    </div>
    <div v-if="testPlayer1.cardsStatus==CardsStatus.isBust" class="statuBox">
      <span>BUST !</span>
    </div>
    <div v-if="alertVisable==true" class="alertBox">
      <div class="alertTitle" v-if="testPlayer1.gameStatus==GameStatus.lose">Ooops!! You lose!!</div>
      <div class="alertTitle" v-if="testPlayer1.gameStatus==GameStatus.win">Congrats!! You win!!</div>
      <div class="alertTitle" v-if="testPlayer1.gameStatus==GameStatus.tie">Tie...</div>
      <div class="alertTitle" v-if="testPlayer1.gameStatus==GameStatus.blackjack">It's BLACKJACK!!</div>
      <div class="btnwrap">
        <div class="newRoundBtn" @click="newRound">
          <div class="btnLi"></div>
          <p>NEW ROUND</p>
        </div>
        <div class="newRoundBtn" @click="exit">
          <div class="btnLi"></div>
          <p>EXIT</p>
        </div>
      </div>
    </div>
    <div v-if="testPlayer1.cardsStatus==CardsStatus.isStand" class="statuBox">
      <span>STAND...</span>
    </div>
    <div v-if="testPlayer1.cardsStatus==CardsStatus.isDoubledown" class="statuBox">
      <span style="font-size: 40px">DOUBLE DOWN</span>
    </div>
    <div v-if="testPlayer1.cardsStatus==CardsStatus.isBlackJack" class="blackjack">
      <span>BLACK JACK!!</span>
    </div>
    <div class="cards" :class="cardsStyle">
      <div v-for="card in playerCards" :key="card.imgPath">
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
    <!-- <video autoplay muted loop id="backgroundVedio">
      <source
        src="../../../assets/Free Animation Loop Background_ Pixel Blocks.mp4"
        type="video/mp4"
      />
    </video>-->
  </div>
</template>
<script setup lang="ts">
import { Card } from "../../model/Card";
import OneCard from "./Cards/OneCard.vue"; //dont delete
import DealerCard from "./Cards/DealerCard.vue";
import { addDoc, Timestamp, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { PlayerController } from "../../controller/PlayController";
import { Player } from "../../model/Player";
import { GameStatus } from "../../model/GameStatus";
import { onMounted, watch } from "vue";
import { CardsStatus } from "../../model/CardsStatus";
import { Dealer } from "../../model/Dealer";
import router from "../../../router";

/*issue of this file:
1. 新回合開始時，不允許點擊所有東西
*/

// function timeout(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

function toMenu() {
  router.push({ path: "/" });
}

let testPlayer1 = $ref(
  new Player(
    "MurabitoB",
    10001,
    1,
    200,
    [],
    0,
    GameStatus.standby,
    CardsStatus.none
  )
);

let playerCards = $computed(() => testPlayer1.cards);

let testDealer = $ref(
  new Dealer("Dealer", 5, 1, 100, [], 0, GameStatus.standby, CardsStatus.none)
);

//不知道為什麼不這樣寫會噴出一堆div
let dealerCards = $computed(() => testDealer.cards);

const playerControl = new PlayerController();

let cardsStyle: string = $ref("");
let alertVisable = $ref(false);


onMounted(() => {
  if (testPlayer1.gameStatus === GameStatus.standby) {
    playerControl.newRound(testPlayer1, testDealer); 
    alertVisable = false;
  }
});

watch(testPlayer1, () => {
  if (
    testPlayer1.cardsStatus == CardsStatus.isBlackJack &&
    !cardsStyle.includes("win")
  )
    cardsStyle = "win ";
  if (
    testPlayer1.cardsStatus == CardsStatus.isBust &&
    !cardsStyle.includes("lose")
  )
    cardsStyle = "lose ";
  if (
    testPlayer1.cardsStatus == CardsStatus.isDoubledown &&
    !cardsStyle.includes("isDoubledown")
  )
    cardsStyle = "isDoubledown ";
  if (
    testPlayer1.cardsStatus == CardsStatus.isStand &&
    !cardsStyle.includes("isStand")
  ) {
  }

  if (testPlayer1.cardsStatus == CardsStatus.none) cardsStyle = "";
  if (testPlayer1.gameStatus !== GameStatus.standby && testPlayer1.gameStatus !== GameStatus.playing) {
    alertVisable = true;
    switch (testPlayer1.gameStatus) {
      case "win":
        cardsStyle = "win";
        break;
      case "lose":
        cardsStyle = "lose";
        break;
      case "tie":
        cardsStyle = "tie";
        break;
    }
  }

});

function hit(): void {
  playerControl.hit(testPlayer1);
  playerControl.check(testPlayer1, testDealer);
  playerControl.endRound(testPlayer1,testDealer);
  console.log(testDealer.points);
  console.log(testPlayer1.points);
}

function stand(): void {
  playerControl.stand(testPlayer1, testDealer);
  playerControl.check(testPlayer1, testDealer);
  playerControl.endRound(testPlayer1,testDealer);
  console.log(testDealer.gameStatus);
  console.log(testPlayer1.gameStatus);

}

function doubleDown(): void {
  playerControl.doubleDown(testPlayer1, testDealer);
  playerControl.check(testPlayer1, testDealer);
  playerControl.endRound(testPlayer1,testDealer);
  console.log(testPlayer1);
}

function split(): void {}

function newRound() {
  alertVisable = false;
  playerControl.newRound(testPlayer1, testDealer);
}

function exit(){
  alertVisable = false;
  playerControl.setPlaying(testPlayer1,testDealer);
}

let buttons = [
  { name: "HIT", method: hit },
  { name: "STAND", method: stand },
  { name: "DOUBLE DOWN", method: doubleDown },
  { name: "SPLIT", method: split }
];
</script>
<style scoped>
.cards {
  display: flex;
  justify-content: center;
  height: 350px;
  width: 1280px;
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
  background-image: url("../../../assets/coins/MonedaD_Big.png");
}

.betImg {
  width: 48px;
  height: 48px;
  animation: play steps(5) 2s infinite;
  background-image: url("../../../assets/coins/MonedaP_Big.png");
}

.playerImg {
  width: 48px;
  height: 48px;
  animation: player-play steps(4) 2s infinite;
  background-image: url("../../../assets/coins/spr_coin_strip4_Big.png");
}

.pointImg {
  width: 48px;
  height: 48px;
  animation: play steps(5) 2s infinite;
  background-image: url("../../../assets/coins/MonedaR_Big.png");
}

.btnLi {
  width: 48px;
  height: 48px;
  animation: player-play steps(4) 2s infinite;
  background-image: url("../../../assets/coins/spr_coin_roj_Big.png");
}

.newRoundBtn {
  display: flex;
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin-right: 40px;
  cursor: pointer;
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

.lose {
  filter: invert(100%);
  transition: 0.8s;
}

.statuBox {
  position: absolute;
  background-color: rgb(17, 9, 17);
  border-radius: 10px;
  box-shadow: 0px 0px 3px 2px white;
  z-index: 1;
  top: 44%;
  left: 45%;
  height: 80px;
  width: 250px;
  font-size: 50px;
  display: flex;
  text-align: center;
  justify-content: center;
  animation: shake 0.2s;
}

.blackjack {
  position: absolute;
  background-color: rgb(17, 9, 17);
  border-radius: 10px;
  box-shadow: 0px 0px 3px 2px white;
  z-index: 1;
  top: 44%;
  left: 45%;
  height: 80px;
  width: 350px;
  font-size: 50px;
  display: flex;
  text-align: center;
  justify-content: center;
  animation: shake 0.2s;
}
.statuBox span {
  font-size: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  color: aliceblue;
  animation: changeColor 1s;
}

.blackjack span {
  font-size: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  color: aliceblue;
  animation: changeColor-blackjack 2s;
}

.alertBox {
  position: absolute;
  background-color: rgb(250, 213, 92);
  border-radius: 10px;
  box-shadow: 0px 0px 3px 2px white;
  z-index: 2;
  top: 20%;
  left: 35%;
  height: 400px;
  width: 650px;
  font-size: 50px;
  animation: alertBox 1.2s;
}

.alertTitle {
  margin-top: 100px;
  margin-bottom: 100px;
}

.btnwrap {
  display: flex;
  text-align: center;
  justify-content: center;
}

@keyframes alertBox {
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
}

@keyframes changeColor {
  from {
    color: red;
  }
  to {
    color: aliceblue;
  }
}

@keyframes changeColor-blackjack {
  0% {
    color: red;
  }
  20% {
    color: orange;
  }
  40% {
    color: yellow;
  }
  60% {
    color: green;
  }
  80% {
    color: blue;
  }
  100% {
    color: purple;
  }
}
@keyframes shake {
  0% {
    transform: translateX(-3px);
  }
  5% {
    transform: translateX(3px);
  }
  10% {
    transform: translateX(-3px);
  }
  15% {
    transform: translateX(3px);
  }
  20% {
    transform: translateX(-3px);
  }
  25% {
    transform: translateX(3px);
  }
  30% {
    transform: translateX(-3px);
  }
  35% {
    transform: translateX(3px);
  }
  40% {
    transform: translateX(-3px);
  }
  45% {
    transform: translateX(3px);
  }
  50% {
    transform: translateX(-3px);
  }
  55% {
    transform: translateX(3px);
  }
  60% {
    transform: translateX(-3px);
  }
  65% {
    transform: translateX(3px);
  }
  70% {
    transform: translateX(-3px);
  }
  75% {
    transform: translateX(3px);
  }
  80% {
    transform: translateX(-3px);
  }
  85% {
    transform: translateX(3px);
  }
  90% {
    transform: translateX(-3px);
  }
  95% {
    transform: translateX(3px);
  }
  100% {
    transform: translateX(-3px);
  }
}
.oneCard {
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin: 30px;
  width: 200px;
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.616);
}

.dealercards {
  display: flex;
  transform-style: preserve-3d;
  position: relative;
}

.font:hover {
  transform: rotateY(180deg);
}
.back:hover {
  transform: rotateY(0deg);
}

.back:first-child {
  backface-visibility: hidden;
  position: absolute;
  transform: rotateY(180deg);
  transition: all 500ms ease;
}

.font:first-child {
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(0deg);
  backface-visibility: hidden;
  transition: all 500ms ease;
}

.menuBlock {
  align-items: center;
  cursor: pointer;
  display: flex;
  margin: 15px;
}

.icon {
  margin-right: 20px;
  height: 32px;
  width: 32px;
  background-image: url("../../public/assets/UI/tile443.png");
}

.icontitle {
  font-size: 20px;
  color: rgb(250, 213, 92);
}
</style>