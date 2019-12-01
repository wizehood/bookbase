import axios from "axios";
import router from "../../router";
import API from "../../api";

const initialState = () => ({
  token: null,
  success: null,
  error: null
});

const state = initialState();

const getters = {
  isLoggedIn: state => !!state.token
};

const actions = {
  register({ commit }, user) {
    commit("setNotification");
    if (user.email && user.password) {
      axios
        .post(`${API}/auth`, user)
        .then(() =>
          commit("setNotification", { success: "User registered successfully" })
        )
        .then(() => new Promise(resolve => setTimeout(resolve, 2000)))
        .then(() => commit("setNotification"))
        .then(() => router.push("/login"))
        .catch(err => {
          console.error(err.response);
          commit("setNotification", { error: "An error occured" });
        });
    } else {
      commit("setNotification", { error: "Email and password are mandatory" });
    }
  },
  login({ commit }, user) {
    commit("setNotification");
    if (user.email && user.password) {
      axios
        .post(`${API}/auth/me`, user)
        .then(res => commit("setToken", res.data))
        .then(() => router.push("/books"))
        .catch(err => {
          console.error(err.response);
          commit("setNotification", { error: "An error occured" });
        });
    } else {
      commit("setNotification", { error: "Email and password are mandatory" });
    }
  }
};

const mutations = {
  setToken(state, token) {
    state.token = token;
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
  getters,
  actions,
  mutations
};
