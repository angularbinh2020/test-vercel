import { useMemo } from "react";
import { Card } from "react-bootstrap";
import styles from "../ProjectResult/styles.module.scss";
import Skeleton from "components/Skeleton";
import classNames from "classnames";
import selfStyles from "./styles.module.scss";

interface Props {
  pageSize: number;
}

const LoadingPlaceholder = ({ pageSize }: Props) => {
  const items = useMemo(() => {
    return new Array(pageSize).fill(1);
  }, [pageSize]);
  return (
    <>
      {items?.map((item: any, idx: number) => {
        return (
          <div key={idx} className="col-12 col-md-6 col-lg-4 col-xl-4">
            <Card className={styles.cardContainer}>
              <Card.Body>
                <div className="w-100 position-relative">
                  <Skeleton
                    className={classNames("mw-100", selfStyles.image)}
                  />
                </div>

                <Skeleton
                  className={styles.cardTitle}
                  height={23}
                  width={150}
                />

                <div className="d-flex align-items-center gap-2">
                  <div className={styles.addressIcon}>
                    <Skeleton width={15} height={15} />
                  </div>
                  <Skeleton className={styles.cardAddress} height={48} />
                </div>
              </Card.Body>
              <Card.Footer className={styles.cardFooter}>
                <div
                  className={classNames(
                    "w-100 d-flex align-items-end gap-3",
                    styles.cardSubDescription
                  )}
                >
                  <div
                    key={idx}
                    className={classNames(
                      "d-flex align-items-center gap-1",
                      styles.briefInfoBox
                    )}
                  >
                    <div>
                      <Skeleton width={100} height={15} />
                    </div>
                    <Skeleton className={styles.briefInfoText} height={15} />
                  </div>
                </div>
                <Skeleton className={styles.price} width={120} height={22} />
              </Card.Footer>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default LoadingPlaceholder;
