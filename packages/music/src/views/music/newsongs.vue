<template>
  <div class="songs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="item tab" v-for="(item, index) in tagList" :key="index">
            <span class="title" :class="{ active: tag == item.tag }" @click="tag = item.tag">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部的table -->
    <el-table v-loading="loading" :data="list" :lazy="true" :row-class-name="calcRowClassName" @row-dbclick="getMusic">
      <el-table-column type="index" label="序号" width="50px"></el-table-column>
      <el-table-column prop="name" label="标题"></el-table-column>
      <el-table-column label="歌手">
        <template slot-scope="scope">
          <span>{{ scope.row.album.artists[0].name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template slot-scope="scope">
          <span>{{ scope.row.album.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长">
        <template slot-scope="scope">
          <span>{{ scope.row.duration | mstotime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i
            v-if="song.musicId === scope.row.id && songIsPlay"
            class="icon el-icon-video-pause"
            style="font-size: 24px"
            @click.stop="getMusic(scope.row)"
          ></i>
          <i v-else class="icon el-icon-video-play" style="font-size: 24px" @click="getMusic(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器-->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="limit"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'latestMusic',
  data() {
    return {
      // 分类标签列表
      tagList: [
        { tag: 0, label: '全部' },
        { tag: 7, label: '华语' },
        { tag: 96, label: '欧美' },
        { tag: 8, label: '日本' },
        { tag: 16, label: '韩国' }
      ],
      // 当前分类标签
      tag: '0',
      // 歌曲列表
      list: [],
      lists: new Array(100).fill({
        name: '',
        duration: 0,
        album: {
          name: '',
          artists: [{ name: '' }]
        }
      }),
      total: 100,
      page: 1,
      limit: 10,
      loading: true
    };
  },
  computed: {
    ...mapState('song', {
      song: (state) => state.song,
      songIsPlay: (state) => state.songIsPlay
    })
  },
  watch: {
    tag() {
      this.getTopSong();
    },
    page(newV) {
      const limit = this.limit;
      this.list = this.lists.slice((newV - 1) * limit, newV * limit);
    }
  },
  created() {
    this.getTopSong();
    const limit = this.limit;
    const page = this.page;
    this.list = this.lists.slice((page - 1) * limit, page * limit);
  },
  methods: {
    calcRowClassName({ row }) {
      if (row.id === this.song.musicId) {
        return 'is-current-song';
      }
    },
    getTopSong() {
      let params = {
        type: this.tag
      };
      this.loading = true;
      this.$http.getTopSong(params).then((res) => {
        this.lists = res.data.data;
        const limit = this.limit;
        this.list = this.lists.slice((this.page - 1) * limit, this.page * limit);
        this.loading = false;
      });
    },

    getMusic(item) {
      if (!item.id) return false;
      this.$store.dispatch('song/getMusic', item);
    },
    handleCurrentChange(page) {
      this.page = page;
    }
  }
};
</script>
