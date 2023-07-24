import Vue from "vue";
import VueRouter from "vue-router";

import Music from "@/views/music/index.vue";
import MusicNew from "@/views/music/newsongs.vue";
import MusicRanks from "@/views/music/ranklists.vue";
import MusicRecommend from "@/views/music/recommend.vue";
import MusicSinger from "@/views/music/singer.vue";
import MusicLists from "@/views/music/songlists.vue";

import DetailMV from "@/views/detail/detailMV.vue";
import DetailSinger from "@/views/detail/detailSinger.vue";
import DetailSongSheet from "@/views/detail/detailSongSheet.vue";
import Detail from "@/views/detail/index.vue";

import Search from "@/views/search/index.vue";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, parent: "#footer" });

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: { name: "recommend" }
  },
  {
    name: "music",
    path: "/music",
    component: Music,
    children: [
      {
        name: "recommend",
        path: "recommend",
        component: MusicRecommend,
        meta: { title: "个性推荐" }
      },
      {
        name: "newsongs",
        path: "new",
        component: MusicNew,
        meta: { title: "最新音乐" }
      },

      {
        name: "songlists",
        path: "list",
        component: MusicLists,
        meta: { title: "歌单" }
      },
      {
        name: "ranklists",
        path: "ranks",
        component: MusicRanks,
        meta: { title: "排行" }
      },
      {
        name: "singer",
        path: "singer",
        component: MusicSinger,
        meta: { title: "歌手" }
      }
    ]
  },
  {
    name: "detail",
    path: "/detail",
    component: Detail,
    children: [
      {
        name: "detailMV",
        path: "mv",
        component: DetailMV,
        meta: { title: "MV 详情" }
      },
      {
        name: "detailSongSheet",
        path: "list",
        component: DetailSongSheet,
        meta: { title: "歌单详情" }
      },
      {
        name: "detailSinger",
        path: "singer",
        component: DetailSinger,
        meta: { title: "歌手详情" }
      }
    ]
  },
  {
    name: "search",
    path: "/search",
    component: Search,
    meta: { title: "搜索结果" }
  }
];

const router = new VueRouter({
  mode: "hash", //  history  hash
  base: "/online-music/",
  routes
});

function isProgressMounted() {
  return document.querySelector("#footer");
}

router.beforeEach(async (to, from, next) => {
  isProgressMounted() && NProgress.start();
  next();
  isProgressMounted() && NProgress.done();
});

// 导出路由
export default router;
