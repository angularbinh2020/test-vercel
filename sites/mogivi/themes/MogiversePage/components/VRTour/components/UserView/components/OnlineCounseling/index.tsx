import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./online-counseling.module.scss";
import { HTML_ELEMENT_ID } from "sites/mogivi/const/vr360";
// import Visible from "components/Visible";
// import InputUserInfo from "./components/InputUserInfo";
// import ChatContent from "./components/ChatContent";
// import ChatPopup from "./components/ChatPopup";
// import io from "socket.io-client";
// import config from "./../../../../config";
// import { avatarDefault, flags } from "shared/const";
// import ImageViewer from "react-simple-image-viewer";
// import { firebaseCloudMessaging } from "./../../../../utils/push-notification";
// import firebase from "firebase/app";
// import ServerApiServices from "apis/server-api-services";
// import utils, { urlify } from "utils";
import ChatIcon from "sites/mogivi/assets/icons/ic-chat.svg";
import Image from "next/image";
import ChatPopupContainer from "./components/ChatPopupContainer";

const convertMessageToLink = (messages: any) => {
  const newMessage: any = [];
  // messages.forEach((item) => {
  //   let newItem = { ...item };
  //   newItem.text = urlify(item.text);
  //   newMessage.push(newItem);
  // });
  return newMessage;
};

const OnlineCounseling = (props: any) => {
  const {
    agencyInfo,
    userInfo,
    handleSaveUserInfo,
    closeAllOpenPopup,
    isTabletOrMobile,
    isMobile,
    chatInfoStore,
    conversations,
    tourId,
    userName,
    avatar,
    agencyPhoneNumber,
  } = props;

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const socket = useRef(null);
  const [chatInfo, setChatInfo] = useState(chatInfoStore);

  const conversation = useRef(chatInfo);

  useEffect(() => {
    if (chatInfo) conversation.current = chatInfo;
  }, [chatInfo]);
  const [messages, setMessages] = useState(
    conversations != null ? convertMessageToLink(conversations.data) : []
  );
  //--- State
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);

  //--- Click
  const handleClick = (event: any) => {
    const isOpen = !open;
    if (isOpen && isTabletOrMobile) {
      closeAllOpenPopup();
      setIsViewerOpen(false);
    }
    setOpen(isOpen);
  };

  useEffect(() => {
    // setToken();
    // async function setToken() {
    //   try {
    //     const token = await firebaseCloudMessaging.init();
    //     if (token) {
    //       getMessage();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // function getMessage() {
    //   const messaging = firebase.messaging();
    //   messaging.onMessage((message) => {
    //     // const { title, body } =(message.notification);
    //     // var options = {
    //     //   body,
    //     // };
    //     // self.registration.showNotification(title, options);
    //   });
    // }
    // socket.current = io(config.CHAT_SOCKET_URL, {
    //   transports: ["websocket"],
    //   query: { token: "" },
    //   reconnection: true,
    //   reconnectionDelay: 1000,
    //   reconnectionDelayMax: 5000,
    //   reconnectionAttempts: Infinity,
    //   autoConnect: true,
    //   forceNew: true,
    //   upgrade: false,
    //   pingTimeout: 3000,
    //   pingInterval: 5000,
    // });
    // // socket.current.connect();
    // socket.current.on("connect", () => {
    //   console.log("-----------------CONNECTED--------------------------");
    //   syncUser(conversation.current, 0);
    // });
    // socket.current.on(flags.CHAT_TWO, (data) => {
    //   if (
    //     data.conversation_group_id == conversation.current.conversation_group_id
    //   ) {
    //     try {
    //       //kiểm tra tồn tại của người nhận trong group này
    //       let checkReceiver = data.receivers.find(
    //         (c) => c.uid_redis == conversation.current.created_by
    //       );
    //       if (checkReceiver != null) {
    //         const newMessage = urlify(data.message.message);
    //         setMessages((prevMessages) => [
    //           ...prevMessages,
    //           {
    //             _id: Date.now(),
    //             text: newMessage,
    //             files: data.message.files,
    //             createdAt: new Date(),
    //             user: {
    //               _id: data.uid_redis,
    //               name: data.display_name,
    //               avatar: data.avatar,
    //             },
    //           },
    //         ]);
    //       }
    //       setOpen(true);
    //       var beepsound = new Audio("/tingting2.m4a");
    //       beepsound.play();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // });
    // socket.current.on(flags.ASSIGNED_TICKET, (data) => {
    //   if (
    //     data.conversationGroupInfo.created_by == conversation.current.created_by
    //   ) {
    //     conversation.current.conversation_group_id =
    //       data.conversationGroupInfo.conversation_group_id;
    //   }
    //   try {
    //     syncUser(conversation.current);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    // socket.current.on(flags.CHECK_EXIT, (payload) => {});
    // socket.current.on(flags.UPDATE_CONVERSATON_GROUP, (payload) => {});
    // socket.current.on(flags.LEAVE_GROUP, (payload) => {
    //   window.location.reload();
    // });
    // window.addEventListener("focus", onFocus);
    // window.addEventListener("blur", onBlur);
    // return () => {
    //   window.removeEventListener("focus", onFocus);
    //   window.removeEventListener("blur", onBlur);
    // };
  }, []);

  const syncUser = async (info: any, reconnect = 0) => {
    // if (reconnect == 1) socket.current.connect();
    // if (socket.current.connected) {
    //   if (info != null) {
    //     const params = {
    //       id: socket.current.id,
    //       phone: info.phone,
    //       email: info.email,
    //       uid: info.uid,
    //       uid_redis: info.created_by, //sau khi login xong phải update lại ID này
    //       full_name: info.full_name,
    //       display_name: info.display_name,
    //       avatar: avatarDefault,
    //       sale_id: info.sale_id,
    //       address: info.address,
    //       type: 1, //Chú ý chỗ này
    //       platform: 1, // 1. web  2 android  3 ios
    //       push_online: true,
    //       fcm_token: firebaseCloudMessaging.tokenInLocalStorage(),
    //     };
    //     socket.current.emit(flags.SYNC_USER, params);
    //     let result = await ServerApiServices.postGetAllMessages(
    //       "/api/v1/messages",
    //       { conversation_group_id: info.conversation_group_id }
    //     );
    //     if (result.more) {
    //       // conversation.current = result.more;
    //       setChatInfo(result.more);
    //     }
    //     setMessages(convertMessageToLink(result.data));
    //   }
    // }
  };
  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    // console.log("Tab is blurred");
  };
  const onFocus = async () => {
    // syncUser(conversation.current, 1);
  };
  const customParams = (
    chatInfo: any,
    timeNow: any,
    message = "",
    files = []
  ) => {
    // if (socket.current == null || chatInfo.member_list.length == 0) {
    //   return null;
    // }
    // let sender = chatInfo.member_list.find(
    //   (c) => c.uid_redis == chatInfo.created_by
    // );
    // if (sender == null) {
    //   return null;
    // }
    // let receivers = chatInfo.member_list.filter(
    //   (c) => c.uid_redis != chatInfo.created_by
    // );
    // if (!receivers) {
    //   return null;
    // }
    // let params = {
    //   id: socket.current.id,
    //   uid_redis: sender.uid_redis,
    //   uid: sender.uid,
    //   display_name: sender.display_name,
    //   sale_id: sender.sale_id,
    //   full_name: sender.full_name,
    //   phone: sender.phone,
    //   avatar: avatarDefault,
    //   email: sender.email,
    //   type: sender.type, //Chú ý chỗ này
    //   conversation_group_id: chatInfo.conversation_group_id,
    //   group_type: conversation.current.type, //nếu bằng rỗng chát với support
    //   message: { message, files },
    //   sender: {
    //     uid_redis: sender.uid_redis,
    //     uid: sender.uid,
    //     type: sender.type,
    //     un_read: 0,
    //   },
    //   created_at: timeNow,
    //   receivers,
    // };
    // return params;
  };
  const updateConversationGroup = (info: any) => {
    // try {
    //   const timeNow = Date.now();
    //   let params = customParams(info, timeNow);
    //   if (params == null) {
    //     return;
    //   }
    //   socket.current.emit(flags.UPDATE_CONVERSATON_GROUP, params);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const sendMessage = (message: any, files: any) => {
    // if (
    //   socket.current == null ||
    //   conversation.current.member_list.length == 0
    // ) {
    //   return;
    // }
    // try {
    //   const timeNow = Date.now();
    //   let params = customParams(conversation.current, timeNow, message, files);
    //   if (params == null) {
    //     return;
    //   }
    //   socket.current.emit(flags.CHAT_TWO, params);
    //   const newMessage = urlify(message);
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     {
    //       _id: timeNow,
    //       text: newMessage,
    //       files,
    //       createdAt: new Date(),
    //       user: {
    //         _id: params.sender.uid_redis,
    //         name: params.sender.display_name,
    //         avatar: userInfo.Photo,
    //       },
    //     },
    //   ]);
    // } catch (error) {}
  };

  const [imagesView, setImagesView] = React.useState([]);
  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const urlParams = new URLSearchParams(window.location.search);
  const isViewMobileApp = urlParams.get("ViewMobileApp") === "1";

  return (
    <>
      <div className={styles.chatButton}>
        {isViewMobileApp ? null : (
          <button
            ref={anchorEl}
            className={classNames({
              "popup-chat-with-agency-open": open,
            })}
            onClick={handleClick}
            id={HTML_ELEMENT_ID.chatButtonId}
          >
            <Image src={ChatIcon} alt="Chat" />
          </button>
        )}

        <ChatPopupContainer
          isOpen={open}
          handleClose={handleClick}
          fullName={userName}
          anchorEl={anchorEl.current}
          avatar={avatar}
          agencyPhoneNumber={agencyPhoneNumber}
        ></ChatPopupContainer>

        {/* <ChatPopup
          isMobile={isMobile}
          open={open}
          agencyInfo={agencyInfo}
          chatInfo={conversation.current}
          anchorEl={anchorEl.current}
          handleClick={handleClick}
        >
          <Visible visibleIf={!chatInfo}>
            <InputUserInfo
              setChatInfo={setChatInfo}
              agencyInfo={agencyInfo}
              handleSaveUserInfo={handleSaveUserInfo}
              tourId={tourId}
              syncUser={syncUser}
              updateConversationGroup={updateConversationGroup}
            />
          </Visible>
          <Visible visibleIf={chatInfo}>
            <ChatContent
              chatInfo={conversation.current}
              messages={messages}
              agencyInfo={agencyInfo}
              userInfo={userInfo}
              setImagesView={setImagesView}
              openImageViewer={openImageViewer}
              sendMessage={sendMessage}
            />
          </Visible>
          {isViewerOpen && isMobile && (
            <ImageViewer
              src={imagesView}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={false}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                marginTop: 40,
              }}
            />
          )}
        </ChatPopup> */}
      </div>
      {/* {isViewerOpen && !isMobile && (
        <ImageViewer
          src={imagesView}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        />
      )} */}
    </>
  );
};

export default OnlineCounseling;
