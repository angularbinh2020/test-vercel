import classNames from "classnames";
import LinkItem from "components/LinkItem";
import { COLOR_TYPE } from "const/color-type";
import useViewMode from "hooks/useViewMode";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GalleryImageItem } from "../GalleryImageItem";
import styles from "./styles.module.scss";

interface GalleryImageBlockProps {
  items: any;
}

export const GalleryImage = (props: GalleryImageBlockProps) => {
  const { items } = props;

  return (
    <>
      {items && items.projects?.length !== 0 && (
        <div className={styles.galleryImageContainer}>
          <div className={styles.galleryImageGroup}>
            <h2 className={styles.titleWrap}>Dự án {items.name}</h2>
            <div className={classNames(styles.textImageCard)}>
              {items.projects?.map((project: any, i: number) => (
                <GalleryImageItem key={i} project={project} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
