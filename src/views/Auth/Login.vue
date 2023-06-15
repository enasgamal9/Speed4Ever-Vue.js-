<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label>
        Username:
        <input type="text" v-model="username" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import Axios from "../../Axios";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      Axios.post("/auth/login", {
        username: this.username,
        password: this.password,
      })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
        })
        .catch((error) => {
          console.log("Failed.. " + error);
        });
    },
  },
};
</script>
