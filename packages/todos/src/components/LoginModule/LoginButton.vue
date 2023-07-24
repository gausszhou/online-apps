<template>
  <span class="login-button">
    <input type="button" value="" />
    <label for="" @click="onSubmit('sign-up')">Sign Up</label>
    <label for="" @click="onSubmit('sign-in')">Sign In</label>
  </span>
</template>

<script>
export default {
  methods: {
    onSubmit(type) {
      this.$emit("submit", type);
    },
  },
};
</script>

<style lang="scss">
.login-button {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
}

.login-button {
  input {
    display: block;
    flex: 1;
    width: 0;
    height: 40px;
    border: none;
    outline: none;
    border-radius: var(--app-border-radius);
    background-color: #0066d0;
  }
  label {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s ease;
  }
}

.login-signin .login-form {
  .login-button {
    label:nth-child(3) {
      opacity: 0;
      transform: translateY(100%);
    }
  }
}

.login-signup .login-form {
  .login-button {
    label:nth-child(2) {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
}
</style>
