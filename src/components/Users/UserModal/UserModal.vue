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
        <v-card-text v-else> user add form </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            dark
            color="#EF233C"
            class="buttonClass text-capitalize px-7"
            height="48px"
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
export default {
  name: "UserModal",
  data() {
    return {
      loading: false,
      formLoading: false,
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
  watch: {},
  methods: {
    ...mapActions({
      toggleUserModal: "users/toggleUserModal",
    }),
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
