import classNames from "classnames";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const Skeleton = ({ className, width, height }: Props) => {
  return (
    <div
      className={classNames(styles.skeletonBox, className)}
      style={{
        width: width ?? "100%",
        height: height ?? "100%",
      }}
    ></div>
  );
};

export default Skeleton;
