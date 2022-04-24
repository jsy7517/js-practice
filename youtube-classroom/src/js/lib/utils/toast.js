import Toast from '../../components/Toast.js';

export const showToastWithMessage = ($target, message) => {
  const toast = new Toast($target);
  toast.setToastMessage(message);
  toast.renderToast();
};
