<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Axios from "../../Axios";

let isLoggedIn = false;

// Check if token exists in local storage
const token = localStorage.getItem("token");
if (token) {
  isLoggedIn = true;
}

// Function to handle logout
const logout = async () => {
  try {
    localStorage.removeItem("token");
    window.location.reload();
    await Axios.post("/auth/logout");
    isLoggedIn = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <nav>
    <RouterLink to="/">الرئيسية</RouterLink>
    <RouterLink to="/favorites">المفضلة</RouterLink>
    <a v-if="isLoggedIn" @click="logout">تسجيل خروج</a>
    <RouterLink v-else to="/auth">سجل الآن</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<style scoped>
nav {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: white;
  flex-direction: row-reverse;
}

nav a {
  text-decoration: none;
  color: black;
  font-size: 16px;
  margin: 0 10px;
  padding: 5px 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: #555;
  color: white;
}
</style>
