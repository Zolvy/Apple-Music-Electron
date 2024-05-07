<template>
  <div class="settings-container">
    <h5>Settings</h5>
    <form>
      <p>Username</p>
      <input class="input-misc" type="text" v-model="username" />
    </form>
    <div
      style="
        display: flex;
        flex-direction: column;
        width: 35vh;
        height: 50px;
        gap: 30px;
      "
    >
      <q-btn style="background-color: var(--system-Red)" v-on:click="signOut"
        >Sign Out</q-btn
      >
      <q-btn
        v-on:click="discord"
        style="background-color: #7289da; color: white; flex-grow: 1"
      >
        Join Discord
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useSettingsStore } from '../stores/settings';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const settingsStore = useSettingsStore();
    const username = ref(settingsStore.username);

    watch(username, (newValue) => {
      settingsStore.username = newValue;
      settingsStore.saveState();
    });

    settingsStore.loadState();

    function signOut() {
      localStorage.removeItem('music.ampwebplay.media-user-token');
      router.replace('/');
    }

    function discord() {
      const discordUrl = 'https://discord.gg/d7VacZnMUq';
      const newWindow = window.open(discordUrl, '_blank');
      setTimeout(() => {
        if (newWindow) {
          newWindow.close();
        }
      }, 1000);
    }

    return { username, signOut, discord };
  },
});
</script>
