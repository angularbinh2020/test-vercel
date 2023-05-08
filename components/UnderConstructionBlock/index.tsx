import classNames from "classnames";
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoWhite from "sites/mogivi/assets/images/logo/mogivi-logo-text-white.webp";
import Link from "next/link";
import { IBannerSubpageBlock } from "sites/mogivi/models/blocks/IBannerSubpageBlock";
import CityBg from "sites/mogivi/assets/images/city-night.jpg";
interface UnderConstructionBlock {
  blockName?: string;
  props?: any;
  block: IBannerSubpageBlock;
}

const UnderConstructionBlock = (props: UnderConstructionBlock) => {
  const { subtitle } = props.block.fields;

  return (
    <>
      <div className={styles.logo}>
        <div className="container">
          <Link href="/">
            <a>
              <Image
                src={logoWhite}
                alt="Mogivi Logo"
                width={150}
                height={40}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={classNames(styles.underConstructionContainer)}>
        <div className={styles.introBackground}>
          <Image
            src={CityBg}
            alt="city banner"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            priority
          />
          <div className={styles.countDownContainer}>
            <h2>
              <span className="textLoader">
                Under <br />
                Construction
              </span>
            </h2>
            <div className="gearLoader"></div>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnderConstructionBlock;
