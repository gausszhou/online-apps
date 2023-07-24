<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'
import editorConsole from './components/common/editor-console';

const route = useRoute();
const router = useRouter();

const tools = ref([
  {
    label: '文本对比工具',
    value: 'Diff',
    path: '/diff/json'
  },
  {
    label: '代码格式化工具',
    value: 'Format',
    path: '/format/json'
  },
  {
    label: '信息编解码工具',
    value: 'Codec',
    path: '/codec/utf8Encode'
  },
  // 正则表达式工具
  // 实用密码学工具
])

const tool = ref('Diff');
const onRadioClick = (option: any) => {
  router.push({
    path: option.path
  })
}

router.afterEach((e) => {
  tool.value = e.name as string;
})

onMounted(() => {
  const $parent = document.getElementById('console-container') as HTMLElement;
  editorConsole.mount($parent)
})
</script>

<template>
  <div class="app-home">
    <div class="app-aside">
      <div class="g-menu first-level">
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === tool }" v-for="option in tools"
          :key="option.value" @click="onRadioClick(option)">
          <span class="label">{{ option.label }}</span>
        </div>
        <!-- <div class="g-divider"></div>
        <div class="g-desc">按 <b>Ctrl + S</b> 进行保存</div>
        <div class="g-divider"></div>
        <div class="g-desc g-desc-bottom">
          <span>想要新功能？点击</span>
          <a class="ml-1x" href="https://github.com/gausszhou/online-tools/issues" target="_blank">这里</a>
        </div> -->
      </div>
    </div>
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
  width: calc(100vw - 300px);
  height: var(--terminal-height);
  background-color: #1e1e1e;
  z-index: 9999;
  border-top: 1px solid #393939;
}

:deep #console-container .container {
  width: 100%;
  height: 100%;
}
</style>