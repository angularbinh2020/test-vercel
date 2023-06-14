import styles from "../RentBuyResult/components/ItemRender/styles.module.scss";
import classNames from "classnames";
import Skeleton from "components/Skeleton";
import { useMemo } from "react";
const RentBuyLoadingPlaceholder = ({ pageSize }: any) => {
  const arrayItems = useMemo(() => {
    return Array(pageSize).fill(1);
  }, [pageSize]);
  return (
    <>
      {arrayItems.map((i, index) => (
        <div
          key={index}
          className="box-projects-item shadow-sm bg-white mb-3 mb-lg-4"
        >
          <div className="row ms-n2 me-n2">
            <div className="col-12 col-md-4 col-lg-4 px-0">
              <div className="position-relative">
                <Skeleton className={styles.imgPreview} height={200} />
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-8">
              <div className="pl-2 pl-lg-0 pt-2 pr-2 pr-lg-3">
                <h3
                  className={classNames(
                    styles.title,
                    styles.hoverHighlightOrange
                  )}
                >
                  <Skeleton height={20} width={200} />
                </h3>

                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className={styles.projectId}>
                    <Skeleton height={17} width={100} />
                  </div>
                  <div className={styles.agency}>
                    <Skeleton height={17} width={100} />
                  </div>
                </div>
                <Skeleton height={42} className={styles.projectDescription} />

                <Skeleton height={21} />
              </div>
            </div>
            <div className="col-12 pl-2 px-0">
              <div className="border-top p-2">
                <div className="row align-items-center">
                  <div className="col-8 col-md-4 col-lg-4">
                    <div className={styles.agency}>
                      <Skeleton
                        width={40}
                        height={40}
                        className={styles.agencyAvatar}
                      />
                      <span className="ms-1">
                        <Skeleton width={100} height={17} />
                      </span>
                    </div>
                  </div>

                  <div className="col-4 col-md-4 col-lg-4 text-left text-lg-center">
                    <Skeleton height={17} width={70} />
                  </div>

                  <div className="col-12 col-md-4 col-lg-4 mt-2 mt-md-0 mt-lg-0">
                    <Skeleton height={17} width={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RentBuyLoadingPlaceholder;
