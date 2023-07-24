import { createRouter, createWebHashHistory } from "vue-router";
import ToolDiffVue from "../components/ToolDiff.vue";
import ToolFormatVue from "../components/ToolFormat.vue";
import ToolCodecVue from "../components/ToolCodec.vue";
// import ToolJsonVue from "../components/ToolJson.vue";

const routes = [
  { path: "", redirect: { path:"diff/json" } },
  { name: "Diff", path: "/diff/:language", component: ToolDiffVue },
  { name: "Format", path: "/format/:language", component: ToolFormatVue },
  { name: "Codec", path: "/codec/:type", component: ToolCodecVue },
  // { name: "JSON", path: "/json", component: ToolJsonVue },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
