<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="8"
        style="background-color: #f7f7f7 !important; min-height: 100vh"
      ></v-col>
      <v-col cols="12" sm="4" style="min-height: 100vh">
        <v-main>
          <router-view />
        </v-main>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import authToken from "@/common/authToken";
import { ROUTER_URL } from "@/constant/urls";
export default {
  name: "AuthLayout",
  beforeCreate() {
    if (authToken.getToken()) {
      this.$router.push(
        ROUTER_URL.task.link + ROUTER_URL.task.children.users.link
      );
    }
  },
  mounted() {},
};
</script>
