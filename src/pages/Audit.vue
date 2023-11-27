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
    // for (let event of events) {
    //   ballotEvents.value.push(createEvent(event));
    // }
  });
  getBallots().then((data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      getLogsOfBallot(element.address).then((events) => {
        let eventArray: Event[];
        for (let event in events) {
          eventArray.push(createEvent(event));
        }
        ballotsArray.value.push({
          name: element.name,
          events: events,
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
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <Proposal proposal_name="Ballot Manager"></Proposal>
        <div v-for="n in ballotEvents" class="events">

        </div>
      </v-col>
      <v-col v-for="n in ballotsArray" cols="12">
        <Proposal :proposal_name="n.name"></Proposal>
        <div class="events" v-for="event in n.events">
          <EventEntry :event="event"></EventEntry>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
