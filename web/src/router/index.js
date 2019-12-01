import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";
import UserDetails from "./components/UserDetails";
import PasswordForm from "./components/PasswordForm";
import store from "./../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/login",
      component: LoginForm
    },
    {
      path: "/register",
      component: RegisterForm
    },
    {
      path: "/account",
      component: UserDetails,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account/password",
      component: PasswordForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/books/create",
      component: BookForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/books/:id",
      component: BookDetails,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/books",
      component: BookList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      component: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isloggedIn = store.getters["auth/isLoggedIn"];
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isloggedIn) {
      next();
    } else {
      next("/login");
    }
  } else {
    if (isloggedIn) {
      next("/books");
    } else {
      next();
    }
  }
});

export default router;
