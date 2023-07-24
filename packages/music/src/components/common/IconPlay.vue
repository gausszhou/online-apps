<template>
  <i
    v-if="songIsPlay && songCurrent.musicId === item.id"
    class="icon el-icon-video-pause"
    style="font-size: 24px"
    @click.stop="getMusic(item)"
  ></i>
  <i v-else class="icon el-icon-video-play" style="font-size: 24px" @click.stop="getMusic(item)"></i>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    item: {
      default: () => {}
    }
  },
  computed: {
    ...mapState('song', {
      songCurrent: (state) => state.song,
      songIsPlay: (state) => state.songIsPlay
    })
  },
  methods: {
    getMusic(item) {
      if (!item.id) return false;
      this.$store.dispatch('song/getMusic', item);
    }
  }
};
</script>
