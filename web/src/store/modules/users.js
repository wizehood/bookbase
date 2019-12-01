import axios from "axios";
import router from "../../router";
import API from "../../api";

const initialState = () => ({
  user: null,
  success: null,
  error: null
});

const state = initialState();

const actions = {
  getUser({ rootState, commit }) {
    commit("setNotification");
    axios
      .get(`${API}/users`, {
        headers: { "x-auth-token": rootState.auth.token }
      })
      .then(res => {
        commit("setUser", res.data);
      })
      .catch(err => {
        console.error(err.response);
        commit("setNotification", { error: "An error occured" });
      });
  },
  saveUser({ rootState, commit }, user) {
    commit("setNotification");
    if (user.email) {
      const { firstName, lastName, email } = user;
      axios
        .patch(
          `${API}/users`,
          {
            firstName,
            lastName,
            email
          },
          {
            headers: {
              "x-auth-token": rootState.auth.token
            }
          }
        )
        .then(() =>
          commit("setNotification", { success: "User saved successfully" })
        )
        .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
        .then(() => router.push("/books"))
        .catch(err => {
          console.error(err.response);
          commit("setNotification", { error: "An error occured" });
        });
    } else {
      commit("setNotification", { error: "Email is mandatory" });
    }
  },
  savePassword({ rootState, commit }, password) {
    commit("setNotification");
    if (password) {
      axios
        .patch(
          `${API}/users/password`,
          {
            password
          },
          {
            headers: {
              "x-auth-token": rootState.auth.token
            }
          }
        )
        .then(() =>
          commit("setNotification", { success: "Password saved successfully" })
        )
        .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
        .then(() => router.push("/books"))
        .catch(err => {
          console.error(err.response);
          commit("setNotification", { error: "An error occured" });
        });
    } else {
      commit("setNotification", { error: "Password is mandatory" });
    }
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
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
