<template>
  <div class="rank-list">
    <div class="items">
      <CallToAction
        class="item"
        v-for="(item, index) in list"
        :key="index"
        :src="item.coverImgUrl"
        :count="item.playCount"
        @click.native="toDetailSongSheet(item)"
      />
    </div>
  </div>
</template>

<script>
import { ImagePlaceholder } from "@/components/skeleton/image";
export default {
  name: "MusicRankList",
  data() {
    return {
      list: new Array(20).fill({
        name: "",
        playCount:999999,
        coverImgUrl: ImagePlaceholder
      })
    };
  },
  created() {
    this.getTopList();
  },
  methods: {
    getTopList() {
      this.$http.getTopList().then((res) => {
        this.list = res.data.list;
      });
    },
    toDetailSongSheet(item) {
      if(!item.id) return ;
      this.$router.push({
        name: "detailSongSheet",
        query: {
          id: item.id
        }
      });
    }
  }
};
</script>

<style></style>
