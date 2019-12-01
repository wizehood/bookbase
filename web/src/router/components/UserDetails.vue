<template>
  <div v-if="user" class="form-container">
    <form class="ui form" @submit.prevent="saveUser(user)">
      <div class="field">
        <label>First name</label>
        <input type="text" v-model="user.firstName" name="firstName" placeholder="Bruce" v-focus />
      </div>
      <div class="field">
        <label>Last name</label>
        <input type="text" v-model="user.lastName" name="lastName" placeholder="Wayne" />
      </div>
      <div class="field">
        <label>Email</label>
        <input type="text" v-model="user.email" name="email" placeholder="bwayne@company.com" />
      </div>
      <button class="ui primary button" type="submit">Save</button>
      <router-link to="/account/password">
        <button class="ui primary button">Change password</button>
      </router-link>
      <p class="red-text" v-if="error">{{error}}</p>
      <p v-if="success">{{success}}</p>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers(`users`);

export default {
  name: "UserDetails",
  created() {
    this.getUser();
  },
  computed: {
    ...mapState(["user", "success", "error"])
  },
  methods: {
    ...mapActions(["getUser", "saveUser"])
  }
};
</script>

<style scoped>
.form-container {
  margin: 0 auto;
  width: 30%;
}
</style>