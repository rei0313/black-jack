

<template>
  <GameField />
</template>

<script setup lang="ts">
import GameField from "./GameField/GameField.vue";
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
</style>
