export interface IFileContent {
  system: {
    id: string;
    name: string;
    urlSegment: string | null;
    type: "Media";
    createdAt: string;
    editedAt: string;
    contentType: string;
    locale: string;
    url: string | null;
  };
  fields: {
    umbracoFile: string;
    umbracoBytes: number;
    umbracoExtension: string; // image type - extension
    umbracoWidth?: number;
    umbracoHeight?: number;
  };
}
