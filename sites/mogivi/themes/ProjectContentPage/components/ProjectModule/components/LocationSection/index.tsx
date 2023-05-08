import React, { useMemo, useState } from "react";
import { Accordion } from "react-bootstrap";
import { IETTab } from "../../../../../../models/IETTab";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
interface LocationSectionProps {
  tab: IETTab;
}

const LocationSection = (props: LocationSectionProps) => {
  const tab = props.tab.fields;
  const { coordinatesX, coordinatesY, itemTitle, subtitle, addressText } =
    useMemo(() => {
      const locationItems = tab.blocksInTab[0]?.fields || {};
      return locationItems;
    }, [tab]);
  const locationUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinatesX},${coordinatesY}&zoom=15&size=740x300&maptype=roadmap&markers=color:red|${coordinatesX},${coordinatesY}&key=AIzaSyACWY72_dZWimjzxR2K8QSBdt2kGbn7L78`;
  const imageAlt = itemTitle + " " + subtitle;

  const [activeKey, setActiveKey] = useState("");
  const handleOnClick = (e: any) => {
    if (activeKey) setActiveKey("");
    else setActiveKey("0");
  };

  return (
    <>
      <div className="col-12 col-lg-8" id={tab.anchorID}>
        <Accordion activeKey={activeKey}>
          <Accordion.Item eventKey="0">
            <Accordion.Header
              onClick={handleOnClick}
              data-tab-opened={activeKey ? "true" : "false"}
            >
              <h2 className={styles.sectionTitle}>
                {itemTitle}{" "}
                <span className={styles.placeViral}>{subtitle}</span>
              </h2>
            </Accordion.Header>
            <Accordion.Body>
              <div data-tab-anchor-id={tab.anchorID}>
                <div className="row">
                  <div
                    className={classNames(
                      styles.locationContent,
                      "location__content mt-3 mb-4"
                    )}
                  >
                    <Image
                      className="img-map"
                      src={locationUrl}
                      alt={imageAlt}
                      title={imageAlt}
                      width={740}
                      height={300}
                    />
                    <div
                      className={classNames(
                        styles.locationContentAdress,
                        "d-flex align-items-center shadow"
                      )}
                    >
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <h6 className="mb-0 ml-2 font-weight-bold">
                        {addressText}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="col-0 col-lg-4"></div>
    </>
  );
};

export default LocationSection;
