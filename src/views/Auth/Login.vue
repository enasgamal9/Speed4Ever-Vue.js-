<template>
  <div>
    <AuthComponent
      title="تسجيل دخول إلى حسابك"
      subtitle="من فضلك قم بتسجيل بياناتك لتسجيل الدخول"
      :inputs="[
        { id: 'username', type: 'text', placeholder: 'اسم المستخدم', required: true, vModel: username },
        { id: 'password', type: 'password', placeholder: 'كلمة المرور', required: true, value: password }
      ]"
      :authSpan="authSpan"
      button="تسجيل دخول"
      @submit="submitLogin"
      authConditionText="ليس لديك حساب؟"
      authConditionLinkText="إنشاء حساب جديد"
      authConditionLink="/register"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import AuthComponent from "../../SharedUI/AuthUI/AuthUI.vue";
import Axios from "../../Axios";

export default {
  name: "LoginPage",
  components: {
    AuthComponent,
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      authConditionText: "",
      authConditionLink: "",
      authConditionLinkText: "",
      authSpan: "<a href='/forgetPassword' class='authSpan'>نسيت كلمة المرور</a>"
    };
  },
  methods: {
    submitLogin() {
  console.log('username:', username.value);
  console.log('password:', password.value);
  Axios.post("/auth/login", {
    username: username.value,
    password: password.value,
  })
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem("token", token);
    console.log("Success!");
    this.errorMessage = "";
  })
  .catch((error) => {
    console.log("Failed.. " + error);
    this.errorMessage = "Invalid credentials";
  });
}
  },
};
</script>

<style>
.authSpan{
  color: #6c98a2;
  margin-left: 2%;
}
.authSpan:hover{
  text-decoration: none;
  color: #618891;
}
</style>