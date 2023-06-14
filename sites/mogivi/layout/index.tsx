import ILayoutProps from "models/ILayoutProps";
import React, { useEffect, useState } from "react";
import HeaderMeta from "./components/HeaderMeta";
import "bootstrap/dist/css/bootstrap.min.css";
import dynamic from "next/dynamic";
import useViewMode from "hooks/useViewMode";
import LoadingFullScreen from "../components/LoadingFullScreen";

const ToastNotification = dynamic(
  () => import("sites/mogivi/components/ToastNotification")
);
const Header = dynamic(() => import("./components/Header"));
const Footer = dynamic(() => import("./components/Footer"));

const MogiviLayout = (props: ILayoutProps) => {
  const { children, pageData, className } = props;
  const { currentNode, siteLanguageNode, rootNode } = pageData;
  const { isMobileApp } = useViewMode();
  const [isClientBrowser, setClientBrowser] = useState(false);
  const isShowHeader = !currentNode?.fields?.removeDefaultHeader;
  const isShowFooter = !currentNode?.fields?.removeDefaultFooter;
  useEffect(() => {
    setClientBrowser(true);
  }, []);
  return (
    <>
      <div>
        <HeaderMeta pageData={pageData} />
        {isShowHeader && !isMobileApp && (
          <Header
            className={className}
            rootNode={rootNode}
            siteLanguageNode={siteLanguageNode}
          />
        )}
        <div data-layout="mogivi">{children}</div>
        {isShowFooter && !isMobileApp && (
          <Footer
            className={className}
            rootNode={rootNode}
            siteLanguageNode={siteLanguageNode}
          />
        )}
      </div>
      <LoadingFullScreen />
      {isClientBrowser && <ToastNotification />}
    </>
  );
};

export default MogiviLayout;
