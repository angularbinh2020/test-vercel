import classNames from "classnames";
import Image from "next/legacy/image";
import React, { useMemo } from "react";
import { Accordion } from "react-bootstrap";
import { IETTab } from "sites/mogivi/models/IETTab";
import styles from "./styles.module.scss";
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
  return (
    <>
      <div className="col-12 col-lg-8" id={tab.anchorID}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
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
                      width={1200}
                      height={600}
                      objectFit={"cover"}
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
