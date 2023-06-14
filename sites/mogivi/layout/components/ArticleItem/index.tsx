import classNames from "classnames";
import LinkItem from "components/LinkItem";
import Image from "next/legacy/image";
import React from "react";
import { IArticleItem } from "sites/mogivi/models/blocks/IArticleItem";
import styles from "./styles.module.scss";

interface ArticleListProps {
  item: IArticleItem;
}

export const ArticleItem = (props: ArticleListProps) => {
  const { item } = props;
  return item.url ? (
    <LinkItem url={item.url}>
      <div className={styles.articleItemContainer}>
        <div className={styles.articleImage}>
          {item.image && (
            <picture>
              <img
                src={item.image.fields.umbracoFile}
                alt={item.image.system.name}
              />
            </picture>
          )}
        </div>
        <div className={styles.articleContent}>
          {item.title && <h3>{item.title}</h3>}
          {item.summaryText && <p>{item.summaryText}</p>}
          {item.publicationDateTextV2 && (
            <small>{item.publicationDateTextV2}</small>
          )}
        </div>
      </div>
    </LinkItem>
  ) : (
    <></>
  );
};
