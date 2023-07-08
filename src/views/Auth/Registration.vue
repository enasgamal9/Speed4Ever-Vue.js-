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
              <p class="card-subtitle">
                من فضلك أدخل البيانات التالية لإنشاء حساب جديد
              </p>
              <form @submit="submitRegistration">
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
                    type="email"
                    id="email"
                    class="authInput"
                    placeholder="البريد الإلكتروني"
                    v-model="formData.email"
                  />
                  <p v-if="errorMessage.email" class="error-message">
                    {{ errorMessage.email }}
                  </p>
                </div>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    class="authInput"
                    placeholder="رقم الجوال"
                    v-model="formData.phone"
                  />
                  <p v-if="errorMessage.phone" class="error-message">
                    {{ errorMessage.phone }}
                  </p>
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    class="authInput"
                    placeholder="كلمة المرور"
                    v-model="formData.password"
                  />
                  <p v-if="errorMessage.password" class="error-message">
                    {{ errorMessage.password }}
                  </p>
                </div>
                <div>
                  <button type="submit" class="authBtn">إنشاء حساب</button>
                </div>
              </form>
              <span class="authSpan">
                {{ authConditionText }}
                <a :href="authConditionLink" class="authConditionLink">{{
                  authConditionLinkText
                }}</a>
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
  name: "Registration",
  data() {
    return {
      formData: {
        username: "",
        email: "",
        phone: "",
        password: "",
      },
      errorMessage: {},
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
        username: Yup.string()
          .min(2, "يجب أن يكون اسم المستخدم على الأقل 2 أحرف")
          .required("يرجى إدخال اسم المستخدم"),
        email: Yup.string()
          .email("البريد الإلكتروني غير صحيح")
          .test("valid-email", "البريد الإلكتروني غير صحيح", (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;
            return emailRegex.test(value);
          })
          .required("يرجى إدخال البريد الإلكتروني"),
        phone: Yup.string()
          .matches(/^(9665|05)/, "يجب أن يبدأ رقم الجوال بـ 9665 أو 05")
          .matches(/^\d{5,20}$/, "يجب أن يتكون رقم الجوال من 5 إلى 20 رقمًا")
          .required("يرجى إدخال رقم الجوال"),
        password: Yup.string()
          .required("يرجى إدخال كلمة المرور")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
            "يجب أن تحتوي كلمة المرور على حرف صغير وحرف كبير وحرف خاص ورقم وأن تكون 8 أحرف على الأقل"
          ),
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
              this.errorMessage = {};
              Swal.fire({
                icon: "success",
                title: "تم التسجيل بنجاح!",
                text: "يمكنك الآن تفعيل حسابك أو تسجيل الدخول",
                showCancelButton: true,
                confirmButtonText: "تفعيل الحساب",
                cancelButtonText: "تسجيل الدخول",
              }).then((result) => {
                this.errorMessage = {};
                if (result.isConfirmed) {
                  this.$router.push("/verifyAccount");
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  this.$router.push("/login");
                }
              });
            })
            .catch((error) => {
              if (error.response && error.response.data) {
                const { errors } = error.response.data;
                if (errors) {
                  const errorMessage = {};
                  for (const field in errors) {
                    if (errors.hasOwnProperty(field)) {
                      errorMessage[field] = errors[field][0];
                    }
                  }
                  this.errorMessage = errorMessage;
                }
              } else {
                this.errorMessage = "فشل في إنشاء الحساب" ;
              }
              Swal.fire({
                icon: "error",
                title: "فشل في إنشاء الحساب",
                text: error.response.data.message,
                showCancelButton: true,
                cancelButtonText: "حسنًا"
              });
            });
        })
        .catch((error) => {
          if (error.inner) {
            const errorMessage = error.inner.reduce((messages, innerError) => {
              return { ...messages, [innerError.path]: innerError.message };
            }, {});
            this.errorMessage = errorMessage;
          }
        });
    },
  },
};
</script>

<style scoped>
.containerAuth {
  height: 120vh;
  background-color: #f7f5ef;
}
</style>
