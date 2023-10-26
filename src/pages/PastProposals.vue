<script setup lang="ts">
import Proposal from './../components/Proposal.vue';
</script>

<template id="PastProposals">
  <v-container fluid>
    <v-row dense>
      <v-col v-for="n in 4" :key="n" cols="12">
        <Proposal proposal_name="name" proposal_description="description" :over=true></Proposal>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
