<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import Header from './components/headers/Header.vue';
import notificationComponent from './components/containers/notification/notificationComponent.vue';
const notificationData = ref()
const isNotificationFunction = (data) => {
  notificationData.value = data
}
</script>

<template>
  <div>
    <header>
      <Header/>
    </header>
    <div>
      <RouterView @isNotification="isNotificationFunction" class="overflow-hidden" />
    </div>
    <notificationComponent :isNotificationFunction="notificationData" />
  </div>
</template>