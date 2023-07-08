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
                  <p v-if="errorMessage.username" class="error-message">
                    {{ errorMessage.username }}
                  </p>
                </div>
                <div>
                  <input
                    class="authInput"
                    type="password"
                    id="password"
                    placeholder="كلمة المرور"
                    v-model="formData.password"
                  />
                  <p v-if="errorMessage.password" class="error-message">
                    {{ errorMessage.password }}
                  </p>
                </div>
                <p v-if="errorMessage.message" class="error-message">
                  {{ errorMessage.message }}
                </p>
                <a href="/forgetPassword" class="authSpan">نسيت كلمة المرور</a>
                <div>
                  <button type="submit" class="authBtn">تسجيل دخول</button>
                </div>
              </form>
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
      errorMessage: {
        username: "",
        password: "",
        message: "",
      },
    };
  },
  mounted() {
    this.formData.device_token = this.getDeviceToken();
    this.formData.type = this.getDeviceType();
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
            device_token: this.formData.type,
            type: this.formData.type,
          })
            .then((response) => {
              const token = response.data.data.token;
              localStorage.setItem("token", token);
              console.log("Success!");
              this.errorMessage = {};
              window.location.href = "/";
            })
            .catch((error) => {
              this.errorMessage.message = "بيانات غير صحيحة";
              this.errorMessage.username = "";
            this.errorMessage.password = "";
            });
        })
        .catch((error) => {
          this.errorMessage = {};

          if (error.inner) {
            error.inner.forEach((innerError) => {
              this.errorMessage[innerError.path] = innerError.message;
            });
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
