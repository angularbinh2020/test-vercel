import React from "react";
import BannerSubpage, {
  IBannerSubpageProps,
} from "sites/mogivi/layout/components/Banner/BannerSubpage";
// import { BannerSubpageLinks } from "sites/mogivi/layout/components/Banner/BannerSubpageLinks";

const BannerSubpageBlock = (props: IBannerSubpageProps) => {
  return (
    <div>
      <BannerSubpage {...props} />
    </div>
  );
};

export default BannerSubpageBlock;
