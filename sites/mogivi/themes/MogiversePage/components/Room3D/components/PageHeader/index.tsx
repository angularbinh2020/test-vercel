import React from "react";
import Head from "next/head";
import { IRoom } from "sites/mogivi/models/IRoom";

interface Props {
  pageData: {
    data: IRoom;
  };
}

const PageHeader = ({ pageData }: Props) => {
  return (
    <>
      <Head>
        <title>{pageData.data.name}</title>
        <link
          id="favicon"
          href="/favicon.ico"
          rel="shortcut icon"
          type="image/x-icon"
        />
      </Head>
    </>
  );
};

export default PageHeader;
