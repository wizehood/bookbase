<template>
  <div class="form-container">
    <form class="ui form" @submit.prevent="login({email,password})">
      <div class="field">
        <label>Email</label>
        <input type="text" v-model="email" name="email" v-focus />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="password" name="password" />
      </div>
      <button class="ui primary button" type="submit">Login</button>
      <p class="red-text" v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers(`auth`);

export default {
  name: "LoginForm",
  data() {
    return {
      email: null,
      password: null
    };
  },
  computed: {
    ...mapState(["success", "error"])
  },
  methods: {
    ...mapActions(["login"])
  }
};
</script>

<style scoped>
.form-container {
  margin: 0 auto;
  width: 30%;
}
</style>