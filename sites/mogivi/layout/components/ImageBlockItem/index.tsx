import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IETImageItem } from "sites/mogivi/models/IETImageItem";
import styles from "./styles.module.scss";

export interface ImageBlockItemProps {
  block: IETImageItem;
  borderRadius?: boolean;
}

export const ImageBlockItem = (props: ImageBlockItemProps) => {
  const { image } = props.block.fields;
  const { borderRadius } = props;
  return (
    <div
      className={classNames(
        "container",
        styles.imgBlockContainer,
        borderRadius && styles.imgBorderRadius
      )}
    >
      {image && (
        <Image
          src={image.fields?.umbracoFile}
          width={970}
          height={600}
          alt={image.system.name}
          objectFit={"cover"}
        />
      )}
    </div>
  );
};
