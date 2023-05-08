export interface IETJobItem {
  system: {
    contentType: "eTJobItem";
  };
  fields: {
    jobName: string;
    jobLocation: string;
    jobDescription: string;
  };
}
