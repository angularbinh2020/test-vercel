import ChatPopup from "sites/mogivi/components/ChatPopup";
import ItemRender from "./components/ItemRender";
import { useState, useCallback } from "react";
import RentBuyLoadingPlaceholder from "../RentBuyLoadingPlaceholder";
interface Props {
  allProjects?: any[];
  isLoading: boolean;
  pageSize: number;
  isDesktop?: boolean;
}

const RentBuyResult = ({
  allProjects,
  isLoading,
  pageSize,
  isDesktop,
}: Props) => {
  const [chatConfig, setChatConfig] = useState({
    isOpen: false,
    fullName: "",
    avatar: "",
    agencyPhoneNumber: "",
  });
  const handleClose = useCallback(() => {
    setChatConfig({
      isOpen: false,
      fullName: "",
      avatar: "",
      agencyPhoneNumber: "",
    });
  }, []);
  const showChatPopup = useCallback(
    ({ fullName = "", avatar = "", agencyPhoneNumber = "" }) => {
      setChatConfig({
        isOpen: true,
        fullName,
        avatar,
        agencyPhoneNumber,
      });
    },
    []
  );
  return (
    <>
      {!isLoading &&
        allProjects?.map((item: any, idx: number) => {
          return (
            <ItemRender
              key={idx}
              viewDetailUrl={item.pageURL}
              agencyName={item.contact?.full_name}
              phoneNumber={item.contact?.phone}
              tags={item.tags}
              projectDescription={item.areaDescription}
              avatarUrl={item.contact?.avatar}
              newsId={item.newsIdText}
              publishDateText={item.publishDateText}
              projectTitle={item.title}
              previewImgUrl={
                isDesktop
                  ? item.desktopTeasersImageUrl
                  : item.mobileTeasersImageUrl
              }
              badgeText={item.statusText}
              vrTourUrl={item.vrTourURL}
              showChatPopup={showChatPopup}
            />
          );
        })}
      {isLoading && <RentBuyLoadingPlaceholder pageSize={pageSize} />}
      <ChatPopup
        key={chatConfig.fullName}
        handleClose={handleClose}
        {...chatConfig}
      />
    </>
  );
};

export default RentBuyResult;
