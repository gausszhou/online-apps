<template>
  <div></div>
</template>
<script>
export default {
  name: "TaskWindow",
  props: {
    appKey: {
      type: String,
      default: ""
    },
    appName: {
      type: String,
      default: ""
    },
    appUrl: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: "default"
    },
    mode: {
      type: String,
      default: "foreg"
    },
    titleBarColor: {
      type: String,
      default: "#409eff"
    }
  },
  data() {
    return {
      winbox: null
    }
  },
  watch: {
    mode() {
      this.onModeChange()
    }
  },
  mounted() {
    const container = document.querySelector('#desktop-container')
    const content = document.createElement('div');
    content.innerHTML = `<iframe src="${this.appUrl}" width="100%" height="100%"></iframe>`
    const winbox = new window.WinBox(this.appName, {
      background: this.titleBarColor,

      root: container,
      mount: content,
      bottom: 40,
      onclose: () => {
        this.close();
      },
      onminimize: () => {
        this.minimize();
      },
      onmaximize: () => {
        this.maximize();
      }
    });
    winbox.maximize();  
    this.winbox = winbox
  },
  methods: {
    onModeChange() {
      if (this.mode == "back") {
        this.winbox.minimize()
      } else {
        this.winbox.restore()
      }
    },
    minimize() {
      console.log('min')
      this.$emit("onModeChange", this.appKey, "back")
    },
    maximize() {
      console.log('max')
      this.$emit("onModeChange", this.appKey, "fore")
    },
    close() {
      console.log('close')
      this.$emit("close", this.appKey)
    }
  }
}
</script>