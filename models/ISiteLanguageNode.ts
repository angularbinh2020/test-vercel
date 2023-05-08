import { IHighlightedNavigationItem } from "sites/mogivi/models/IHighlightedNavigationItem";
import { ILinkInfo } from "sites/mogivi/models/ILinkInfo";
import IBlockImage from "./blocks/IBlockImage";

interface SocialAccount {
  fields: {
    externalUrl: string;
    icon: string;
    title: string;
  };
}

export interface ISiteLanguageNode {
  system: {
    contentType: "languageWebsite";
    urlSegment: string;
    id: string;
    name: string;
  };
  fields: {
    siteName: string;
    languageName: string;
    googleTagManagerId: string;
    defaultPage: {
      id: string;
      linkType: string;
      type: string;
    };
    defaultSocialMediaImage: IBlockImage;
    logo: IBlockImage;
    footerLogo: IBlockImage;
    footerMap: IBlockImage;
    footerBackgroundColour: string;
    highlightedNavigation: IHighlightedNavigationItem[];
    newHighlightedNavigation: IHighlightedNavigationItem[];
    footerNavigationLinksTitle: string;
    footerNavigationLinksTitle2: string;
    footerNavigationLinksTitle3: string;
    footerNavigationLinksTitle4: string;
    cookieBannerText: string;
    cookieBannerTitle: string;
    copyrightMessage: string;
    emailAddress: string;
    footerAddressText: string;
    footerAncillaryLinks: ILinkInfo[];
    footerNavigationLinks: ILinkInfo[];
    footerNavigationLinks2: ILinkInfo[];
    footerNavigationLinks3: ILinkInfo[];
    footerNavigationLinks4: ILinkInfo[];
    phone: string;
    socialAccounts: SocialAccount[];
  };
}
