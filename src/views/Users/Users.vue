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
              @click="toggleUserModal({ show: true })"
            >
              <span>add user</span>
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item="props">
        <tr>
          <td class="text-center py-2">
            <div>
              <div class="title">
                {{ props.item.first_name }} {{ props.item.last_name }}
              </div>
              <div class="subTitle">{{ props.item.login_id }}</div>
              <div class="subTitle">{{ props.item.phone }}</div>
            </div>
          </td>
          <td class="text-center">
            <div class="title">{{ props.item.role }}</div>
          </td>
          <td class="text-center">
            <div class="title">
              {{ props.item.timezone }}
            </div>
          </td>
          <td class="text-center">
            <v-btn
              text
              style="padding: 0 0 0px !important; min-width: 0px !important"
              @click="deleteUser(props.item.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:footer>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            class="d-flex pl-10"
            :class="
              $vuetify.breakpoint.xsOnly ? 'justify-center' : 'justify-start'
            "
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
import _ from "lodash";
import { mapActions } from "vuex";
export default {
  name: "Users",
  data() {
    return {
      loading: false,
      users: [],
      itemsPerPageList: [10, 15, 20, 30, 50, 100],
      item_per_page: 10,
      page_number: 1,
      total_page: 1,
      items: [],
      headers: tableHeaders.userTable,
    };
  },
  computed: {},
  watch: {
    item_per_page() {
      this.getUsers();
    },
    page_number() {
      this.debounceList();
    },
  },
  methods: {
    ...mapActions({
      toggleUserModal: "users/toggleUserModal",
      showToast: "snackBar/showToast",
    }),
    getUsers() {
      this.loading = true;
      let formData = {};
      formData["page"] = this.page_number;
      formData["per_page"] = this.item_per_page;

      this.tokenAxios
        .get(apiUrl.USERS_API, { params: formData }, {})
        .then((res) => {
          console.log(res);
          this.items = res.data;
          this.page_number = parseInt(res.headers["x-pagination-page"]);
          this.total_page = parseInt(res.headers["x-pagination-page-count"]);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          authToken.errorHandler(error.response);
          this.loading = false;
        });
    },
    deleteUser(id) {
      this.tokenAxios
        .put(`${apiUrl.USERS_API}${id}/toggle_active`)
        .then((res) => {
          console.log(res);
          this.showToast({
            message: "User Deleted",
            color: "s",
          });
          this.getUser();
        })
        .catch((error) => {
          console.log(error);
          authToken.errorHandler(error.response);
        });
    },
  },
  created() {
    this.debounceList = _.debounce(function () {
      this.getUsers();
    }, 800);
  },
  mounted() {
    this.getUsers();
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
.title {
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-transform: capitalize;
  color: #2b2d42;
}
.subTitle {
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 14px;
  /* or 133% */

  color: rgba(51, 51, 51, 0.87);
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
