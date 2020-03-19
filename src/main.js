import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  created() {
    const user = localStorage.getItem("user"); // grab user data from local storage
    if (user) {
      this.$store.commit("SET_USER_DATA", user); // restore user data with Vuex
    }
    axios.interceptors.response.use(
      response => response, // simply return the response
      error => {
        if (error.response.status === 401) {
          // if we catch a 401 error
          this.$store.dispatch("logout"); // force a log out
        }
        return Promise.reject(error); // reject the Promise, with the error as the reason
      }
    );
  },
  render: h => h(App)
}).$mount("#app");
