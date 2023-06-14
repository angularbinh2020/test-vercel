import classNames from "classnames";
import { Card } from "react-bootstrap";
import LinkItem from "components/LinkItem";
import Image from "next/legacy/image";
import styles from "./styles.module.scss";
import icLocation from "sites/mogivi/assets/icons/ic-location.svg";
import LoadingPlaceholder from "../ProjectLoadingPlaceholder";

interface Props {
  allProjects?: any[];
  isLoading: boolean;
  pageSize: number;
}

const ProjectResult = ({ allProjects, isLoading, pageSize }: Props) => {
  return (
    <>
      {!isLoading &&
        allProjects?.map((item: any, idx: number) => {
          const listOfInfo = item.listOfInfo;
          const price = listOfInfo
            ? listOfInfo[listOfInfo?.length - 1]?.text
            : "";
          return (
            <div key={idx} className="col-12 col-md-6 col-lg-4 col-xl-4">
              <Card className={styles.cardContainer}>
                <Card.Body>
                  {item.logo && (
                    <LinkItem url={item.pageURL}>
                      <div className="w-100 position-relative">
                        <Image
                          src={item.logo.logoUrl}
                          alt={item.logo.description}
                          title={item.logo.description}
                          width={520}
                          height={300}
                        />
                      </div>
                    </LinkItem>
                  )}

                  {item.name && (
                    <LinkItem url={item.pageURL}>
                      <Card.Title className={styles.cardTitle}>
                        {item.name}
                      </Card.Title>
                    </LinkItem>
                  )}

                  {item?.addressText && (
                    <div className="d-flex align-items-center gap-2">
                      <div className={styles.addressIcon}>
                        <Image
                          src={icLocation}
                          width={15}
                          height={15}
                          alt={"icon"}
                        />
                      </div>
                      <p className={styles.cardAddress}>{item?.addressText}</p>
                    </div>
                  )}
                </Card.Body>
                {Boolean(listOfInfo?.length) && (
                  <Card.Footer className={styles.cardFooter}>
                    <div
                      className={classNames(
                        "w-100 d-flex align-items-end gap-3",
                        styles.cardSubDescription
                      )}
                    >
                      {listOfInfo
                        .slice(0, -1)
                        .map((infoItem: any, idx: number) => (
                          <div
                            key={idx}
                            className={classNames(
                              "d-flex align-items-center gap-1",
                              styles.briefInfoBox
                            )}
                          >
                            {infoItem?.icon && (
                              <>
                                <div>
                                  <Image
                                    src={infoItem.icon.logoUrl}
                                    width={15}
                                    height={15}
                                    objectFit={"contain"}
                                    alt={"icon"}
                                  />
                                </div>
                                <div
                                  className={styles.briefInfoText}
                                  dangerouslySetInnerHTML={{
                                    __html: infoItem?.text,
                                  }}
                                ></div>
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                    {price?.trim() && (
                      <div
                        className={styles.price}
                        dangerouslySetInnerHTML={{
                          __html: price,
                        }}
                      ></div>
                    )}
                  </Card.Footer>
                )}
              </Card>
            </div>
          );
        })}
      {isLoading && <LoadingPlaceholder pageSize={pageSize} />}
    </>
  );
};

export default ProjectResult;
