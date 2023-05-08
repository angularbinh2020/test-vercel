import ILayoutProps from "models/ILayoutProps";
import React from "react";

const NhaThatLayout = (props: ILayoutProps) => {
  const { children } = props;
  return <div data-layout="nhathat">{children}</div>;
};

export default NhaThatLayout;
