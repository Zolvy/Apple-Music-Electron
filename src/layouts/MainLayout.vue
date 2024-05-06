<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="q-electron-drag"
      style="
        height: 40px;
        display: flex;
        align-items: center;
        font-family:
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          'Open Sans',
          'Helvetica Neue',
          sans-serif;
        background-color: transparent;
      "
    >
      <q-toolbar>
        <q-toolbar-title> Apple Music Electron </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-toolbar__title {
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
