import React, { useMemo } from "react";
import styles from "./post-message.module.scss";
import Avatar from "@material-ui/core/Avatar";
import classNames from "classnames";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "const/date-time-format";

interface Props {
  avatar?: string;
  message: string;
  createdTime?: string;
}

const PostMessage = ({ avatar, message, createdTime }: Props) => {
  const timeDisplay = useMemo(() => {
    if (createdTime) {
      return dayjs(createdTime).format(DATE_TIME_FORMAT.HOURS_MINUTES);
    }
    return "";
  }, [createdTime]);
  return (
    <div className={classNames("d-flex", !avatar && styles.userMsg)}>
      {avatar && <Avatar src={avatar} />}
      <div className={classNames(styles.message, avatar && styles.messageLeft)}>
        <span dangerouslySetInnerHTML={{ __html: message }}></span>
        {timeDisplay && <span className={styles.time}>{timeDisplay}</span>}
      </div>
    </div>
  );
};

export default PostMessage;
