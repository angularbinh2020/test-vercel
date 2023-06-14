import BlankBlock from "components/BlankBlock";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import dynamic from "next/dynamic";
import React from "react";
import { TAB_ANCHOR_ID } from "sites/mogivi/const/tab-anchor-id";
import { IETTab } from "sites/mogivi/models/IETTab";

const OverviewSection = dynamic(() => import("../OverviewSection"));
const LocationSection = dynamic(() => import("../LocationSection"));
const DocumentSection = dynamic(() => import("../DocumentSection"));
const LoanSection = dynamic(() => import("../LoanSection"));

const Tabs = {
  [TAB_ANCHOR_ID.OVERVIEW]: OverviewSection,
  [TAB_ANCHOR_ID.LOCATION]: LocationSection,
  [TAB_ANCHOR_ID.DOCUMENTS]: DocumentSection,
  [TAB_ANCHOR_ID.LOAN_AMOUNT]: LoanSection,
};

interface TabSectionRenderProps {
  tab: IETTab;
}

const TabSectionRender = (props: TabSectionRenderProps) => {
  const Component = Tabs[props.tab.fields.anchorID] || BlankBlock;
  return (
    <>
      <div className="container p-0">
        <div className="row">
          <Component {...props} />
        </div>
      </div>
    </>
  );
};

export default TabSectionRender;
