import { IFileContent } from "./IFileContent";

export interface IRootNode {
  system: {
    urlSegment: string; // site folder name,
  };
  fields: {
    databaseURL: string;
    aPIKey: string;
    favIcon: IFileContent;
    footerBackgroundColour: string;
    footerLogo: IFileContent;
    footerMap: IFileContent;
    googleMapAPIKey: string;
    googleTagManagerId: string;
    logo: IFileContent;
    mapHeightSize: number;
    mapWidthSize: number;
    measurementId: string;
    messagingSenderId: string;
    projectId: string;
    socialShareOptions: any[];
    socketUrl: string;
    storageBucket: string;
    theme: string;
    tiktokId: string;
    websiteDomain: string;
  };
}
