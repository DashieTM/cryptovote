<script setup lang="ts">
import { ref } from 'vue';
import { showWalletWindow } from '../lib/api';

const navigation = ref(false);
</script>

<template id="Navigation">
  <VAppBar rounded>
    <VAppBarNavIcon @click.stop="navigation = !navigation" />
    <VAppBarTitle>CryptoScam</VAppBarTitle>
    <VSpacer />
    <v-btn icon="$vuetify" @click="showWalletWindow"></v-btn>
  </VAppBar>

  <VNavigationDrawer v-model="navigation" location="left" color="background">
    <VList>
      <VListItem title="Home" to="/"></VListItem>
      <VListItem title="Ballots" to="/Ballots"></VListItem>
      <VListItem title="Current Proposals" to="/CurrentProposals"></VListItem>
      <VListItem title="Create New Proposal" to="/NewProposal"></VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style scoped></style>
