import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current_listings: [],
    adminUser: true,
  },
  mutations: {
    setListingsData(state, payload) {
      state.current_listings = payload;
    },
  },
  actions: {},
  modules: {},
});
