<template>
  <div class="pa-7">users</div>
</template>
<script>
import apiUrl from "@/constant/apiUrls";
export default {
  name: "Users",
  data() {
    return {
      loading: false,
      users: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    getUsers() {
      this.loading = true;
      this.tokenAxios
        .get(apiUrl.USERS_API, {}, {})
        .then((res) => {
          console.log(res);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
