<template>
  <div class="container">
    <h4>Browse</h4>
    <StoreFrontBrowse />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StoreFrontBrowse from '../components/StorefrontMedia.vue';

export default defineComponent({
  components: {
    StoreFrontBrowse,
  },
});
</script>
