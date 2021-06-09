<template>
  <div class="desc">
    <div class="signUp" v-if="type === 'signUp'">
      <p>
        Sign up for Ziel Home
      </p>
      <p>
        Welcome to Ziel Home！Join our Community.
      </p>
    </div>
    <div class="Edit" v-if="type === 'Edit'">
      <p>
        Edit your profile
      </p>
      <p>
        Welcome to Ziel Home！Join our Community.
      </p>
    </div>
    <div class="Login" v-if="type === 'Login'">
      <p>
        Log in for Ziel Home
      </p>
      <p>
        Welcome to Ziel Home！Join our Community.
      </p>
    </div>
    <div class="resetPassword" v-if="type === 'resetPassword'">
      <p>
        Reset password
      </p>
      <p>
        For security reasons, choose one of the following methods to verify your
        current accounts.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Desc",
  props: {
    type: String,
  },
  setup(props) {
    // console.log(props.type);
  },
};
</script>
<style lang="less" scoped>
.desc {
  width: 100%;
  text-align: center;
  overflow: hidden;
  margin: 10px 0 20px 0;
  p:first-child {
    font-weight: bold;
    margin: 10px 0;
    font-size: 20px;
    text-align: center;
    color: #000000;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  p:last-child {
    margin: 8px 0;
    font-size: 16px;
    color: #000000;
  }
}
</style>
