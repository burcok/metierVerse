<template>
    <transition name="notification">
        <div v-if="notificationVisible" class="notification-wrapper">
            <notificationSnackbar :message="notificationData.notificationMessage" :type="notificationData.notificationType" />
        </div>
    </transition>
</template>
<script setup>
import notificationSnackbar from '../../modals/notificationSnackbar.vue'
</script>
<script>
export default {
    data() {
        return {
            notificationVisible: false
        };
    },

    props: ['isNotificationFunction'],
    computed: {
        notificationData() {
            return this.isNotificationFunction;
        }
    },
    watch: {
        notificationData(newVal) {
            if (newVal) {
            this.notificationVisible = true;
            setTimeout(() => {
                this.notificationVisible = false;
            }, 5000);
            }
        }
    },


}
</script>

<style>
.notification-wrapper {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
  width: 100%;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease-out;
}

.notification-enter-from,
.notification-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
