<script lang="ts">
export default {
  data: () => ({
    valid: false,
    proposal_name: "",
    proposal_description: "",
    name_rule: [
      (value: String) => {
        if (value) return true;
        return "Please enter a proposal name";
      },
    ],
    address: 0,
    // should later be some cryptoscamaddress
  }),
};
</script>

<template id="NewProposal">
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <!-- is this better or the one from the proposals? -->
        <v-col cols="12" md="10" lg="8">
          <v-text-field v-model="proposal_name" :rules="name_rule" label="Proposal Name" required
            hide-details></v-text-field>
        </v-col>
        <v-col cols="12" md="10" lg="8">
          <v-textarea v-model="proposal_description" label="Proposal Description" hide-details></v-textarea>
        </v-col>
        <v-col cols="12" md="10" lg="8">
          <v-text-field v-model="address" label="Proposal Address" required hide-details></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<!-- integrate this with the contract-->

<style scoped></style>
