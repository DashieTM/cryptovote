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
    vote_available: Boolean,
    is_ballot: Boolean,
  },
  emits: ["proposalUpdate"],
  methods: {
    lol() {
      console.log(this.address);
      console.log(this.index);
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
    <v-card-title>{{ proposal_name }}</v-card-title>
    <v-card-text class="Description">{{ vote_count }}</v-card-text>
    <v-card-actions>
      <VSpacer></VSpacer>
      <div class="Vote" v-if="vote_available">
        <!-- <VBtn class="VoteButton" @click="vote(this.address, this.index)">Vote</VBtn> -->
        <VBtn class="VoteButton" @click="() => lol()">Vote</VBtn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.Vote {
  display: flex;
  flex-direction: row;
}

.Description {
  padding: 15px 0px 15px 0px;
}

.VoteButton {
  align-self: center;
}
</style>
