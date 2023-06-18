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
              <h2 class="card-title">تأكيد الحساب</h2>
              <p class="card-subtitle">الرجاء إدخال رمز التحقق المكون من 5 أرقام</p>
              <form @submit="submitCode">
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
                    type="text"
                    id="code"
                    class="authInput"
                    placeholder="رمز التحقق"
                    v-model="code"
                  />
                </div>
                <div>
                  <button type="submit" class="authBtn">تحقق</button>
                </div>
              </form>
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              <span class="authSpan">
                {{ authConditionText }}
                <a href="#" class="authConditionLink" @click="resendCode">
                  {{ codeResent ? 'تم إعادة إرسال الكود' : 'إعادة إرسال الكود' }}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Yup from 'yup';
import Axios from "../../Axios";
import { useRouter } from "vue-router";

export default {
  name: "VerifyAccountPage",
  data() {
    return {
      code: "",
      phone: "",
      errorMessage: "",
      codeResent: false,
      type: "",
    };
  },
  mounted() {
    this.type = this.getDeviceType();
    console.log(this.type);
  },
  methods: {
    submitCode(event) {
      event.preventDefault();
      const validationSchema = Yup.object().shape({
        code: Yup.string().required('يجب إدخال رمز التحقق'),
        phone: Yup.string().required('يجب إدخال رقم الجوال'),
        type: Yup.string().required('يجب إدخال نوع الجهاز'),
      });

      validationSchema.validate({ code: this.code, phone: this.phone, type: this.type }) // Include type in validation
        .then(() => {
          Axios.post("/auth/verify", {
            code: this.code,
            phone: this.phone,
            device_token: this.device_token,
            type: this.type,
          })
            .then(() => {
              console.log("Code verification successful!");
              window.location.href("/login");
              this.errorMessage = "";
            })
            .catch((error) => {
              console.log("Failed.. " + error);
              this.errorMessage = "فشل في التحقق من الكود";
            });
        })
        .catch((validationErrors) => {
          this.errorMessage = validationErrors.errors[0];
        });
    },
    resendCode() {
      Axios.post("/auth/send_code", { phone: this.phone, type: this.type }) // Include type in request payload
        .then(() => {
          console.log("Code resent successfully!");
          this.errorMessage = "";
          this.codeResent = true;
        })
        .catch((error) => {
          console.log("Failed to resend code.. " + error);
          this.errorMessage = "فشل في إعادة إرسال الكود";
        });
    },
    getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("iphone") || userAgent.includes("ipod")) {
    return "ios";
  } else if (userAgent.includes("android")) {
    return "android";
  } else if (userAgent.includes("mac") || userAgent.includes("windows") || userAgent.includes("linux")) {
    return "ios";
  } else {
    return "Device type: Unknown";
  }
}


  },
};
</script>