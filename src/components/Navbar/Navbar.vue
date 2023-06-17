<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink to="/">الرئيسية</RouterLink>
    <RouterLink to="/about">من نحن</RouterLink>
    <RouterLink to="/favorites">المفضلة</RouterLink>
    <RouterLink to="/auth">سجل الآن</RouterLink>
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
