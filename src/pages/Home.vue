<script setup lang="ts">
import { connectMetaMaskAccount, getBalance,getLogs, getLogsOfBallot, hasAccountPermissions, createBallot, getBallots, giveRightToVote, vote, delegateVote, getProposals, getWinningProposal } from '../lib/api.js';
import { ref, onMounted } from 'vue';
const balance: Number = ref(0);
onMounted(() => {
  getBalance().then((new_balance: number) => {
    if (new_balance === -1) {
      connectMetaMaskAccount();
      return;
    }
    balance.value = Number(new_balance).toPrecision(4);
  });
});
</script>

<template id="Home">
  <v-card class="home">
    <h1>Welcome to CryptoScam</h1>
    <h2>Your favorite site for a pump and dump.</h2>
    <span class="mdi mdi-ethereum"></span>
    <div class="text">Your current balance to waste</div>
    <div class="balance">{{ balance }}</div>
    <v-btn
      @click="() => giveRightToVote('0xd6B29D8aa6EF02545141FA8366cA864aC53e8Cc6', '0x189794Ed416b5065375e8A648F25Ac01Adaee240')">Give
      right to vote to Voter 1 on ballot FirstBallot</v-btn>
    <!-- <v-btn @click="() => getLogsOfBallot('')"> -->
    <!--   getpastballot</v-btn> -->
    <v-btn @click="() => getLogs()">
      getpast</v-btn>
  </v-card>
</template>

<style scoped>
h1 {
  margin: 2rem 0rem 2rem 0rem;
}

.home {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.mdi {
  font-size: 20rem;
}

.text {
  font-size: 2.5rem;
}

.balance {
  margin: 1rem 0rem 1rem 0rem;
  font-size: 3.5rem;
}
</style>
