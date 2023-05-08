export interface IETFAQItem {
  system: {
    contentType: "eTFAQItem";
  };
  fields: {
    question: string;
    answer: string;
  };
}
