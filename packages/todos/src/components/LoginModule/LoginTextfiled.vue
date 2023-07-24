<template>
  <span class="login-textfield">
    <label><i v-if="icon" :class="['fa', `fa-${icon}`]"></i>{{ label }}</label>
    <input v-model="value" :type="type" />
  </span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    type:{
      type:String
    },
    value:{
      type:String
    }
  }
};
</script>

<style lang="scss" scoped>
.login-textfield{
  flex:1;
  display: flex;
  padding: 10px;
  width: 100%;
  border-radius: var(--app-border-radius);
  background-color: #fff;
  box-shadow: 0 1px 1px #0066d0;
  label{
    margin-right: 10px;
    color: #007dff;
  }
  label i {
    width: 20px;
  }
  input {
    flex: 1;
    width: 0;
  padding: 0;
  margin: 0;
    border: none;
    outline: none;
  }
}
</style>