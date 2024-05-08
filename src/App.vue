<template>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-content">
      <img src="../src-electron/icons/icon.png" alt="Loading" />
    </div>
  </div>
  <router-view v-else />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSettingsStore } from './stores/settings';

let version = 'AME Version: PA0.0.1';
const isLoading = ref(true);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  console.log(version);
  const checkInterval = setInterval(checkForTokenAndRedirect, 1000);
  setTimeout(() => {
    isLoading.value = false; // Hide loading screen
    const token = localStorage.getItem('music.ampwebplay.media-user-token');
    if (token) {
      router.push('/am/home');
    } else {
      router.push('/');
    }
  }, 5000); // Wait 5000ms before checking the token and routing

  onUnmounted(() => {
    clearInterval(checkInterval);
  });

  const settingsStore = useSettingsStore();
  settingsStore.loadState();
});

function checkForTokenAndRedirect() {
  if (route.path === '/') {
    const token = localStorage.getItem('music.ampwebplay.media-user-token');
    if (token) {
      console.log('Token found: ', token);
    } else {
      console.log('Token not found');
    }
  }
}

defineOptions({
  name: 'App',
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.loading-content {
  text-align: center;
}

.loading-content img {
  max-width: 100px;
  height: auto;
  display: block;
  margin: 0 auto 20px;
}
</style>
