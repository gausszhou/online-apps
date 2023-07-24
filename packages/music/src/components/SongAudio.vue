<template>
  <!-- 播放控制 -->
  <div
    class="song-control"
    :class="{
      nosongs: this.songList.length == 0,
      single: this.songList.length == 1
    }"
  >
    <div style="width: 100%">
      <div class="switch-control">
        <span class="control-button-text">
          {{ songModeList[songMode].label }}
        </span>
        <i class="control-button iconfont" @click="toggleSongMode()" :class="songModeList[songMode].class"></i>
        <i
          class="control-button iconfont icon-pre"
          :class="{ disable: songMode === 1 || songList.length === 0 }"
          @click="prevSong()"
        ></i>
        <i
          class="control-button iconfont button-toggle"
          :class="{
            'icon-pause': songIsPlay,
            'icon-play': !songIsPlay,
            disable: !song.audioUrl
          }"
          @click="toggleSongPlay()"
        ></i>
        <i
          class="control-button iconfont icon-next"
          :class="{ disable: songMode === 1 || songList.length === 0 }"
          @click="nextSong()"
        ></i>
        <i
          class="control-button control-button-text"
          :class="{
            disable: songList.length === 0 || songLyricList.length === 0
          }"
          @click="toggleLyricFloat()"
          >浮动歌词
        </i>
      </div>
      <div class="song-progress">
        <span class="time">{{ songCurrentTime | stotime }}</span>
        <el-slider
          ref="progress"
          class="control-progress"
          v-model="percent"
          :min="0"
          :max="100"
          :show-tooltip="false"
          @change="onAudioSliderChange(percent)"
        ></el-slider>
        <span class="time">{{ songTotalTime | stotime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const songModeList = [
  {
    mode: 0, // 列表循环
    class: 'icon-mode-loop',
    label: '列表循环'
  },
  {
    mode: 1, // 单曲循环
    class: 'icon-mode-single',
    label: '单曲循环'
  },
  {
    mode: 2, // 顺序播放，最后一首播放完毕，暂停
    class: 'icon-mode-order',
    label: '顺序播放'
  },
  {
    mode: 3, // 数字三意味着混沌，所以用3来代表随机播放
    class: 'icon-mode-random',
    label: '随机播放'
  }
];

export default {
  data() {
    return {
      songModeList: songModeList,
      percent: 0
    };
  },
  computed: {
    ...mapState('song', {
      songList: (state) => state.songList,
      song: (state) => state.song,
      songIsPlay: (state) => state.songIsPlay,
      songMode: (state) => state.songMode,
      songCurrentTime: (state) => state.songCurrentTime,
      songTotalTime: (state) => state.songTotalTime,
      songCurrentPercent: (state) => state.songCurrentPercent,
      songLoadedPercent: (state) => state.songLoadedPercent,
      songLyricList: (state) => state.songLyricList
    }),
    ...mapState('ui', {
      songLyricVisible: (state) => state.songLyricVisible
    })
  },
  watch: {
    songCurrentPercent(newV) {
      this.percent = newV;
    },
    songLoadedPercent() {
      this.drawCallProgress();
    }
  },
  mounted() {
    this.drawCallProgress();
  },
  methods: {
    drawCallProgress() {
      this.$refs.progress.$el.style.setProperty('--progress', this.songLoadedPercent + '%');
    },
    toggleSongMode() {
      const mode = this.songMode + 1;
      const length = this.songModeList.length;
      const modeNew = mode % length;
      this.$store.commit('song/setSongMode', modeNew);
    },
    prevSong() {
      this.$store.dispatch('song/switchSong', -1, false);
    },
    toggleSongPlay() {
      if (!this.song.audioUrl) return;
      this.$store.commit('song/setSongIsPlay', !this.songIsPlay);
    },
    nextSong() {
      this.$store.dispatch('song/switchSong', 1, false);
    },
    toggleLyricFloat() {
      if (!this.song.audioUrl || this.songLyricList.length === 0) return;
      this.$store.commit('ui/setSongLyricVisible', !this.songLyricVisible);
    },
    onAudioSliderChange(percent) {
      let songTargetTime = Math.floor((percent / 100) * this.songTotalTime);
      this.$store.commit('song/setSongTargetTime', songTargetTime);
    }
  }
};
</script>

<style lang="scss" scoped>
// 歌曲控制
.song-control {

  .switch-control {
    display: flex;
    justify-content: center;

    .control-button {
      margin: 0 6px;
      padding: 6px;
      font-size: 20px;
      cursor: pointer;

      &.disable {
        color: #ccc;
      }
    }

    .control-button-text {
      font-size: 14px;
      padding: 9px;
    }
  }

  .button-toggle {
    background-color: #eee;
    border-radius: 40px;
  }
}
</style>
