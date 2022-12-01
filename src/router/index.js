import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import authToken from "../common/authToken";

Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]
function firewallRoute(to, from, next) {
  // Check if access token is correct or not
  const res = authToken.inspectAccessToken();
  if (!res.flagSession) {
    // Redirect to login page
    if (res.action.redirect) {
      next({ name: res.action.page });
    }
  }
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) =>
    new Promise(() => {
      const position = savedPosition || {};
      if (!savedPosition) {
        if (to.hash) {
          position.selector = to.hash;
        }
        if (to.matched.some((m) => m.meta.scrollToTop)) {
          position.x = 0;
          position.y = 0;
        }
      }
      window.scrollTo(position.x, position.y);
    }),
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Tekege Task";
  if (!to.meta.isPublic || to.meta.requiresAuth) {
    // Access-Token Authentication required here
    firewallRoute(to, from, next);
  }
  next();
});

export default router;
