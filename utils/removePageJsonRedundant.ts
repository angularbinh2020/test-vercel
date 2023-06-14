import { CONTENT_TYPE } from "const/content-type";
import IPageData from "models/IPageData";
import { removeAllFields } from "utils";

export const removeSubPageRedundantData = (subPageData: IPageData) => {
  const currentNode = subPageData.currentNode;
  removeAllFields({
    object: currentNode,
    exceptionFields: ["fields"],
  });

  if (currentNode.fields) {
    removeAllFields({
      object: currentNode.fields,
      exceptionFields: [
        "blocks",
        "umbracoUrlAlias",
        "pageTitle",
        "metaDescription",
        "metaTitle",
        "socialMediaImage",
      ],
    });
  }
  const removeFields: any[] = ["siteLanguageNode", "rootNode"];
  removeFields.forEach((fieldNam) => {
    const siteNode = subPageData[fieldNam as keyof typeof subPageData];
    removeAllFields({
      object: siteNode.fields,
      exceptionFields: [
        "footerLogo",
        "emailAddress",
        "phone",
        "copyrightMessage",
        "footerAddressText",
        "footerNavigationLinksTitle",
        "footerNavigationLinksTitle2",
        "footerNavigationLinksTitle3",
        "footerNavigationLinksTitle4",
        "footerNavigationLinks",
        "footerNavigationLinks2",
        "footerNavigationLinks3",
        "footerNavigationLinks4",
        "footerAncillaryLinks",
        "socialAccounts",
        "favIcon",
        "websiteDomain",
        "highlightedNavigation",
        "logo",
      ],
    });
  });
};

export const removePageNodeDetailRedundantData = (pageData: IPageData) => {
  removeProjectContentPageRedundantData(pageData);
};

export const removeProjectContentPageRedundantData = (pageData: IPageData) => {
  const isProjectContentPage =
    pageData.currentNode?.system?.contentType ===
    CONTENT_TYPE.projectContentPage;
  if (!isProjectContentPage) return;
  const fields = pageData.currentNode.fields;
  removeAllFields({
    object: fields,
    removeFields: ["timeFinished", "tags"],
  });
  const googleDriveDocumentsBlocks = fields.mobileAppBlocks?.filter(
    (block) => block.system.contentType === CONTENT_TYPE.googleDriveDocuments
  );
  googleDriveDocumentsBlocks.forEach((block) => {
    const fields = block.fields;
    removeAllFields({
      object: fields,
      exceptionFields: ["groupBlocks"],
    });
    const groupBlocks = fields["groupBlocks" as keyof typeof fields];
    if (groupBlocks) {
      removeAllFields({
        object: groupBlocks,
        exceptionFields: ["googleDriveURL"],
      });
    }
  });
  const productsTags = fields["productsTags" as keyof typeof fields];
  if (productsTags?.length) {
    productsTags.length = 1;
    removeAllFields({
      object: productsTags[0],
      exceptionFields: ["contentName"],
    });
  }
  const projectModules = fields.blocks.filter(
    (block) => block.system.contentType === CONTENT_TYPE.projectModule
  );
  projectModules.forEach((block) => {
    removeAllFields({
      object: block.fields,
      exceptionFields: ["tabs"],
    });
  });
};
