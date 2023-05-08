import useViewMode from "hooks/useViewMode";
import React, { useEffect, useState } from "react";
import { IIntroductionIInvestorBlock } from "sites/mogivi/models/blocks/IIntroductionIInvestorBlock";
import styles from "./styles.module.scss";

export const RichTextBlock = (props: IIntroductionIInvestorBlock) => {
  const { introductionText } = props.fields;
  const { isMobileApp } = useViewMode();
  const [text, setText] = useState("");

  useEffect(() => {
    if (isMobileApp) {
      const parser = new DOMParser();
      const introText = parser.parseFromString(introductionText, "text/html");
      const links = introText.querySelectorAll("a");

      links.forEach((item) => {
        item.setAttribute("href", item.href + "?ViewMobileApp=1");
      });
      setText(introText.documentElement.innerHTML);
    } else {
      setText(introductionText);
    }
  }, [introductionText, isMobileApp]);

  return (
    <>
      <div className={styles.grayBackgroundColor}>
        <div className="container">
          <div className={styles.richTextContainer}>
            {introductionText && (
              <div
                id="investorDes"
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
