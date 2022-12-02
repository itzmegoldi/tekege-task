<template>
  <div>
    <v-dialog
      v-model="show"
      persistent
      width="450"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title class="d-flex justify-end">
          <v-btn text @click="toggleUserModal({ show: false })">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="loading">
          <div class="text-center" style="min-height: 500px">
            <v-progress-circular
              :size="100"
              :width="10"
              color="#EF233C"
              indeterminate
              style="
                text-align: center;
                padding-top: 20px;
                padding-bottom: 20px;
                margin-top: 200px;
              "
            ></v-progress-circular>
          </div>
        </v-card-text>
        <v-card-text v-else>
          <v-form class="pt-5" lazy-validation ref="userForm">
            <v-row no-gutters>
              <v-col cols="6" class="pr-2">
                <v-text-field
                  v-model="firstName"
                  label="Enter First Name"
                  height="42px"
                  class="inputField"
                  :disabled="formLoading"
                  :rules="[rules.required]"
                  outlined
                >
                  <template v-slot:label>
                    <div>
                      <span style="color: #ef233c; font-size: 20">* </span>Enter
                      First Name
                    </div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6" class="pl-2">
                <v-text-field
                  v-model="lastName"
                  label="Enter Last Name"
                  height="42px"
                  class="inputField"
                  :disabled="formLoading"
                  :rules="[rules.required]"
                  outlined
                >
                  <template v-slot:label>
                    <div>
                      <span style="color: #ef233c; font-size: 20">* </span>Enter
                      Last Name
                    </div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6" class="pr-2">
                <v-text-field
                  v-model="loginID"
                  label="Login ID"
                  height="42px"
                  class="inputField"
                  :disabled="formLoading"
                  :rules="[rules.required, rules.email]"
                  outlined
                >
                  <template v-slot:label>
                    <div>
                      <span style="color: #ef233c; font-size: 20">* </span>Login
                      ID
                    </div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6" class="pl-2">
                <v-text-field
                  v-model="password"
                  label="Enter Password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  height="42px"
                  class="inputField"
                  :type="showPassword ? 'text' : 'password'"
                  :disabled="formLoading"
                  :rules="[rules.required]"
                  @click:append="showPassword = !showPassword"
                  outlined
                >
                  <template v-slot:label>
                    <div>
                      <span style="color: #ef233c; font-size: 20">* </span>Enter
                      Password
                    </div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6" class="pr-2">
                <v-text-field
                  v-model="phone"
                  label="Phone"
                  height="42px"
                  class="inputField"
                  maxlength="10"
                  :disabled="formLoading"
                  :rules="[rules.phone_optional]"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="6" class="pl-2">
                <v-select
                  v-model="role"
                  label="Role"
                  :items="roleList"
                  height="42px"
                  class="inputField"
                  maxlength="10"
                  :disabled="formLoading"
                  :rules="[rules.required]"
                  outlined
                >
                  <template v-slot:label>
                    <div>
                      <span style="color: #ef233c; font-size: 20">* </span>Role
                    </div>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="timezone"
                  label="Timezone"
                  :items="timezoneList"
                  height="42px"
                  class="inputField"
                  maxlength="10"
                  :disabled="formLoading"
                  :rules="[rules.required]"
                  outlined
                >
                  <template v-slot:label>
                    <div>
                      <span style="color: #ef233c; font-size: 20">* </span
                      >Timezone
                    </div>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            dark
            color="#EF233C"
            class="buttonClass text-capitalize px-7"
            height="48px"
            :loading="formLoading"
            @click="submitForm"
          >
            <span>Submit</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import RULES from "@/common/fieldRules";
import apiUrl from "@/constant/apiUrls";
import authToken from "@/common/authToken";

export default {
  name: "UserModal",
  data() {
    return {
      loading: false,
      formLoading: false,
      showPassword: false,
      rules: RULES,
      firstName: "",
      lastName: "",
      loginID: "",
      password: "",
      phone: "",
      role: "",
      roleList: ["administrative", "caller"],
      timezone: "",
      timezoneList: [
        "Africa/Abidjan",
        "Asia/Kolkata",
        "Asia/Karachi",
        "America/Nassau",
      ],
    };
  },
  computed: {
    ...mapGetters({
      getUserModalShow: "users/getShow",
    }),
    show: {
      get() {
        return this.getUserModalShow;
      },
      set(value) {
        this.toggleUserModal({ show: value });
      },
    },
  },
  watch: {
    show(value) {
      if (value) {
        this.openModal();
      } else {
        this.closeModal();
      }
    },
  },
  methods: {
    ...mapActions({
      toggleUserModal: "users/toggleUserModal",
      showToast: "snackBar/showToast",
    }),
    openModal() {},
    closeModal() {
      this.loading = false;
      this.formLoading = false;
      this.showPassword = false;
      this.rules = RULES;
      this.firstName = "";
      this.lastName = "";
      this.loginID = "";
      this.password = "";
      this.phone = "";
      this.role = "";
      this.roleList = ["administrative", "caller"];
      this.timezone = "";
      this.timezoneList = [
        "Africa/Abidjan",
        "Asia/Kolkata",
        "Asia/Karachi",
        "America/Nassau",
      ];
      this.$refs.userForm.reset();
    },
    submitForm() {
      if (this.$refs.userForm.validate()) {
        this.formLoading = true;
        let formData = {};
        formData["first_name"] = this.firstName;
        formData["last_name"] = this.lastName;
        formData["login_id"] = this.loginID;
        formData["password"] = this.password;
        if (this.phone) {
          formData["phone"] = this.phone;
        }
        formData["role"] = this.role;
        formData["timezone"] = this.timezone;

        this.tokenAxios
          .post(apiUrl.USERS_API, formData, {})
          .then((res) => {
            console.log(res);
            this.formLoading = false;
            this.toggleUserModal({ show: false });
            this.showToast({
              message: "User added successfully",
              color: "s",
            });
          })
          .catch((error) => {
            console.log(error);
            authToken.errorHandler(error.response);
            this.formLoading = false;
          });
      }
    },
  },
};
</script>
<style scoped>
.buttonClass {
  border-radius: 8px;
}
.buttonClass >>> span {
  letter-spacing: 0px;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  color: #ffffff;
}
</style>
