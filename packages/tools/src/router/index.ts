import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/index.vue";

const routes = [
  { path: "", redirect: { path:"json-format" } },
  { name: "Index", path: "/:language", component: Index },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
