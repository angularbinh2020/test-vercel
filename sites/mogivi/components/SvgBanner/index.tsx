import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";

const Banner404 = dynamic(() => import("./components/Banner404"));

interface SvgBannersProps extends React.HTMLProps<HTMLElement> {
  icon: "banner404";
}

const Icons = {
  banner404: Banner404,
};

const SvgBanner = (props: SvgBannersProps) => {
  const { icon, ...restProps } = props;
  const Component = Icons[icon as keyof typeof Icons] || DefaultMissingBlock;
  return <Component {...restProps} />;
};

export default SvgBanner;
