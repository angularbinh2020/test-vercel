import classNames from "classnames";
import LinkItem from "components/LinkItem";
import React, { useState } from "react";
import {
  IHighlightedNavigationItem,
  ISubMenu,
} from "sites/mogivi/models/IHighlightedNavigationItem";
import { ILinkInfo } from "sites/mogivi/models/ILinkInfo";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

type IAccordion = {
  title: string;
  content: ILinkInfo[] | IHighlightedNavigationItem[] | ISubMenu[];
  themes: "footer" | "burger";
  handleClose?: () => void;
};

const Accordion = (props: IAccordion) => {
  const [isActive, setIsActive] = useState(false);
  const { content, themes, handleClose } = props;

  const burgerContent: ISubMenu[] = content as ISubMenu[];

  switch (themes) {
    case "footer":
      return (
        <div className={styles.accordionItem}>
          <div
            className={styles.accordionTitle}
            onClick={() => setIsActive(!isActive)}
          >
            <h1>{props.title}</h1>
            <div>
              <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} />
            </div>
          </div>
          {isActive && (
            <div className={styles.accordionContent}>
              <ul className={styles.linkServices}>
                {content.map((item: any, idx: number) => {
                  return (
                    <li key={idx}>
                      <LinkItem url={item.aliasUrl ? item.aliasUrl : item.url}>
                        {item.name}
                      </LinkItem>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      );
    case "burger":
      return (
        <div className={classNames(styles.accordionItem, styles.burgerTheme)}>
          <div
            className={styles.accordionTitle}
            onClick={() => setIsActive(!isActive)}
          >
            <h6>{props.title}</h6>
            <div>
              <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} />
            </div>
          </div>
          {isActive && (
            <div className={styles.accordionContent}>
              <ul className={styles.linkServices}>
                {burgerContent.map((burger: ISubMenu, i: number) => {
                  return (
                    <li className={styles.linkServiceItem} key={i}>
                      {burgerContent?.length > 1 && (
                        <div className={styles.subMenuTitle}>
                          <h6>{burger.fields.label}</h6>
                        </div>
                      )}
                      {burger.fields.menus &&
                        burger.fields.menus?.length !== 0 &&
                        burger.fields.menus.map(
                          (burgerItem, burgerIdx: number) => (
                            <div
                              key={burgerIdx}
                              onClick={() => handleClose && handleClose()}
                            >
                              <LinkItem
                                className={styles.subMenuItem}
                                target={
                                  burgerItem?.target
                                    ? burgerItem?.target
                                    : "_self"
                                }
                                url={
                                  burgerItem?.aliasUrl
                                    ? burgerItem?.aliasUrl
                                    : burgerItem?.url
                                }
                              >
                                {burgerItem.name}
                              </LinkItem>
                            </div>
                          )
                        )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      );
  }
};

export default Accordion;
