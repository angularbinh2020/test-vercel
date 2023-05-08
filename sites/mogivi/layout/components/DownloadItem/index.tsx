import Link from "next/link";
import React from "react";
import DownloadIcon from "sites/mogivi/components/SvgIcon/components/DownloadIcon";
import Vision from "sites/mogivi/components/SvgIcon/components/Vision";
import { IDocumentItem } from "sites/mogivi/models/IDocumentItem";
import styles from "./styles.module.scss";

export const DocumentItem = (props: IDocumentItem) => {
  const { title, downloadFile, publicationDate } = props;
  const date = new Date(publicationDate);

  const onButtonClick = (pdfFile: string) => {
    // using Java Script method to get PDF file
    fetch(pdfFile).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = pdfFile;
        alink.click();
      });
    });
  };

  return (
    <>
      <div className={styles.downloadItemContainer}>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className={styles.downloadItem}>
              <div className={styles.itemHeader}>
                <h2>{title}</h2>
                <div className={styles.actionGroup}>
                  <span className={styles.itemPublishDate}>
                    {date.toLocaleDateString()}
                  </span>
                  <div className={styles.actionBox}>
                    <Link href={downloadFile.logoUrl}>
                      <a target={"_blank"} aria-label="view">
                        <span className={styles.iconVision}>
                          <Vision />
                        </span>
                      </a>
                    </Link>
                    <div
                      className={styles.downloadBtn}
                      onClick={() => onButtonClick(downloadFile.logoUrl)}
                    >
                      <span className={styles.iconVision}>
                        <DownloadIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.docType}>
                <span>PDF - 407.6 KB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
