import Toast from '../../ui/common/Toast';

type ToastProps = {
  isError: boolean;
  message: string;
};

export const showToast = ({ isError, message }: ToastProps) => {
  const toast = new Toast();
  toast.renderToast(isError, message);
};
