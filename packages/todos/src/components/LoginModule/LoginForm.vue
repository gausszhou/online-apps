<template>
  <div class="login-form">
    <div class="login-form-row login-form-row1">
      <div class="login-text">
        <LoginTextfiled label="First name" icon="user" value="Gauss" />
        <LoginTextfiled label="Last name" icon value="Zhou" />
      </div>
    </div>
    <div class="login-form-row login-form-row2">
      <LoginTextfiled
        label="Email address"
        icon="envelope-o"
        value="gausszhou@qq.com"
      />
    </div>
    <div class="login-form-row login-form-row3">
      <LoginTextfiled
        label="Enter passwords"
        icon="lock"
        value="todo"
        type="password"
      />
    </div>
    <div class="login-form-row login-form-row4">
      <LoginTextfiled
        label="Re-Enter passwords"
        icon="lock"
        value="todo"
        type="password"
      />
    </div>
    <div class="login-form-row login-form-row5">
      <LoginCheckbox label="Keep me sign in" icon="lock" />
      <label for=""> Forget passwords</label>
    </div>
    <div class="login-form-row login-form-row6">
      <LoginButton @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import LoginTextfiled from './LoginTextfiled.vue'
import LoginCheckbox from './LoginCheckbox.vue'
import LoginButton from './LoginButton.vue'
export default {
  components: {
    LoginTextfiled,
    LoginCheckbox,
    LoginButton
  },
  methods: {
    onSubmit(val) {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  padding: 20px;
  .login-form-row {
    padding-bottom: 10px;
    display: flex;
    min-height: 40px;
    justify-content: space-between;
    transition: all 0.6s ease;
  }
  .login-form-row1 {
    display: flex;
  }
  .login-form-row5 {
    transition-duration: 0.4s;
  }
}
.login-text {
  display: flex;
  flex: 1;
  .login-textfield {
    border-radius: 0;
    &:first-child {
      border-radius: var(--app-border-radius) 0 0 var(--app-border-radius);
    }
    &:last-child {
      border-radius: 0 var(--app-border-radius) var(--app-border-radius) 0;
    }
  }
}

.login-signin .login-form {
  .login-form-row5 {
    opacity: 0;
    transition: all 0.4s ease;
  }
}

.login-signup .login-form {
  .login-form-row1,
  .login-form-row4 {
    opacity: 0;
    transform: translateY(30%) scale(0.8);
  }
  .login-form-row2,
  .login-form-row3 {
    transform: translateY(-100%);
  }
  .login-form-row5 {
    opacity: 1;
    transform: translateY(-200%);
  }
}
</style>
