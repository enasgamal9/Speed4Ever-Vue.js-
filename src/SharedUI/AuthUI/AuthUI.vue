<template>
  <div class="containerAuth">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5 formAuth">
            <div class="card-body">
              <img
                src="../../../public/images/logoWithTitle.svg"
                alt="Speed4Ever Auth"
                class="logo"
              />
              <h2 class="card-title text-center">{{ title }}</h2>
              <h5 class="card-subtitle text-center mb-4">{{ subtitle }}</h5>
              <form @submit.prevent="submitForm">
                <div
                  v-for="(input, index) in inputs"
                  :key="index"
                  class="form-group"
                >
                  <input
                    :type="input.type"
                    class="form-control authInput"
                    :id="input.id"
                    :placeholder="input.placeholder"
                    :value="input.vModel"
                    @input="
                      $emit(
                        'update:inputs',
                        inputs.map((input, i) =>
                          i === index
                            ? { ...input, vModel: $event.target.value }
                            : input
                        )
                      )
                    "
                  />
                </div>
                <span v-html="authSpan" class="authSpan"></span>
                <button
                  type="submit"
                  class="btn btn-primary btn-block mt-4 authBtn"
                >
                  {{ button }}
                </button>
                <h3 class="authConditionText">{{ authConditionText }}</h3>
                <a
                  v-if="authConditionLink"
                  :href="authConditionLink"
                  class="authConditionLink"
                  >{{ authConditionLinkText }}</a
                >
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    inputs: {
      type: Array,
      required: true,
    },
    authSpan: {
      type: String,
    },
    button: {
      type: String,
      required: true,
    },
    authConditionText: {
      type: String,
    },
    authConditionLink: {
      type: String,
    },
    authConditionLinkText: {
      type: String,
    },
  },
  methods: {
    submitForm() {
      const formData = {};
      this.inputs.forEach((input) => {
        formData[input.id] = input.vModel;
      });
      this.$emit("submit", formData);
    },
  },
};
</script>

<style scoped>
.containerAuth {
  background-color: #fbf9f4;
  height: 100vh;
  background-image: url("../../../public/images/auth.png");
  background-repeat: no-repeat;
  background-size: 30%;
  background-position-y: 80%;
  background-position-x: 2%;
  direction: rtl;
}
.formAuth {
  border-radius: 25px;
  border-color: white;
  padding: 15px;
  margin-bottom: 50px;
}
.authInput {
  border: none;
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.043);
  width: 80%;
  margin-right: 10%;
  margin-top: 40px;
}
.authSpan {
  direction: rtl;
  text-align: right !important;
}
.authBtn {
  width: 40%;
  background-color: #6c98a2;
  border-radius: 50px;
  border-color: #6c98a2;
  padding: 10px;
  font-size: 20px;
  margin-right: 30%;
}

.authBtn:hover {
  color: #6c98a2;
  background-color: white;
  border: #6c98a2 solid 1px;
}

.card-title {
  font-size: 22px;
  font-weight: 700;
}

.card-subtitle {
  font-size: 20px;
  color: #8d8d8d;
  margin-top: 15px;
  margin-bottom: 15px;
}

.logo {
  margin-left: 35%;
  margin-bottom: 30px;
}
.authConditionText {
  text-align: right;
  margin-top: 25px;
  font-size: 18px;
  color: gray;
  display: inline-block;
}
.authConditionLink {
  text-decoration: none;
  color: #6c98a2;
  font-weight: 600;
  margin-right: 2%;
  padding-left: 22%;
}
</style>
