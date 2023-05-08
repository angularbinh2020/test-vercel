import React from "react";
import styles from "./styles.module.scss";

type FormRowProps = {
  label?: string;
  mandatory?: boolean;
  error?: string;
  className?: string;
};

export const FormRow = ({
  error,
  className,
  children,
}: React.PropsWithChildren<FormRowProps>) => {
  return (
    <>
      <div className={`form-row ${className}`}>
        {children}
        {!!error && <div className={styles.alert}>{error}</div>}
      </div>
    </>
  );
};
