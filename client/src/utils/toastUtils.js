import toast from "react-hot-toast";

/**
 * Displays a toast notification based on the result object.
 *
 * @param {Object} result - The result object containing success and message.
 * @param {string} [successPosition="top-right"] - Position for success toasts.
 * @param {string} [errorPosition="top-right"] - Position for error toasts.
 */
export const showToast = (
  result,
  successPosition = "top-right",
  errorPosition = "top-right"
) => {
  if (result.success) {
    toast.success(result.message, {
      position: successPosition,
      autoClose: 3000,
    });
  } else {
    toast.error(result.message, {
      position: errorPosition,
      autoClose: 3000,
    });
  }
};

/* This code is replacement to below 
 if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
      */
