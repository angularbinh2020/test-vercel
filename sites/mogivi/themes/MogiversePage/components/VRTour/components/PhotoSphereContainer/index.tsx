import React from "react";

import classNames from "classnames";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  isNotRectangle?: boolean;
}

// eslint-disable-next-line react/display-name
const EditorContainer = React.forwardRef((props: Props, ref: any) => {
  const { className, isNotRectangle } = props;

  return (
    <div
      ref={ref}
      className={classNames(
        "w-100 position-relative bg-gray",
        {
          [styles.rectangle]: !isNotRectangle,
          "vh-100": isNotRectangle,
        },
        styles.canvasContainer,
        className
      )}
    ></div>
  );
});

const PhotoSphereContainer = React.memo(EditorContainer);

export default PhotoSphereContainer;
