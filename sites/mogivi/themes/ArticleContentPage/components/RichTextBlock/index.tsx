import React from "react";
import {
  RichTextBlockItem,
  RichTextBlockProps,
} from "sites/mogivi/layout/components/RichTextBlockItem";

const RichTextBlock = (props: RichTextBlockProps) => {
  return <RichTextBlockItem {...props} />;
};
export default RichTextBlock;
