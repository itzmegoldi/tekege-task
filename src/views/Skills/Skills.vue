<template>
  <div class="pa-7">
    <v-data-table
      :headers="headers"
      :loading="loading"
      loading-text="Please wait ....Loading"
      :items="items"
      :items-per-page="item_per_page"
      :server-items-length="item_per_page"
      hide-default-footer
      mobile-breakpoint
      class="dataTable elevation-8"
    >
      <template v-slot:progress>
        <v-progress-linear
          bottom
          indeterminate
          color="#EF233C"
        ></v-progress-linear>
      </template>
      <template v-slot:top>
        <v-row>
          <v-col cols="12" class="d-flex justify-end px-6 pb-6">
            <v-btn
              color="#EF233C"
              class="text-capitalize btn px-7"
              @click="toggleSkillsModal({ show: true })"
            >
              add skills
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item="props">
        <tr>
          <td class="text-center">
            <div class="title">{{ props.item.name }}</div>
          </td>
          <td class="text-center">
            <div class="title">{{ props.item.description }}</div>
          </td>
          <td class="text-center">
            <div class="title">{{ props.item.category_id }}</div>
          </td>
        </tr>
      </template>
      <template v-slot:footer>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            class="d-flex px-4"
            :class="$vuetify.breakpoint.xsOnly ? 'justify-center' : ''"
          >
            <div style="width: 75px" class="alignSelf-center">
              <v-select
                :items="itemsPerPageList"
                v-model="item_per_page"
                hide-details
                outlined
                dense
                solo
                flat
                color="#EF233C"
              ></v-select>
            </div>
          </v-col>
          <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
          <v-col
            cols="12"
            sm="4"
            class="d-flex"
            :class="
              $vuetify.breakpoint.xsOnly ? 'justify-center' : 'justify-end'
            "
          >
            <v-pagination
              v-model="page_number"
              :length="total_page"
              :total-visible="5"
              color="#D30024"
              class="pagination"
            >
            </v-pagination>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import apiUrl from "@/constant/apiUrls";
import authToken from "@/common/authToken";
import tableHeaders from "@/common/tableHeaders";
import { mapActions } from "vuex";
export default {
  name: "Skills",
  data() {
    return {
      loading: false,
      users: [],
      itemsPerPageList: [10, 15, 20, 30, 50, 100],
      item_per_page: 10,
      page_number: 1,
      total_page: 1,
      items: [],
      headers: tableHeaders.skillsTable,
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions({
      toggleSkillsModal: "skills/toggleSkillsModal",
      showToast: "snackBar/showToast",
    }),
    getSkills() {
      this.loading = true;
      let formData = {};
      formData["include"] = "categories";
      formData["query"] = "queue_id:3";

      this.tokenAxios
        .get(apiUrl.SKILLS_API, { params: formData }, {})
        .then((res) => {
          console.log(res);
          this.items = res.data;
          // this.page_number = parseInt(res.headers["x-pagination-page"]);
          // this.total_page = parseInt(res.headers["x-pagination-page-count"]);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          authToken.errorHandler(error.response);
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getSkills();
  },
};
</script>
<style scoped>
.alignSelf-center {
  align-self: center;
}
.btn {
  border-radius: 8px;
}
.btn >>> span {
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
  letter-spacing: 0px;
}
</style>
<style>
.tableHeader-text {
  font-family: Source Sans Pro !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  line-height: 18px !important;
  /* identical to box height */

  text-transform: uppercase;

  color: #333333 !important;
}
.tableHeader-bg {
  background: #e0e2f0 !important;
}
</style>
