<template>
  <div class="home">
    <AppBar title="TODO" left="bars" right="search" @left="openSideBar" />
    <AppSideBar/>
    <Avatar />
    <Gradient />
    <TodoList />
    <TodoDetail />
    <TodoEditing />
    <FloatingButton />
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
import AppSideBar from '@/components/AppSideBar.vue'
import Avatar from '@/components/Avatar.vue'
import Gradient from '@/components/Gradient.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import TodoList from '@/components/TodoModule/TodoList.vue'
import TodoDetail from '@/components/TodoModule/TodoDetail.vue'
import TodoEditing from '@/components/TodoModule/TodoEditing.vue'
export default {
  name: 'Home',
  components: {
    AppBar,
    AppSideBar,
    Avatar,
    Gradient,
    TodoList,
    TodoDetail,
    TodoEditing,
    FloatingButton
  },
  methods: {
    openSideBar() {
      this.$store.commit('ui/setSidebarVisible', true)
    }
  }
}
</script>

<style lang="scss">
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  color: #fff;
  overflow: hidden;
}
</style>
