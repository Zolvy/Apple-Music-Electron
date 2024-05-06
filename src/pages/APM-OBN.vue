<template>
  <div class="bg">
    <q-btn @click="signIn" class="apple-sign-in-button">
      <q-icon name="apple" />
      Sign in with Apple
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignIn',
  methods: {
    signIn() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const electron = (window as any).electron;
      if (electron) {
        electron.send('open-login-window');
      }
    },
  },
});
</script>

<style scoped>
.bg {
  height: 100vh;
  width: 100%;
  /*   background: linear-gradient(-45deg, #fe3b86, #19162f, #620809, #000000);
  animation: gradientBG 10s ease infinite;
  background-size: 400% 400%; */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(80px);
  overflow: hidden;
}
.apple-sign-in-button {
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.7);
  transition: box-shadow 0.3s ease-in-out;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.apple-sign-in-button:hover {
  box-shadow: 0 0 20px 0 rgba(255, 255, 255, 1);
}
</style>
