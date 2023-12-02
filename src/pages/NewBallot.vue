<script setup lang="ts">

import { createBallot } from '../lib/api.js';
import { ref } from 'vue';

import Loading from '../components/Loading.vue';
import { useNotification } from '@kyvg/vue3-notification';

const { notify } = useNotification();

const loading = ref(false);
const ballot_name = ref('');
const proposal_names = ref([]);
const proposal_count = ref(2);

const ballot_name_rule = [
  (value: String) => {
    if (value) return true;
    return 'Please enter a ballot name';
  },
  (value: String) => {
    if (value?.length > 30) {
      return 'Name is not allowed to be longer than 30 characters.'
    }
    return true;
  }
];
const proposal_name_rule = [
  (value: String) => {
    if (value) return true;
    return 'Please enter a proposal name';
  },
  (value: String) => {
    if (value?.length > 20) {
      return 'Name is not allowed to be longer than 20 characters.'
    }
    return true;
  }
];

function addProposal() {
  proposal_count.value += 1;
}

async function submit(event) {
  loading.value = true;
  const form = await event;
  
  if (form.valid) {
    createBallot(ballot_name.value, proposal_names.value).then((receipt) => {
      if (!receipt.status) {
        notify({
          text: 'Ballot could not be created due to an error',
          type: 'error'
        });
      } else {
        notify({
          text: 'Ballot successfully created',
          type: 'success'
        });
      }

      proposal_names.value = [];
      ballot_name.value = "";
      proposal_count.value = 2;
      loading.value = false;
      });
  } else {
    loading.value = false;
  }
}
</script>

<template id="NewBallot">
  <Loading v-if="loading" :size="70" :color="'white'" class="mt-10"/>
  
  <v-form v-else v-on:submit.prevent="submit" class="form">

    <v-text-field class="input" v-model="ballot_name" :rules="ballot_name_rule" :counter="30" label="Ballot Name" required/>

    <v-btn class="button" @click="() => addProposal()">Add Proposal</v-btn>
    <div v-for="index of proposal_count">
        <v-text-field class="input" v-model="proposal_names[index-1]" :rules="proposal_name_rule" :counter="30" label="Enter a Proposal" required/>
    </div>

    <v-btn class="button" type="submit">Create Ballot</v-btn>

  </v-form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input {
  margin: 1rem;
}

.button {
  margin: 1rem;
}
</style>
