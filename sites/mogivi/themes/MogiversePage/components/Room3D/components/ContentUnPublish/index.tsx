import { Fragment, useEffect, useMemo } from "react";
import { IRoom } from "sites/mogivi/models/IRoom";
import styles from "./styles.module.scss";
import BackgroundImag from "public/images/banner-bg.webp";
interface Props {
  data?: IRoom;
  message?: string;
}

interface IMogiverseContact {
  label: string;
  contents: {
    value: string;
    inputPrefix?: string;
  }[];
}

const ContentUnPublish = ({ data, message }: Props) => {
  const contacts: IMogiverseContact[] = useMemo(() => {
    const result: IMogiverseContact[] = [];
    if (data?.full_name) {
      result.push({
        label: "Tác giả tin đăng",
        contents: [
          {
            value: data?.full_name,
          },
        ],
      });
    }
    if (data?.email || data?.phone) {
      const contents: any[] = [];
      const contact = {
        label: "Liên hệ tác giả",
        contents: contents,
      };
      if (data?.phone) {
        contents.push({
          value: data?.phone,
          inputPrefix: "tel:",
        });
      }
      if (data?.email) {
        contents.push({
          value: data?.email,
          inputPrefix: "mailto:",
        });
      }
      result.push(contact);
    } else {
      result.push({
        label: "Hỗ trợ mogivi",
        contents: [
          {
            value: "1800646427",
            inputPrefix: "tel:",
          },
          {
            value: "support@mogivi.vn",
            inputPrefix: "mailto:",
          },
        ],
      });
    }
    return result;
  }, [data]);

  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.style.margin = "0";
    bodyElement.style.touchAction = "none";

    return () => {
      bodyElement.style.margin = "unset";
      bodyElement.style.touchAction = "unset";
    };
  }, []);

  return (
    <div
      className={styles.errorContentContainer}
      style={{
        backgroundImage: `url(${BackgroundImag.src})`,
      }}
    >
      <div className={styles.errorBanner}>
        <div className={styles.errorLeftContent}>
          {message ? (
            <span
              dangerouslySetInnerHTML={{ __html: message }}
              className={styles.customMessage}
            ></span>
          ) : (
            <>
              <h2>Rất tiếc, tin này đã ngừng được chia sẻ.</h2>
              <p>
                Vui lòng liên hệ với bộ phận hỗ trợ hoặc người đăng tin để nhận
                được trợ giúp
              </p>
            </>
          )}
        </div>
        <div className={styles.contactContainer}>
          <div>
            {contacts.map((contact) => (
              <div key={contact.label}>
                {contact.label}
                {": "}&nbsp;&nbsp;
                <br />
                {contact.contents.map((content, contentIndex) => (
                  <Fragment key={contentIndex}>
                    {content.inputPrefix ? (
                      <b>
                        <a href={`${content.inputPrefix}${content.value}`}>
                          {content.value}
                        </a>
                      </b>
                    ) : (
                      <b>{content.value}</b>
                    )}

                    {contentIndex !== contact.contents.length - 1 && " / "}
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentUnPublish;
