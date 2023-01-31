

<template>
  <div class="wrap">
    <div class="blackjack">
      <span>BLACK JACK</span>
    </div>

    <div class="menu">
      <div class="menuBlock" v-for="li in menublocks" :key="li.name" @click="li.method">
        <div :class="li.icon"></div>
        <div class="subtitle">{{li.name}}</div>
      </div>
      <div class="subtitle welcome">WELCOME!! {{data.player.name }}</div>
    </div>
  </div>
</template>
    



<script setup lang="ts">
import { watch, reactive, onMounted } from "vue";
import router from "../../router";
import { Player } from "../model/Player";
import { GameStatus } from "../model/GameStatus";
import { CardsStatus } from "../model/CardsStatus";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { setTimeout } from "timers/promises";
import { useUserStore } from "../store/user";

//=========Loading=========
const userStore = useUserStore();
const data = reactive({
  player: new Player("", 0, 0, 0, [], 0, GameStatus.standby, CardsStatus.none)
}) as { player: Player };

onMounted(() => {
  if (userStore.id) {
    getUser();
  } else {
    console.log("something wrong");
  }
});

async function getUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  if (user) {
    const q = query(collection(db, "player"), where("id", "==", user.uid));
    // console.log('check user');
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    querySnapshot.forEach(doc => {
      data.player = doc.data() as Player;
    });
  }
}

watch(
  userStore,
  async () => {
    getUser();
  },
  { deep: true }
);

//用兩個class，一個放圖片一個喬位置？
const menublocks = [
  { name: "NEW GAME", method: toPlay, icon: "newGame_icon" },
  { name: "RANKING BOARD", method: toRankingBoard, icon: "rankingBoard_icon" },
  { name: "LOGIN", method: toLogin, icon: "login_icon" },
  { name: "REGIST", method: toRegist, icon: "regist_icon" }
];

function toLogin() {
  router.push("/login");
}

function toPlay() {
  router.push("/game");
}
function toRankingBoard() {
  router.push("/rank");
}
function toRegist() {
  router.push("/regist");
}
</script>

<style scoped>
* {
  font-family: "Pixel";
}

.subtitle {
  font-size: 30px;
  color: rgb(219, 159, 47);
  /* -webkit-text-stroke: 0.8px black; */
  text-shadow: 3px 3px 1px rgb(0, 0, 0);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.login_icon {
  margin-right: 20px;
  height: 32px;
  width: 32px;
  background-image: url("../../public/assets/UI/tile017.png");
}

.newGame_icon {
  margin-right: 20px;
  height: 32px;
  width: 32px;
  background-image: url("../../public/assets/UI/tile015.png");
}

/* 暫時先這樣，之後再改成hover父層 */
.newGame_icon:hover,
.rankingBoard_icon:hover,
.regist_icon:hover {
  animation: spin 1s;
  animation-iteration-count: infinite;
}
.rankingBoard_icon {
  margin-right: 20px;
  height: 32px;
  width: 32px;
  background-image: url("../../public/assets/UI/tile014.png");
}
.regist_icon {
  margin-right: 20px;
  height: 32px;
  width: 32px;
  background-image: url("../../public/assets/UI/tile016.png");
}

.menu {
  display: inline-block;
  align-items: center;
}

.menuBlock {
  align-items: center;
  cursor: pointer;
  display: flex;
  margin: 15px;
}

.blackjack {
  height: 150px;
  display: flex;
  align-items: center;
  margin: 10px;
}

.blackjack span {
  font-size: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  color: aliceblue;
  font-weight: 900;
  -webkit-text-stroke: 4px whitesmoke;
  text-shadow: 10px 10px 1px rgb(0, 0, 0);
  animation: changeColor-blackjack 2.5s;
  animation-iteration-count: infinite;
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
</style>