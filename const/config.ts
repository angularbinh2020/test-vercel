import { PHASE_PRODUCTION_BUILD } from "next/constants";
export const NEXT_PUBLIC_PAGE_CACHE_TIME_IN_SECOND = Number(
  process.env.NEXT_PUBLIC_PAGE_CACHE_TIME_IN_SECOND || 10
);

export const isProductBuild = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;

export const NEXT_PUBLIC_API_CACHE_TIME_IN_SECOND = isProductBuild
  ? 6000
  : Number(process.env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECOND || 30);

export const START_PAGE_INDEX = 1;

export const DEFAULT_PAGE_SIZE = 10;

export const REVALIDATE_TOKEN =
  process.env.NEXT_PUBLIC_REVALIDATE_TOKEN || "MOGIVI";

export const PAGE_PREFIX = "page-";

export const MOGIVI_CONTACT = {
  fullName: "Mogivi",
  phone: "1800646427",
  email: "support@mogivi.vn",
};
