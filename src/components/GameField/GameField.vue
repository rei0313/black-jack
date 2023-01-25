<template>
  <div class="background">
    <div v-if="testPlayer1.cardsStatus==CardsStatus.isBust" class="statuBox">
      <span>BUST !</span>
    </div>
    <div v-if="testPlayer1.cardsStatus==CardsStatus.isBust" class="alertBox">
      <button>NEW ROUND</button>
      <button>EXIT</button>
      <!-- 新增按鈕&圖片!! -->
    </div>
    <div v-if="testPlayer1.cardsStatus==CardsStatus.isStand" class="statuBox">
      <span>STAND...</span>
    </div>
    <div v-if="testPlayer1.cardsStatus==CardsStatus.isDoubledown" class="statuBox">
      <span>DOUBLE DOWN</span>
    </div>
    <div class="cards" :class="cardsStyle">
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
import { onMounted, watch } from "vue";
import { CardsStatus } from "../../model/CardsStatus";
import { Dealer } from "../../model/Dealer";

/*issue of this file:
1. ゲームを始まるには無限ループが必要...？
2. また詰んだらdealerの画面を作ろう！
*/

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

let testDealer = new Dealer(
  "Dealer",
  5,
  1,
  100,
  [],
  0,
  GameStatus.standby,
  CardsStatus.none
);

const playerControl = new PlayerController();

//compute this function!!
//using boolean is easier to build the game logic, but here I want to get string for dynamic class...

let cardsStyle: string = $ref("");

onMounted(()=>{
  if (testPlayer1.gameStatus === GameStatus.standby){
    setTimeout(()=>{
      playerControl.newRound(testPlayer1,testDealer)
    },1000)
    ;
  }

    
})


watch(testPlayer1, () => {
  if (testPlayer1.gameStatus === GameStatus.standby)
    playerControl.newRound(testPlayer1,testDealer);

  if (testPlayer1.points > 21) testPlayer1.cardsStatus = 4;

  if (
    testPlayer1.cardsStatus == CardsStatus.isBlackJack &&
    !cardsStyle.includes("isBlackJack")
  )
    cardsStyle += "isBlackJack ";
  if (
    testPlayer1.cardsStatus == CardsStatus.isBust &&
    !cardsStyle.includes("isBust")
  )
    cardsStyle += "isBust ";
  if (
    testPlayer1.cardsStatus == CardsStatus.isDoubledown &&
    !cardsStyle.includes("isDoubledown")
  )
    cardsStyle += "isDoubledown ";
  if (
    testPlayer1.cardsStatus == CardsStatus.isStand &&
    !cardsStyle.includes("isStand")
  )
    cardsStyle += "isStand ";
  console.log(cardsStyle);
});

// function getStyleString(player: Player) {
//   if (player.gameStatus.isBlackJack) cardsStyle += "isBlackJack ";
//   if (player.gameStatus.isBust) cardsStyle += "isBust ";
//   if (player.gameStatus.isDoubledown) cardsStyle += "isDoubledown ";
//   if (player.gameStatus.isStand) cardsStyle += "isStand ";
//   // console.log(cardsStyle);
//   return cardsStyle;
// }

function hit(): void {
  playerControl.hit(testPlayer1);
  // getStyleString(testPlayer1);
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

.isBust {
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

.statuBox span {
  font-size: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  color: aliceblue;
  animation: changeColor 1s;
}

@keyframes changeColor {
  from {
    color: red;
  }
  to {
    color: aliceblue;
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
</style>