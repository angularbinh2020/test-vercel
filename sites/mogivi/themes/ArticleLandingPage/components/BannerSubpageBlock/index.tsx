import React from "react";
import { IBannerSubpageProps } from "sites/mogivi/layout/components/Banner/BannerSubpage";
import { BannerSubpageLinks } from "sites/mogivi/layout/components/Banner/BannerSubpageLinks";

const BannerSubpageBlock = (props: IBannerSubpageProps) => {
  return (
    <div>
      <BannerSubpageLinks {...props} />
    </div>
  );
};

export default BannerSubpageBlock;
