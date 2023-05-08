import { IETFormFieldItem } from "models/IETFormFieldItem";
import { IETSettingsAPIItem } from "sites/mogivi/models/IETSettingsAPIItem";

export interface IFormBlock {
  system: {
    contentType: "formBlock";
  };
  fields: {
    title: string;
    emailAddress: string;
    emailSubject: string;
    fields: IETFormFieldItem[];
    settingsAPI: IETSettingsAPIItem;
    submitButtonLabel: string;
    submissionMessage: string;
    fromEmail: string;
    emailThankyouMessage: string;
  };
}
