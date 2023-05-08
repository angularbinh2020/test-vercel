export interface IFile {
  system: {
    contentType: string;
    id: string;
    name: string;
  };
  fields: {
    umbracoFile: string;
    umbracoExtension: string;
    umbracoBytes: number;
  };
}
