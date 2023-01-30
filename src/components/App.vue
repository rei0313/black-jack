

<template>
  <div>
    <router-view />
    <video autoplay muted loop id="backgroundVedio">
      <source
        src="../../../assets/Free Animation Loop Background_ Pixel Blocks.mp4"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script setup lang="ts">
import GameField from "./GameField/GameField.vue";
import Test from "/test.vue";
import { Card } from "../model/Card";
</script>

<style scoped>
@font-face {
  font-family: "Pixel";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("Pixel"),
    url("../../../assets/font/PixelMplus12-Bold.ttf") format("truetype");
}

#backgroundVedio {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}
</style>
