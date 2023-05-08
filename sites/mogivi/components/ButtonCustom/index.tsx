import React from "react";
import Button from "react-bootstrap/Button";
import classNames from "classnames";
import styles from "./button-custom.module.scss";
import { ButtonVariant } from "react-bootstrap/esm/types";

export enum ISizeTypes {
  Large = "large",
  Medium = "medium",
  Small = "small",
}

export enum IColorTypes {
  Orange = "orange",
  OutlineOrange = "outline-orange",
  YellowGradient = "yellow-gradient",
}

interface ButtonCustomProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  size?: ISizeTypes;
  color: IColorTypes;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
}

const ButtonCustom = (props: ButtonCustomProps) => {
  const {
    variant = "primary",
    children,
    className,
    type,
    disabled,
    label,
    size = ISizeTypes.Small,
    color,
    ...restProps
  } = props;
  const btnColor = styles[color || ""] || "";

  return (
    <Button
      {...restProps}
      type={type}
      className={classNames(styles.btn, btnColor, className, {
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
    >
      {children || label}
    </Button>
  );
};

export default ButtonCustom;
