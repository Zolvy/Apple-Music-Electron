<template>
  <div class="container">
    <h4>Welcome, {{ username }}</h4>
    <Recents></Recents>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useSettingsStore } from '../stores/settings';
import Recents from 'src/components/recentlyplayed.vue';

export default defineComponent({
  name: 'AMHome',
  components: {
    Recents,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const username = ref(settingsStore.username);

    onMounted(async () => {
      console.log('Component is mounted');
    });

    return {
      username,
    };
  },
});
</script>
