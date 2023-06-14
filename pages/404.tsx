import { getAllPages, getAllSite } from "apis/server";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface NotFoundProps {
  notFound: string;
}

const NotFound = (props: NotFoundProps) => {
  const router = useRouter();
  useEffect(() => {
    if (props.notFound) router.replace(props.notFound);
  }, [props.notFound, router]);
  return <div></div>;
};

export async function getStaticProps() {
  const sites = await getAllSite();
  const currentSite = sites.find(
    (site) => process.env.NEXT_PUBLIC_BUILD_SITE === site.urlSegment
  );

  if (currentSite) {
    const pages = await getAllPages(currentSite.id);
    const errorPage = pages.find((page) => page.urlSegment === "not-found");
    return {
      props: {
        notFound: errorPage?.urlSegment || null,
      },
    };
  }
}

export default NotFound;
