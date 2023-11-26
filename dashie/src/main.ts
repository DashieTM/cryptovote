import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import "./style.css";

import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import "vuetify/styles";
import CurrentProposals from './pages/CurrentProposals.vue';
import Home from './pages/Home.vue';
import NewProposal from './pages/NewProposal.vue';
import PastProposals from './pages/PastProposals.vue';

const routes = [
  { path: '/', component: Home},
  { path: '/NewProposal', component: NewProposal},
  { path: '/PastProposals', component: PastProposals},
  { path: '/CurrentProposals', component: CurrentProposals},
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(vuetify).use(router).mount("#app");
