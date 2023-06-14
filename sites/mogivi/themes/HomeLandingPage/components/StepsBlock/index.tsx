import React from "react";
import styles from "./styles.module.scss";
import { IPromotionSteps } from "sites/mogivi/models/blocks/IPromotionSteps";
import Image from "next/legacy/image";

export interface IStepsBlock {
  block: IPromotionSteps;
}

const StepsBlock = (props: IStepsBlock) => {
  const { title, text, steps } = props.block.fields;
  return (
    <div className={styles.stepsContainer}>
      <div className="container">
        {title && <h2 className={styles.title}>{title}</h2>}

        {Boolean(steps?.length) && (
          <div className={styles.stepsBox}>
            <div className={styles.stepItemBox}>
              {steps.map((stepItem, idx) => {
                const {
                  icon,
                  text: stepItemText,
                  title: stepItemTitle,
                } = stepItem.fields;
                return (
                  <div key={idx} className={styles.stepItem}>
                    {icon && (
                      <div className={styles.stepIcon}>
                        <Image
                          src={icon?.fields?.umbracoFile}
                          width={30}
                          height={30}
                          alt={`icon-${icon?.system?.name}`}
                        />
                      </div>
                    )}
                    {/* <span className={styles.stepIcon}>
                      <EquipIcon />
                    </span> */}
                    {stepItemTitle && stepItemTitle !== "" && (
                      <h1>{stepItemTitle}</h1>
                    )}
                    {stepItemText && stepItemText !== "" && (
                      <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: stepItemText }}
                      ></div>
                    )}
                  </div>
                );
              })}
              {/* <div className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <AddUserIcon />
                </span>
                <h4>Sign Up</h4>
                <p className={styles.description}>Download the Wallmarttech VR App and create an account</p>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <CaptureIcon />
                </span>
                <h4>Capture</h4>
                <p className={styles.description}>
                  Follow the tutorial to create your first scan. Capture 100m2 in just 20 mins
                </p>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <UploadIcon />
                </span>
                <h4>Upload</h4>
                <p className={styles.description}>
                  Upload your scans directly via the Wallmarttech app to generate your 3D tour
                </p>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <Share />
                </span>
                <h4>Share</h4>
                <p className={styles.description}>
                  Share your tour, and enhance it with Wallmarttech Console if you prefer
                </p>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsBlock;
