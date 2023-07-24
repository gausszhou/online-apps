<template>
  <div class="app-body" id="body">
    <div class="app-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppNav from "@/layouts/AppBodySideNav";

export default {
  name: "AppBody",
  components: {
    AppNav
  }
};
</script>
