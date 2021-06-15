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
        Welcome to Ziel Home！Join our Community
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
  p:first-child {
    font-size: 28px;
    font-family: Roboto-Medium, Roboto;
    font-weight: 500;
    color: #333333;
    line-height: 33px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 23px;
  }
  p:last-child {
    font-size: 18px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #666666;
    line-height: 21px;
  }
}
</style>
