<template>
  <v-app>
    <router-view />
    <SnackBar />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    SnackBar: () => import("./components/SnackBar/SnackBar.vue"),
  },
  data: () => ({
    //
  }),
};
</script>
