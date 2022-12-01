<template>
  <div class="pt-12 px-4">
    <div class="heading-text">Admin Dashboard</div>
    <div class="subHeading-text my-5">
      Welcome back! Please login to your account.
    </div>
    <div>
      <v-form lazy-validation ref="authForm">
        <v-row no-gutter>
          <v-col cols="12" class="py-0">
            <v-text-field
              outlined
              label="User Name"
              v-model="userName"
              :rules="[rules.required]"
              class="textField-LoginField"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              outlined
              label="Enter Password"
              class="textField-LoginField"
              v-model="password"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              @keyup.enter="submitLoginForm"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-1">
            <v-btn
              block
              dark
              class="login-btn py-7 rounded-lg"
              style=""
              color="#D30024"
              @click="submitLoginForm"
              ref="submitBtn"
              :loading="formLoading"
            >
              <span class="text-loginBtn">Login</span>
              <v-icon right size="30" black> mdi-chevron-right </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>
<script>
import RULES from "@/common/fieldRules";
import { ROUTER_URL } from "@/constant/urls";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      rules: RULES,
      userName: "",
      password: "",
      showPassword: false,
      formLoading: false,
      requestUrl: "https://qa5.devaavaz.biz/361-api/v3/users/auth",
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitLoginForm() {
      if (this.$refs.authForm.validate()) {
        this.formLoading = true;
        let basicAuthCredentials =
          "Basic " + btoa(`${this.userName}:${this.password}`);
        let headers = {};
        headers["Content-Type"] = "application/json;charset=UTF-8";
        headers["Authorization"] = basicAuthCredentials;
        this.authAxios
          .post(this.requestUrl, {}, { headers: headers })
          .then((res) => {
            console.log(res, "success res");
            this.formLoading = false;
            localStorage.setItem("token", res.data.auth_token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this.$router.push(
              ROUTER_URL.task.link + ROUTER_URL.task.children.users.link
            );
          })
          .catch((error) => {
            console.log(error, "error");
            this.formLoading = false;
          });
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.heading-text {
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 43px;
  color: #2c2c2c;
}
.subHeading-text {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
  color: rgba(0, 0, 0, 0.6);
}
.textField-LoginField {
  z-index: 99;
}
.textField-LoginField >>> .v-input__slot {
  background-color: #f7f7f7 !important;
  /* border: 1px solid; */
  border-color: #c1bbbb;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}

.textField-LoginField >>> input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #f7f7f7 inset;
}

.textField-LoginField >>> .v-label {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  color: #afafaf;
}
.login-btn {
  z-index: 99;
}
.login-btn >>> .text-loginBtn {
  text-transform: none;
  letter-spacing: 0ch;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 161.5%;
  color: #ffffff;
}
</style>
