import classNames from "classnames";
import useViewMode from "hooks/useViewMode";
import React, { useState, useMemo } from "react";
import { TAB_ANCHOR_ID } from "sites/mogivi/const/tab-anchor-id";
import TabSectionRender from "./components/TabSectionRender";
import styles from "./styles.module.scss";

interface BlockProps {
  block: any;
  className?: string;
}

const ProjectModule = (props: BlockProps) => {
  const { className } = props;
  const tabs = props.block.fields.tabs;
  const [currentAnchorId, setCurrentAnchorId] = useState(
    TAB_ANCHOR_ID.OVERVIEW
  );
  const tabsHeader = useMemo(() => {
    return tabs?.map((tab: any) => {
      const tabClone = { ...tab };
      if (tabClone.fields.anchorID === TAB_ANCHOR_ID.PROJECT_APARTMENT) {
        tabClone.fields.title = "Tin đăng trong khu vực";
      }
      return tabClone;
    });
  }, []);
  const handleClick = (anchorId: string) => {
    setCurrentAnchorId(anchorId);
    const tabSection = document.getElementById(anchorId);
    const linkElement = document.createElement("a");
    linkElement.href = `#${anchorId}`;
    document.body.appendChild(linkElement);
    if (tabSection) {
      const tabHeaders = tabSection.querySelectorAll("[data-tab-opened]");
      tabHeaders.forEach((tabHeader: any) => {
        const isTabClose =
          tabHeader.getAttribute("data-tab-opened") === "false";
        if (isTabClose) {
          const btnElement = tabHeader.querySelector("button");
          (btnElement || tabHeader).click();
        }
      });
    }
    linkElement.click();
    linkElement.remove();
  };
  const { isMobileApp } = useViewMode();

  return (
    <div>
      {!isMobileApp && (
        <div className="shadow-sm">
          <div
            className={classNames(
              "container",
              styles.projectMobuleContainer,
              className
            )}
          >
            <ul className="list-unstyled d-flex align-items-center mw-100 overflow-auto">
              {tabsHeader?.map((tab: any) => (
                <li
                  key={`tab-header-${tab.fields.anchorID}`}
                  onClick={() => {
                    handleClick(tab.fields.anchorID);
                  }}
                  className={classNames(
                    styles.tabHeader,
                    "text-nowrap",
                    currentAnchorId === tab.fields.anchorID && styles.active
                  )}
                >
                  <a href={"#" + tab.fields.anchorID}>{tab.fields.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div
        className={classNames(
          "container",
          styles.projectMobuleContainer,
          className
        )}
      >
        {tabs?.map((tab: any) => (
          <TabSectionRender tab={tab} key={`tab-body-${tab.fields.anchorID}`} />
        ))}
      </div>
    </div>
  );
};

export default ProjectModule;
