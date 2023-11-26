<script setup lang="ts">
import {ref} from 'vue'; 

const navigation = ref(false);
</script>

<template id="Navigation">
    <VAppBar rounded>
          <VAppBarNavIcon @click.stop="navigation = !navigation"/>
          <VAppBarTitle>CryptoScam</VAppBarTitle>
          <VSpacer/>
          <VIcon icon="mdi-wallet" class="Icon"></VIcon>
    </VAppBar>

    <VNavigationDrawer v-model="navigation" location="left" color="background">
        <VList>
            <VListItem title="Home" to="/"></VListItem>
            <VListItem title="Past Proposals" to="/PastProposals"></VListItem>
            <VListItem title="Current Proposals" to="/CurrentProposals"></VListItem>
            <VListItem title="Create New Proposal" to="/NewProposal"></VListItem>
        </VList>
    </VNavigationDrawer>
</template>

<style scoped>
.Icon {
  margin: 0rem 1rem 0rem 0rem;
}
</style>
