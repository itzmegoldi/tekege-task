<template>
  <div>
    <v-app-bar color="#FFFFFF" class="pr-5 pl-3" app>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.xsOnly"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon x-large v-on="on" v-bind="attrs">
            <v-avatar color="#8D99AE" size="38">
              <span class="user-initials-text">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar dark color="#8D99AE">
                <span class="user-initials-text">{{ user.initials }}</span>
              </v-avatar>
              <h3 class="pt-3" style="text-transform: capitalize">
                {{ user.first_name }} {{ user.last_name }}
              </h3>
              <p class="text-caption mt-1">{{ user.login_id }}</p>
              <!-- <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text> Edit Account </v-btn> -->
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logoutClickHandler">
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="#FFFFFF"
      height="100%"
      :permanent="$vuetify.breakpoint.smAndUp"
      :temporary="$vuetify.breakpoint.xsOnly"
      hide-overlay
      class="elevation-4"
    >
      <div
        style="
          text-align: -moz-center;
          text-align: -webkit-center;
          min-height: 70px;
        "
      >
        <v-skeleton-loader
          type="table-heading,list-item-two-line"
        ></v-skeleton-loader>
      </div>
      <v-list class="pa-0" nav dark dense>
        <v-list-item-group v-model="selectedItem">
          <div v-for="(item, i) in navLinks" :key="i">
            <v-list-item
              class="normal-class justify-center rounded-0"
              active-class="active-class"
              :to="{ name: item.to }"
            >
              <div style="width: 70%">
                <v-list-item-title
                  style="color: rgba(51, 51, 51, 0.87); font-weight: 500"
                >
                  {{ item.name }}
                  <!-- <v-list-item-content>aaa</v-list-item-content> -->
                </v-list-item-title>
              </div>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main style="background-color: #f7f7f7 !important; min-height: 100vh">
      <router-view />
    </v-main>
    <user-modal></user-modal>
  </div>
</template>
<script>
import authToken from "@/common/authToken";
import { ROUTER_URL } from "@/constant/urls";
export default {
  name: "TaskLayout",
  components: {
    UserModal: () => import("@/components/Users/UserModal/UserModal.vue"),
  },
  data() {
    return {
      drawer: true,
      user: {},
      selectedItem: 0,
      navLinks: [
        { name: "Users", to: ROUTER_URL.task.children.users.name },
        { name: "Skills", to: ROUTER_URL.task.children.skills.name },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    getInitials(firstName, lastName) {
      let initials;
      firstName = firstName.charAt(0);
      if (lastName) {
        lastName = lastName.charAt(0);
        initials = firstName + lastName;
      } else {
        lastName = firstName.charAt(1);
        initials = firstName + lastName;
      }

      // console.log(initials, "initials");
      return initials.toUpperCase();
    },
    logoutClickHandler() {
      authToken.logoutHandler();
    },
  },
  created() {},
  mounted() {
    this.user = authToken.getUser();
    console.log(this.user, "user");
    let initials = this.getInitials(this.user.first_name, this.user.last_name);
    this.user = { ...this.user, initials };
  },
};
</script>
<style scoped>
.user-initials-text {
  color: #ffffff;
}
.active-class {
  color: #ffffff;
  background: #ef233c;
}
.active-class >>> .v-list-item__title {
  color: #ffffff !important;
  font-weight: 600 !important;
}
.normal-class {
  display: flex;
  text-align: left;
}
</style>
