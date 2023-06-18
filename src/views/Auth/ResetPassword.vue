<template>
    <div>
      <AuthComponent
        title="استعادة كلمة المرور"
        subtitle="من فضلك قم بإدخال رقم الجوال الخاص بك"
        :inputs="[
          {
            id: 'phone',
            type: 'text',
            placeholder: 'رقم الجوال',
            required: true,
            vModel: phone,
          },
          {
            id: 'password',
            type: 'password',
            placeholder: 'كلمة المرور',
            required: true,
            vModel: password,
          },
          {
            id: 'code',
            type: 'text',
            placeholder: 'الكود',
            required: true,
            vModel: code,
          },
        ]"
        :authSpan="authSpan"
        button="إرسال"
        @submit="submitForgetPassword"
        authConditionText="تذكرت كلمة المرور؟"
        authConditionLinkText="تسجيل الدخول"
        authConditionLink="/login"
      />
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import AuthComponent from "../../SharedUI/AuthUI/AuthUI.vue";
  import Axios from "../../Axios";
  import { useRouter } from "vue-router";
  
  export default {
    name: "ResetPassword",
    components: {
      AuthComponent,
    },
    data() {
      return {
        phone: "",
        password: "",
        code: "",
        errorMessage: "",
        authConditionText: "",
        authConditionLink: "",
        authConditionLinkText: "",
      };
    },
    methods: {
      submitForgetPassword() {
        Axios.post("/auth/reset_password", {
          phone: this.phone,
          password: this.password,
          code: this.code,
        })
          .then(() => {
            this.errorMessage = "";
            this.$router.push("/login");
          })
          .catch((error) => {
            console.log("Failed.. " + error);
            this.errorMessage = "Failed to reset password";
          });
      },
    },
  };
  </script>
  
  <style>
  .authSpan {
    color: #6c98a2;
    margin-left: 2%;
  }
  .authSpan:hover {
    text-decoration: none;
    color: #618891;
  }
  </style>
  