<script setup lang="ts">
import { EventTypes, Event, createEvent } from './../lib/types.ts';
import { ref, onMounted } from 'vue';
onMounted(() => {
  console.log(from_address);
  console.log(on_address);
  console.log(to_address);
});
const { event_type, from_address, on_address, to_address } = defineProps(['event_type', 'from_address', 'on_address', 'to_address']);
</script>

<template id="EventEntry">
  <v-col v-if="event_type === 0" cols="12" md="10" lg="8">
    <div class="address">
      {{ from_address }}
    </div>
    <div class="text">
      created the ballot
    </div>
    <div class="address">
      {{ on_address }}
    </div>
  </v-col>
  <v-col v-else-if="event_type == 1" cols="12" md="10" lg="8">
    <div class="address">
      {{ from_address }}
    </div>
    <div class="text">
      voted for 
    </div>
    <div class="address">
      {{ to_address }}
    </div>
    <div class="text">
      on ballot 
    </div>
    <div class="address">
      {{ on_address }}
    </div>
  </v-col>
  <v-col v-else-if="event_type == 2" cols="12" md="10" lg="8">
    <div class="address">
      {{ from_address }}
    </div>
    <div class="text">
      gave voting rights on
    </div>
    <div class="address">
      {{ on_address }}
    </div>
    <div class="text">
      to
    </div>
    <div class="address">
      {{ on_address }}
    </div>
  </v-col>
  <v-col v-else-if="event_type == 3" cols="12" md="10" lg="8">
    <div class="address">
      {{ from_address }}
    </div>
    <div class="text">
      delegated their vote on
    </div>
    <div class="address">
      {{ on_address }}
    </div>
    <div class="text">
      to
    </div>
    <div class="address">
      {{ on_address }}
    </div>
  </v-col>
  <v-col v-else>
    <div class="text">
      Unknown Event
    </div>
  </v-col>
</template>
<style scope>
.text {
  font-size: 1.1rem;
  color: orange;
}

.address {
  word-wrap: break-word;
  font-size: 1.1rem;
}
</style>
