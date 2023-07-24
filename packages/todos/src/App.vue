<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  height: 100%;
  overflow: hidden;
  position: relative;
  max-width: 450px;
  margin: 0 auto;
}

</style>
