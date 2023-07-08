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
              <h2 class="card-title">استعادة كلمة المرور</h2>
              <p class="card-subtitle">من فضلك قم بإدخال رقم الجوال الخاص بك</p>
              <form @submit="submitForgetPassword">
                <div>
                  <input
                    type="text"
                    id="phone"
                    class="authInput"
                    placeholder="رقم الجوال"
                    v-model="phone"
                  />
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
import Swal from 'sweetalert2';
import Axios from "../../Axios";
import { useRouter } from "vue-router";
import * as Yup from "yup";

export default {
  name: "ForgetPasswordPage",
  data() {
    return {
      phone: "",
      errorMessage: "",
    };
  },
  methods: {
    submitForgetPassword(event) {
  event.preventDefault();

  const { phone } = this;

  const forgetPasswordSchema = Yup.object().shape({
    phone: Yup.string().required("يرجى إدخال رقم الجوال"),
  });

  forgetPasswordSchema
    .validate({ phone }, { abortEarly: false })
    .then(() => {
      Axios.post("/auth/send_code", {
        phone,
      })
        .then(() => {
          this.errorMessage = "";
          // Store the phone number in local storage
          localStorage.setItem("phone", phone);
          Swal.fire({
            icon: 'success',
            text: 'تم إرسال كود إلى هاتفك برجاء التحقق منه ثم التوجه لصفحة تغيير كلمة المرور',
            confirmButtonText: 'حسنًا',
          }).then(() => {
            this.$router.push("/resetPassword");
          });
        })
        .catch((error) => {
          console.log("Failed.. " + error);
          this.errorMessage = "يرجى إدخال رقم الجوال الخاص بحسابك بشكل صحيح";
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
