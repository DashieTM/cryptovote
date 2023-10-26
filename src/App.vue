<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <VApp>
    <Navigation />
    <v-main>
      <router-view></router-view>
    </v-main>
    <VFooter>2023 CryptoScam</VFooter>
  </VApp>
</template>

<style scoped></style>
