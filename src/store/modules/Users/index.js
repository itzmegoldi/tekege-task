export default {
  namespaced: true,
  state: {
    userModal: {
      show: false,
    },
  },
  getters: {
    getShow: (state) => state.userModal.show,
  },
  mutations: {
    TOGGLE_USER_MODAL(state, obj) {
      state.userModal.show = obj.show;
    },
  },
  actions: {
    toggleUserModal({ commit }, obj) {
      commit("TOGGLE_USER_MODAL", obj);
    },
  },
};
