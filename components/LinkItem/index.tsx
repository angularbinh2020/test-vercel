import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { useRouter } from "next/router";
import { appendViewMobileApp, removeTLD } from "helpers/url";
import Link from "next/link";
import useViewMode from "hooks/useViewMode";

interface LinkItemProps {
  url: string;
  label?: string;
  target?: "_self" | "_blank" | string;
  children?: any;
  className?: string;
  activeClasses?: string;
  resetNavHandler?: any;
  menuToggle?: Function;
  ariaLabel?: string;
}

const LinkItem = (props: LinkItemProps) => {
  const {
    url,
    className,
    activeClasses,
    children,
    label,
    resetNavHandler,
    target,
    ariaLabel,
  } = props;
  const linkContent = children ? children : label;
  const [isExternal, setIsExternal] = useState(false);
  const { isMobileApp } = useViewMode();
  const router = useRouter();
  const updatedUrl = removeTLD(url, isMobileApp);

  const onLinkClick = (
    event: React.FormEvent<HTMLAnchorElement>,
    url: string
  ) => {
    event.preventDefault();

    const newTargetUrl = url.split("#");
    const targetUrlWithoutHash = newTargetUrl[0];

    document.querySelector("body")?.classList.remove("noscroll");

    if (typeof resetNavHandler === "function") {
      resetNavHandler && resetNavHandler();
    }

    if (location.pathname === targetUrlWithoutHash) {
      if (url.includes("#")) {
        const stickyContainer = document.querySelector(".sticky-container");
        const stickyContainerHeight = stickyContainer
          ? stickyContainer.clientHeight
          : 0;
        const target = newTargetUrl[1];

        router.push(`#${target}`);
        const settings: any = {
          spy: true,
          smooth: true,
          duration: 500,
        };
        settings["offset"] = -stickyContainerHeight;

        // scroller.scrollTo(target, settings);
      }
      return;
    }
  };

  useEffect(() => {
    const currentHost = window.location.host;
    const isExternalLink = url?.startsWith("/")
      ? false
      : url?.split("?")[0].indexOf(currentHost) === -1 ||
        url?.startsWith("http");
    setIsExternal(isExternalLink);
  }, [url]);

  if (isExternal) {
    return (
      <Link href={url}>
        <a
          target={target ? target : "_self"}
          className={classnames(className)}
          rel="noopener noreferrer"
          aria-label={ariaLabel ?? ""}
        >
          {linkContent}
        </a>
      </Link>
    );
  }
  return (
    <Link href={updatedUrl}>
      <a
        target={target ? target : "_self"}
        className={classnames(className, activeClasses)}
        aria-label={ariaLabel ?? ""}
      >
        {linkContent}
      </a>
    </Link>
  );
};

export default LinkItem;
