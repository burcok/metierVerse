<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/headers/Header.vue';
</script>

<template>
  <header>
    <Header/>
  </header>
  <RouterView />
</template>