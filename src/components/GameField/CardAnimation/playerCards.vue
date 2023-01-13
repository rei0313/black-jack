<template>
  <div class="cards">
    <div :class="card.CardStyle" v-for="card in testCards">
      <img :src="cardUrls[card.index]" />
    </div>
  </div>
</template>


<script setup lang="ts">
// ================================NOTICE
//when hover, there is a stange white space...
//Cardについての処理はバックエンドでさらにpropertiesを増やせばいいなのか、
//今みたいにフロントエンドしか使わない処理をcomponentsで処理した方がいいなのか

import { Card } from "../../../model/Card";
// let cardUrls: string[] = [];
let isHited: Boolean[] = [];


//しばらくはnew Cardで対応
let testCards = [
  {
    Card: new Card("hearts", 13, true),
    // CardUrl: cardUrls[0], 
    CardStyle: checkhit(isHited[0]),
    index: 0
  },
  {
    Card: new Card("diamonds", 6, true),
    // CardUrl: cardUrls[1],
    CardStyle: checkhit(isHited[1]),
    index: 1
  },
  {
    Card: new Card("spades", 2, true),
    // CardUrl: cardUrls[2],
    CardStyle: checkhit(isHited[2]),
    index: 2
  },
  {
    Card: new Card("hearts", 7, true),
    // CardUrl: cardUrls[3],
    CardStyle: checkhit(isHited[3]),
    index:3
  },
  {
    Card: new Card("clubs", 13, true),
    // CardUrl: cardUrls[4],
    CardStyle: checkhit(isHited[4]),
    index:4
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
  let cardStyle = (status ? "isHited" : "unHited") + " " + "oneCard";
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
.oneCard img {
  width: 100%;
}

.oneCard {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  width: 200px;
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.616);
}

.oneCard:hover {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  width: 220px;
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.616);
  filter: brightness(1.3) contrast(130%);
  transition: 0.3s;
}

.isHited {
  animation: 3s infinite alternate slidein;
}

/* @keyframes dropdown {
  from {
    top: 0;
  }
  to {
    bottom: 200px;
  }
} */
</style>

