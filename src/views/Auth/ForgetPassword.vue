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

export default {
  name: "ForgetPasswordPage",
  components: {
    AuthComponent,
  },
  data() {
    return {
      phone: "",
      errorMessage: "",
      authConditionText: "",
      authConditionLink: "",
      authConditionLinkText: "",
    };
  },
  methods: {
    submitForgetPassword() {
      Axios.post("/auth/send_code", {
        phone: this.phone,
      })
        .then(() => {
          this.errorMessage = "";
          this.showSuccessModal();
        })
        .catch((error) => {
          console.log("Failed.. " + error);
          this.errorMessage = "Failed to reset password";
        });
    },
    showSuccessModal() {
      // Show the success modal here
      this.errorMessage = "تم إرسال الكود بنجاح";

      // Wait for 5 seconds and redirect to /codeVerification page
      setTimeout(() => {
        this.errorMessage = "";
        this.$router.push("/codeVerification");
      }, 5000);
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
