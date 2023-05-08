import React, { useMemo, useState } from "react";
import styles from "./styles.module.scss";
import Slider from "components/ReactSlickSlider";
import { IETTab } from "sites/mogivi/models/IETTab";
import { useGetPageDataContext } from "context/page-data.context";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import FormRequestMoreInfo from "../FormRequestMoreInfo";
import { GalleryImageItem } from "sites/mogivi/layout/components/Gallery/GalleryImageItem";
import useViewMode from "hooks/useViewMode";

interface NeighborhoodProjectSectionProps {
  tab: IETTab;
}

const NeighborhoodProjectSection = (props: NeighborhoodProjectSectionProps) => {
  const { blocksInTab, title: pageTitle, anchorID } = props.tab.fields;
  const pageData = useGetPageDataContext();
  const formAskMoreInfoApiUrl = useMemo(() => {
    return (
      pageData?.currentNode.fields?.blocks.find(
        (block) =>
          block.system.contentType ===
          MOGIVI_CONTENT_TYPE.breadcrumbsProjectPageBlock
      )?.fields.subcribeAPI?.askMoreInfo + "OnProject"
    );
  }, [pageData]);
  const { isMobileApp } = useViewMode();
  const [settings] = useState({
    speed: 500,
    centerMode: false,
    dots: true,
    centerPadding: "100px",
    slidesToShow: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  return (
    <>
      <div className={styles.neighborProjectContent} id={anchorID}>
        {blocksInTab && blocksInTab[0]?.fields?.projectViews?.items?.length && (
          <div className="mt-4 pt-4 pb-1">
            <h2 className="section-title mb-3">{pageTitle}</h2>
            {blocksInTab[0]?.fields?.projectViews?.items?.length < 2 ? (
              <div className={styles.noSlide}>
                {blocksInTab[0]?.fields?.projectViews.items?.map(
                  (item: any, idx: number) => {
                    return (
                      <div key={idx} className={styles.neighborProjectItem}>
                        <GalleryImageItem project={item} />
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <Slider {...settings}>
                {blocksInTab[0]?.fields?.projectViews.items?.map(
                  (item: any, idx: number) => {
                    return (
                      <div key={idx} className={styles.neighborProjectItem}>
                        <GalleryImageItem project={item} />
                      </div>
                    );
                  }
                )}
              </Slider>
            )}
          </div>
        )}
      </div>
      {formAskMoreInfoApiUrl && formAskMoreInfoApiUrl !== "" && (
        <div className={isMobileApp ? "mb-5" : ""}>
          <FormRequestMoreInfo apiUrl={formAskMoreInfoApiUrl} />
        </div>
      )}
    </>
  );
};

export default NeighborhoodProjectSection;
