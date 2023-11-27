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
  <div v-else="" class="ballots">
    <v-card v-for="(ballot) in ballots" :key="ballot" cols="12" class="ballot">
      <div class="title">{{ ballot.name }}</div>
      <div v-for="(proposal, index) in ballot.proposals" :key="proposal" cols="12">
        <Proposal class="proposal" :proposal_name="proposal.name" :address="ballot.address" :vote_count="proposal.voteCount" :index="index"
          proposal_description="description" :can_vote="true"></Proposal>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.title {
  font-size: 4vh;
  margin-left: 2vh;
}

.ballots {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.proposal{
  margin: 2vh;
}

.ballot {
  margin: 1vh;
}
</style>