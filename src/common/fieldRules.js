export default {
  required: (value) => !!value || "This is Required.",
  notEmpty: (v) => {
    if (v && v.trim() == "") return "Cannot be left empty";
    return true;
  },
  isNum: (v) => {
    if (v.length > 0) if (isNaN(parseInt(v))) return "Invalid Number";
    return true;
  },
  min: (v) => v.length >= 2 || "Min 2 characters",
  email: (v) => {
    /* eslint-disable-next-line no-useless-escape*/
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(v).toLowerCase().trim())) {
      return true;
    }
    return "Invalid Email";
  },
  phone: (v) => {
    const re = /^(\+91)?[0]?(91)?[6789]\d{9}$/;
    if (re.test(v)) {
      return true;
    }
    return "Invalid Phone Number";
  },
  phone_optional: (v) => {
    const re = /^(\+91)?[0]?(91)?[6789]\d{9}$/;
    if (v === null || v === "") {
      return true;
    } else if (re.test(v)) {
      return true;
    }
    return "Invalid Phone Number";
  },
};
