<script setup lang="ts">
import { connectMetaMaskAccount, getBalance, hasAccountPermissions, createBallot, getBallots, giveRightToVote, vote, delegateVote, getProposals, getWinningProposal } from '../lib/api.js';
import { ref, onMounted } from 'vue';
const balance = ref(0);
onMounted(() => {
  getBalance().then((new_balance) => {
    if(new_balance === -1) {
      connectMetaMaskAccount();
      return;
    }
    balance.value = new_balance;
  });
});

</script>

<template id="Home">
  <h1>Welcome to CryptoScam</h1>
  <h2>Your favorite site for a pump and dump.</h2>
  <div>Your current balance to waste: {{ balance }}</div>
  <v-btn
    @click="() => giveRightToVote('0xd6B29D8aa6EF02545141FA8366cA864aC53e8Cc6', '0x189794Ed416b5065375e8A648F25Ac01Adaee240')">Give
    right to vote to Voter 1 on ballot FirstBallot</v-btn>
</template>

<style scoped></style>
