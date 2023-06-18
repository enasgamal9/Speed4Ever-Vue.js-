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
    <p v-if="errors.length" class="error-message" v-for="error in errors" :key="error">{{ error }}</p>
  </div>
</template>

<script>
import AuthComponent from "../../SharedUI/AuthUI/AuthUI.vue";
import Axios from "../../Axios";
import * as yup from 'yup';

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
      errors: [],
    };
  },
  methods: {
    submitRegistration() {
      const schema = yup.object().shape({
        username: yup.string().required('يرجى إدخال اسم المستخدم'),
        email: yup.string().email('البريد الإلكتروني غير صالح').required('يرجى إدخال البريد الإلكتروني'),
        phone: yup.string().required('يرجى إدخال رقم الجوال'),
        password: yup.string().required('يرجى إدخال كلمة المرور'),
      });

      schema.validate({
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
      })
        .then((values) => {
          Axios.post("/auth/signup", values)
            .then((response) => {
              this.$router.push("/verifyAccount");
            })
            .catch((error) => {
              console.log("Failed.. " + error);
            });
        })
        .catch((validationErrors) => {
          this.errors = validationErrors.errors;
        });
    },
  },
};
</script>
<style scoped>
div{
  background-color: #FBF9F4;
  height: 130vh;

}
</style>