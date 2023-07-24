<template>
  <ul class="login-tabs">
    <li><span>Sign In</span></li>
    <li class="login-tabs-or">or</li>
    <li><span>Sign Up</span></li>
  </ul>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.login-tabs{
  display: flex;
  padding: 0 34px;
  li {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    padding: 10px;
    transition: all .6s ease;
  }
  span {
    display: block;
    padding: 4px 10px;
    border: 1px solid #fff;
    border-radius: var(--app-border-radius);
    text-align: center;
    transition: all .6s ease;
    white-space: nowrap;
  }
  .login-tabs-or{
    justify-content: center;
    transition-delay: .05s;
    transition-duration: .55s;
  }
}
.login-tabs-or{
  font-size: 12px;
  &::after,
  &::before{
    content: "-";
  }
}

.login-signin .login-tabs {
  li:last-child {
    transition-delay: 0.1s;
    transition-duration: 0.5s;
    transform: translateX(-100%) scale(1.5);
    span {
      border-color: transparent;
    }
  }
  .login-tabs-or {
    transform: translateX(-58%);
    opacity: 0.8;
  }
  li:first-child {
    transform: scale(0.6);
    opacity: 0.4;
  }
}

.login-signup .login-tabs {
  li:first-child {
    transition-delay: 0.1s;
    transition-duration: 0.5s;
    transform: translateX(100%) scale(1.5);
    span {
      border-color: transparent;
    }
  }
  .login-tabs-or {
    transform: translateX(58%);
    opacity: 0.8;
  }
  li:last-child {
    transform: scale(0.6);
    opacity: 0.4;
  }
}

</style>