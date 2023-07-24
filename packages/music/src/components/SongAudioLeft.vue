<template>
  <div class="song-info">
    <div class="img-box" @click="toggleSongDrawer()" :class="{ show: song.picUrl, open: songDrawerVisible }">
      <i class="arrow iconfont icon-arrow-right-top"></i>
      <img class="img" :class="{ running: songIsPlay && !songDrawerVisible }" :src="song.picUrl" />
    </div>
    <div class="name-box">
      <div class="text-over-elli song-name">{{ song.name }}</div>
      <div>
        <span class="text-over-elli song-author" v-for="(item, index) in song.author" :key="index"
          >{{ item.name }}&nbsp;&nbsp;</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('song', {
      songList: (state) => state.songList,
      song: (state) => state.song,
      songIsPlay: (state) => state.songIsPlay
    }),
    ...mapState('ui', {
      songDrawerVisible: (state) => state.songDrawerVisible
    })
  },
  methods: {
    toggleSongDrawer() {
      this.$store.commit('ui/setSongDrawerVisible', !this.songDrawerVisible);
    }
  }
};
</script>


<style lang="scss" scoped> 
// 信息
.song-info {
  .img-box {
    margin-left: 20px;
    position: relative;
    cursor: pointer;
    visibility: hidden;

    .arrow {
      display: block;
      position: absolute;
      left: 15px;
      top: 15px;
      width: 20px;
      height: 20px;
      z-index: 1;
      font-size: 20px;
      color: rgba(0, 0, 0, 0);
    }

    .img {
      display: block;
      height: 50px;
      width: 50px;
      border-radius: 10px;
      border: 1px solid #ccc;
    }

    .img.running {
      border-radius: 50%;
      animation: rotate 5s linear infinite running;
    }

    &:hover {
      .arrow {
        color: rgba(255, 255, 255, 0.7);
      }

      .img {
        filter: blur(2px);
      }
    }

    &.open {
      .arrow {
        color: rgba(255, 255, 255, 0.7);
        transform: rotate(180deg);
      }

      .img {
        filter: blur(2px);
      }
    }

    &.show {
      visibility: visible;
    }
  }
}

</style>