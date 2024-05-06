<template>
  <div class="settings-container">
    <h5>Settings</h5>
    <form>
      <p>Username</p>
      <input class="input-misc" type="text" v-model="username" />
    </form>
    <q-btn v-on:click="signOut">Sign Out</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useSettingsStore } from '../stores/settings';
import { useRouter } from 'vue-router';

const router = useRouter();

export default defineComponent({
  setup() {
    const settingsStore = useSettingsStore();
    const username = ref(settingsStore.username);

    watch(username, (newValue) => {
      settingsStore.username = newValue;
      settingsStore.saveState();
    });

    settingsStore.loadState();

    function signOut() {
      localStorage.removeItem('media-user-token'); // Remove the token from localStorage
      router.push('/');
    }

    return { username, signOut };
  },
});
</script>

<style scoped></style>
