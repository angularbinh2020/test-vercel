import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PAGE_PREFIX, START_PAGE_INDEX } from "const/config";

export const useGetCurrentPathInfo = () => {
  const [{ slug, pageIndex }, setState] = useState<{
    slug: string[];
    pageIndex: number;
  }>({
    slug: [],
    pageIndex: 0,
  });
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const initSlug = location.pathname
        .split("/")
        .filter((slg) => slg)
        .map((slg) => decodeURI(slg));
      const pageIndex = Number(
        initSlug
          .find((slg) => slg.startsWith(PAGE_PREFIX))
          ?.replace(PAGE_PREFIX, "") || START_PAGE_INDEX
      );
      setState({
        slug: initSlug,
        pageIndex,
      });
    }
  }, [router]);
  return {
    slug,
    pageIndex,
  };
};
