import React from "react";
import ImageBlockItem from "sites/mogivi/layout/components/ImageBlock";
import { IETImageItem } from "sites/mogivi/models/IETImageItem";

interface ImageBlockItemProps {
  block: IETImageItem;
}

const ImageBlock = (props: ImageBlockItemProps) => {
  return <ImageBlockItem {...props} />;
};
export default ImageBlock;
