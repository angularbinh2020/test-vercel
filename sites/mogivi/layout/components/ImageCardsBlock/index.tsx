import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IImageCardsBlock } from "sites/mogivi/models/blocks/IImageCardsBlock";
import styles from "./styles.module.scss";

export interface ImageCardsProps {
  block: IImageCardsBlock;
}

export const ImageCards = (props: ImageCardsProps) => {
  const { itemTitle, groupBlocks, backgroundImage } = props.block.fields;
  const bgImg = backgroundImage.fields?.umbracoFile;
  // const [isFlipped, setIsFlipped] = useState(true);

  return (
    <div
      className={styles.imageCardContainer}
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className={styles.imageCardTextGroup}>
        <div className="container">
          <h2 className="title-wrap">{itemTitle}</h2>
          <div className={styles.imageCardWrap}>
            {groupBlocks &&
              groupBlocks.map((item, idx: number) => {
                const image = item.fields.image.fields?.umbracoFile;
                const isOdd = idx % 2 !== 0;
                return (
                  <div key={idx} className={classNames(styles.imageCardBox)}>
                    <div
                      className={classNames(
                        "row align-items-center",
                        styles.textImageCard,
                        !isOdd ? styles.textImageCardFlip : ""
                      )}
                    >
                      <div className="col-md-6 col-lg-6 p-0">
                        <div className={styles.cardImg}>
                          {image && (
                            <Image
                              alt="icon"
                              src={image}
                              width={640}
                              height={429}
                              quality={100}
                              className="objectFitCover"
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className={styles.cardContent}>
                          <p>{item.fields?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
