<template>
  <div class="oneCard">
    <img :src="cardUrl" />
  </div>
</template>


<script setup lang="ts">
import { Card } from "../../../model/Card";

// const fs = require('fs');
let testCard = new Card("hearts", 13, true);
let cardUrl = $ref(getCardUrl(testCard));
// let isHited = $ref(testCard.isHited); ->再想一下怎麼綁...基本的別忘...

//new one card. only for test, this should be writted in sercie

function getCardUrl(card: Card) {
  console.log(testCard.number + " " + testCard.symbol);
  let filename: String = "";

  switch (card.symbol) {
    case "clubs":
      filename = "c" + testCard.number;
      break;
    case "diamonds":
      filename = "d" + testCard.number;
      break;
    case "hearts":
      filename = "h" + testCard.number;
      break;
    case "spades":
      filename = "s" + testCard.number;
      break;
    default:
      console.log(`END`);
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

</style>

