export const ROUTER_URL = {
  auth: {
    name: "auth",
    link: "",
    title: "Tekege Task",
    children: {
      login: {
        name: "login",
        link: "",
        title: "Login | Tekege Task",
      },
    },
  },
  task: {
    name: "task",
    link: "/task/",
    title: "Task",
    children: {
      users: {
        name: "users",
        link: "users",
        title: "Users | Tekege Task",
      },
      skills: {
        name: "skills",
        link: "skills",
        title: "Skills | Tekege Task",
      },
    },
  },
};
