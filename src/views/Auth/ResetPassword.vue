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
              <h2 class="card-title">إعادة تعيين كلمة المرور</h2>
              <p class="card-subtitle">من فضلك قم بإدخال رقم الجوال وكلمة المرور الجديدة والكود</p>
              <form @submit="submitResetPassword">
                <div>
                  <input
                    type="text"
                    id="phone"
                    class="authInput"
                    placeholder="رقم الجوال"
                    v-model="phone"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    class="authInput"
                    placeholder="كلمة المرور الجديدة"
                    v-model="password"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="code"
                    class="authInput"
                    placeholder="الكود"
                    v-model="code"
                  />
                </div>
                <div>
                  <button type="submit" class="authBtn">إرسال</button>
                </div>
              </form>
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              <span class="authSpan">
                تذكرت كلمة المرور؟
                <a href="/login" class="authConditionLink">تسجيل الدخول</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "../../Axios";
import { useRouter } from "vue-router";
import * as Yup from "yup";

export default {
  name: "ResetPasswordPage",
  data() {
    return {
      phone: "",
      password: "",
      code: "",
      errorMessage: "",
    };
  },
  methods: {
    submitResetPassword(event) {
      event.preventDefault();

      const { phone, password, code } = this;

      const resetPasswordSchema = Yup.object().shape({
        phone: Yup.string().required("يرجى إدخال رقم الجوال"),
        password: Yup.string().required("يرجى إدخال كلمة المرور الجديدة"),
        code: Yup.string().required("يرجى إدخال الكود"),
      });

      resetPasswordSchema
        .validate({ phone, password, code }, { abortEarly: false })
        .then(() => {
          Axios.post("/auth/reset_password", {
            phone,
            password,
            code,
          })
            .then(() => {
              this.errorMessage = "";
              this.$router.push("/login");
            })
            .catch((error) => {
              console.log("Failed.. " + error);
              this.errorMessage = "فشل في إعادة تعيين كلمة المرور";
            });
        })
        .catch((error) => {
          if (error.inner) {
            const errorMessage = error.inner.reduce(
              (message, innerError) => `${message}${innerError.message}\n`,
              ""
            );
            this.errorMessage = errorMessage.trim();
          }
        });
    },
  },
};
</script>
