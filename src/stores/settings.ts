import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    username: '',
  }),
  actions: {
    saveState() {
      localStorage.setItem('settings', JSON.stringify(this.$state));
    },
    loadState() {
      const settings = localStorage.getItem('settings');
      if (settings) {
        this.$state = JSON.parse(settings);
      }
    },
  },
});
