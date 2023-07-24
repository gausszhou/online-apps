<template>
  <div class="app-sidebar" :class="{visible: visible}">
    <transition name="slide">
      <div class="app-sidebar-menu" >
        <div class="flex-1"></div>
        <ul class="menu-list">
          <li class="menu-item">Logout</li>
        </ul>
      </div>
    </transition>
    <div class="app-sidebar-mask" @click="close"></div>
  </div>
</template>

<script>
export default {
  computed: {
    visible(){
      return this.$store.state.ui.sidebarVisible
    }
  },
  methods: {
    close(){
      this.$store.commit('ui/setSidebarVisible', false)
    }
  }
}
</script>

<style lang="scss">
.app-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100vh;
  z-index: 8;
}

.app-sidebar-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  overflow: hidden;
  height: 100vh;
  z-index: 9;
  background: rgba(0, 0, 0, 0.1);
}

.app-sidebar-menu {
  position: absolute;
  left: -200px;
  top: 0;
  width: 200px;
  overflow: hidden;
  height: 100vh;
  z-index: 10;
  background-color: #fff;
  transition: left ease .3s;
  border-radius: 0 8px 8px 0;
}
.app-sidebar.visible {
  width: 100vw;
  .app-sidebar-mask {
    width: 100vw;
  }
  .app-sidebar-menu{
    left: 0;
  }
}

.app-sidebar-menu {
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  box-sizing: border-box;
}

.flex-1 {
  flex: 1;
}

.menu-item {
  font-weight: 600;
  font-size: 16px;
  padding: 8px 16px;
  color: #333;
}
</style>
