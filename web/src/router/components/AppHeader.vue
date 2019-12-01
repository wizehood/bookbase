<template>
  <div class="ui secondary pointing menu">
    <router-link to="/" class="item" exact>
      <b>BookBase</b>
    </router-link>
    <div class="right menu">
      <div v-if="isLoggedIn" class="horizontal">
        <router-link to="/books" class="item">Books</router-link>
        <router-link to="/account" class="item">Account</router-link>
        <a class="item" @click="logout">Logout</a>
      </div>
      <div v-else class="horizontal">
        <router-link to="/login" class="item">Login</router-link>
        <router-link to="/register" class="item">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers(`auth`);

export default {
  name: "AppHeader",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    logout() {
      this.$store.dispatch("reset");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.menu {
  margin-bottom: 50px;
}
.horizontal {
  display: flex;
  flex-direction: row;
}
.router-link-active {
  border-color: black !important;
}
</style>
