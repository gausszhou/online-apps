<template>
  <div id="app" class="desktop-background">
    <DesktopShortcut :list="appList" @openAppWindow="openAppWindow" />
    <DesktopDock :list="taskList" @onModeChange="onModeChange" />
    <div id="desktop-container">
      <TaskWindow
      v-for="(item, index) in taskList"
      :key="item.key"
      :index="index"
      :appKey="item.key"
      :appName="item.name"
      :appUrl="item.url"
      :mode="item.mode"
      :titleBarColor="item.titleBarColor"
      @onModeChange="onModeChange"
      @close="closeAppWindow"
    />
    </div>
  </div>
</template>

<script>
window.oncontextmenu = (e) => {
  e.preventDefault()
}

import DesktopShortcut from "@/components/DesktopShortcut"
import DesktopDock from "@/components/DesktopDock"
import TaskWindow from "@/components/TaskWindow"

export default {
  name: "App",
  components: {
    DesktopShortcut,
    DesktopDock,
    TaskWindow
  },
  data() {
    return {
      taskList: [],
      appList: [
        {
          key: "netease",
          name: "网易云音乐",
          url: "https://gausszhou.github.io/apps/music/",
          titleBarColor:'#c20c0c',
          shortcut: require("@/assets/images/shortcut/netease.png"),
          dockForeg: require("@/assets/images/dock/dock-netease-foreg.png"),
          dockBack: require("@/assets/images/dock/dock-netease-back.png"),
          mode: "fore" // fore back
        }
      ]
    }
  },
  methods: {
    openAppWindow(app) {
      const { key } = app
      let index = this.taskList.findIndex((item) => item.key === key)
      if (index == -1) {
        this.taskList.push(app)
      } else {
        this.onModeChange(key, "fore")
      }
    },
    closeAppWindow(key) {
      this.taskList = this.taskList.filter((item) => item.key !== key)
    },
    onModeChange(key, mode) {
      const index = this.taskList.findIndex((item) => item.key === key)
      this.taskList[index].mode = mode
    }
  }
}
</script>
