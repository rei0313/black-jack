<template>
  <div class="outwrap">
    <div class="menuBlock" @click="toMenu">
      <div class="icon"></div>
      <div class="icontitle">BACK TO HOME</div>
    </div>
    <div class="innerwrap">
      <div class="dealercardswrap">
        <div v-for="dealercard in dealerCards" :key="dealercard.imgPath" class="dealercards">
          <DealerCard :dealercard="dealercard" />
        </div>
      </div>
      <div v-if="data.player.cardsStatus==CardsStatus.isBust" class="statuBox">
        <span>BUST !</span>
      </div>
      <div v-if="alertVisable==true" class="alertBox">
        <div class="alertTitle" v-if="data.player.gameStatus==GameStatus.lose">
          <p>Ooops!! You lose!!</p>
        </div>
        <div class="alertTitle" v-if="data.player.gameStatus==GameStatus.win">Congrats!! You win!!</div>
        <div class="alertTitle" v-if="data.player.gameStatus==GameStatus.tie">Tie...</div>
        <div class="alertTitle" v-if="data.player.gameStatus==GameStatus.blackjack">It's BLACKJACK!!</div>
        <div class="result" v-if="data.player.gameStatus==GameStatus.win||data.player.gameStatus==GameStatus.blackjack">恭喜您獲得特殊優惠券！</div>
        <div class="result" v-if="data.player.gameStatus!=GameStatus.win&&data.player.gameStatus!=GameStatus.blackjack">太可惜了！沒有獲得優惠券ಠ_ಠ</div>
        <div class="btnwrap">
          <div class="newRoundBtn" @click="backToShop">
            <div class="btnLi"></div>
            <p class="remind">BACK TO SHOP</p>
          </div>
        </div>
      </div>
      <div v-if="data.player.cardsStatus==CardsStatus.isStand" class="statuBox">
        <span>STAND...</span>
      </div>
      <div v-if="data.player.cardsStatus==CardsStatus.isDoubledown" class="statuBox">
        <span style="font-size: 40px">DOUBLE DOWN</span>
      </div>
      <div v-if="data.player.cardsStatus==CardsStatus.isBlackJack" class="blackjack">
        <span>BLACK JACK!!</span>
      </div>
      <div class="cards" :class="cardsStyle">
        <div v-for="card in playerCards" :key="card.imgPath">
          <OneCard :card="card" />
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="button" v-for="button in buttons" @click="button.method" :key="button.name">
        <p>{{button.name}}</p>
        <div class="btn"></div>
      </button>
    </div>
    <div class="playerStatus">
      <!-- <div class="bet">
        <div class="betImg"></div>
        <div class="subtitle">BET MONEY:</div>
        <div class="subNumber">{{ data.player.handMoney }}</div>
      </div>
      <div class="money">
        <div class="moneyImg"></div>
        <div class="subtitle">HAND MONEY:</div>
        <div class="subNumber">{{data.player.allMoney}}</div>
      </div>-->
      <div class="playerData">
        <div class="playerImg"></div>
        <div class="subtitle">PLAYER NAME:</div>
        <div class="subNumber">{{playerName}}</div>
      </div>
      <div class="point">
        <div class="pointImg"></div>
        <div class="subtitle">CURRENT POINT:</div>
        <div class="subNumber">{{data.player.points}}</div>
      </div>
      <!-- </div>
      <div class="playerStatus">-->
    </div>
  </div>
</template>
<script setup lang="ts">
import { Card } from "../../model/Card";
import OneCard from "./Cards/OneCard.vue"; //dont delete
import DealerCard from "./Cards/DealerCard.vue";
import {
  addDoc,
  Timestamp,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc
} from "firebase/firestore";
import { PlayerController } from "../../controller/PlayController";
import { Player } from "../../model/Player";
import { GameStatus } from "../../model/GameStatus";
import { defineProps, onMounted, watch, reactive } from "vue";
import { CardsStatus } from "../../model/CardsStatus";
import { Dealer } from "../../model/Dealer";
import router from "../../../router";
import { getAuth } from "firebase/auth";
import { useUserStore, userMutation } from "../../store/user";

/*issue of this file:
1. 新回合開始時，不允許點擊所有東西
*/

//get current user
function backToShop() {
  window.location.replace("http://localhost:5173/my-store/home");
}

function toMenu() {
  router.push({ path: "/" });
}

let testDealer = $ref(
  new Dealer("Dealer", 5, 1, 100, [], 0, GameStatus.standby, CardsStatus.none)
);

//不知道為什麼不這樣寫會噴出一堆div
let dealerCards = $computed(() => testDealer.cards);

const playerControl = new PlayerController();
let playerName = $ref("");

let cardsStyle: string = $ref("");
let alertVisable = $ref(false);

const data = reactive({
  player: new Player(
    "temp",
    0,
    0,
    0,
    [],
    0,
    GameStatus.standby,
    CardsStatus.none
  )
}) as { player: Player };

//if user exist

onMounted(() => {
  newRound();
  fetch("/api/user/info", {
    method: "GET",
    headers: {
      Cookie: "Authorization="
    }
  })
    .then(response => response.json())
    .then(data => {
      playerName = data.nickname;
    })
    .catch(e => {
      console.log(e);
    });
});

let playerCards = $computed(() => data.player.cards);

watch(data, () => {
  console.log("watching");
  console.log(data.player.cards);
  if (
    data.player.cardsStatus == CardsStatus.isBlackJack &&
    !cardsStyle.includes("win")
  )
    cardsStyle = "win ";
  if (
    data.player.cardsStatus == CardsStatus.isBust &&
    !cardsStyle.includes("lose")
  )
    cardsStyle = "lose ";
  if (
    data.player.cardsStatus == CardsStatus.isDoubledown &&
    !cardsStyle.includes("isDoubledown")
  )
    cardsStyle = "isDoubledown ";
  if (
    data.player.cardsStatus == CardsStatus.isStand &&
    !cardsStyle.includes("isStand")
  ) {
  }

  if (data.player.cardsStatus == CardsStatus.none) cardsStyle = "";
  if (
    data.player.gameStatus !== GameStatus.standby &&
    data.player.gameStatus !== GameStatus.playing
  ) {
    alertVisable = true;
    switch (data.player.gameStatus) {
      case "blackjack":
      printCoupon();
        break;
      case "win":
        cardsStyle = "win";
        //給他一張優惠券
        printCoupon();
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

function printCoupon(){
  fetch("/api/coupon/add?code=BLACKJACK" , {
    method: "POST"
  }).then(response => {
    if (response.status == 200) {
      alert('已發送優惠券')
    }
  });
}


function hit(): void {
  playerControl.hit(data.player);
  playerControl.check(data.player, testDealer);
  playerControl.endRound(data.player, testDealer);
  console.log(data.player.cardsStatus);
  console.log(data.player.gameStatus);
}

function stand(): void {
  playerControl.stand(data.player, testDealer);
  playerControl.check(data.player, testDealer);
  playerControl.endRound(data.player, testDealer);
  console.log(testDealer.gameStatus);
  console.log(data.player.gameStatus);
}

async function doubleDown(): Promise<void> {
  await playerControl.doubleDown(data.player, testDealer);
  await playerControl.check(data.player, testDealer);
  playerControl.endRound(data.player, testDealer);
  console.log(data.player);
}

function newRound() {
  alertVisable = false;
  playerControl.newRound(data.player, testDealer);
}

function exit() {
  alertVisable = false;
  playerControl.setPlaying(data.player, testDealer);
}

async function save() {
  console.log(data.player.cards);

  //   const playerConverter = {
  //     toFirestore: (player) => {
  //         return {
  //             name: city.name,
  //             state: city.state,
  //             country: city.country
  //             };
  //     },
  //     fromFirestore: (snapshot, options) => {
  //         const data = snapshot.data(options);
  //         return new City(data.name, data.state, data.country);
  //     }
  // };

  // import { doc, setDoc } from "firebase/firestore";

  // // Set with cityConverter
  // const ref = doc(db, "cities", "LA").withConverter(cityConverter);
  // await setDoc(ref, new City("Los Angeles", "CA", "USA"));

  //not success
  const playerData = await setDoc(doc(db, "player", `${data.player.id}`), {
    name: data.player.name,
    id: data.player.id,
    handMoney: data.player.handMoney,
    allMoney: data.player.allMoney,
    cards: data.player.cards,
    points: data.player.points,
    gameStatus: "standby",
    cardsStatus: data.player.cardsStatus
  });
}

let buttons = [
  { name: "HIT", method: hit },
  { name: "STAND", method: stand }
  // { name: "DOUBLE DOWN", method: doubleDown },
  // { name: "SAVE", method: save }
];
</script>
<style scoped>
.remind {
  font-size: 25pt;
  font-weight: 800;
}

.cards {
  display: flex;
  justify-content: center;
  height: 330px;
  width: 1280px;
  margin-bottom: 30px;
}

.dealercardswrap {
  display: flex;
  justify-content: center;
  height: 250px;
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
  left: 43%;
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
  left: 30%;
  height: 400px;
  width: 650px;
  font-size: 50px;
  animation: alertBox 1.2s;
}

.alertTitle {
  margin-top: 100px;
  margin-bottom: 100px;
}

.result {
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: bold;
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
  width: 7%;
  position: relative;
  left: -134px;
  /* top: 95px; */
}

.menuBlock {
  align-items: center;
  cursor: pointer;
  display: flex;
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