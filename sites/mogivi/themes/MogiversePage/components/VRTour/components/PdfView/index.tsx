import React, { useState, useCallback } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import styles from "./styles.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  pdfUrl: string;
}

const PdfView = ({ pdfUrl }: Props) => {
  const [pages, setPages] = useState<number[]>([]);
  const [isLoading, closeLoading] = useBoolean(true);
  const [isLoadError, , showLoadError] = useBoolean(false);
  const onDocumentLoadSuccess = useCallback((pdf: any) => {
    const initPages = new Array(pdf.numPages).fill(1);
    setPages(initPages);
    closeLoading();
  }, []);
  const onLoadError = useCallback(() => {
    showLoadError();
    closeLoading();
  }, []);
  return (
    <div className="w-100 h-100 position-relative overflow-auto">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onLoadError}
      >
        {pages.map((pg, pageIndex) => (
          <Page
            pageIndex={pageIndex}
            key={pageIndex}
            width={window.screen.width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
      {isLoading && (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )}
      {isLoadError && (
        <div className={styles.loading}>
          <h5 className="w-75 text-center">
            Đã có lỗi xảy ra, không thể tải Pdf. Vui lòng thử lại sau.
          </h5>
        </div>
      )}
    </div>
  );
};

export default PdfView;
