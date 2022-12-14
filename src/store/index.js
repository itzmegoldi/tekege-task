import Vue from "vue";
import Vuex from "vuex";
import snackBar from "./modules/SnackBar";
import users from "./modules/Users";
import skills from "./modules/Skills";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    snackBar,
    users,
    skills,
  },
});
