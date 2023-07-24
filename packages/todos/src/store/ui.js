export default {
  namespaced: true,
  state: () => ({
    sidebarVisible: false
  }),
  mutations: {
    setSidebarVisible(state, visible) {
      console.log('setSidebarVisible', visible)
      state.sidebarVisible = visible
    }
  },
  actions: {},
  getters: {}
}
