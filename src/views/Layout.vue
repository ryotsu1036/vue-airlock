<template>
  <v-app>
    <v-app-bar app>
      <v-img
        :src="require('@/assets/logo.png')"
        class="mr-4"
        contain
        height="48"
        width="48"
        max-width="48"
        @click="$vuetify.goTo(0)"
      />

      <v-btn v-for="item in items" :to="item.to" :key="item.text" text>
        {{ item.text }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { authComputed } from "../store/helpers.js";

export default {
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { text: "Home", to: "/home" },
      { text: "About", to: "/about" },
      { text: "Merge", to: "/merge" }
    ]
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    ...authComputed
  }
};
</script>
