<template>
  <div class="desktop-dock">
    <img :src="require('@/assets/images/dock/dock-windows.png')" alt="" />
    <div class="dock-list">
      <img
        v-for="item in list"
        :key="item.key"
        :src="calcDock(item)"
        @click="changemode(item)"
      />
    </div>
    <img :src="require('@/assets/images/dock/dock-message.png')" alt="" />
  </div>
</template>

<script>
export default {
  name: "DesktopDock",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      time: new Date().toLocaleString().slice(10, 15),
      timer: null
    }
  },
  created() {
    this.setTimer()
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        this.time = new Date().toLocaleString().slice(10, 15)
      }, 10 * 1000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    calcDock(item) {
      if (item.mode === "back") return item.dockBack
      if (item.mode === "fore") return item.dockForeg
      console.log(item.mode)
      console.error("mode Error")
    },
    changemode(item) {
      let { key, mode } = item
      mode = mode === "fore" ? "back" : "fore"
      this.$emit("onModeChange", key, mode)
    }
  }
}
</script>

<style>
.desktop-dock {
  position: fixed;
  z-index: 111;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #233942 0%, #192640 100%);
}
.dock-list {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
