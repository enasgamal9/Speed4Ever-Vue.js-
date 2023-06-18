<template>
    <div>
      <AuthComponent
        title="تأكيد الحساب"
        subtitle="الرجاء إدخال رمز التحقق المكون من 5 أرقام"
        :inputs="[
          {
            id: 'phone',
            type: 'text',
            placeholder: 'رقم الجوال',
            required: true,
            vModel: phone,
          },
          {
            id: 'code',
            type: 'text',
            placeholder: 'رمز التحقق',
            required: true,
            vModel: code,
          },
        ]"
        :authSpan="authSpan"
        button="تحقق"
        @submit="submitCode"
        :authConditionText="authConditionText"
        :authConditionLinkText="codeResent ? 'تم إعادة إرسال الكود' : 'إعادة إرسال الكود'"
        authConditionLink="#"
        @authConditionLinkClick="resendCode"
      />
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import AuthComponent from "../../SharedUI/AuthUI/AuthUI.vue";
  import Axios from "../../Axios";
  
  export default {
    name: "VerifyAccount",
    components: {
      AuthComponent,
    },
    data() {
      return {
        code: "",
        phone: "",
        errorMessage: "",
        authConditionText: "ليس لديك رمز التحقق؟",
        authConditionLinkText: "إعادة إرسال الكود",
        codeResent: false,
      };
    },
    methods: {
      submitCode() {
        console.log("code:", this.code);
        console.log("phone:", this.phone);
        Axios.post("/auth/verify", {
          code: this.code,
          phone: this.phone,
        })
          .then((response) => {
            console.log("Code verification successful!");
            this.errorMessage = "";
          })
          .catch((error) => {
            console.log("Failed.. " + error);
            this.errorMessage = "Failed to verify code";
          });
      },
      resendCode() {
        Axios.post("/auth/send_code", { phone: this.phone })
          .then((response) => {
            console.log("Code resent successfully!");
            this.errorMessage = "";
            this.codeResent = true;
          })
          .catch((error) => {
            console.log("Failed to resend code.. " + error);
            this.errorMessage = "Failed to resend code";
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
  