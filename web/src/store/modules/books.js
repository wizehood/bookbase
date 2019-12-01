import axios from "axios";
import router from "../../router";
import API from "../../api";

const initialState = () => ({
  books: [],
  //leave in cache recently viewed item
  book: null,
  error: null
});

const state = initialState();

const actions = {
  getAllItems({ rootState, commit }) {
    commit("setNotification");
    axios
      .get(`${API}/books`, {
        headers: { "x-auth-token": rootState.auth.token }
      })
      .then(res => {
        commit("setAllItems", res.data);
      })
      .catch(err => {
        console.error(err.response);
        commit("setNotification", { error: "An error occured" });
      });
  },
  toggleItem({ rootState, commit }, book) {
    commit("setNotification");
    axios
      .patch(
        `${API}/books/toggle`,
        { _id: book._id },
        {
          headers: {
            "x-auth-token": rootState.auth.token
          }
        }
      )
      .then(() => commit("setMarkedItem", book))
      .catch(err => {
        console.error(err.response);
        commit("setNotification", { error: "An error occured" });
      });
  },
  editItem(context, book) {
    if (!book.isAvailable) return;
    router.push(`books/${book._id}`);
  },
  removeItem({ rootState, commit }, id) {
    commit("setNotification");
    axios
      .delete(`${API}/books`, {
        headers: {
          "x-auth-token": rootState.auth.token
        },
        data: {
          _id: id
        }
      })
      .then(() => commit("removeItem", id))
      .catch(err => {
        console.error(err.response);
        commit("setNotification", { error: "An error occured" });
      });
  },
  getItem({ rootState, commit }) {
    commit("setNotification");
    axios
      .get(`${API}/books/${router.currentRoute.params.id}`, {
        headers: { "x-auth-token": rootState.auth.token }
      })
      .then(res => {
        commit("setItem", res.data);
      })
      .catch(err => {
        console.error(err.response);
        commit("setNotification", { error: "An error occured" });
      });
  },
  createItem({ rootState, commit }, book) {
    commit("setNotification");
    if (book.title) {
      axios
        .post(
          `${API}/books`,
          book,
          {
            headers: {
              "x-auth-token": rootState.auth.token
            }
          }
        )
        .then(() => router.push("/books"))
        .catch(err => {
          console.error(err.response);
          commit("setNotification", { error: "An error occured" });
        });
    } else {
      commit("setNotification", { error: "Title is mandatory" });
    }
  },
  saveItem({ rootState, commit }, book) {
    commit("setNotification");
    if (book.title) {
      axios
        .patch(
          `${API}/books`,
          book,
          {
            headers: {
              "x-auth-token": rootState.auth.token
            }
          }
        )
        .then(() => router.push("/books"))
        .catch(err => {
          console.error(err.response);
          commit("setNotification", { error: "An error occured" });
        });
    } else {
      commit("setNotification", { error: "Title is mandatory" });
    }
  }
};

const mutations = {
  setAllItems(state, books) {
    state.books = books;
  },
  setMarkedItem(state, book) {
    book.isAvailable = !book.isAvailable;
  },
  removeItem(state, id) {
    state.books = state.books.filter(book => book._id != id);
  },
  setItem(state, book) {
    state.book = book;
  },
  setNotification(state, notification) {
    state.success = notification ? notification.success : null;
    state.error = notification ? notification.error : null;
  },
  resetState(state) {
    Object.assign(state, initialState());
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
