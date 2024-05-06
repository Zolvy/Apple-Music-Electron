<template>
  <div class="album-page" v-if="AmpAlbum && AmpAlbum.length">
    <div class="album-section">
      <img
        class="album-art"
        :src="AmpAlbum[0]?.attributes?.artwork?.url"
        :alt="`Artwork for ${AmpAlbum[0]?.attributes?.artistName || 'Unknown Artist'}`"
      />
      <div class="album-details">
        <h1 class="album-title">{{ AmpAlbum[0]?.attributes?.name }}</h1>
        <p class="artist-name">{{ AmpAlbum[0]?.attributes?.artistName }}</p>
        <div class="album-controls">
          <button class="play-btn">Play</button>
          <button class="shuffle-btn">Shuffle</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { AlbumCatalog } from './api/album';

interface Artwork {
  url: string;
}

interface AlbumAttributes {
  artistName?: string;
  artwork?: Artwork;
  name: string;
  releaseDate: string;
}

interface Album {
  id: string;
  attributes: AlbumAttributes;
}

export default defineComponent({
  name: 'AlbumInfo',
  setup() {
    const AmpAlbum: Ref<Album[] | null> = ref(null);

    onMounted(async () => {
      AmpAlbum.value = await AlbumCatalog();
    });

    return {
      AmpAlbum,
    };
  },
});
</script>
