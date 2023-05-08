interface IBlockImage {
  system: {
    contentType: "Image";
    id: string;
    name: string;
    urlSegment: string | null;
    type: "Media";
    createdAt: string;
    editedAt: string;
    locale: string;
    url: string | null;
  };
  fields: {
    umbracoWidth: number;
    umbracoHeight: number;
    umbracoFile: string;
    umbracoBytes: number;
    umbracoExtension: string;
  };
}

export default IBlockImage;
