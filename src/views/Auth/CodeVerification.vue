<template>
  <div>
    <AuthComponent
      title="تحقق من الكود"
      subtitle="الرجاء إدخال رمز التحقق المكون من 5 أرقام"
      :inputs="[
        {
          id: 'verificationCode',
          type: 'text',
          placeholder: 'رمز التحقق',
          required: true,
          vModel: verificationCode,
        },
      ]"
      :authSpan="authSpan"
      button="تحقق"
      @submit="submitVerificationCode"
      authConditionText="ليس لديك رمز التحقق؟"
      authConditionLinkText="إعادة إرسال الكود"
      authConditionLink="/resend-code"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import AuthComponent from "../../SharedUI/AuthUI/AuthUI.vue";
import Axios from "../../Axios";

export default {
  name: "VerificationCodePage",
  components: {
    AuthComponent,
  },
  data() {
    return {
      verificationCode: "",
      errorMessage: "",
      authConditionText: "",
      authConditionLink: "",
      authConditionLinkText: "",
    };
  },
  methods: {
    submitVerificationCode() {
      console.log("verificationCode:", verificationCode);
      Axios.post("/auth/check_code", {
        verificationCode: this.verificationCode,
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
