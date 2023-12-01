<script setup lang="ts">
import { ref } from 'vue';
import { connectMetaMaskAccount } from '../lib/api';
import { useTheme } from 'vuetify'

// TODO: remove
// import { useNotification } from '@kyvg/vue3-notification';

// const { notify } = useNotification();

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
      <!-- <v-btn icon="mdi-test-tube" @click="() => notify({title: 'Test'})"></v-btn> TODO: remove -->
      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
      <v-btn icon="$vuetify" @click="connectMetaMaskAccount"></v-btn>
    </div>
  </VAppBar>

  <VNavigationDrawer v-model="navigation" location="left" color="background">
    <VList>
      <VListItem title="Home" to="/"></VListItem>
      <VListItem title="Ballots" to="/Ballots"></VListItem>
      <VListItem title="Create New Ballot" to="/NewBallot"></VListItem>
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
