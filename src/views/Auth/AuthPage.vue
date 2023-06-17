<template>
  <div>
    <AuthComponent
      title="أهلًا بك"
      subtitle="سجل الآن وتمتع بمميزات وتجربة فريدة من نوعها"
      :authSpan="authSpan"
      button="إنشاء حساب"
      @submit="redirectToRegister"
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
import { useRouter } from "vue-router";

export default {
  name: "AuthPage",
  components: {
    AuthComponent,
  },
  methods: {
    redirectToRegister() {
      this.$router.push("/register");
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
