<script setup lang="ts">
  import { connectMetaMaskAccount, getBalance, hasAccountPermissions, createBallot, getBallots, giveRightToVote, vote, delegateVote, getProposals, getWinningProposal } from '../lib/api.js';
</script>

<template id="Home">
  <h1>Whatever</h1>
  <v-btn @click="connectMetaMaskAccount">Connect to metamask</v-btn>
  <v-btn @click="() => console.log(hasAccountPermissions())">Has account permissions</v-btn>
  <v-btn @click="getBalance">Get balance</v-btn>
  <v-btn @click="createBallot('FirstBallot', ['Proposal1', 'Proposal2', 'Proposal3'])">Create ballot FirstBallot</v-btn>
  <v-btn @click="createBallot('thirdballot', ['Proposal1', 'Proposal2', 'Proposal3'])">Create ballot SecondBallot</v-btn>
  <v-btn @click="getBallots">Get ballots</v-btn>
  <v-btn @click="() => giveRightToVote('0xd6B29D8aa6EF02545141FA8366cA864aC53e8Cc6', '0x189794Ed416b5065375e8A648F25Ac01Adaee240')">Give right to vote to Voter 1 on ballot FirstBallot</v-btn>
  <v-btn @click="() => vote('0xd6B29D8aa6EF02545141FA8366cA864aC53e8Cc6', 1)">Vote for proposal 2 in FirstBallot</v-btn>
  <v-btn @click="() => getProposals('0xd6B29D8aa6EF02545141FA8366cA864aC53e8Cc6')">Get proposals of FirstBallot</v-btn>
  <v-btn @click="() => getWinningProposal('0xd6B29D8aa6EF02545141FA8366cA864aC53e8Cc6')">Get winning proposal of FirstBallot</v-btn>
</template>

<style scoped></style>
