<template>
  <img :src="card.CardUrl" :class="card.CardStyle" />
</template>

<script setup lang="ts">

import { Card } from "../../../model/Card";

defineProps<{ card: any }>()


</script>

<style scoped>

.oneCard img {
  width: 100%;
}

.oneCard {
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin: 30px;
  width: 200px;
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.616);
}

.oneCard:hover {
  /* display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px; */
  width: 220px;
  /* box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.616); */
  filter: brightness(1.3) contrast(130%);
  transition: 0.3s;
}

.isHited {
  animation-name: dropdown;
}

@keyframes dropdown {
  from {
    top: 0;
  }
  to {
    bottom: 200px;
  }
}
</style>

