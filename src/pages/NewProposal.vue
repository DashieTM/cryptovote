<script setup lang="ts">
import ProposalEntry from '../components/ProposalEntry.vue';
import { createBallot } from '../lib/api.js';
import { ref } from 'vue';

const valid = ref(false);
const ballot_name = ref("");
const proposal_names: string[] = ref([]);
const voters: string[] = ref([]);
const proposal_count = ref(2);
const voter_count = ref(1);
const name_rule = [
  (value: String) => {
    if (value) return true;
    return "Please enter a ballot name";
  }
];
function addProposal() {
  proposal_count.value += 1;
}
function addVoter() {
  voter_count.value += 1;
}
function submit() {
  // if(!valid) {
  //   console.log("form invalid!");
  //   return;
  // }
  console.log(proposal_names.value)
  createBallot(ballot_name.value, proposal_names.value).then((receipt) => {
    if (!receipt.status) {
      console.log("error bro");
    } else if(!voters.value.empty()){
      for (let voter in voters){
        giveRightToVote(receipt.address, voter);
      }  
    }
    voters.value = [];
    proposal_names.value = [];
    ballot_name.value = "";
    proposal_count.value = 2;
    voter_count.value = 1;

  });
}
</script>

<template v-model="valid" id="NewBallot">
  <v-form v-on:submit.prevent="submit">
    <v-col cols="12" md="10" lg="8">
      <v-text-field v-model="ballot_name" :rules="name_rule" label="Ballot Name" required hide-details></v-text-field>
    </v-col>
    <v-col cols="12" md="10" lg="8">
      <v-btn @click="() => addProposal()">Add Proposal</v-btn>
    </v-col>
    <div v-for="index in proposal_count">
      <v-col cols="12" md="10" lg="8">
        <v-text-field v-model="proposal_names[index-1]" :rules="name_rule" label="Enter a Proposal" required
          hide-details></v-text-field>
      </v-col>
    </div>
    <v-col cols="12" md="10" lg="8">
      <v-btn @click="() => addVoter()">Add Voter</v-btn>
    </v-col>
    <div v-for="index in voter_count">
      <v-col cols="12" md="10" lg="8">
        <v-text-field v-model="voters[index-1]" :rules="name_rule" label="Enter a Voter" required
          hide-details></v-text-field>
      </v-col>
    </div>
    <v-col cols="12" md="10" lg="8">
      <v-btn type="submit">Create Ballot</v-btn>
    </v-col>
  </v-form>
</template>

<style scoped></style>
