import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://airlock.test:8000";

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, user) {
      state.user = user;
      localStorage.setItem("user", user);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    }
  },
  actions: {
    async airlock() {
      return axios.get("/airlock/csrf-cookie");
    },
    async login({ dispatch, commit }, credentials) {
      await dispatch("airlock");
      return axios.post("login", credentials).then(response => {
        commit("SET_USER_DATA", response.data);
      });
    },
    logout({ commit }) {
      return axios.post("logout").then(() => {
        commit("CLEAR_USER_DATA");
      });
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  },
  modules: {}
});
