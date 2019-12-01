<template>
  <div class="list-container">
    <div class="ui divided list" v-if="books.length">
      <div class="item" v-for="book in books" :key="book._id">
        <div class="right floated content">
          <div class="ui button" @click="toggleItem(book)">
            <span v-if="book.isAvailable">Borrow</span>
            <span v-else>Return</span>
          </div>
          <div class="ui button" @click="editItem(book)">Edit</div>
          <div class="ui button" @click="removeItem(book._id)">Remove</div>
        </div>
        <div class="title content" :style="!book.isAvailable ? markedStyle : null">
          <b>{{book.title}}</b>
        </div>
      </div>
    </div>
    <div v-else>Book list is empty</div>
    <router-link to="/books/create">
      <button class="ui primary button">Add item</button>
    </router-link>
    <p class="red-text center" v-if="error">{{error}}</p>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers(`books`);

export default {
  name: "BookList",
  data() {
    return {
      markedStyle: {
        "background-color": "indianred",
        color: "white",
        padding: "1px 5px"
      }
    };
  },
  created() {
    this.getAllItems();
  },
  computed: {
    ...mapState(["books", "error"])
  },
  methods: {
    ...mapActions(["getAllItems", "toggleItem", "editItem", "removeItem"])
  }
};
</script>

<style scoped>
.list-container {
  margin: 0 auto;
  width: 50%;
}
.primary.button {
  margin: 20px 0;
}
.item {
  position: relative;
}
.title {
  position: absolute;
  top: 25%;
}
</style>