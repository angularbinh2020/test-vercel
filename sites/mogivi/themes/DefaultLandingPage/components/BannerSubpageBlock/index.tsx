import React from "react";
import BannerSubpage, {
  IBannerSubpageProps,
} from "sites/mogivi/layout/components/Banner/BannerSubpage";

const BannerSubpageBlock = (props: IBannerSubpageProps) => {
  return (
    <div>
      <BannerSubpage {...props} />
    </div>
  );
};

export default BannerSubpageBlock;
