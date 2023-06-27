<script setup>
import { RouterView } from 'vue-router'
import Header from './components/headers/Header.vue';
import notificationSnackbar from './components/modals/notificationSnackbar.vue';
</script>

<template>
  <header>
    <Header/>
  </header>
  <RouterView class="overflow-hidden" />
</template>