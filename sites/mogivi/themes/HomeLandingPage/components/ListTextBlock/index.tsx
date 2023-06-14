import Link from "next/link";
import React from "react";

import styles from "./list-text.module.scss";

type ListTextType = {
  url: string;
  nodeId: number;
  name: string;
  keyword: string | null;
};

interface ListTextProps {
  list: ListTextType[];
  itemTitle: string;
  subtitle: string;
}

const ListText = (props: ListTextProps) => {
  const { list, itemTitle, subtitle } = props;
  return (
    <div className={styles.listTextContainer}>
      <h1 className={styles.title}>{itemTitle}</h1>
      <div
        className={styles.subTitle}
        dangerouslySetInnerHTML={{ __html: subtitle }}
      ></div>

      <div className={styles.content}>
        <div className="container-fluid">
          <div>
            <ul className={styles.grid}>
              {list?.length &&
                list.map(
                  (item, idx) =>
                    item.url &&
                    item.url !== "" && (
                      <li key={idx}>
                        <Link href={item.url}>{item.name}</Link>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListText;
