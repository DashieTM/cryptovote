<script setup lang="ts">
  import { connectMetaMaskAccount } from '../lib/api';
</script>

<template id="Home">
  <h1>Whatever</h1>
  <v-btn @click="connectMetaMaskAccount">Check connection</v-btn>
</template>

<style scoped></style>
