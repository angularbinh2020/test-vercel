import React from "react";
import { ContactSupportBlock } from "sites/mogivi/layout/components/ContactBlock";
import { IContactBlock } from "sites/mogivi/models/blocks/IContactBlock";

interface ContactSupportProps {
  block: IContactBlock;
}

const ContactBlock = (props: ContactSupportProps) => {
  return (
    <div className="container py-5">
      <ContactSupportBlock {...props} />
    </div>
  );
};

export default ContactBlock;
