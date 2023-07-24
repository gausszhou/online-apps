<template>
  <div class="songlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="artist.cover" alt />
      </div>
      <div class="info-wrap">
        <p class="title">
          <span class="title-label">歌手</span>
          <span class="title-text">{{ artist.name }}</span>
        </p>
        <div class="play-wrap" @click="addToSongList">
          <span class="iconfont icon-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="prod-wrap">
          <span class="prod-size music-size">单曲数: {{ artist.musicSize }}</span>
          <span class="prod-size album-size">专辑数: {{ artist.albumSize }}</span>
          <span class="prod-size mv-size">MV数: {{ artist.mvSize }}</span>
        </div>
        <div class="desc-wrap">
          <span class="desc text-over-elli-6">简介: {{ artist.briefDesc }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex" @tab-click="onTabClick">
      <el-tab-pane label="专辑" name="1">
        <el-table
          :lazy="true"
          :data="songs"
          v-loading="loading"
          :row-class-name="calcRowClassName"
          @row-dblclick="getMusic"
        >
          <el-table-column type="index" label="序号" width="50px"> </el-table-column>
          <el-table-column label="标题" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="专辑">
            <template slot-scope="scope">
              <span>{{ scope.row.al?.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时长" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.dt | mstotime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <IconPlay :item="scope.row"></IconPlay>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ImagePlaceholder } from '@/components/skeleton/image';
export default {
  name: 'DetailSinger',
  data() {
    return {
      activeIndex: '1',
      artist: {
        cover: ImagePlaceholder
      },
      loading: false,
      songs: new Array(50).fill({
        name: '',
        dt: 0
      }),
      mvs: []
    };
  },
  computed: {
    ...mapState('song', {
      song: (state) => state.song
    })
  },
  created() {
    this.getArtistDetail();
    this.getArtistTopSong();
    this.getArtistMV();
    this.activeIndex = this.$route.query.tab || '1';
  },
  methods: {
    calcRowClassName({ row }) {
      if (row.id === this.song.musicId) {
        return 'is-current-song';
      }
    },
    onTabClick() {
      this.$router.replace({
        name: this.$route.name,
        query: {
          id: this.$route.query.id,
          tab: this.activeIndex
        }
      });
    },
    getArtistDetail() {
      let id = this.$route.query.id;
      let params = { id };
      this.$http.getArtistDetail(params).then((res) => {
        this.artist = res.data.data.artist;
      });
    },
    getArtistTopSong() {
      this.loading = true;
      let id = this.$route.query.id;
      let params = { id };
      this.$http.getArtistTopSong(params).then((res) => {
        this.loading = false;
        this.songs = res.data.songs;
      });
    },
    getArtistMV() {
      let id = this.$route.query.id;
      let params = { id };
      this.$http.getArtistMV(params).then((res) => {
        this.mvs = res.data.mvs;
      });
    },
    toDetailMV(item) {
      this.$router.push({
        name: 'detailMV',
        query: {
          mvid: item.id
        }
      });
    },
    addToSongList() {
      this.$store.commit('song/addListToSongList', this.songs);
    },
    getMusic(item) {
      if (!item.id) return false;
      this.$store.dispatch('song/getMusic', item);
    }
  }
};
</script>

<style lang="scss" scoped>
.prod-wrap {
  padding-bottom: 1rem;
  .prod-size {
    margin-right: 1rem;
    font-size: 14px;
    color: #333;
  }
}
</style>
