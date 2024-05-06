<template>
  <div class="container album-page">
    <AlbumInfo />
  </div>
  <TrackList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AlbumInfo from '../components/AlbumInfo.vue';
import TrackList from '../components/AMPTracklist.vue';
export default defineComponent({
  components: {
    AlbumInfo,
    TrackList,
  },
});
</script>
