import { MOGIVI_CONTENT_TYPE } from "../const/content-type";
import { ApartmentSameLocationModel } from "../models/ISubpage";

export const setupNewsDetailPage = (pageData: any) => {
  const isNewsDetailPage =
    pageData?.system?.contentType === MOGIVI_CONTENT_TYPE.mgvNewsContent;
  if (!isNewsDetailPage) return;
  pageData.isNewsDetailPage = true;
  pageData.isSubPage = false;
  const removeNewsSameLocationRedundant = (
    sameLocation: ApartmentSameLocationModel
  ) => {
    const fieldsRemove = [
      "address",
      "areaDescription",
      "houseOrApartmentCode",
      "status",
    ];
    sameLocation?.listOfMgvNews?.forEach((news) => {
      fieldsRemove.forEach((fieldName) => {
        delete news[fieldName as keyof typeof news];
      });
    });
  };
  removeNewsSameLocationRedundant(pageData.listOfRentalMgvNewsSameLocation);
  removeNewsSameLocationRedundant(pageData.listOfSellMgvNewsSameLocation);
  const removeSameLocationProjectsFields = [
    "addressText",
    "addressTextAutoGenerated",
    "imageCards",
    "isProjectHasShareHangInfo",
    "keyword",
    "latitude",
    "listOfAddress",
    "listOfInvestor",
    "productsTags",
    "mobileDataApplication",
    "oldCMSNodeId",
    "typeProject",
    "videoYouTube",
  ];
  pageData?.listOfProjectsSameLocation?.forEach((project: any) => {
    removeSameLocationProjectsFields.forEach((fieldName) => {
      delete project[fieldName];
    });
  });

  const shouldRemoveSubPageRootNode = pageData?.subPageData;
  if (shouldRemoveSubPageRootNode) {
    delete pageData.subPageData["rootNode"];
    delete pageData.subPageData["siteLanguageNode"];
  }
};
