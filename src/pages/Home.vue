<script setup lang="ts">
import { connectMetaMaskAccount, getBalance } from '../lib/api.js';
import { ref, onMounted } from 'vue';
const balance: Number = ref(0);
onMounted(() => {
  getBalance().then((new_balance: number) => {
    if (new_balance === -1) {
      connectMetaMaskAccount();
      return;
    }
    balance.value = Number(new_balance).toPrecision(4);
  });
});
</script>

<template id="Home">
  <div class="home">
    <h1>Welcome to CryptoScam</h1>
    <h2>Your favorite site for a pump and dump.</h2>
    <span class="mdi mdi-ethereum"></span>
    <div class="text">Your current balance to waste</div>
    <div class="balance">{{ balance }} ETH</div>
  </div>
</template>

<style scoped>
h1 {
  margin: 2rem 0rem 2rem 0rem;
}

.home {
  margin: 2rem 0rem 2rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.mdi {
  font-size: 20rem;
}

.text {
  font-size: 2.5rem;
}

.balance {
  margin: 1rem 0rem 1rem 0rem;
  font-size: 3.5rem;
}
</style>
