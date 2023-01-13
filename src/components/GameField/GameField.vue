<template>
  <div class="cards">
    <div v-for="card in testCards">
      <OneCard :card="card"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import OneCard from "./Cards/OneCard.vue";
import { Card } from "../../model/Card";

// ================================NOTICE
//when hover, there is a stange white space...
//Cardについての処理はバックエンドでさらにpropertiesを増やせばいいなのか、
//今みたいにフロントエンドしか使わない処理をcomponentsで処理した方がいいなのか

// let cardUrls: string[] = [];
let isHited: Boolean[] = [];


//しばらくはnew Cardで対応
let testCards = [
  {
    Card: new Card("hearts", 13, true),
    CardUrl: './assets/Cards/h13.png', 
    CardStyle: checkhit(isHited[0]),
  },
  {
    Card: new Card("diamonds", 6, true),
    CardUrl: './assets/Cards/d6.png',
    CardStyle: checkhit(isHited[1]),
  },
  {
    Card: new Card("spades", 2, true),
    CardUrl: './assets/Cards/s2.png',
    CardStyle: checkhit(isHited[2]),
  },
  {
    Card: new Card("hearts", 7, true),
    CardUrl: './assets/Cards/h7.png',
    CardStyle: checkhit(isHited[3]),
  },
  {
    Card: new Card("clubs", 13, true),
    CardUrl: './assets/Cards/c13.png',
    CardStyle: checkhit(isHited[4]),
  }
];

let cardUrls = $ref([
  getCardUrl(testCards[0].Card),
  getCardUrl(testCards[1].Card),
  getCardUrl(testCards[2].Card),
  getCardUrl(testCards[3].Card),
  getCardUrl(testCards[4].Card)
]);

isHited = [
  testCards[0].Card.isHited,
  testCards[1].Card.isHited,
  testCards[2].Card.isHited,
  testCards[3].Card.isHited,
  testCards[4].Card.isHited
];


function checkhit(status:Boolean){
  let cardStyle = (status ? "unHited" : "isHited") + " " + "oneCard";
  return cardStyle;
}



//最多5張。一開始就建立5張牌，但還沒發的牌isHited設為false，用v-if顯示

function getCardUrl(card: Card) {
  // console.log(testCard.number + " " + testCard.symbol);
  let filename: string = "";

  switch (card.symbol) {
    case "clubs":
      filename = "c" + card.number;
      break;
    case "diamonds":
      filename = "d" + card.number;
      break;
    case "hearts":
      filename = "h" + card.number;
      break;
    case "spades":
      filename = "s" + card.number;
      break;
    default:
      console.log(`END`);
    return filename;
  }

  let cradpath = ".\\assets\\Cards\\" + filename + ".png";
  console.log(cradpath);
  return cradpath; //retrun a string
}
//1. Get a Card object (maybe from fetch...? or localstroage...?)
//2. execute getCardUrl()
//3. bind cardUrl into component

//CSS style Memo
//1. hit animation
//2. hover animation(done)
//3. focus animation(optional)選取卡片時應該要用vue綁定...
// WIN, BUST, BLACKJACK act as a big div
</script>
<style scoped>
.cards {
  display: flex;
}
</style>