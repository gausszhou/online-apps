<template>
  <div class="app-main-view music-container video-container">
    <el-tabs v-model="tab" @tab-click="switchTab" class="app-main-nav">
      <el-tab-pane name="recommend">
        <span slot="label">个性推荐</span>
      </el-tab-pane>
      <el-tab-pane name="songlists">
        <span slot="label">精品歌单</span>
      </el-tab-pane>
      <el-tab-pane name="ranklists">
        <span slot="label">排行榜</span>
      </el-tab-pane>
      <el-tab-pane name="singer">
        <span slot="label">歌手</span>
      </el-tab-pane>
    </el-tabs>
    <div class="app-main-page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "music",
  components: {},
  data() {
    return {
      tab: "recommend"
    };
  },
  watch: {
    "$route.name": {
      handler(newV) {
        this.tab = newV;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.tab = to.name;
    });
  },
  methods: {
    switchTab() {
      this.goto(this.tab);
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
  }
};
</script>

<style lang="scss">
.music-container {
  padding-bottom: 20px;
}

.music-container .title {
  font-weight: normal;
  margin-bottom: 20px;
  padding-left: 8px;
}

// 轮播图
.music-container .el-carousel__container {
  height: 220px;
}

.music-container .el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

// 新歌

.music-container .recommend-news {
  margin-bottom: 1rem;
}

.music-container .recommend-news .news-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.music-container .recommend-news .news-list .item {
  // width: 25%;
  width: 250px;
  height: 80px;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
}

.music-container .recommend-news .news-list .item:hover {
  background-color: #f5f5f5;
}

.music-container .recommend-news .news-list .item .index {
  margin-right: 15px;
  font-size: 15px;
}

.music-container .recommend-news .news-list .item .img-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.music-container .recommend-news .news-list .item .img-wrap img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.music-container .recommend-news .news-list .item .img-wrap .iconfont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  color: #dd6d60;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.music-container .recommend-news .news-list .item .img-wrap .iconfont::before {
  transform: translateX(0px);
}

.music-container .recommend-news .news-list .item .img-wrap:hover .iconfont {
  opacity: 1;
}

.music-container .recommend-news .news-list .item .song-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  font-size: 16px;
  padding: 10px;
}

.music-container .recommend-news .news-list .item .song-wrap .singer {
  font-size: 14px;
  color: gray;
}


// 推荐

.music-container .recommend-songlist .items {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.music-container .recommend-songlist .item {
  width: 160px;
}

// 排行榜
.music-container .rank-list .items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.music-container .rank-list .items .item {
  width: 160px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

</style>