import { IRichTextBlock } from "models/blocks/IRichTextBlock";
import React, { useMemo } from "react";
import styles from "./styles.module.scss";

export interface RichTextBlockProps {
  block: IRichTextBlock;
}

export const RichTextBlockItem = (props: RichTextBlockProps) => {
  const { text, itemTitle } = props.block.fields;

  const textConvert = useMemo(() => {
    if (text && text.includes(`<img src="/media/`)) {
      return text.replace(
        /[/]media[/]/g,
        process.env.NEXT_PUBLIC_API_HOST + "media/"
      );
    } else {
      return text;
    }
  }, [text]);

  return (
    <div className={styles.richTextContainer}>
      <div className="container">
        <div className={styles.richTextWrap}>
          {itemTitle && itemTitle !== "" && <h2>{itemTitle}</h2>}
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: textConvert }}
          ></div>
        </div>
      </div>
    </div>
  );
};
