import dynamic from "next/dynamic";
import { IRoom } from "sites/mogivi/models/IRoom";
import VRTour from "./components/VRTour";

const Room3D = dynamic(() => import("./components/Room3D"), {
  ssr: false,
});
interface Props {
  pageData: {
    data: IRoom;
    mogiversePageType: string;
    isPanoramaTour: boolean;
  };
}

const MogiverserPage = ({ pageData }: Props) => {
  if (pageData.isPanoramaTour) return <VRTour pageData={pageData as any} />;
  return <Room3D pageData={pageData} />;
};

export default MogiverserPage;
