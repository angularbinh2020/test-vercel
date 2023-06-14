import classNames from "classnames";
import Image from "next/legacy/image";

interface Props {
  avatar: string;
  fullName: string;
  styles: any;
  isMobile: boolean;
}

const ChatHeader = ({ avatar, fullName, styles, isMobile }: Props) => {
  return (
    <>
      <div
        className={classNames(
          "position-relative",
          isMobile && "d-inline-block"
        )}
      >
        <Image
          src={avatar}
          alt=""
          style={{
            borderRadius: "20px",
          }}
          height={40}
          width={40}
          className={styles.logo}
        />
        <div className={classNames(styles.onlineDot, "rounded")}></div>
      </div>
      <span
        style={
          isMobile
            ? {
                position: "absolute",
                marginLeft: "10px",
                marginTop: "10px",
              }
            : { position: "absolute", marginLeft: "50px" }
        }
      >
        {" "}
        {fullName}
      </span>
    </>
  );
};

export default ChatHeader;
