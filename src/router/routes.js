import { ROUTER_URL } from "../constant/urls";

const routes = [
  {
    path: ROUTER_URL.auth.link,
    name: ROUTER_URL.auth.name,
    component: () =>
      import(
        /* webpackChunkName: "AuthLayout" */ "../layouts/Auth/AuthLayout.vue"
      ),
    meta: {
      name: ROUTER_URL.auth.name,
      isPublic: true,
      title: ROUTER_URL.auth.title,
      requiresAuth: false,
    },
    children: [
      {
        path: ROUTER_URL.auth.children.login.link,
        name: ROUTER_URL.auth.children.login.name,
        component: () =>
          import(/* webpackChunkName: "Login" */ "@/views/Auth/Auth.vue"),
        meta: {
          isPublic: true,
          layout: "AuthLayout",
          title: ROUTER_URL.auth.children.login.title,
        },
      },
    ],
  },
  {
    path: ROUTER_URL.task.link,
    name: ROUTER_URL.task.name,
    component: () =>
      import(
        /* webpackChunkName: "TaskLayout" */ "../layouts/Task/TaskLayout.vue"
      ),
    meta: {
      name: ROUTER_URL.task.name,
      isPublic: true,
      title: ROUTER_URL.task.title,
      requiresAuth: true,
    },
    children: [
      {
        path: ROUTER_URL.task.children.users.link,
        name: ROUTER_URL.task.children.users.name,
        component: () =>
          import(/* webpackChunkName: "Users" */ "@/views/Users/Users.vue"),
        meta: {
          isPublic: false,
          layout: "TaskLayout",
          title: ROUTER_URL.task.children.users.title,
        },
      },
      {
        path: ROUTER_URL.task.children.skills.link,
        name: ROUTER_URL.task.children.skills.name,
        component: () =>
          import(/* webpackChunkName: "Skills" */ "@/views/Skills/Skills.vue"),
        meta: {
          isPublic: false,
          layout: "TaskLayout",
          title: ROUTER_URL.task.children.skills.title,
        },
      },
    ],
  },
];

export default routes;
