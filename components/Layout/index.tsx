import DefaultMissingBlock from "components/DefaultMissingBlock";
import ILayoutProps from "models/ILayoutProps";
import React from "react";

const LayoutComponent =
  require(`sites/${process.env.NEXT_PUBLIC_BUILD_SITE}/layout`).default;

const Layout = (props: ILayoutProps) => {
  const { children, ...restProps } = props;
  const Component = LayoutComponent || DefaultMissingBlock;
  return <Component {...restProps}>{children}</Component>;
};

export default Layout;
