import Toast from '../../ui/common/Toast';

export const showToast = ({ isError, message }) => {
  const toast = new Toast();
  toast.renderToast(isError, message);
};
