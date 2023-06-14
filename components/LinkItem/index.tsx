import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { removeTLD } from "helpers/url";
import Link from "next/link";
import useViewMode from "hooks/useViewMode";

interface LinkItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
    target,
    ariaLabel,
    ...restProps
  } = props;
  const linkContent = children ? children : label;
  const [isExternal, setIsExternal] = useState(false);
  const { isMobileApp } = useViewMode();
  const updatedUrl = removeTLD(url, isMobileApp);
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
      <Link
        href={url}
        target={target ? target : "_self"}
        className={classnames(className)}
        rel="noopener noreferrer"
        aria-label={ariaLabel ?? ""}
        draggable={false}
        {...restProps}
      >
        {linkContent}
      </Link>
    );
  }
  return (
    <Link
      href={updatedUrl}
      target={target ? target : "_self"}
      className={classnames(className, activeClasses)}
      aria-label={ariaLabel ?? ""}
      draggable={false}
      {...restProps}
    >
      {linkContent}
    </Link>
  );
};

export default LinkItem;
