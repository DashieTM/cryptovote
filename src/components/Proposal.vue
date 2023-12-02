<script setup lang="ts">
import { vote, hasRightToVote, hasVoted } from '../lib/api.js';
import { ref, onMounted, watch } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';

import Loading from '../components/Loading.vue';

const { notify } = useNotification();

const props = defineProps({
  proposal_name: String,
  vote_count: Number,
  ballot_address: String,
  index: Number,
  ballotArray: ref<BallotType[]>,
});

const emit = defineEmits(["proposalUpdate"]);

const loading = ref(false);
const canVote = ref(false);

watch(props.ballotArray, (old, newValue) => {
  checkVotePermission();
});

onMounted(() => {
  checkVotePermission();
  emit("proposalUpdate");
});

async function checkVotePermission() {
  loading.value = true;
  
  const hasVotePermission = await hasRightToVote(props.ballot_address);
  const hasAlreadyVoted = await hasVoted(props.ballot_address);

  if (hasVotePermission && !hasAlreadyVoted) {
    canVote.value = true;
  } else {
    canVote.value = false;
  }

  loading.value = false;
}

async function voteForProposal() {
  loading.value = true;
  vote(props.ballot_address, props.index).then((success: boolean) => {
    if (success) {
      notify({
          text: `Successfully voted`,
          type: 'success'
        });
    } else {
      notify({
          text: 'Could not vote',
          type: 'error'
        });
    }
    loading.value = false;
  });
};
</script>

<template id="Proposal">

  <v-card class="Vote" color="secondary">

    <v-card-title class="title ml-2">{{ proposal_name }}</v-card-title>

    <VSpacer/>

    <v-card-actions>

      <v-card-text class="Description">{{ vote_count }}</v-card-text>

      <div class="Vote">
        <VBtn class="VoteButton" :disabled="!canVote" @click="() => voteForProposal()">
          <Loading v-if="loading" :size="25" :color="'primary'"/>
          <div v-else>VOTE</div>
        </VBtn>
      </div>

    </v-card-actions>

  </v-card>

</template>

<style scoped>
@media (max-width: 400px) {
  .Vote {
    flex-direction: column !important;
  }
}

.Vote {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 5rem;
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
