<script setup>
import { computed } from 'vue'
import landingBanner from '../components/containers/landing/landingBanner.vue';

const props = defineProps(['currentUserData'])

// computed property that auto-updates when the prop changes
const normalizedSize = computed(() => props.currentUserData)

console.log(props);
console.log(normalizedSize);
</script>

<template>
  <div v-if="props.currentUserData">
    {{ props.currentUserData }}
  </div>
  <main>
    <landingBanner />
  </main>
</template>
