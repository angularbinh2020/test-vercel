import Image from "next/image";
import React from "react";
import { IBlogHeader } from "sites/mogivi/models/blocks/IBlogHeader";
import styles from "./styles.module.scss";

interface BlogHeaderProps {
  block: IBlogHeader;
}

const BlogHeaderBlock = (props: BlogHeaderProps) => {
  const { title, image } = props.block.fields;

  // const pageData = useGetPageDataContext();
  // const publicationDate = pageData?.currentNode.fields.publicationDate;

  return (
    <div className={styles.blogHeaderContainer}>
      <div className={styles.textHeader}>
        {/* {publicationDate ? <small>{convertDate(publicationDate)}</small> : ""} */}
        {title && <h2 className={styles.title}>{title}</h2>}
      </div>
      {image && (
        <div className="position-relative">
          <Image
            src={image.fields.umbracoFile}
            alt={image.system.name}
            width={image.fields.umbracoWidth}
            height={image.fields.umbracoHeight}
            layout="responsive"
            quality={100}
          />
        </div>
      )}
    </div>
  );
};
export default BlogHeaderBlock;
