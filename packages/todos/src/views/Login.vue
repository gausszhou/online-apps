<template>
  <div
    class="login"
    :class="{ 'login-signin': isSignIn, 'login-signup': isSignUp }"
  >
    <LoginTabs @click.native="switchState" />
    <LoginForm />
    <GradientColor
      style="position: absolute; top: 0; z-index: -1"
      :colors="['#47bfff', '#5b9df9']"
      :active="true"
    />
  </div>
</template>

<script>
import GradientColor from "@/components/GradientColor.vue";
import LoginTabs from "@/components/LoginModule/LoginTabs";
import LoginForm from "@/components/LoginModule/LoginForm";
export default {
  name: "Login",
  components: {
    GradientColor,
    LoginTabs,
    LoginForm,
  },
  data() {
    return {
      state: 1,
    };
  },
  computed: {
    isSignIn() {
      return this.state === 1;
    },
    isSignUp() {
      return this.state === 2;
    },
  },
  methods: {
    switchState() {
      this.state = this.state == 1 ? 2 : 1;
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  // background-color: #007dff;
  color: #fff;
  font-size: 14px;
}
</style>
