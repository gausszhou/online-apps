<template>
  <div class="app-bar">
    <span class="app-bar-left" @click="$emit('left')">
      <i :class="['fa', `fa-${left}`]"></i>
    </span>
    <h1>{{ title }}</h1>
    <span class="app-bar-right" @click="$emit('right')">
      <i :class="['fa', `fa-${right}`]"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title",
    },
    left: {
      type: String,
      default: "chevron-left",
    },
    right: {
      type: String,
      default: "chevron-right",
    },
  },
};
</script>

<style lang="scss">
.app-bar {
  display: flex;
  align-items: center;
  height: center;
  height: 44px;
  font-size: 15px;
  z-index: 1;
  h1 {
    flex: 1;
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
  span{
    padding: 0 20px;
  }
}
</style>
