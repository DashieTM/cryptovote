<script setup lang="ts">
  import { connectMetaMaskAccount, getBalance, hasAccountPermissions, createBallot, getBallots } from '../lib/api.js';
</script>

<template id="Home">
  <h1>Whatever</h1>
  <v-btn @click="connectMetaMaskAccount">Connect to metamask</v-btn>
  <v-btn @click="() => console.log(hasAccountPermissions())">Has Account Permissions</v-btn>
  <v-btn @click="getBalance">Get balance</v-btn>
  <v-btn @click="createBallot(['Proposal1', 'Proposal2', 'Proposal3'])">Create ballot</v-btn>
  <v-btn @click="getBallots">Get all ballots</v-btn>
</template>

<style scoped></style>
