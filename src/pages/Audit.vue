<script setup lang="ts">
import Proposal from './../components/Proposal.vue';
import { getBallots, getLogsOfBallot, getLogs } from './../lib/api.js';
import { createEvent, Event } from './../lib/types.ts';
import { ref, onMounted } from 'vue';
import EventEntry from '../components/EventEntry.vue';

const done = ref(0);
const ballotsArray = ref([]);
const ballotEvents = ref([]);

onMounted(() => {
  setup();
});

function setup() {
  getLogs().then((events) => {
    for (let event of events) {
      ballotEvents.value.push(createEvent(event));
    }
  });
  getBallots().then((data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      getLogsOfBallot(element.address).then((events) => {
        let eventArray = [];
        if (events.length !== 0) {
          for (let event of events) {
            eventArray.push(createEvent(event));
          }
        }
        console.log(eventArray);
        ballotsArray.value.push({
          name: element.name,
          events: eventArray,
        });
        done.value += 1;
        if (done == data.length) {
          this.fetching = false;
          this.ballots = ballotsArray;
        }
      })
    }
  });
}
</script>

<template id="Audit">
  <v-container class="container" fluid>
    <v-col cols="12">
      <v-card>
        <div class="entry">Ballot Manager</div>
        <div v-if="ballotEvents.length === 0">
          <div class="text">No Events</div>
        </div>
        <div v-for="event in ballotEvents" class="events">
          <EventEntry :event_type="Number(event.type)" :from_address="event.from_address" :on_address="event.on_address"
            :to_address="event.to_address"></EventEntry>
        </div>
      </v-card>
    </v-col>
    <div class="ballot">
      Ballot Events
    </div>
    <v-col v-for="n in ballotsArray" cols="12">
      <v-card>
        <div class="entry">{{ n.name }}</div>
        <div v-if="n.events.length === 0">
          <div class="text">No Events</div>
        </div>
        <div class="events" v-for="event in n.events">
          <EventEntry :event_type="Number(event.type)" :from_address="event.from_address" :on_address="event.on_address"
            :to_address="event.to_address"></EventEntry>
        </div>
      </v-card>
    </v-col>
  </v-container>
</template>

<style scoped>
.ballot {
  font-size: 2rem;
  margin: 1rem;
}

.entry {
  font-size: 1.5rem;
  margin: 1rem;
}

.container {
  margin-bottom: 2rem;
}

.text {
  margin-left: 1rem;
}
</style>
