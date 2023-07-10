<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Header from './components/headers/Header.vue';
import notificationComponent from './components/containers/notification/notificationComponent.vue';
import { isUserLoggedIn } from './utils/isUserLoggedIn.js';

const notificationData = ref();
const loading = ref(true);
const currentUserData = ref();

const isNotificationFunction = (data) => {
  notificationData.value = data;
};

onMounted(async () => {
  currentUserData.value = await isUserLoggedIn()
  loading.value = false
});
</script>

<template>
  <template v-if="!loading">
    <div>
      <header>
        <Header />
      </header>
      <div>
        <RouterView @isNotification="isNotificationFunction" :currentUserData="currentUserData" class="overflow-hidden" />
      </div>
      <notificationComponent :isNotificationFunction="notificationData" />
    </div>
  </template>
  <template v-else>
    <div>
      Loading...
    </div>
  </template>
</template>