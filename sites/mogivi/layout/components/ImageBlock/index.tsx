import React from "react";
import { IETImageItem } from "sites/mogivi/models/IETImageItem";
import styles from "./styles.module.scss";
import Image from "next/image";
interface ImageBlockItemProps {
  block: IETImageItem;
}

const ImageBlockItem = (props: ImageBlockItemProps) => {
  const { image } = props.block.fields;
  return image ? (
    <div className={styles.imageBlockContainer}>
      <div className="container position-relative">
        <div className={styles.img}>
          <Image
            src={image.fields.umbracoFile}
            alt="image"
            width={image.fields.umbracoWidth}
            height={image.fields.umbracoHeight}
            quality={100}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default ImageBlockItem;
