import { IETValuesFilterTagsItem } from "sites/mogivi/models/IETFilterTags";
import { IBlock } from "./blocks/IBlock";
import IBlockImage from "./blocks/IBlockImage";
import ITag from "./ITag";

interface IPageNode {
  system: {
    id: string; // node id
    name: string;
    urlSegment: string;
    type: string;
    createdAt: string;
    editedAt: string;
    contentType: string;
    locale: string;
    url: string | null;
  };
  fields: {
    metaTitle: string;
    metaDescription: string;
    socialMediaImage: IBlockImage;
    xmlSitemapChangeFrequency: string;
    xmlSitemapPriority: string;
    excludeFromXmlSitemap: boolean;
    tags: ITag[];
    pageTitle: string;
    headerBackgroundColour: string;
    contentBgColour: string;
    menuTitle: string;
    excludeFromSearch: boolean;
    umbracoUrlAlias: string;
    removeDefaultHeader: boolean;
    removeDefaultFooter: boolean;
    disableChatFeature: boolean;
    blocks: IBlock[];
    blocksMobile: IBlock[];
    blocksMobileApp: IBlock[];
    mobileAppBlocks: IBlock[];
    itemTitle: string;
    supportSearchByURL?: boolean;
    defaultFilterLocation: any;
    filtersOptions: IETValuesFilterTagsItem[];
    publicationDate: string;
    byLine: string;
    imageCaption: string;
  };
}

export default IPageNode;
