import classNames from "classnames";
import useViewMode from "hooks/useViewMode";
import Link from "next/link";
import React from "react";
import SocialShare from "sites/mogivi/components/SocialShare";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { IBreadcrumbsProjectPageBlock } from "sites/mogivi/models/blocks/IBreadcrumbsProjectPageBlock";

interface BlockProps {
  block: IBreadcrumbsProjectPageBlock;
}

const BreadcrumbsProjectPageBlock = (props: BlockProps) => {
  const { itemTitle, breadcrumbs, showSocialShareIcons } = props.block.fields;
  const { isMobileApp, isReady } = useViewMode();
  if (isMobileApp && isReady) return null;
  return (
    <div className={classNames("container mt-3", !isReady && "opacity-0")}>
      <div className="row">
        <div className="col-12 col-md-7">
          <h1 className="fs-1-875rem mb-0 text-internal-orange fw-bold">
            {itemTitle}
          </h1>
          <ul className="list-unstyled mb-2">
            {breadcrumbs?.map((breadcrumb) => (
              <li
                className="d-inline-block"
                key={`breadcrumb-index-${breadcrumb.position}`}
              >
                <Link href={breadcrumb.url}>
                  <a rel="noopener" className="text-dark-cerulean fs-0-875rem">
                    {breadcrumb.linkText}
                  </a>
                </Link>
                {breadcrumb.isShowAngle && (
                  <SvgIcon
                    icon="angleRight"
                    className="ms-1 me-2 svg-manatee"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {showSocialShareIcons && (
          <div className="col-12 col-md-5 d-none d-md-block">
            <SocialShare className="pt-3 text-end" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbsProjectPageBlock;
