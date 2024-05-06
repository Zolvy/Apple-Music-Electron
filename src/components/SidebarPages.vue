<template>
  <div class="SidebarLayout">
    <q-btn
      unelevated
      padding="23px"
      :ripple="false"
      no-caps
      round
      icon="home"
    />
    <q-btn
      unelevated
      padding="23px"
      :ripple="false"
      no-caps
      round
      icon="home"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidebarControls',
});
</script>

<style scoped>
.SidebarControls {
  height: 51px;
  width: 35vh;
  display: flex;
  align-items: center;
}

.q-btn {
  border: none;
}
</style>
