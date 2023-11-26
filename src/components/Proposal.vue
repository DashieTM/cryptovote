<script lang="ts">
import { vote } from '../lib/api.js';
export default {
  data() {
    return {}
  },
  setup(_, ctx) {
    ctx.emit("proposalUpdate");
    return {
      vote,
    }
  },
  props: {
    proposal_name: String,
    vote_count: BigInt,
    address: String,
    index: Number,
    can_vote: Boolean,
    is_ballot: Boolean,
  },
  emits: ["proposalUpdate"],
  methods: {
    voteForProposal() {
      this.vote_available = false;
      vote(this.address, this.index).then((success: boolean) => {
        if (!success) {
          this.vote_available = true;
        }
      });
    }
  }

}
</script>

<template id="Proposal">
  <v-card class="Vote">
    <v-card-title class="title">{{ proposal_name }}</v-card-title>
    <VSpacer></VSpacer>
    <v-card-actions>
    <v-card-text class="Description">{{ vote_count }}</v-card-text>
      <div class="Vote" v-if="can_vote">
        <VBtn class="VoteButton" @click="() => voteForProposal()">Vote</VBtn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.Vote {
  display: flex;
  flex-direction: row;
}

.title {
  font-size: 3vh;
}

.Description {
  padding: 0px 3vh 0px 0px;
  font-size: 2vh;
}

.VoteButton {
  align-self: center;
  font-size: 2vh;
}
</style>
