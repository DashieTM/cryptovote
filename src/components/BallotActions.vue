<template>
    <v-menu v-model="menu" :close-on-content-click="false">

        <template v-slot:activator="{ props }">
            <v-btn class="menu-btn" icon="mdi-pen-plus" color="primary" v-bind="props" @click="loadRights"/>
        </template>

        <v-card color="primary" min-width="500">

            <v-form v-if="!loading" ref="form">

                <v-text-field class="ma-2" v-model="targetAdress" :rules="address_rule" label="Target address"/>

                <div class="actions ma-2">

                    <v-btn @click="delegateVoteToTarget" :disabled="!canDelegate">
                        <Loading v-if="loadingDelegate" :size="20"/>
                        <div v-else-if="canDelegate">
                            Delegate Vote
                        </div>
                        <div v-else>
                            Can't delegate vote
                        </div>
                    </v-btn>

                    <v-btn @click="giveRightToVoteToTarget" :disabled="!canGiveRightToVote">
                        <Loading v-if="loadingGiveRightToVote" :size="20"/>
                        <div v-else-if="canGiveRightToVote">
                            Give right to vote
                        </div>
                        <div v-else>
                            Can't give right to vote
                        </div>
                    </v-btn>

                </div>

            </v-form>
            <Loading v-else :size="20"/>
            
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { isChairperson, hasRightToVote, hasVoted, delegateVote, giveRightToVote } from '../lib/api'

import Loading from './Loading.vue';

const props = defineProps({ ballot_address: String });

const loading = ref(false);
const loadingDelegate = ref(false);
const canDelegate = ref(false);
const loadingGiveRightToVote = ref(false);
const canGiveRightToVote = ref(false);
const menu = ref(false);
const targetAdress = ref('');
const form = ref(null);

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

async function loadRights() {
    loadingDelegate.value = true;
    loadingGiveRightToVote.value = true;

    hasRightToVote(props.ballot_address).then((hasRightToVote) => {
        if (hasRightToVote) {
            hasVoted(props.ballot_address).then((hasVoted) => {
                canDelegate.value = !hasVoted;
                loadingDelegate.value = false;
            })
        } else {
            canDelegate.value = false;
            loadingDelegate.value = false;
        }
    })

    isChairperson(props.ballot_address).then((isChairperson) => {
        if (isChairperson) {
            canGiveRightToVote.value = true;
        } else {
            canGiveRightToVote.value = false;
        }
        loadingGiveRightToVote.value = false;
    });
}

async function giveRightToVoteToTarget() {
    if (form.value && form.value.validate()) {
        loading.value = true;
        giveRightToVote(props.ballot_address, targetAdress.value).then((success) => {
            if (success) {
                // TODO: implement notification
            } else {
                // TODO: implement notification
            }
            loading.value = false;
        })
    }
}

async function delegateVoteToTarget() {
    if (form.value && form.value.validate()) {
        loading.value = true;
        delegateVote(props.ballot_address, targetAdress.value).then((success) => {
            if (success) {
                // TODO: implement notification
            } else {
                // TODO: implement notification
            }
            loading.value = false;
        })
    }
}

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