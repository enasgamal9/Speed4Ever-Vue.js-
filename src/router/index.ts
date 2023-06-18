import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage/HomePage.vue";
import LoginPage from "../views/Auth/Login.vue";
import Registration from "../views/Auth/Registration.vue";
import VerifyAccount from "../views/Auth/VerifyAccount.vue";
import AuthPage from "../views/Auth/AuthPage.vue";
import ForgetPassword from "../views/Auth/ForgetPassword.vue";
import Favorites from "../views/Favorites/Favorites.vue";
import ResetPassword from "../views/Auth/ResetPassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: Registration,
    },
    {
      path: "/verifyAccount",
      name: "verifyAccount",
      component: VerifyAccount,
    },
    {
      path: "/forgetPassword",
      name: "forgetPassword",
      component: ForgetPassword,
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: ResetPassword,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Favorites,
    },
  ],
});

export default router;
