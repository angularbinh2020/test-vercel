import React, { useMemo } from "react";
import Head from "next/head";
import { IVrTour } from "sites/mogivi/models/IVrTour";
import { IVR360 } from "sites/mogivi/models/IVR360";

interface Props {
  pageData: {
    data: IVrTour;
  };
  vr360Data?: IVR360;
}

const PageHeader = ({ pageData, vr360Data }: Props) => {
  const tour_settings = vr360Data?.tour_settings;
  const metaImg = useMemo(() => {
    const rooms = vr360Data?.rooms;
    return rooms?.length ? rooms[0].imagesJsonParsed.roomPreview : "";
  }, []);

  return (
    <>
      <Head>
        <title>{tour_settings?.title || pageData.data.title}</title>
        <link
          id="favicon"
          href="/favicon.ico"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link href="https://mogivi.vn" rel="home" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      {tour_settings && (
        <Head>
          <meta name="description" content={tour_settings.description} />
          <meta name="keywords" content={tour_settings.description} />
          <meta name="news_keywords" content={tour_settings.description} />
          <meta property="og:title" content={tour_settings.title} />
          <meta property="og:description" content={tour_settings.description} />
          <meta property="og:locale" content="vi_VN" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Mogivi.vn" />
          <meta name="twitter:title" content={tour_settings.title} />
          <meta property="og:url" content={vr360Data.vr_tour_url_view} />
          <meta
            name="twitter:description"
            content={tour_settings.description}
          />
          <meta property="og:image" content={metaImg} />
          <meta property="og:image:url" content={metaImg} />
          <meta property="og:image:type" content="image/webp" />
          <meta property="og:image:secure_url" content={metaImg} />
          <meta name="twitter:image" content={metaImg} />
          <meta itemProp="image" content={metaImg} />
          <meta name="twitter:image:width" content="800" />
          <meta name="twitter:image:height" content="418" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="418" />
          <meta itemProp="description" content={tour_settings.description} />
          <meta itemProp="name" content={tour_settings.title} />
          <meta name="twitter:card" content="summary" />
        </Head>
      )}
    </>
  );
};

export default PageHeader;
