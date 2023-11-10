<script setup lang="ts">
  import { connectMetaMaskAccount, getBalance, hasAccountPermissions, createProposal, getProposals, resetBallot } from '../lib/api.js';
</script>

<template id="Home">
  <h1>Whatever</h1>
  <v-btn @click="connectMetaMaskAccount">Connect to metamask</v-btn>
  <v-btn @click="() => console.log(hasAccountPermissions())">Has Account Permissions</v-btn>
  <v-btn @click="getBalance">Get balance</v-btn>
  <v-btn @click="() => createProposal('Test')">Create Proposal 'Test'</v-btn>
  <v-btn @click="getProposals">Get Proposal</v-btn>
  <v-btn @click="resetBallot">Reset Ballot</v-btn>
</template>

<style scoped></style>
