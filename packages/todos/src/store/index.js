import Vue from "vue";
import Vuex from "vuex";
import { tomorrow } from "../shared";
import todos from "./todos";
import ui from "./ui";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selected: null,
    unselect: null,
    editing: null,
    currentIndex: 0,
    todos,
  },
  getters: {
    currentTodo(state) {
      return state.todos[state.currentIndex];
    },
    todayTasks: (state) => {
      const tasks = [];
      state.todos.forEach((todo) => {
        todo.tasks.forEach((task) => {
          if (task.date <= tomorrow && !task.down && !task.deleted) {
            tasks.push(task);
          }
        });
      });
      return tasks;
    },
  },
  mutations: {
    selectTodo(state, selected) {
      state.unselect = null;
      state.selected = selected;
      console.log(1);
    },
    unselectTodo(state) {
      state.unselect = state.selected;
      state.selected = null;
    },
    nextTodo(state) {
      if (state.currentIndex < state.todos.length - 1) {
        state.currentIndex++;
      }
    },
    calcTodo(state, payload) {
      console.log(payload)
      state.currentIndex == payload;
    },
    prevTodo(state) {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    },
    deleteTask(_, { task }) {
      task.deleted = true;
    },
    toggleEditing(state) {
      if (state.editing && state.editing.text) {
        state.selected.todo.tasks.unshift({
          title: state.editing.text,
          date: new Date(),
          done: false,
          deleted: false,
        });
      }
      state.editing = state.editing ? null : { text: "" };
    },
  },
  actions: {},
  modules: {
    ui
  },
});
