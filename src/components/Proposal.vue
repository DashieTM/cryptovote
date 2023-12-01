<script setup lang="ts">
import { vote } from '../lib/api.js';
import { ref, onMounted } from 'vue';

const props = defineProps({
  proposal_name: String,
  vote_count: Number,
  address: String,
  index: Number,
  can_vote: Boolean,
  is_ballot: Boolean,
});

const emit = defineEmits(["proposalUpdate"]);

const voteAvailable = ref(true);

onMounted(() => {
  emit("proposalUpdate");
});

const voteForProposal = () => {
  voteAvailable.value = false;
  vote(props.address, props.index).then((success: boolean) => {
    if (!success) {
      voteAvailable.value = true;
    }
  });
};
</script>

<template id="Proposal">

  <v-card class="Vote" color="secondary">

    <v-card-title class="title ml-2">{{ proposal_name }}</v-card-title>

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
