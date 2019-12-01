<template>
  <div class="form-container">
    <form class="ui form" @submit.prevent="createItem({title, author, pageNumber, description})">
      <div class="field">
        <label>Title</label>
        <input type="text" v-model="title" name="title" v-focus />
      </div>
      <div class="field">
        <label>Author</label>
        <input type="text" v-model="author" name="author" />
      </div>
      <div class="three wide field">
        <label>Pages</label>
        <input type="number" min="1" v-model="pageNumber" name="pageNumber" />
      </div>
      <div class="field">
        <label>Abstract</label>
        <textarea type="text" v-model="description" name="description" rows="5" />
      </div>
      <button class="ui primary button" type="submit">Create</button>
      <p class="red-text" v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers(`books`);

export default {
  name: "BookForm",
  data() {
    return {
      title: null,
      author: null,
      pageNumber: null,
      description: null
    };
  },
  computed: {
    ...mapState(["error"])
  },
  methods: {
    ...mapActions(["createItem"])
  }
};
</script>

<style scoped>
.form-container {
  margin: 0 auto;
  width: 50%;
}
</style>