<template>
  <div class="contain-img">
    <img
      v-if="profileData && profileData.artwork"
      :src="profileData.artwork.url"
      alt="Profile Artwork"
      class="profile-artwork"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { profile } from './api/social';

export default defineComponent({
  name: 'SoicalProfile',

  setup() {
    const profileData = ref(null);

    onMounted(async () => {
      profileData.value = await profile();
    });
    return {
      profileData,
    };
  },
});
</script>
