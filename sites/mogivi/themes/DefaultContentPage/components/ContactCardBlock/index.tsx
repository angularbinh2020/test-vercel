import classNames from "classnames";
import Image from "next/legacy/image";
import React from "react";
import { IContactCardBlock } from "sites/mogivi/models/blocks/IContactCardBlock";
import styles from "./styles.module.scss";

interface ContactCardBlockProps {
  block: IContactCardBlock;
}

const ContactCardBlock = (props: ContactCardBlockProps) => {
  const { image, topText, bottomText } = props.block.fields;
  return (
    <div className={styles.contactCardBlockContainer}>
      <div className={classNames(styles.contactCardBox, "container")}>
        <div className={classNames("row", styles.contactCardContent)}>
          {image && (
            <div className="col-md-3">
              <div className={classNames(styles.contactCardImg)}>
                <Image
                  src={image.fields?.umbracoFile}
                  width={254}
                  height={373}
                  alt={image.system.name}
                  objectFit={"cover"}
                />
              </div>
            </div>
          )}
          <div className="col-md-6">
            <div className={styles.bottomText}>
              <h2>{topText}</h2>
              {bottomText && (
                <div dangerouslySetInnerHTML={{ __html: bottomText }}></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCardBlock;
