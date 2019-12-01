<template>
  <div class="form-container">
    <form class="ui form" @submit.prevent="register({firstName, lastName, email, password})">
      <div class="field">
        <label>First name</label>
        <input type="text" v-model="firstName" name="firstName" placeholder="Bruce" v-focus />
      </div>
      <div class="field">
        <label>Last name</label>
        <input type="text" v-model="lastName" name="lastName" placeholder="Wayne" />
      </div>
      <div class="field">
        <label>Email</label>
        <input type="text" v-model="email" name="email" placeholder="bwayne@company.com" />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="password" name="password" />
      </div>
      <button class="ui primary button" type="submit">Register</button>
      <p class="red-text" v-if="error">{{error}}</p>
      <p v-if="success">{{success}}</p>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers(`auth`);

export default {
  name: "RegisterForm",
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
  },
  computed: {
    ...mapState(["success", "error"])
  },
  methods: {
    ...mapActions(["register"])
  }
};
</script>

<style scoped>
.form-container {
  margin: 0 auto;
  width: 30%;
}
</style>