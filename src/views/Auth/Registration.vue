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
              <h2 class="card-title">أهلاً بك</h2>
              <p class="card-subtitle">من فضلك أدخل البيانات التالية لإنشاء حساب جديد</p>
              <form @submit="submitRegistration">
                <div>
                  <input
                    type="text"
                    id="username"
                    class="authInput"
                    placeholder="اسم المستخدم"
                    v-model="formData.username"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    class="authInput"
                    placeholder="البريد الإلكتروني"
                    v-model="formData.email"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    class="authInput"
                    placeholder="رقم الجوال"
                    v-model="formData.phone"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    class="authInput"
                    placeholder="كلمة المرور"
                    v-model="formData.password"
                  />
                </div>
                <div>
                  <button type="submit" class="authBtn">إنشاء حساب</button>
                </div>
              </form>
              <p v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </p>
              <span class="authSpan">
                {{ authConditionText }}
                <a :href="authConditionLink" class="authConditionLink">{{ authConditionLinkText }}</a>
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
  name: "Registration",
  data() {
    return {
      formData: {
        username: "",
        email: "",
        phone: "",
        password: "",
      },
      errorMessage: "",
      authConditionText: "لديك حساب بالفعل؟",
      authConditionLinkText: "تسجيل دخول",
      authConditionLink: "/login",
    };
  },
  methods: {
    submitRegistration(event) {
      event.preventDefault();

      const { username, email, phone, password } = this.formData;

      const registrationSchema = Yup.object().shape({
        username: Yup.string().required("يرجى إدخال اسم المستخدم"),
        email: Yup.string()
          .email("البريد الإلكتروني غير صحيح")
          .required("يرجى إدخال البريد الإلكتروني"),
        phone: Yup.string().required("يرجى إدخال رقم الجوال"),
        password: Yup.string().required("يرجى إدخال كلمة المرور"),
      });

      registrationSchema
        .validate({ username, email, phone, password }, { abortEarly: false })
        .then(() => {
          Axios.post("/auth/signup", {
            username,
            email,
            phone,
            password,
          })
            .then((response) => {
              console.log("Success!");
              this.errorMessage = "";
              this.$router.push("/verifyAccount");
            })
            .catch((error) => {
              console.log("Failed.. " + error);
              this.errorMessage = "فشل في إنشاء الحساب";
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

<style scoped>
  .containerAuth{
    height: 120vh;
    background-color: #f7f5ef;
  }
</style>