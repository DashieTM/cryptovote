<script setup lang="ts">
import { EventTypes, createEvent, Event } from './../lib/types.ts';
import { ref, onMounted } from 'vue';

onMounted(() => {
  event_type = createEventType(event.name); 
  
}); 

const event = ref(null);
let event_type = EventTypes.None;
let on_address = "";
let from_address = "";
let to_address = "";

</script>
<template>
  <v-col v-if="event_type = EventTypes.BallotCreatedEvent" cols="12" md="10" lg="8">
    {{ from_address }} created the ballot {{ on_address }}
  </v-col>
  <v-col v-if="event_type = EventTypes.VotedEvent" cols="12" md="10" lg="8">
    {{ from_address }} voted on ballot {{ on_address }}
  </v-col>
  <v-col v-if="event_type = EventTypes.VoteGivenEvent" cols="12" md="10" lg="8">
    {{ from_address }} gave the right to vote on ballot {{ on_address }} to {{ to_address }}
  </v-col>
  <v-col v-if="event_type = EventTypes.VoteDelegatedEvent" cols="12" md="10" lg="8">
    {{ from_address }} delegated their vote on {{ on_address }} to {{ to_address }}
  </v-col>
</template>
