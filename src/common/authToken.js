import { ROUTER_URL } from "../constant/urls";
import router from "../router";

const authToken = {
  getToken: () => {
    let token = null;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    }
    return token;
  },
  tokenHeader: () => {
    let headers = {};
    headers["Content-Type"] = "application/json;charset=UTF-8";
    headers["Authorization"] = `Basic ${authToken.getToken()}:`;
    return headers;
  },
  logoutHandler: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    router.push({ name: ROUTER_URL.auth.children.login.name });
  },
  inspectAccessToken: () => {
    if (authToken.getToken()) {
      return {
        flagSession: true,
        action: {
          redirect: false,
        },
      };
    } else {
      return {
        flagSession: false,
        action: {
          redirect: true,
          page: ROUTER_URL.auth.children.login.name,
        },
      };
    }
  },
  getUser: () => {
    let user = JSON.parse(localStorage.getItem("user"));
    return user;
  },
};
export default authToken;
