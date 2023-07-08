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
              <p class="card-subtitle">
                من فضلك قم بإدخال كلمة المرور الجديدة والكود
              </p>
              <form @submit="submitResetPassword">
                <div>
                  <input
                    type="password"
                    id="password"
                    class="authInput"
                    placeholder="كلمة المرور الجديدة"
                    v-model="password"
                  />
                  <p v-if="passwordError" class="error-message">
                    {{ passwordError }}
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    id="code"
                    class="authInput"
                    placeholder="الكود"
                    v-model="code"
                  />
                  <p v-if="codeError" class="error-message">{{ codeError }}</p>
                </div>
                <p v-if="errorMessage" class="error-message">
                  {{ errorMessage }}
                </p>
                <div>
                  <button type="submit" class="authBtn">إرسال</button>
                </div>
              </form>
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
import Swal from "sweetalert2";
import Axios from "../../Axios";
import { useRouter } from "vue-router";
import * as Yup from "yup";

export default {
  name: "ResetPasswordPage",
  data() {
    return {
      password: "",
      code: "",
      passwordError: "",
      codeError: "",
      errorMessage: "",
    };
  },
  methods: {
    submitResetPassword(event) {
      event.preventDefault();

      const phone = localStorage.getItem("phone");
      const { password, code } = this;

      const resetPasswordSchema = Yup.object().shape({
        password: Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
            "يجب أن تحتوي كلمة المرور على حرف صغير وحرف كبير وحرف خاص ورقم وأن تكون 8 أحرف على الأقل"
          )
          .required("يرجى إدخال كلمة المرور"),
        code: Yup.string().required("يرجى إدخال الكود"),
      });

      resetPasswordSchema
        .validate({ password, code }, { abortEarly: false })
        .then(() => {
          // Validation successful
          Axios.post("/auth/reset_password", {
            phone,
            password,
            code,
          })
            .then(() => {
              this.errorMessage = "";
              Swal.fire({
                icon: "success",
                title: "تم تغيير كلمة المرور بنجاح",
              }).then(() => {
                localStorage.removeItem("phone");
                this.$router.push("/login");
              });
            })
            .catch((error) => {
              console.log("Failed.. " + error);
              this.errorMessage =
                "فشل في إعادة تعيين كلمة المرور، تحقق من الكود مرة أخرى";
              this.codeError="";
              this.passwordError="";
            });
        })
        .catch((error) => {
          if (error.inner) {
            // Validation failed
            const errorMessages = error.inner.reduce((messages, innerError) => {
              messages[innerError.path] = innerError.message;
              return messages;
            }, {});
            this.passwordError = errorMessages["password"] || "";
            this.codeError = errorMessages["code"] || "";
            this.errorMessage ="";
          }
        });
    },
  },
};
</script>
