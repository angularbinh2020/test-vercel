import React from "react";
import { GalleryImage } from "./GalleryImage";
import { GalleryPeopleInfo } from "./GalleryPeopleInfo";

interface IGalleryIntroBanner {
  theme: string;
  block?: any;
}

export const GALLERY_THEME = {
  PEOPLE_INTRO: "PEOPLE_INTRO",
  IMAGE: "IMAGE",
};

export const GalleryIntroBanner = (props: IGalleryIntroBanner) => {
  // const { theme, block } = props;
  // switch (theme) {
  //   case GALLERY_THEME.PEOPLE_INTRO:
  //   // return <GalleryPeopleInfo />;
  //   case GALLERY_THEME.IMAGE:
  //     return <GalleryImage />;
  // }
  return <div>GalleryIntroBanner</div>;
};
