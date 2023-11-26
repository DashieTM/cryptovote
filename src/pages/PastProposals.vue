<script lang="ts">
import Proposal from './../components/Proposal.vue';
import { getBallots } from './../lib/api.js';
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
      getBallots().then((data) => {
        this.fetching = false;
        this.ballots = data;
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
  <v-container fluid>
    <v-row dense>
      <div v-if="fetching" class="loading">Loading...</div>
      <div v-else="" class="loading">
        <v-col v-for="(n) in ballots" :key="n" cols="12">
          <Proposal :proposal_name="n.name" proposal_description="description" :vote_available=true :key="n.id"></Proposal>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<style scoped></style>
