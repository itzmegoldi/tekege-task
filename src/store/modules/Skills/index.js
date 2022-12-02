export default {
  namespaced: true,
  state: {
    skillsModal: {
      show: false,
    },
  },
  getters: {
    getShow: (state) => state.skillsModal.show,
  },
  mutations: {
    TOGGLE_SKILLS_MODAL(state, obj) {
      state.skillsModal.show = obj.show;
    },
  },
  actions: {
    toggleSkillsModal({ commit }, obj) {
      commit("TOGGLE_SKILLS_MODAL", obj);
    },
  },
};
