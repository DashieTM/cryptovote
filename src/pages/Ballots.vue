<script lang="ts">
import Proposal from './../components/Proposal.vue';
import { getBallots, getProposals } from './../lib/api.js';
import { BallotType } from './../lib/types.ts';
export default {
  setup() {
    return {
      getBallots,
    }
  },
  data() {
    return {
      fetching: true,
      ballots: null,
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchProposals())
  },
  methods: {
    fetchProposals() {
      let ballotsArray: BallotType[] = [];
      let done: number = 0;
      getBallots().then((data) => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          getProposals(element.address).then((proposals) => {
            ballotsArray.push({
              name: element.name,
              address: element.address,
              proposals: proposals,
            });
            done += 1;
            if (done == data.length) {
              this.fetching = false;
              this.ballots = ballotsArray;
            }
          })
        }
      })
    }
  },
  props: {},
  components: {
    Proposal,
  }
}
</script>

<template id="Ballots">
  <div v-if="fetching" class="loading">Loading...</div>
  <v-container v-else="" class="ballots" fluid>
    <v-card v-for="(ballot) in ballots" :key="ballot" cols="12" class="ballot">
      <div class="title">{{ ballot.name }}</div>
      <div v-for="(proposal, index) in ballot.proposals" :key="proposal" cols="12">
        <Proposal class="proposal" :proposal_name="proposal.name" :address="ballot.address" :vote_count="proposal.voteCount" :index="index"
          proposal_description="description" :can_vote="true"></Proposal>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.title {
  font-size: 3rem;
  margin-left: 2rem;
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
