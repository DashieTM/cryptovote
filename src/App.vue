<script setup lang="ts">
import Navigation from "./components/Navigation.vue";

</script>

<template>
  <VApp>
    <Navigation/>
    <v-main class="body">
      <router-view></router-view>
    </v-main>
    <notifications/>
    <VFooter>2023 CryptoScam</VFooter>
  </VApp>
</template>

<style scoped>
.body {
  height: 95%;
}
</style>
