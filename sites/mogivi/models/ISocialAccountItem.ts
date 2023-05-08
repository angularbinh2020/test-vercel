export interface ISocialAccountItem {
  system: {
    contentType: "socialAccountItem";
  };
  fields: {
    title: string;
    icon: string;
    externalUrl: string;
  };
}
