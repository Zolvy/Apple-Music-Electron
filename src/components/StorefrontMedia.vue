<template>
  <div class="scroll-container">
    <button class="scroll-arrow left-arrow" @click="scrollLeft">&#9664;</button>
    <div class="contain-recents" ref="scrollContainer">
      <ul v-if="AmpSf && AmpSf.length">
        <li v-for="item in AmpSf" :key="item.id" class="recent-item">
          <router-link :to="`/am/album/${item.id}`">
            <div class="recent-item-image">
              <img
                v-if="
                  item.relationships &&
                  item.relationships.contents &&
                  item.relationships.contents.data &&
                  item.relationships.contents.data[0] &&
                  item.relationships.contents.data[0].attributes &&
                  item.relationships.contents.data[0].attributes.artwork
                "
                :src="
                  item.relationships.contents.data[0].attributes.artwork.url
                "
                :alt="`Artwork for ${item.attributes.title.stringForDisplay}`"
              />
            </div>
            <div class="recent-item-info">
              <div class="recent-item-title">
                {{ item.attributes.title.stringForDisplay }}
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
import { defineComponent, onMounted, ref } from 'vue';
import { Recommend } from './api/storefront';

interface ArtworkAttributes {
  url: string;
}

interface ContentsData {
  attributes: {
    artwork: ArtworkAttributes;
  };
}

interface ContentsRelationship {
  data: ContentsData[];
}

interface RecentItem {
  id: string;
  type: string;
  attributes: {
    title: {
      stringForDisplay: string;
    };
  };
  relationships: {
    contents: ContentsRelationship;
  };
}

export default defineComponent({
  setup() {
    const AmpSf = ref<RecentItem[]>([]);
    const scrollContainer = ref<HTMLDivElement | null>(null);

    const scrollLeft = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollLeft -= 200;
      }
    };

    const scrollRight = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollLeft += 200;
      }
    };

    onMounted(async () => {
      AmpSf.value = await Recommend();
    });

    return {
      AmpSf,
      scrollContainer,
      scrollLeft,
      scrollRight,
    };
  },
});
</script>
