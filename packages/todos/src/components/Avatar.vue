<template>
  <div class="avatar" :class="{ 'avatar__selected': !!selected }">
    <div class="avatar-face">
      <img src="../assets/images/avatar.jpg" alt="" />
    </div>
    <h2 class="avatar-name">Hello, Zhou.</h2>
    <p class="avatar-tips">
      Looks like feed good.
      <br />
      You Have {{ todayTasks.length }} tasks to do today
    </p>
    <p class="avatar-date">TODAY : {{ today | dateString }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      today: new Date(),
    };
  },
  computed: {
    ...mapState(["selected"]),
    ...mapGetters(["todayTasks"]),
  },
  filters: {
    dateString(val) {
      return val
        .toDateString()
        .toUpperCase()
        .replace(/(\s\d{4})$/, ", $1");
    },
  },
};
</script>

<style lang="scss"  >
.avatar {
  padding: 0 40px;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.5s ease;
}

.avatar__selected {
  opacity: 0;
  transform: translate3d(0 20px, 0);
}

.avatar-face {
  width: 44px;
  height: 44px;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.avatar-name {
  margin-top: 10px;
  padding: 0 6px;
  font-size: 32px;
  letter-spacing: 1px;
  font-weight: 300;
}

.avatar-tips {
  margin-top: 16px;
  padding: 0 6px;
  font-size: 13px;
  font-weight: 100;
}

.avatar-date {
  margin-top: 24px;
  margin-bottom: 16px;
  padding: 0 6px;
  font-size: 14px;
}
</style>
