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
    vote_count: Number,
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

  <v-card class="Vote" color="secondary">

    <v-card-title class="title">{{ proposal_name }}</v-card-title>

    <VSpacer/>

    <v-card-actions>

      <v-card-text class="Description">{{ vote_count }}</v-card-text>

      <div class="Vote" v-if="can_vote">
        <VBtn class="VoteButton" @click="() => voteForProposal()">Vote</VBtn>
      </div>

    </v-card-actions>

  </v-card>

</template>

<style scoped>
@media (max-width: 700px) {
  .Vote {
    flex-direction: column !important;
  }
}

.Vote {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.title {
  font-size: 1.5rem;
  padding: 0px;
  text-wrap: wrap;
}

.Description {
  padding: 0px 3rem 0px 0px;
  font-size: 1.5rem;
}

.VoteButton {
  align-self: center;
  font-size: 1.2rem;
}
</style>
