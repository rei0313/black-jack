<template>
  <!-- <img :src="dealercard.imgPath" :class="dealercard.style" class="oneCard" /> -->
  <div class="card" :class="{ 'face-down': dealercard.isFaceDown }" >
    <div class="front">
      <img :src="dealercard.imgPath" :class="dealercard.style" class="oneCard" />
    </div>
    <div class="back">
      <img src="/public/assets/Cards/back.png" :class="dealercard.style" class="oneCard" />
    </div>
	</div>
</template>

<script setup lang="ts">

import { Card } from "../../../model/Card";
import { defineProps } from "vue";

defineProps<{ dealercard: Card }>()


</script>

<style scoped>
.card {
  /* justify-items: center; */
	position: relative;
  margin: 0 5rem;
}
.card .front, .card .back {
	border-radius: 0.75rem;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	backface-visibility: hidden;
	transition: transform 0.5s;
	transform-style: preserve-3d;
}
.card .top-corner {
	position: absolute;
	text-align: center;
	top: 0.5rem;
	left: 0.5rem;
	width: 3rem;
	height: 6.1rem;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	align-items: stretch;
}
.card .back {
	transform: rotateY(-180deg);
}
.card.face-down .back {
	transform: rotateY(0deg);
}
.card.face-down .front {
	transform: rotateY(180deg);
}



.oneCard img {
  max-height: 100%;  
    max-width: 100%; 
    width: auto;
    height: auto;
    position: absolute;  
    top: 0;  
    bottom: 0;  
    left: 0;  
    right: 0;  
    margin: auto;
  
}

.oneCard {
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 160px;
  
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.616);
}

.oneCard:hover {
  width: 220px;
  filter: brightness(1.3) contrast(130%);
  transition: 0.3s;
}


.isHited {
  animation-name: dropdown;
}


</style>

