<script setup lang="ts">
import { EventTypes, Event, createEvent } from './../lib/types.ts';
import { ref, onMounted } from 'vue';
onMounted(() => {
  console.log(from_address);
  console.log(on_address);
  console.log(to_address);
});
const event_type = ref(0);
const from_address = ref("");
const on_address = ref("");
const to_address = ref("");
</script>

<template id="EventEntry">
  <v-col v-if="event_type === 0" cols="12" md="10" lg="8">
    {{ from_address }} created the ballot {{ on_address }}
  </v-col>
  <v-col v-if="event_type == 1" cols="12" md="10" lg="8">
    {{ from_address }} voted on ballot {{ on_address }}
  </v-col>
  <v-col v-if="event_type == 2" cols="12" md="10" lg="8">
    {{ from_address }} gave the right to vote on ballot {{ on_address }} to {{ to_address }}
  </v-col>
  <v-col v-if="event_type == 3" cols="12" md="10" lg="8">
    {{ from_address }} delegated their vote on {{ on_address }} to {{ to_address }}
  </v-col>
</template>
