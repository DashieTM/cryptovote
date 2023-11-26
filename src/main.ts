import { createApp } from "vue";
import { createRouter, createWebHashHistory, useRouter } from "vue-router";
import App from "./App.vue";
import "./style.css";

import '@mdi/font/css/materialdesignicons.css';
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import "vuetify/styles";
import Audit from './pages/Audit.vue';
import Home from './pages/Home.vue';
import NewProposal from './pages/NewProposal.vue';
import Ballots from './pages/Ballots.vue';
import { hasAccountPermissions, connectMetaMaskAccount } from './lib/api.js';

const tokyoNight = {
  dark: true,
  colors: {
    background: '#1A1B26',
    surface: '#1A1B26',
    primary: '#1A1B26',
    secondary: '#a9b1d6',
    error: '#F28B82',
    info: '#613583',
    success: '#81C995',
    warning: '#FDD633',
  }
}


const routes = [
  { path: '/', component: Home },
  { path: '/NewProposal', component: NewProposal },
  { path: '/Ballots', component: Ballots },
  { path: '/Audit', component: Audit },
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
  theme: {
    defaultTheme: 'tokyoNight',
    themes: {
      tokyoNight,
    },
  },
});

createApp(App).use(vuetify).use(router).mount("#app");

