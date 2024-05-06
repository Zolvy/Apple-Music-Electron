<template>
  <q-layout view="lhh LpR lFf">
    <q-header
      class="q-electron-drag"
      :class="{ 'amp-container': true, 'mac-padding-left': isMac }"
    >
      <q-toolbar>
        <div class="interactions">
          <q-btn v-on:click="pushB" dense flat round icon="chevron_left" />
          <q-btn dv-on:click="pushF" ense flat round icon="chevron_right" />
        </div>
        <q-toolbar-title> </q-toolbar-title>
        <q-space></q-space>
        <div class="amp-endcomps">
          <q-btn v-on:click="gotoSettings" dense flat round icon="settings" />
          <q-space></q-space>
          <SocialProfile></SocialProfile>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="200"
      :class="{ 'amp-sidebar-container': true, 'mac-padding-top': isMac }"
      show-if-above
      side="left"
    >
      <div class="amp-padding">
        <input class="input-search" placeholder="Search" type="text" />
      </div>
      <div class="amp-sidebar-items">
        <q-expansion-item
          dense
          dark
          v-ripple="false"
          label="Apple Music"
          default-opened
        >
          <q-item clickable v-ripple="false" @click="goToHome">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Home</q-item-section>
          </q-item>
          <q-item clickable v-ripple="false" @click="goToBrowse">
            <q-item-section avatar>
              <q-icon name="grid_view" />
            </q-item-section>
            <q-item-section>Browse</q-item-section>
          </q-item>
          <q-item clickable v-ripple="false" @click="goToRadio">
            <q-item-section avatar>
              <q-icon name="travel_explore" />
            </q-item-section>
            <q-item-section>Radio</q-item-section>
          </q-item>
        </q-expansion-item>
      </div>
    </q-drawer>

    <q-footer class="amp-footer">
      <q-toolbar-title>
        <div height-hint class="center-lcd">
          <p>no song is playing</p>
        </div>
      </q-toolbar-title>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defineComponent, onMounted, ref } from 'vue';
import { Platform } from 'quasar';
import SocialProfile from '../components/ProfileDropdown.vue';
export default defineComponent({
  components: {
    SocialProfile,
  },
  name: 'MyLayout',
  setup() {
    const isMac = ref(Platform.is.mac);
    onMounted(async () => {
      console.info('Loaded Layout');
      console.log('Is running on macOS:', isMac.value);
    });

    return { isMac };
  },
  methods: {
    gotoSettings() {
      this.$router.push({ path: '/am/settings' });
    },
    pushB() {
      return this.$router.back();
    },
    pushF() {
      return this.$router.forward();
    },
    goToHome() {
      this.$router.push({ path: '/am/home' });
    },
    goToBrowse() {
      this.$router.push({ path: '/am/browse' });
    },
    goToRadio() {
      this.$router.push({ path: '/am/radio' });
    },
  },
});
</script>

<style scoped>
.q-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.q-expansion-item .q-item {
  height: 50px;
}

.mac-padding-top {
  padding-top: 60px;
}

.mac-padding-left {
  padding-left: 10px;
}
</style>
