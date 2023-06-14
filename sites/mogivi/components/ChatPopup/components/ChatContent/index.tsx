import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import ReactLoading from "react-loading";
import LoadingOverlay from "react-loading-overlay-ts";
import styles from "./chat-content.module.scss";
import { IconButton, Input } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import PostMessage from "./components/PostMessage";
import StarRatings from "react-star-ratings";
import SendIcon from "@material-ui/icons/Send";
import MogiviAvatar from "sites/mogivi/assets/images/mogivi-avatar.png";
import { IChatMessage } from "sites/mogivi/models/IChatMessage";

const ChatContent = (props: any) => {
  const {
    userInfo,
    agencyInfo,
    sendMessage,
    chatInfo,
    setImagesView,
    openImageViewer,
    agencyPhoneNumber,
  } = props;
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<IChatMessage[]>([
    {
      avatar: MogiviAvatar.src,
      message: `Cảm ơn anh/chị quan tâm đến sản phẩm và dịch vụ. Vui lòng gọi ngay vào hotline để được nhanh chóng tư vấn:  <a href="tel:${agencyPhoneNumber}">${agencyPhoneNumber}</a>`,
    },
  ]);
  const messagesEndRef = useRef<any>(null);
  const messageContainer = useRef<any>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  const onDrop = useCallback((acceptedFiles: any) => {
    let images: any = [];
    setIsLoading(true);
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = (e: any) => {
        // Do whatever you want with the file contents
        const binaryStr = e.target.result;
        images.push({ name: file.name, image: binaryStr, type: file.type });
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const handleSendMessage = () => {
    if (text?.trim()) {
      const newMessages: IChatMessage[] = [
        ...messages,
        {
          message: text.trim(),
          createdTime: new Date().toISOString(),
        },
        {
          avatar: MogiviAvatar.src,
          message: `Cảm ơn anh / chị đã quan tâm tới sản phẩm và dịch vụ. Vui lòng gọi ngay vào hotline để được nhanh chóng tư vấn: <a href="tel:${agencyPhoneNumber}">${agencyPhoneNumber}</a>`,
        },
      ];
      setMessages(newMessages);
      setText("");
    }
  };

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  //--- Window size
  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
  };

  const [width, height] = useWindowSize();
  const checkSuportLeaved = chatInfo
    ? chatInfo.member_list.find((c: any) => c.status == 2 && c.type == 3)
    : false;
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<ReactLoading type={"spin"} color="#ff4e00" />}
    >
      <div
        className={classNames(styles.chatContainer)}
        style={{ height: height - 106 }}
      >
        <>
          <div
            className={classNames(
              styles.contentContainer,
              "hover-visible-scroll-bar"
            )}
            ref={messageContainer}
          >
            <div>
              <div className="py-2">
                {messages.map((message, msgIndex) => (
                  <PostMessage
                    avatar={message.avatar}
                    message={message.message}
                    createdTime={message.createdTime}
                    key={msgIndex}
                  />
                ))}
              </div>

              <div ref={messagesEndRef} />
            </div>
          </div>
          {checkSuportLeaved ? (
            <div style={{ display: "block", textAlign: "center" }}>
              <p>Đánh giá của bạn giúp Mogivi hoàn thiện hơn mỗi ngày</p>
              <p>Vui lòng chia sẻ với chúng tôi</p>
              <StarRatings
                changeRating={(value: any) => {}}
                numberOfStars={5}
                name="rating"
              />
            </div>
          ) : (
            <div className={styles.inputContainer}>
              <div className="w-100 position-relative">
                <Input
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  placeholder="Nhập nội dung..."
                  onKeyUp={handleKeyUp}
                  value={text}
                  fullWidth
                  className={styles.inputControl}
                />
              </div>
              <IconButton
                onClick={handleSendMessage}
                className={styles.sendButton}
              >
                <SendIcon />
              </IconButton>
            </div>
          )}
        </>
      </div>
    </LoadingOverlay>
  );
};

export default ChatContent;
