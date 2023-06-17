<template>
  <div>
    <AuthComponent
      title="أهلًا بك"
      subtitle="من فضلك أدخل البيانات التالية لإنشاء حساب جديد"
      :inputs="[
        {
          id: 'username',
          type: 'text',
          placeholder: 'اسم المستخدم',
          required: true,
          vModel: username,
        },
        {
          id: 'email',
          type: 'email',
          placeholder: 'البريد الإلكتروني',
          required: true,
          vModel: email,
        },
        {
          id: 'phone',
          type: 'tel',
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
      ]"
      button="إنشاء حساب"
      @submit="submitRegistration"
      authConditionText="لديك حساب بالفعل؟"
      authConditionLinkText="تسجيل دخول"
      authConditionLink="/login"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import AuthComponent from "../../SharedUI/AuthUI/AuthUI.vue";
import Axios from "../../Axios";

export default {
  name: "Registration",
  components: {
    AuthComponent,
  },
  data() {
    return {
      username: "",
      email: "",
      phone: "",
      password: "",
      errorMessage: "",
      authConditionText: "",
      authConditionLink: "",
      authConditionLinkText: "",
    };
  },
  methods: {
    submitRegistration() {
      Axios.post("/auth/signup", {
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
      })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          console.log("Success!");
          this.errorMessage = "";
        })
        .catch((error) => {
          console.log("Failed.. " + error);
          this.errorMessage = "فشل في إنشاء الحساب";
        });
    },
  },
};
</script>
