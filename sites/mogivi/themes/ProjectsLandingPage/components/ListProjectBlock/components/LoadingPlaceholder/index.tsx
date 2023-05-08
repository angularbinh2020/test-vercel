import { useMemo } from "react";
import classNames from "classnames";
import styles from "../../list-project.module.scss";
import Skeleton from "components/Skeleton";

interface Props {
  pageSize: number;
}

const PlaceholderItem = () => {
  return (
    <div className="col-12 mb-3 p-md-0">
      <div className={classNames(styles.cardContainer)}>
        <div className={styles.cardImage}>
          <span className={styles.cardProjectListImg}>
            <div className={styles.cardImageItem}>
              <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.cardImageItem}>
              <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.cardImageItem}>
              <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.cardImageItem}>
              <Skeleton width="100%" height="100%" />
            </div>
          </span>
        </div>

        <div className={styles.cardBody}>
          <div
            className={classNames(
              "w-100 d-flex align-items-start gap-2",
              styles.cardHeader
            )}
          >
            <Skeleton width={100} height={22} />
            <Skeleton width={100} height={22} />
          </div>
          <div className={styles.cardTitle}>
            <Skeleton width={300} height={33} />
          </div>
          <div
            className={classNames(
              "w-100 d-flex align-items-end gap-2",
              styles.cardSubDescription
            )}
          >
            <Skeleton width={80} height={27} />
            <Skeleton width={80} height={27} />
            <Skeleton width={80} height={27} />
            <Skeleton width={80} height={27} />
          </div>

          <div className={classNames("w-100", styles.cardDescription)}>
            <div className={styles.descriptionText}>
              <Skeleton width="100%" height={66} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 mb-2">
              <div className="d-flex gap-3 align-items-center">
                <div className={styles.investorLogo}>
                  <Skeleton width={120} height={40} />
                </div>
                <div
                  className={classNames(
                    "d-flex flex-column gap-2 ms-3",
                    styles.investorInfo
                  )}
                >
                  <strong className={styles.investorTitle}>
                    <Skeleton width={150} height={20} />
                  </strong>
                  <span className={styles.investorDesc}>
                    <Skeleton width={250} height={20} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
