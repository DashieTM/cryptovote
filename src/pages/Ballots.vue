<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import Proposal from '../components/Proposal.vue';
import Loading from '../components/Loading.vue';
import BallotActions from '../components/BallotActions.vue';

import { getBallots, getProposals, subscribeEvents, subscribeBallotEvents } from '../lib/api.js';
import { BallotType } from '../lib/types.ts';


const loading = ref(false);
const ballots = ref<BallotType[] | null>(null);
async function globalFunction(event) {
  console.log(event);
  // TODO create new ballot when this fires
  // TODO subscribe and unsubscribe properly
}

async function ballotFunction(event) {
  for(let ballot of ballots.value) {
    if(ballot.address === event.ballotAddress) {
      for(let proposal of ballot.proposals) {
        if(proposal.name === event.proposal) {
          proposal.voteCount += 1n;
        }
      } 
    }
  }
}

function eventListener() {
  subscribeEvents().then((event) => {
    console.log(event);
  });
}

async function fetchProposals() {
  loading.value = true;
  const data = await getBallots();
  let ballotsArray: BallotType[] = [];
  let addresses: String[] = [];
  let done = 0;

  for (const element of data) {
    const proposals = await getProposals(element.address);
    ballotsArray.push({
      name: element.name,
      address: element.address,
      proposals,
    });
    addresses.push(element.address);
    done += 1;
    if (done === data.length) {
      loading.value = false;
      ballots.value = ballotsArray;
    }
  }
  subscribeBallotEvents(addresses, ballotFunction);
  subscribeBallotEvents(globalFunction);
}

onBeforeMount(() => {
  fetchProposals();
});

</script>

<template id="Ballots">
  <Loading v-if="loading" :size="70" class="mt-10"/>

  <div v-else-if="!ballots" class="text-center mt-10">No ballots created yet</div>

  <v-container v-else class="ballots" fluid>

    <v-card v-for="(ballot) in ballots" cols="12" class="ballot">

      <div class="ballot-header">
        <p class="title">{{ ballot.name }}</p>
        <BallotActions :ballot_address="ballot.address"/>
      </div>
      
      <div v-for="(proposal, index) in ballot.proposals" cols="12">

        <Proposal class="proposal"
                  :proposal_name="proposal.name"
                  :ballot_address="ballot.address"
                  :vote_count="proposal.voteCount"
                  :index="index"
                  proposal_description="description"
                  />

      </div>

    </v-card>

  </v-container>
</template>

<style scoped>
.ballot-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.title {
  font-size: 2.5rem;
  margin-left: 1rem;
}

.ballots {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
  overflow-y: scroll;
}

.proposal{
  margin: 1rem;
}

.ballot {
  margin: 1rem;
}
</style>
