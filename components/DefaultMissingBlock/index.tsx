import { IBlock } from "models/blocks/IBlock";
import React from "react";

interface DefaultMissingBlock {
  blockName?: string;
  props?: any;
  block?: IBlock;
}

const DefaultMissingBlock = (props: DefaultMissingBlock) => {
  if (props.block)
    return (
      <div data-block-type={props.block.system.contentType}>
        Giao diện chưa được hoàn thiện, vui lòng quay lại sau
      </div>
    );
  return (
    <div>
      Dữ liệu không đúng, không thể hiển thị nội dung. Vui lòng thử lại sau
    </div>
  );
};

export default DefaultMissingBlock;
