export interface ITagItem {
  system: {
    contentType: string;
    name: string;
    id: string;
    urlSegment: string;
  };
  fields: {
    itemTitle: string;
  };
}
