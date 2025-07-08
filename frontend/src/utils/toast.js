// src/utils/Toast.js
let showToast;

const Toast = {
  success: (message) => {
    console.log("Calling Toast.success:", message);
    if (showToast) showToast({ message, severity: "success" });
  },
  error: (message) => {
    if (showToast) showToast({ message, severity: "error" });
  },
  _register: (fn) => {
    showToast = fn;
  },
};

export default Toast;
