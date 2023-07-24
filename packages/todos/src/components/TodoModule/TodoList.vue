<template>
  <div class="todo-list" :class="{ 'todo-list-selected': selected }">
    <ul :style="{ width: `calc(${todos.length * 100}% + ${margin}px)` }">
      <li
        ref="todoLi"
        v-for="todo in todos"
        :key="todo.name"
        :style="{ transform: `translate3d(-${currentIndex * 100})%, 0 , 0` }"
      >
        <TodoItem
          :todo="todo"
          :selected="selected && selected.todo === todo"
          @select="selectTodo"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import animation from '@gausszhou/animation'
import { mapState, mapMutations } from 'vuex'
import TodoItem from './TodoItem.vue'
export default {
  data() {
    return {
      margin: 48
    }
  },
  components: {
    TodoItem
  },
  computed: {
    ...mapState(['todos', 'currentIndex', 'selected'])
  },
  mounted() {
    let touch = {}
    this.$el.addEventListener('mousedown', (evt) => {
      touch.startX = evt.clientX
      touch.endX = 0
    })
    this.$el.addEventListener('touchstart', (evt) => {
      touch.startX = evt.touches[0].clientX
      touch.endX = 0
    })
    this.$el.addEventListener('mousemove', (evt) => {
      touch.endX = evt.clientX
    })
    this.$el.addEventListener('touchmove', (evt) => {
      touch.endX = evt.touches[0].clientX
    })
    const calcMouse = () => {
      if (!touch.endX || Math.abs(touch.endX - touch.startX) < 10) {
        return
      }
      const widthTotal = this.$el.scrollWidth - this.margin
      const widthItem = widthTotal / this.todos.length
      if (touch.endX < touch.startX) {
        this.nextTodo()
      } else {
        this.prevTodo()
      }
      let target = this.currentIndex * widthItem

      animation(this.$el.scrollLeft, target, (value) => {
        this.$el.scrollLeft = value
      })
    }
    this.$el.addEventListener('mouseup', calcMouse)
    this.$el.addEventListener('touchend', calcMouse)
  },
  methods: {
    ...mapMutations(['selectTodo', 'nextTodo', 'prevTodo'])
  }
}
</script>

<style lang="scss">
.todo-list {
  padding: 0 32px;
  transition: all 0.5s ease;
  overflow-x: scroll;
  height: 420px;
  > ul,
  > ul > li {
    display: flex;
    height: 400px;
  }

  > ul > li {
    flex: 1;
    transition: transform 0.5s ease;
  }

  .todo {
    border-radius: var(--app-border-radius);
    background-color: #fff;
  }
}

.todo-list-selected {
  transform: scale(1.25);
}
</style>
