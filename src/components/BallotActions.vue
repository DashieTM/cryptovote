<template>
    <v-menu v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="menu-btn" icon="mdi-pen-plus" color="primary" v-bind="props"/>
        </template>
        <v-card color="primary" min-width="500">
            <v-text-field class="ma-2" v-model="targetAdress" :rules="address_rule" label="Target address"/>
            <div class="actions ma-2">
                <v-btn>Delegate vote</v-btn>
                <v-btn>Give right to vote</v-btn>
            </div>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({ ballot_address: String });

const loadingDelegate = ref(true);
const loadingGiveRightToVote = ref(true);
const menu = ref(false);
const targetAdress = ref('');

const address_rule = [
  (value: String) => {
    if (!value) {
      return true;
    } else {
      const regex = /^0x[a-fA-F0-9]{40}$/;
      if (regex.test(String(value))) return true;
      return 'This address is not in a valid format';
    }
  }
];

</script>

<style scoped>
    .menu-btn {
        margin-right: 1rem;
        align-self: center;
    }

    .actions {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }
</style>