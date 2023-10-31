<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import editorConsoleInstance from './editor/console';
onMounted(() => {
  const $parent = document.getElementById('console-container') as HTMLElement;
  editorConsoleInstance.mount($parent)
})
</script>

<template>
  <div class="app-home">
    <div class="app-main">
      <div id="tool-container">
        <router-view></router-view>
      </div>
    </div>
    <div id="console-container"></div>
  </div>
</template>

<style scoped>
.app-home {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #272822;
}

.app-aside {
  min-width: 150px;
  width: 150px;
  height: 100%;

}

.app-main {
  flex: 1;
  height: 100%;
}

#tool-container {
  height: 100%;
}

#console-container {
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(100vw - 150px);
  height: var(--terminal-height);
  background-color: #1e1e1e;
  z-index: 9999;
  border-top: 1px solid #393939;
}

:deep #console-container .container {
  width: 100%;
  height: 100%;
}
</style>./editor/editor-console