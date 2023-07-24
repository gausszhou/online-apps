<template>
  <div class="app-header" id="header">
    <div class="header-aside">
      <h1 class="app-header-title" @click="goto('recommend')">Online Music</h1>
    </div>
    <div class="header-main">
      <el-button type="default" size="small" class="ml_5" @click="clearCache"> 清空缓存 </el-button>
    </div>
  </div>
</template>

<script>
import forage from '@/utils/forage';
export default {
  name: 'AppHeader',
  data() {
    return {
      query: '',
      loginDialogVisible: false
    };
  },
  methods: {
    clearCache() {
      this.$loading({
        lock: true,
        fullscreen: true,
      });
      forage.clear().then((res) => {
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
    },
    openLoginDialog() {
      this.loginDialogVisible = true;
    },
    loginDialogChange() {
      this.loginDialogVisible = false;
    },
    search() {
      if (this.query != this.$route.query.keywords) {
        this.$store.commit('setQuery', this.query);
        this.$router.push({
          name: 'search',
          query: {
            keywords: this.query
          }
        });
      }
    },
    goto(name) {
      this.$router.replace({ name });
    },
    go(num) {
      this.$router.go(num);
    }
  }
};
</script>
