import React from "react";
import {
  ImageBlockItem,
  ImageBlockItemProps,
} from "sites/mogivi/layout/components/ImageBlockItem";

const ImageBlock = (props: ImageBlockItemProps) => {
  return <ImageBlockItem borderRadius {...props} />;
};
export default ImageBlock;
