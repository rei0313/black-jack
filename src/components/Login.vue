

<template>
  <div class="wrap">
    <div class="menuBlock" @click="toMenu">
      <div class="icon"></div>
      <div class="icontitle">BACK TO HOME</div>
    </div>
    <div class="blackjack">
      <span>Login</span>
    </div>
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
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

//=========firebase==========
//確認登入後，用onMounted查完整玩家資料

async function submit() {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, inputs[0].input, inputs[1].input)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  // try {
  //   const q = query(
  //     collection(db, "loginData"),
  //     where("name", "==", inputs[0].input)
  //   );
  //   //返回一個query
  //   const querySnapshot = await getDocs(q);
  //   let checker = { name: "", password: "", status: "", id: "" };
  //   querySnapshot.forEach(doc => {
  //     checker.name = doc.data().name;
  //     checker.password = doc.data().password;
  //     checker.status = doc.data().status;
  //     checker.id = doc.id;
  //   });
  //   // console.log(checker);
  //   if (checker.password === inputs[1].input) {
  //     //更改登入狀態，寫回firebase
  //     //
  //     const loginData = await setDoc(doc(db, "loginData", checker.id), {
  //       //不全部寫出來會被覆蓋成空的QQ
  //       name: inputs[0].input,
  //       password: inputs[1].input,
  //       status: "login"
  //     });

  //     alert("登入成功！");
  //     router.push({ path: "/", params: { playername: checker.name } });
  //     return;
  //   } else {
  //     alert("密碼錯誤┗|｀O′|┛");
  //   }
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
}

const inputs = $ref([
  { name: "EMAIL", icon: "name_icon", type: "text", input: "" },
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
  { name: "LOGOUT", method: cancel }
];

function cancel() {
  const auth = getAuth(app);
  signOut(auth);

  // inputs.forEach((e: { input: string }) => {
  //   e.input = "";
  // });
}

function toMenu() {
  router.push("/");
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