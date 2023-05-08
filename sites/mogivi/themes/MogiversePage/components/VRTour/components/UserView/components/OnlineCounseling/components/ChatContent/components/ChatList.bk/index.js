//@ts-check

import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Avatar from "@material-ui/core/Avatar";

// import ChatListData from "_mock/chatList/chatList";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDropzone } from "react-dropzone";
const ChatList = (props) => {
  const { agencyInfo, messages, chatInfo } = props;
  const { Avatar: agencyAvatar, NickName } = agencyInfo;
  const messagesEndRef = useRef(null);
  const [hasNextPage, setHasNextPage] = useState();
  const [loading, setLoading] = useState(false);
  function handleLoadMore() {
    setLoading(true);
    // Some API call to fetch the next page
    // loadNextPage(endCursor, pageSize).then((newPage) => {
    //   setLoading(false);
    //   setHasNextPage(newPage.hasNextPage);
    //   setItems([...items, newPage.items]);
    // });
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: handleLoadMore,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    // <div ref={infiniteRef}>
    <div {...getRootProps()}>
      {messages.map((chatData, index) => {
        const isAgency = chatInfo.created_by == chatData.user._id;
        return (
          <div
            key={index}
            className={classNames(
              "d-flex",
              {
                "justify-content-start": isAgency,
                "justify-content-end": !isAgency,
              },
              styles.chatItem
            )}
          >
            {isAgency && <Avatar src={agencyAvatar} alt={NickName} />}
            <div className={styles.textContent}>{chatData.text}</div>
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
    // </div>
  );
};

ChatList.propTypes = {
  agencyInfo: PropTypes.shape({
    Avatar: PropTypes.any,
    NickName: PropTypes.any,
  }),
  messages: PropTypes.array,
  sendMessage: PropTypes.func,
  chatInfo: PropTypes.any,
};

export default ChatList;
