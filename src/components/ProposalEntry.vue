<script lang="ts">
export default {
  data: () => ({
    valid: false,
    name: "",
    name_rule: [
      (value: String) => {
        if (value) return true;
        return "Please enter a ballot name";
      },
    ],
    proposals: null,
  }),
};
</script>
<template>
  <v-col cols="12" md="10" lg="8">
    <v-text-field v-model="name" :rules="name_rule" label="Enter a Proposal" required hide-details></v-text-field>
  </v-col>
</template>
