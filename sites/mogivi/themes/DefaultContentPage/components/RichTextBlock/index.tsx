import React from "react";
import {
  RichTextBlockItem,
  RichTextBlockProps,
} from "sites/mogivi/layout/components/RichTextBlockItem";

const RichText = (props: RichTextBlockProps) => {
  return (
    <div>
      <RichTextBlockItem {...props} />
    </div>
  );
};

export default RichText;
