import dynamic from "next/dynamic";
import PageHeader from "./components/PageHeader";
import ToastNotification from "sites/mogivi/components/ToastNotification";
import { useMemo } from "react";
import { I360VrTourPageData } from "sites/mogivi/models/I360VrTourPageData";
import { getVr360Data } from "sites/mogivi/utils/vr360ssr";
import ContentUnPublish from "../Room3D/components/ContentUnPublish";
import { MESSAGES } from "sites/mogivi/const/message";
const UserView = dynamic(() => import("./components/UserView"), {
  ssr: false,
});
const EditView = dynamic(() => import("./components/EditView"), {
  ssr: false,
});
interface Props {
  pageData: I360VrTourPageData;
}

const VRTour = ({ pageData }: Props) => {
  const [vr360Data, isTourDataIncorrect] = useMemo(() => {
    let isTourDataIncorrect = !pageData.data.tour_settings;
    try {
      if (isTourDataIncorrect) {
        throw "Tour setting empty";
      }
      const data = getVr360Data(pageData.data, pageData.hotSpotIcons[0]);
      return [data, isTourDataIncorrect];
    } catch (e) {
      console.error(e);
      return [undefined, true];
    }
  }, [pageData.data]);

  return (
    <>
      <PageHeader pageData={pageData} vr360Data={vr360Data} />
      {!isTourDataIncorrect && (
        <>
          {!pageData.isEditView && vr360Data && (
            <UserView pageData={{ ...pageData, data: vr360Data }} />
          )}
          {pageData.isEditView && vr360Data && (
            <EditView pageData={{ ...pageData, data: vr360Data }} />
          )}
        </>
      )}
      {isTourDataIncorrect && (
        <ContentUnPublish message={MESSAGES.dataIsInProcess} />
      )}
      <ToastNotification />
    </>
  );
};
export default VRTour;
