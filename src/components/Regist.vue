

<template>
  <div class="wrap">
    <div class="menuBlock" @click="toMenu">
      <div class="icon"></div>
      <div class="icontitle">BACK TO HOME</div>
    </div>
    <div class="blackjack">
      <span>REGIST</span>
    </div>
    <div class="reminder">
      <span>Sorry, Data update not supported!!</span>
      <br />
      <span>Please remenber your name and password!!</span>
    </div>

    <!-- 記得修改成不能點=_= -->
    <div class="regist">
      <div class="registBlock" v-for="li in inputs" :key="li.name">
        <div :class="li.icon"></div>
        <div class="subtitle">{{li.name}}</div>
        <input :name="li.name" :type="li.type" v-model="li.input" />
      </div>
    </div>
    <div class="buttons">
      <button class="button" v-for="button in buttons" @click="button.method" :key="button.name">
        <p>{{button.name}}</p>
        <div class="btn"></div>
      </button>
    </div>
  </div>
</template>
    



<script setup lang="ts">
import router from "../../router";
import {
  addDoc,
  Timestamp,
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db, app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//=========firebase==========

async function submit() {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, inputs[1].input, inputs[2].input)
    .then(async userCredential => {
      // Signed in
      const user = userCredential.user;
      const playerData = await setDoc(doc(db, "player", user.uid), {
        name: inputs[0].input,
        id: user.uid,
        handMoney: 0,
        allMoney: 5,
        cards: null,
        points: 0,
        gameStatus: "standby",
        cardsStatus: "none"
      });

      alert("註冊成功！用戶名：" + inputs[0].input);
      router.push({ path: "/" });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
const inputs = $ref([
  { name: "PLAYER NAME", icon: "name_icon", type: "text", input: "" },
  { name: "EMAIL", icon: "email_icon", type: "text", input: "" },
  {
    name: "PASSWORD",
    icon: "password_icon",
    type: "password",
    input: ""
  }
  // { name: "REGIST", method: toRegist, icon: "regist_icon" }
]);

const buttons = [
  { name: "SUBMIT", method: submit },
  { name: "CANCEL", method: cancel }
];

function cancel() {
  inputs.forEach((e: { input: string }) => {
    e.input = "";
  });
}

function toMenu() {
  router.push({ path: "/" });
}
</script>

<style scoped>
* {
  font-family: "Pixel";
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

.registBlock {
  align-items: center;
  display: flex;
  margin: 15px;
  cursor: pointer;
}

.registBlock input {
  width: 200px;
  padding: 3px 7px;
  margin-left: 10px;
  border-radius: 5px;
  border: 2px solid rgb(219, 159, 47);
  background-color: rgb(255, 255, 255);
  font-size: 24px;
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

.name_icon {
  margin-right: 20px;
  height: 32px;
  width: 32px;
  background-image: url("../../public/assets/UI/tile015.png");
}

.email_icon {
  margin-right: 20px;
  height: 32px;
  width: 32px;
  background-image: url("../../public/assets/UI/tile016.png");
}

/* 暫時先這樣，之後再改成hover父層 */
.name_icon:hover,
.password_icon:hover {
  animation: spin 1s;
  animation-iteration-count: infinite;
}
.password_icon {
  margin-right: 20px;
  height: 32px;
  width: 32px;
  background-image: url("../../public/assets/UI/tile014.png");
}

.regist {
  display: inline-block;
  align-items: center;
}

.menuBlock {
  cursor: pointer;
  align-items: center;
  display: flex;
  margin: 15px;
}

.blackjack {
  height: 150px;
  display: flex;
  align-items: center;
  /* 水平置中 */
  justify-content: center;
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

.reminder {
  color: white;
}
</style>