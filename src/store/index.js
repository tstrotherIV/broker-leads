import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current_listings: [],
  },
  mutations: {
    setListingsData(state, payload) {
      state.current_listings = payload;
    },
  },
  actions: {},
  modules: {},
});
