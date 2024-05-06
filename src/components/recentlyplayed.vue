<template>
  <div class="scroll-container">
    <button class="scroll-arrow left-arrow" @click="scrollLeft">&#9664;</button>
    <div class="contain-recents" ref="scrollContainer">
      <ul v-if="AmpRecents && AmpRecents.length">
        <li v-for="item in AmpRecents" :key="item.id" class="recent-item">
          <router-link :to="`/am/album/${item.id}`">
            <div class="recent-item-image">
              <img
                v-if="item.attributes && item.attributes.artwork"
                :src="item.attributes.artwork.url"
                :alt="`Artwork for ${item.attributes.name}`"
              />
            </div>
            <div class="recent-item-info">
              <div class="recent-item-title">{{ item.attributes.name }}</div>
              <div class="recent-item-artist">
                {{ item.attributes.artistName }}
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <button class="scroll-arrow right-arrow" @click="scrollRight">
      &#9654;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { Recents } from './api/recentlyplayed';

interface RecentItem {
  id: string;
  type: string;
  href: string;
  attributes: {
    name: string;
    artistName: string;
    artwork: {
      url: string;
    };
  };
}

export default defineComponent({
  name: 'RecentlyPlayed',

  setup() {
    const AmpRecents: Ref<RecentItem[] | null> = ref(null);
    const scrollContainer = ref<HTMLElement | null>(null);

    onMounted(async () => {
      AmpRecents.value = await Recents();
    });

    const scrollLeft = () => {
      if (scrollContainer.value) {
        const scrollAmount = 500;
        scrollContainer.value.scrollLeft -= scrollAmount;
      }
    };

    const scrollRight = () => {
      if (scrollContainer.value) {
        const scrollAmount = 500;
        scrollContainer.value.scrollLeft += scrollAmount;
      }
    };

    return {
      AmpRecents,
      scrollLeft,
      scrollRight,
      scrollContainer,
    };
  },
});
</script>
