<script setup lang="ts">
import { ref } from 'vue';
import { showWalletWindow } from '../lib/api';
import { useTheme } from 'vuetify'

const navigation = ref(false);
const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'tokyoNight'
}
</script>

<template id="Navigation">
  <VAppBar rounded>
    <div class="start-box">
      <VAppBarNavIcon @click.stop="navigation = !navigation" />
      <VAppBarTitle>CryptoScam</VAppBarTitle>
    </div>
    <div class="end-box">
      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
      <v-btn icon="$vuetify" @click="showWalletWindow"></v-btn>
    </div>
  </VAppBar>

  <VNavigationDrawer v-model="navigation" location="left" color="background">
    <VList>
      <VListItem title="Home" to="/"></VListItem>
      <VListItem title="Ballots" to="/Ballots"></VListItem>
      <VListItem title="Create New Proposal" to="/NewProposal"></VListItem>
      <VListItem title="Audit" to="/Audit"></VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style scoped>
.start-box {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-grow: 3;
}

.end-box {
  display: flex;
  justify-items: flex-end;
}
</style>
