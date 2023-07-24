<template>
  <transition name="show" @enter="handleEnter" @leave="handleLeave">
    <div class="todo-detail" v-if="selected">
      <AppBar @left="unselectTodo" title="" right="ellipsis-v" />
      <TodoItem :todo="selected.todo" :active="true" @close="unselectTodo" />
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppBar from "@/components/AppBar.vue";
import TodoItem from "./TodoItem.vue";
export default {
  components: {
    AppBar,
    TodoItem,
  },
  computed: {
    ...mapState(["selected", "unselect"]),
  },
  methods: {
    ...mapMutations(["unselectTodo"]),
    handleEnter(el) {
      Object.assign(el.style, {
        top: `${this.selected.rect.top}px`,
        left: `${this.selected.rect.left}px`,
        width: `${this.selected.rect.width}px`,
        height: `${this.selected.rect.height}px`,
      });
      setTimeout(() => {
        Object.assign(el.style, {
          top: 0,
          left: 0,
          width: `${this.selected.rect.appWidth}px`,
          height: `${this.selected.rect.appHeight}px`,
        });
      }, 0);
    },
    handleLeave(el) {
      Object.assign(el.style, {
        top: 0,
        left: 0,
        width: `${this.unselect.rect.appWidth}px`,
        height: `${this.unselect.rect.appHeight}px`,
      });
      setTimeout(() => {
        Object.assign(el.style, {
          top: `${this.unselect.rect.top}px`,
          left: `${this.unselect.rect.left}px`,
          width: `${this.unselect.rect.width}px`,
          height: `${this.unselect.rect.height}px`,
        });
      }, 0);
    },
  },
};
</script>

<style lang="scss">
.todo-detail {
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  background-color: white;
  color: #666;
  // will-change: top, left, width, height;
  .todo {
    margin: 0;
    margin-top: -44px;
    padding: 0 20px;
    box-shadow: none;
  }
  .todo-head,
  .todo-body {
    transform: translate3d(0, 88px, 0);
  }
  .todo-menu {
    opacity: 0;
  }
  .todo-tasks {
    opacity: 1;
    transform: scaleY(1);
  }
  .app-bar {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.show-enter-to,
.show-leave {
  border-radius: 0;
  .todo {
    padding: 0 20px;
  }
  .todo-head,
  .todo-body {
    transform: translate3d(0, 88px, 0);
  }
  .todo-menu {
    opacity: 0;
  }
  .todo-tasks {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  .app-bar {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.show-leave-to,
.show-enter {
  border-radius: var(--app-border-radius);
  .todo {
    padding: 0;
  }
  .todo-head {
    transform: translate3d(0, 0, 0);
  }
  .todo-body {
    transform: translate3d(0, 189px, 0);
  }
  .todo-menu {
    opacity: 1;
  }
  .todo-tasks {
    opacity: 0;
    transform: scale3d(1, 0, 1);
  }
  .app-bar {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}
.show-enter-active,
.show-leave-active {
  transition: all 0.5s ease;
  .todo,
  .todo-head,
  .todo-body,
  .todo-menu,
  .todo-tasks,
  .app-bar {
    transition: all 0.5s ease;
  }
}
</style>
