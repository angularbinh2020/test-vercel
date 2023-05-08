import React, { useCallback } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { TOAST_TYPE } from "sites/mogivi/const/toast-type";
import {
  useGetToastState,
  useSetToastState,
} from "sites/mogivi/redux/toast.slice";
import styles from "./styles.module.scss";

function ToastNotification() {
  const { toasts } = useGetToastState();
  const { hideToast } = useSetToastState();
  const getToastBackground = useCallback((toastType: TOAST_TYPE): string => {
    if (toastType === TOAST_TYPE.ERROR) return "warning";
    return "success";
  }, []);

  if (toasts.length)
    return (
      <div className={styles.container}>
        <ToastContainer>
          {toasts.map((toast) => (
            <Toast
              className="d-inline-block m-1"
              bg={getToastBackground(toast.type)}
              key={toast.id}
              onClose={() => hideToast(toast.id)}
            >
              <Toast.Header>
                <strong className="me-auto">Thông báo</strong>
              </Toast.Header>
              <Toast.Body>{toast.message}</Toast.Body>
            </Toast>
          ))}
        </ToastContainer>
      </div>
    );
  return null;
}

export default ToastNotification;
