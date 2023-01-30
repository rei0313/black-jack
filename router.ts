import { createRouter, createWebHistory } from 'vue-router'

import GameField from './src/components/GameField/GameField.vue'


const routes = [
  {
    path: '/',
    name: 'landing',
    component: async () => {
      const top = await import('./src/components/Landing.vue');
      return top;
    }
  },
  {
    path: '/game',
    name: 'game',
    component: async () => {
      const game = await import('./src/components/GameField/GameField.vue');
      return game;
    }
  },
  {
    path: '/rank',
    name: 'ranking',
    component: async () => {
      const rank = await import('./src/components/Ranking.vue');
      return rank;
    }
  },
  {
    path: '/regist',
    name: 'regist',
    component: async () => {
      const regist = await import('./src/components/Regist.vue');
      return regist;
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;