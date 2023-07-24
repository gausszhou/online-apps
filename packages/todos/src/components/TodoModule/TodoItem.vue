<template>
  <div
    class="todo"
    @dblclick="handleClick"
    :class="{ todo__selected: selected }"
  >
    <!--  -->
    <div class="todo-head">
      <div class="todo-icon" :style="{ color }">
        <i :class="['fa', `fa-${todo.icon}`]"></i>
      </div>
      <div class="todo-menu"><i class="fa fa-ellipsis-v"></i></div>
    </div>
    <!--  -->
    <div class="todo-body">
      <p class="todo-tips">{{ todo.tasks.length }} Tasks</p>
      <h3 class="todo-title">{{ todo.name }}</h3>
      <div class="todo-progress">
        <span class="todo-progress-line">
          <i :style="{ width: progress, backgroundImage: progressColor }"></i>
        </span>
        <span class="todo-progress-num">{{ progress }}</span>
      </div>
      <div class="todo-tasks">
        <h4 class="todo-subtitle" v-if="todayTasks.length">Today</h4>
        <ul>
          <li v-for="task in todayTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
        </ul>
        <h4 class="todo-subtitle" v-if="tomorrowTasks.length">Tomorrow</h4>
        <ul>
          <li v-for="task in tomorrowTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
        </ul>
        <h4 class="todo-subtitle" v-if="outdatedTasks.length">Outdated</h4>
        <ul>
          <li v-for="task in outdatedTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { today, tomorrow } from '@/shared'
import Task from './Task.vue'
export default {
  name: 'TodoItem',
  components: {
    Task
  },
  props: {
    todo: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean
    }
  },
  computed: {
    color() {
      return this.todo.colors[0]
    },
    progress() {
      const totalCount = this.todo.tasks.filter((t) => !t.deleted).length
      const doneCount = this.todo.tasks.filter(
        (t) => !t.deleted && t.done
      ).length
      return `${Math.round((doneCount / totalCount) * 100)}%`
    },
    progressColor() {
      const colorLeft = `color-stop(30%, ${this.todo.colors[0]})`
      const colorRight = `to(${this.todo.colors[1]})`
      return `-webkit-gradient(linear, left bottom, right bottom, ${colorLeft}, ${colorRight})`
    },
    todayTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date >= today && task.date < tomorrow
      })
    },
    tomorrowTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date >= tomorrow
      })
    },
    outdatedTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date < today
      })
    }
  },
  mounted() {
    let touch = {}
    this.$el.addEventListener('mousedown', (evt) => {
      touch.startX = evt.clientX
      touch.startY = evt.clientY
      touch.endX = 0
      touch.endX = 0
    })
    const calcMouse = (evt) => {
      touch.endX = evt.clientX
      touch.endY = evt.clientY
      if(Math.abs(touch.endX - touch.startX)+ Math.abs(touch.endY - touch.startY) < 20){
        this.handleClick()

      }
    }
    this.$el.addEventListener('mouseup', calcMouse)
  },
  methods: {
    handleClick() {
      const appRect = document.querySelector('#app').getBoundingClientRect()
      const elRect = this.$el.getBoundingClientRect()
      const todo = this.todo
      const rect = {}
      rect.top = elRect.top - appRect.top
      rect.left = elRect.left - appRect.left
      rect.width = elRect.width
      rect.height = elRect.height
      rect.appWidth = appRect.width
      rect.appHeight = appRect.height
      this.$emit('select', { rect, todo })
    }
  }
}
</script>

<style lang="scss">
.todo {
  flex: 1;
  margin: 0 8px;
  overflow: hidden;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #666;
}

.todo__selected {
  visibility: hidden;
}

.todo-head {
  display: flex;
  padding: 20px;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  transform: translate3d(0, 0, 0);
  will-change: transform;

  .todo-menu {
    color: #777;
  }
}

.todo-body {
  padding: 0 20px;
  transform: translate3d(0, 190px, 0);
  will-change: transform;
}

.todo-icon {
  display: flex;
  width: 44px;
  height: 44px;
  border: 1px solid #eee;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.todo-tips {
  opacity: 0.6;
  font-size: 13px;
  font-weight: 600;
}

.todo-title {
  margin-top: 6px;
  font-size: 32px;
}

.todo-progress {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.todo-progress-line {
  margin-right: 10px;
  flex: 1;
  height: 3px;
  background-color: #eee;

  i {
    display: block;
    height: 100%;
    transition: all 0.3s ease;
  }
}

.todo-progress-num {
  font-size: 12px;
}

.todo-tasks {
  opacity: 0;
  transform: scale3d(1, 0, 1);
  transform-origin: top;
  will-change: transform opacity;
}

.todo-subtitle {
  margin-top: 32px;
  margin-bottom: 8px;
  color: #999;
}
</style>
