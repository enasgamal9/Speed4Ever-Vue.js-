<template>
  <div class="containerAuth">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="mt-5 formAuth">
            <div class="card-body">
              <img
                src="../../../public/images/logoWithTitle.svg"
                alt="Speed4Ever logo"
                class="logo"
              />
              <h2 class="card-title">أهلًا بك</h2>
              <p class="card-subtitle">
                سجل الآن وتمتع بمميزات وتجربة فريدة من نوعها
              </p>
              <button type="submit" class="authBtn" @click="redirectToRegister">
                إنشاء حساب</button
              ><br /><br />
              <span class="authSpan">
                لديك حساب بالفعل؟
                <a href="/login" class="authConditionLink">تسجيل دخول</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "AuthPage",
  methods: {
    redirectToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
