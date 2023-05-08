import React from "react";
import { GalleryImage } from "sites/mogivi/layout/components/Gallery/GalleryImage";

interface GalleryImageBlockProps {
  items: any;
}

export const GalleryImageBlock = (props: GalleryImageBlockProps) => {
  return <GalleryImage {...props} />;
};
