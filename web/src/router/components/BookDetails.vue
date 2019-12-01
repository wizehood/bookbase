<template>
  <div v-if="book" class="form-container">
    <form class="ui form" @submit.prevent="saveItem(book)">
      <div class="field">
        <label>Title</label>
        <input type="text" v-model="book.title" name="title" v-focus />
      </div>
      <div class="field">
        <label>Author</label>
        <input type="text" v-model="book.author" name="author" />
      </div>
      <div class="three wide field">
        <label>Pages</label>
        <input type="number" min="1" v-model="book.pageNumber" name="pageNumber" />
      </div>
      <div class="field">
        <label>Abstract</label>
        <textarea type="text" v-model="book.description" name="description" rows="5" />
      </div>
      <button class="ui primary button">Save</button>
      <p class="red-text" v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers(`books`);

export default {
  name: "BookDetails",
  created() {
    this.getItem();
  },
  computed: {
    ...mapState(["book", "error"])
  },
  methods: {
    ...mapActions(["getItem", "saveItem"])
  }
};
</script>

<style scoped>
.form-container {
  margin: 0 auto;
  width: 50%;
}
.primary.button {
  margin: 20px 0;
}
</style>