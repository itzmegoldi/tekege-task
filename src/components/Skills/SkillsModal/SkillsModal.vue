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
          <v-btn text @click="toggleSkillsModal({ show: false })">
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
          <v-form class="pt-5" lazy-validation ref="skillForm">
            <v-row no-gutters>
              <v-col cols="6" class="pr-2">
                <v-text-field
                  v-model="name"
                  label="Skill Name"
                  height="42px"
                  class="inputField"
                  :disabled="formLoading"
                  :rules="[rules.required]"
                  outlined
                >
                  <template v-slot:label>
                    <div>
                      <span style="color: #ef233c; font-size: 20">* </span
                      >Skill Name
                    </div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6" class="pl-2">
                <v-text-field
                  v-model="description"
                  label="Description"
                  height="42px"
                  class="inputField"
                  :disabled="formLoading"
                  outlined
                >
                  <!-- <template v-slot:label>
                    <div>
                      <span style="color: #ef233c; font-size: 20">* </span>Enter
                      Last Name
                    </div>
                  </template> -->
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="loginID"
                  label="Category ID"
                  height="42px"
                  class="inputField"
                  :disabled="formLoading"
                  outlined
                >
                  <!-- <template v-slot:label>
                    <div>
                      <span style="color: #ef233c; font-size: 20">* </span>Category
                      ID
                    </div>
                  </template> -->
                </v-text-field>
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
  name: "SkillsModal",
  data() {
    return {
      loading: false,
      formLoading: false,
      showPassword: false,
      rules: RULES,
      name: "",
      description: "",
      category_id: null,
    };
  },
  computed: {
    ...mapGetters({
      getSkillsModalShow: "skills/getShow",
    }),
    show: {
      get() {
        return this.getSkillsModalShow;
      },
      set(value) {
        this.toggleSkillsModal({ show: value });
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
      toggleSkillsModal: "skills/toggleSkillsModal",
      showToast: "snackBar/showToast",
    }),
    openModal() {},
    closeModal() {
      this.loading = false;
      this.formLoading = false;
      this.showPassword = false;
      this.rules = RULES;
      this.name = "";
      this.description = "";
      this.category_id = null;
      this.$refs.skillForm.reset();
    },
    submitForm() {
      if (this.$refs.skillForm.validate()) {
        this.formLoading = true;
        let formData = {};
        formData["name"] = this.name;
        if (this.description) {
          formData["description"] = this.description;
        }
        if (this.category_id) {
          formData["category_id"] = this.category_id;
        }

        this.tokenAxios
          .post(apiUrl.SKILLS_API, formData, {})
          .then((res) => {
            console.log(res);
            this.formLoading = false;
            this.toggleSkillsModal({ show: false });
            this.showToast({
              message: "Skill added successfully",
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
