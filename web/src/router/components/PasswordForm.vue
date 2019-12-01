<template>
  <div class="form-container">
    <form class="ui form" @submit.prevent="savePassword(password)">
      <div class="field">
        <label>New password</label>
        <input type="password" v-model="password" name="password" v-focus />
      </div>
      <button class="ui primary button" type="submit">Save</button>
      <p class="red-text" v-if="error">{{error}}</p>
      <p v-if="success">{{success}}</p>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers(`users`);

export default {
  name: "PasswordForm",
  data() {
    return {
      password: null
    };
  },
  computed: {
    ...mapState(["success", "error"])
  },
  methods: {
    ...mapActions(["savePassword"])
  }
};
</script>

<style scoped>
.form-container {
  margin: 0 auto;
  width: 30%;
}
</style>