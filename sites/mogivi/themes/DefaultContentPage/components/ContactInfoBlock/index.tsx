import React from "react";
import { ContactInfoBlock } from "sites/mogivi/layout/components/ContactInfoBlock";
import { IContactsMethod } from "sites/mogivi/models/blocks/IContactsMethod";

export interface IContactInfoBlockModel {
  block: IContactsMethod;
}

const ContactInfo = (props: IContactInfoBlockModel) => {
  return <ContactInfoBlock {...props} />;
};

export default ContactInfo;
