<template>
  <div class="song-drawer">
    <div class="song-drawer-container" :class="{ 'has-menu': songListVisible }">
      <div class="song-drawer-body">
        <!-- 歌曲信息容器 -->
        <div class="song-disc">
          <SongDisc />
        </div>
        <!-- 歌词容器 -->
        <div class="song-lyric">
          <SongLyricScroll :visible="songListVisible" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SongDisc from './SongDrawerDisc.vue';
import SongLyricScroll from './SongDrawerLyric.vue';

export default {
  name: 'songDrawer',
  components: {
    SongDisc,
    SongLyricScroll
  },
  data() {
    return {
      commentsTotal: 0,
      comments: [],
      limit: 10,
      page: 1
    };
  },
  computed: {
    ...mapState('song', {
      song: (state) => state.song
    }),
    ...mapState('ui', {
      songListVisible: (state) => state.songListVisible
    })
  },
  watch: {
    'song.musicId'() {
      this.getCommentByMusic();
    }
  },
  created() {
    this.getCommentByMusic();
  },

  methods: {
    getCommentByMusic() {
      let params = {
        id: this.song.musicId,
        limit: this.limit,
        offset: this.limit * (this.page - 1)
      };
      this.$http.getCommentByMusic(params).then((res) => {
        this.comments = res.data.comments;
        this.commentsTotal = res.data.total;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.song-drawer {
  position: fixed;
  z-index: 9;
  left: 0;
  bottom: calc(var(--app-footer-height) + 1px);
  width: 100vw;
  height: calc(100vh - var(--app-footer-height) - 1px);
  background-color: #fff;
  overflow-y: auto;
}

.song-drawer-container {
  // max-width: 1200px;
  height: 100%;
  // display: flex;
  // justify-items: center;
  // margin: 1rem auto;
  &.has-menu {
    margin-right: 400px;
  }
}
.song-drawer-body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.song-drawer-footer {
  max-width: 768px;
  margin: 0 auto;
}

.song-disc {
  width: 400px;
  height: 520px;
  display: flex;
  align-items: center;
  position: relative;
}

.song-lyric {
  width: 400px;
  height: 520px;
  transition: all 0.3s;
}
</style>
