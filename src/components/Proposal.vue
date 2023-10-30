<script setup lang="ts">
// import { ref } from "vue";

// defineProps(["proposal_name", "proposal_description", "address", "over"]);
defineProps({
  proposal_name: String,
  proposal_description: String,
  address: Number,
  over: Boolean,
});
</script>

<template id="Proposal">
  <v-card class="Vote">
    <v-card-title>{{ proposal_name }}</v-card-title>
    <v-card-text class="Description">{{ proposal_description }}</v-card-text>
    <v-card-actions>
      <VBtn class="VoteButton">Show Contract</VBtn>
      <VSpacer></VSpacer>
      <div class="Vote" v-if="over == false">
        <v-radio-group class="VoteRow">
          <VRadio label="Accept" :value="true" class="Selection" />
          <VRadio label="Decline" :value="false" class="Selection" />
        </v-radio-group>
        <VBtn class="VoteButton">Vote</VBtn>
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
