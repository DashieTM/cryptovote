import { createApp } from "vue";
import { createRouter, createWebHashHistory, useRouter } from "vue-router";
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
import Ballots from './pages/Ballots.vue';
import { hasAccountPermissions, connectMetaMaskAccount } from './lib/api.js';

const routes = [
  { path: '/', component: Home },
  { path: '/NewProposal', component: NewProposal },
  { path: '/Ballots', component: Ballots },
  { path: '/CurrentProposals', component: CurrentProposals },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach(async (to, _) => {
  if (to.fullPath != "/") {
    let hasPermission = await hasAccountPermissions();
    if (!hasPermission) {
      console.log(hasPermission);
      let permissions = await connectMetaMaskAccount();
      console.log(permissions);
      if (!permissions) {
        return '/';
      }
    }
  }
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

