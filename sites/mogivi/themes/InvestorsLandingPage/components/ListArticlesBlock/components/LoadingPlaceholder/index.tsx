import { useMemo } from "react";
import classNames from "classnames";
import styles from "../../styles.module.scss";
import Skeleton from "components/Skeleton";

interface Props {
  pageSize: number;
}

const PlaceholderItem = () => {
  return (
    <li className={classNames("row", styles.articleItem)}>
      <div className={classNames("col-md-4 col-lg-4", styles.articleLeft)}>
        <Skeleton width="100%" height={260} />
      </div>
      <div className={classNames("col-md-8 col-lg-8, styles.articleRight")}>
        <div className={styles.mainContent}>
          <h1 className={styles.articleTitle}>
            <Skeleton width={200} height={24} />
          </h1>
          <Skeleton
            className={classNames(styles.fullName, "mb-3")}
            width={150}
            height={21}
          />

          <div className={styles.articleDescription}>
            <Skeleton
              className={styles.description}
              width="100%"
              height={104}
            />
          </div>

          <div className={styles.listProjects}>
            <div className={styles.projects}>
              <Skeleton
                className={styles.description}
                width={100}
                height={31}
              />
            </div>
            <div className={styles.projects}>
              <Skeleton
                className={styles.description}
                width={140}
                height={31}
              />
            </div>
            <div className={styles.projects}>
              <Skeleton
                className={styles.description}
                width={160}
                height={31}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const LoadingPlaceholder = ({ pageSize }: Props) => {
  const items = useMemo(() => {
    return Array(Number(pageSize)).fill(Math.random());
  }, [pageSize]);
  return (
    <>
      {items.map((it, itemIndex) => (
        <PlaceholderItem key={itemIndex} />
      ))}
    </>
  );
};

export default LoadingPlaceholder;
