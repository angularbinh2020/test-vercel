import type { NextPage } from "next";
import IContext from "models/IContext";
import getNodeDetailByContext from "utils/getNodeIdByContex";
import Layout from "components/Layout";
import useViewMode from "hooks/useViewMode";
import IPath from "models/IPath";
import {
  getAllPaths,
  getHotSpotIcon,
  getPageNodeDetailOptimal,
  getSubPageData,
  getSubPageNodeDetail,
  getTagHotSpotIcon,
  getVRTourAds,
  getVRTourFooterImages,
} from "apis/server";
import logger from "utils/logger";
import IPageData from "models/IPageData";
import dynamic from "next/dynamic";
import BlockRender from "components/BlockRender";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IMogiverseStatus } from "sites/mogivi/models/IMogiverseStatus";
import { getUrlPathName } from "sites/mogivi/utils";
import {
  isPanoramaTour,
  getTourSettingUpdateApi,
  getVrTourCheckStatusApi,
} from "utils";
import { NEXT_PUBLIC_API_CACHE_TIME_IN_SECOND } from "const/config";
import { setupNewsDetailPage } from "sites/mogivi/utils/setupNewsDetailPage";

const NewsDetailPage = dynamic(
  () => import("sites/mogivi/layout/components/NewsDetailPage")
);
const MogiverserPage = dynamic(
  () => import("sites/mogivi/themes/MogiversePage")
);
interface DefaultPageProps {
  site: string;
  pageData: IPageData;
}

const DefaultPage: NextPage<DefaultPageProps> = (props: DefaultPageProps) => {
  const { pageData } = props;
  const { isDesktop, isMobile, isMobileApp } = useViewMode();
  if (pageData?.isMogiversePage) {
    return <MogiverserPage pageData={pageData as any} />;
  }
  if (pageData?.isNewsDetailPage) {
    return <NewsDetailPage pageData={pageData} />;
  }
  if (pageData) {
    return (
      <Layout pageData={pageData}>
        {pageData?.currentNode?.fields?.blocks?.map((block) => (
          <BlockRender
            block={block}
            key={`block-id-${block.system.id}`}
            isDesktop={isDesktop}
            isMobile={isMobile}
            isMobileApp={isMobileApp}
            theme={pageData.currentNode.system.contentType}
          />
        ))}
      </Layout>
    );
  }
  return <DefaultMissingBlock />;
};

export async function getStaticProps(context: IContext) {
  const routerPath = context.params.slug.join("/");
  logger.info(`Start generating ${routerPath}`);
  try {
    let pageData: any = null;
    const {
      nodeId,
      subPageGetDetailApi,
      mogiverseGetDetailApi,
      isMogiverseUrl,
      mogiversePageType,
      mogiverserId,
      isPageNotExist,
    } = await getNodeDetailByContext(context);

    if (isPageNotExist) {
      return {
        notFound: true,
        revalidate: NEXT_PUBLIC_API_CACHE_TIME_IN_SECOND,
      };
    }
    const isMogiversePageNotFound = isMogiverseUrl && !mogiverseGetDetailApi;
    if (nodeId) {
      pageData = await getPageNodeDetailOptimal(nodeId);
      pageData.rawUrlBuild = routerPath;
    }
    if (subPageGetDetailApi) {
      pageData = await getSubPageNodeDetail(subPageGetDetailApi);
      const projectNodeId = pageData.newsOnProject?.node_id;
      if (projectNodeId)
        pageData.subPageData = await getSubPageData(projectNodeId);
      pageData.isSubPage = true;
      setupNewsDetailPage(pageData);
    }

    if (mogiverseGetDetailApi) {
      pageData = await getSubPageNodeDetail(mogiverseGetDetailApi);
      pageData.isMogiversePage = true;
      pageData.mogiversePageType = mogiversePageType;
      pageData.isPanoramaTour = isPanoramaTour(mogiversePageType);
      if (pageData.isPanoramaTour) {
        pageData.tagIcons = await getTagHotSpotIcon();
        pageData.hotSpotIcons = await getHotSpotIcon();
        pageData.ads = await getVRTourAds();
        pageData.footerImages = await getVRTourFooterImages();
        pageData.isEditView =
          `/${routerPath}` === getUrlPathName(pageData.data?.vr_tour_url);
        pageData.mogiverserId = mogiverserId;
        pageData.mogiverseGetDetailApi = mogiverseGetDetailApi;
        pageData.updateTourSettingApi =
          getTourSettingUpdateApi(mogiversePageType) + mogiverserId;
        pageData.vrTourCheckStatusApi = getVrTourCheckStatusApi(pageData);
        if (!pageData.isEditView) delete pageData.data?.vr_tour_url;
      }
    }

    if (isMogiversePageNotFound) {
      pageData = {
        isMogiversePage: true,
        mogiversePageType,
        data: {
          status: IMogiverseStatus.UN_PUBLISH,
        },
      };
    }

    if (pageData)
      return {
        props: {
          pageData,
        },
      };
  } catch (e) {
    logger.error(`Generating page error: ${routerPath}`);
    logger.error(e);
  }
  throw "Page generate fail";
}

export async function getStaticPaths() {
  logger.info("Start get paths");
  let paths: IPath[] = [];

  try {
    paths = await getAllPaths();
  } catch (e) {
    logger.error(e);
  }
  logger.info(`Get paths completed: ${paths.length} pages`);

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default DefaultPage;
