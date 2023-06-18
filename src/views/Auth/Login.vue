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
              <h2 class="card-title">تسجيل دخول إلى حسابك</h2>
              <p class="card-subtitle">من فضلك قم بتسجيل بياناتك لتسجيل الدخول</p>
              <form @submit="submitLogin">
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
                    class="authInput"
                    type="password"
                    id="password"
                    placeholder="كلمة المرور"
                    v-model="formData.password"
                  />
                </div>

                <a href="/forgetPassword" class="authSpan">نسيت كلمة المرور</a>
                <div>
                  <button type="submit" class="authBtn">تسجيل دخول</button>
                </div>
              </form>
              <p v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </p>
              <span class="authSpan">
                ليس لديك حساب؟
                <a href="/register" class="authConditionLink">إنشاء حساب جديد</a>
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
import * as Yup from "yup";

export default {
  name: "LoginPage",
  data() {
    return {
      formData: {
        username: "",
        password: "",
      type: "",
      },
      errorMessage: "",
    };
  },
  mounted() {
    this.formData.device_token = this.getDeviceToken();
    this.type = this.getDeviceType();
  },
  methods: {
    getDeviceToken() {
      return "YOUR_DEVICE_TOKEN";
    },
    submitLogin(event) {
      event.preventDefault();

      const { username, password, device_token } = this.formData;

      const loginSchema = Yup.object().shape({
        username: Yup.string().required("يرجى إدخال اسم المستخدم"),
        password: Yup.string().required("يرجى إدخال كلمة المرور"),
      });

      loginSchema
        .validate({ username, password }, { abortEarly: false })
        .then(() => {
          Axios.post("/auth/login", {
            username,
            password,
            device_token: this.type,
            type: this.type,
          })
            .then((response) => {
              const token = response.data.data.token;
              localStorage.setItem("token", token);
              console.log("Success!");
              this.errorMessage = "";
              window.location.href = "/";
            })
            .catch((error) => {
              console.log("Failed.. " + error);
              this.errorMessage = "بيانات غير صحيحة";
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
    getDeviceType() {
      const userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes("iphone") || userAgent.includes("ipod")) {
        return "ios";
      } else if (userAgent.includes("android")) {
        return "android";
      } else if (
        userAgent.includes("mac") ||
        userAgent.includes("windows") ||
        userAgent.includes("linux")
      ) {
        return "ios";
      } else {
        return "Device type: Unknown";
      }
    },
  },
};
</script>
