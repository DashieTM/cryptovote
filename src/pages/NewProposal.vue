<script setup lang="ts">
import ProposalEntry from '../components/ProposalEntry.vue';
import { ref } from 'vue';

const valid = ref(false);
const ballot_name = ref("");
const proposals = [
  { 'name': "" },
  { 'name': "" }
];
const name_rule = [
  (value: String) => {
    if (value) return true;
    return "Please enter a ballot name";
  }
];
function createProposal() {
  proposals.push({ 'name': "" });
}
</script>

<template id="NewBallot">
  <v-form v-model="valid">
    <v-col cols="12" md="10" lg="8">
      <v-text-field v-model="ballot_name" :rules="name_rule" label="Ballot Name" required hide-details></v-text-field>
    </v-col>
    <v-col cols="12" md="10" lg="8">
      <v-btn @click="() => createProposal()">Add Proposal</v-btn>
    </v-col>
    <div v-for="(proposal) in proposals">
      <ProposalEntry></ProposalEntry>
    </div>
  </v-form>
</template>

<style scoped></style>
