<template>
  <div class="q-pa-md" v-if="AmpTrack && AmpTrack.length">
    <q-list dense bordered class="tracklist rounded-borders">
      <q-item
        clickable
        v-ripple
        v-for="(track, index) in AmpTrack[0].relationships.tracks.data"
        :key="index"
        class="track-item"
      >
        <div class="item-content">
          <span class="track-number">{{ index + 1 }}.</span>
          <span class="track-name">{{ track.attributes.name }}</span>
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { AlbumCatalog } from './api/album';

interface Artwork {
  url: string;
}

interface TrackAttributes {
  name: string;
}

interface Track {
  attributes: TrackAttributes;
}

interface AlbumAttributes {
  artistName?: string;
  artwork?: Artwork;
  name: string;
  releaseDate: string;
}

interface AlbumRelationships {
  tracks: {
    data: Track[];
  };
}

interface Album {
  id: string;
  attributes: AlbumAttributes;
  relationships: AlbumRelationships;
}

export default defineComponent({
  name: 'AlbumInfo',
  setup() {
    const AmpTrack: Ref<Album[] | null> = ref(null);

    onMounted(async () => {
      AmpTrack.value = await AlbumCatalog();
    });

    return {
      AmpTrack,
    };
  },
});
</script>
