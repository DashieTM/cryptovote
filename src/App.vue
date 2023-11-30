<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
import Snackbar from "./components/Snackbar.vue";
import { useSnackbar } from "./composables/useSnackbar";

const { snackbar } = useSnackbar();

</script>

<template>
  <VApp>
    <Navigation/>
    <v-main class="body">
      <router-view></router-view>
      <Snackbar v-if="snackbar"/>
    </v-main>
    <VFooter>2023 CryptoScam</VFooter>
  </VApp>
</template>

<style scoped>
.body {
  height: 95%;
}
</style>
