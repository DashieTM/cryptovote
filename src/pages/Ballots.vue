<script setup lang="ts">
import { ref, onBeforeMount , onBeforeUnmount } from 'vue';

import Proposal from '../components/Proposal.vue';
import Loading from '../components/Loading.vue';
import BallotActions from '../components/BallotActions.vue';

import { getBallots, getProposals, subscribeEvents } from '../lib/api.js';
import { ballotManagerAddress } from '../lib/config.js';
import { BallotType } from '../lib/types.ts';
import { useNotification } from '@kyvg/vue3-notification';


const loading = ref(false);
const ballots = ref<BallotType[] | null>(null);

const { notify } = useNotification();

const funcs = [
  (event) => {
    for(let ballot of ballots.value) {
      if(ballot.address === event.ballotAddress) {
        for(let proposal of ballot.proposals) {
          if(proposal.name === event.proposal) {
            proposal.voteCount += event.weight;
          }
        } 
      }
    }
    notify({
      text: `${event.voter} voted for ${event.proposal} on ballot ${event.ballotAddress}`,
      type: 'event'
    });
  },
  (event) => {
    console.log("vote delegated")
    console.log(event);
    notify({
      text: `${event.delegator} delegated their vote to ${event.recipient} on ballot ${event.ballotAddress}`,
      type: 'event'
    });
  },
  // how to differentiate?
  (event) => {
    console.log("vote given")
    console.log(event);
    notify({
      text: `${event.owner} gave voting rights to ${event.recipient} on ballot ${event.ballotAddress}`,
      type: 'event'
    });
  }
];


let createdFunction = [(event) => {
  console.log(event);
  // TODO create new ballot when this fires
  // TODO subscribe and unsubscribe properly
  subscribeEvents(event.ballotAddress, votedABI, votedFunction);
  subscribeEvents(event.ballotAddress, voteDelegatedABI, voteDelegatedFunction);
  subscribeEvents(event.ballotAddress, voteGivenABI, voteGivenFunction);
}];

onBeforeMount(() => {
  subscribe();
});

onBeforeUnmount(() => {
  unsubscribeAllEvents();
});

async function subscribe() {
  let ballots = await getBallots();
  let addresses: String[] = [];
  for(let ballot of ballots) {
    addresses.push(ballot.address);
  }
  subscribeEvents(addresses, funcs, false);
  subscribeEvents(ballotManagerAddress, createdFunction, true);
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
