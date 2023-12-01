<script setup lang="ts">

import { createBallot } from '../lib/api.js';
import { ref } from 'vue';
import { useSnackbar } from '../composables/useSnackbar';

import Loading from '../components/Loading.vue';

const { showSnackbar } = useSnackbar();
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
// const voter_rule = [
//   (value: String) => {
//     if (!value) {
//       return true;
//     } else {
//       const regex = /^0x[a-fA-F0-9]{40}$/;
//       if (regex.test(String(value))) return true;
//       return 'This address is not in a valid format';
//     }
//   }
// ];

function addProposal() {
  proposal_count.value += 1;
}

// function addVoter() {
//   voter_count.value += 1;
// }

async function submit(event) {
  loading.value = true;
  const form = await event;
  
  if (form.valid) {
    createBallot(ballot_name.value, proposal_names.value).then((receipt) => {
      if (!receipt.status) {
        showSnackbar('Ballot was not created due to an error', 'error');
      } else {
        showSnackbar('Ballot was created', 'success');
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
  <Loading v-if="loading"/>
  
  <v-form v-else v-on:submit.prevent="submit" class="form">

    <v-text-field class="input" v-model="ballot_name" :rules="ballot_name_rule" :counter="30" label="Ballot Name" required/>

    <v-btn class="button" @click="() => addProposal()">Add Proposal</v-btn>
    <div v-for="index of proposal_count">
        <v-text-field class="input" v-model="proposal_names[index-1]" :rules="proposal_name_rule" :counter="30" label="Enter a Proposal" required/>
    </div>

    <!-- <v-btn class="button" @click="() => addVoter()">Add Voter</v-btn>
    <div v-for="index in voter_count">
        <v-text-field class="input" v-model="voters[index-1]" :rules="voter_rule" :counter="30" label="Enter a Voter"/>
    </div> -->

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
