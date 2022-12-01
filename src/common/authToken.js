import { ROUTER_URL } from "../constant/urls";
import router from "../router";
import store from "../store";

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
    let encriptedToken = btoa(authToken.getToken() + ":");
    headers["Authorization"] = `Basic ${encriptedToken}`;
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
  errorHandler: (response) => {
    switch (response.status) {
      case 400:
        store.dispatch("snackBar/showToast", {
          message: response.data.message,
          color: "E",
        });
        break;
      case 401:
        authToken.logoutHandler()
        break;
      case 403:
        store.dispatch("snackBar/showToast", {
          message: "Invalid token",
          color: "E",
        });
        authToken.logoutHandler()
        break;
      case 404:
        if (
          response.data.message != "undefined" &&
          response.data.message != null
        ) {
          store.dispatch("snackBar/showToast", {
            message: response.data.message,
            color: "E",
          });
        } else {
          store.dispatch("snackBar/showToast", {
            message: "Invalid API URL",
            color: "E",
          });
        }
        break;
      case 440:
        store.dispatch("snackBar/showToast", {
          message: "PublicSession Expired",
          color: "E",
        });
        authToken.logoutHandler()
        break;
      default:
        if (response.data.message) {
          store.dispatch("snackBar/showToast", {
            message: response.data.message,
            color: "E",
          });
        } else {
          store.dispatch("snackBar/showToast", {
            message: "Something Went Wrong!",
            color: "E",
          });
        }
    }
  },
};
export default authToken;
