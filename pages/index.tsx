import type { NextPage } from "next";
import Layout from "components/Layout";
import useViewMode from "hooks/useViewMode";
import { getDefaultHomePageNodeId, getPageNodeDetail } from "apis/server";
import IPageData from "models/IPageData";
import BlockRender from "components/BlockRender";

interface DefaultPageProps {
  site: string;
  pageData: IPageData;
}

const DefaultPage: NextPage<DefaultPageProps> = (props: DefaultPageProps) => {
  const { pageData } = props;
  const { isDesktop, isMobile, isMobileApp } = useViewMode();
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
};

export async function getStaticProps() {
  const { nodeId, homeId } = await getDefaultHomePageNodeId();
  const pageData = await getPageNodeDetail(nodeId, true);
  pageData.siteId = homeId;
  return {
    props: {
      pageData,
    },
  };
}

export default DefaultPage;
