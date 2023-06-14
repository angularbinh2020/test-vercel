import Link from "next/link";
import Image from "next/image";
import VrIcon from "sites/mogivi/assets/icons/vr-on.gif";
import styles from "./styles.module.scss";
import classNames from "classnames";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import { getPhoneHidden } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import DefaultImg from "public/images/istockphoto-1147544807-612x612.webp";

interface ITag {
  iconUrl: string;
  text: string;
}

interface Props {
  viewDetailUrl: string;
  newsId: string;
  projectTitle: string;
  previewImgUrl: string;
  vrTourUrl?: string;
  badgeText?: string;
  publishDateText: string;
  projectDescription: string;
  tags: ITag[];
  avatarUrl: string;
  agencyName: string;
  phoneNumber: string;
  showChatPopup: any;
}

const ItemRender = ({
  viewDetailUrl,
  agencyName,
  phoneNumber,
  tags,
  projectDescription,
  avatarUrl,
  newsId,
  publishDateText,
  projectTitle,
  previewImgUrl,
  badgeText,
  vrTourUrl,
  showChatPopup,
}: Props) => {
  const [isShowPhone, , showPhone] = useBoolean(false);
  const is5Tags = tags?.length === 5;
  return (
    <div className="box-projects-item shadow-sm bg-white mb-3 mb-lg-4">
      <div className="row ms-n2 me-n2">
        <div className="col-12 col-md-4 col-lg-4 px-0">
          <div className="position-relative">
            <Link href={viewDetailUrl}>
              <div className={styles.imgPreview}>
                <Image
                  className="img-fluid img-project ls-is-cached lazyloaded"
                  src={previewImgUrl || DefaultImg}
                  alt={projectTitle || "img"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>
            {vrTourUrl && (
              <Link className={styles.img360} href={vrTourUrl}>
                <Image src={VrIcon} alt="360" width={40} height={40} />
              </Link>
            )}
            <div className="project-badge">
              <label className={classNames("badge badge-status", styles.badge)}>
                {badgeText}
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 col-lg-8">
          <div className="pl-2 pl-lg-0 pt-2 pr-2 pr-lg-3">
            <h3
              className={classNames(styles.title, styles.hoverHighlightOrange)}
            >
              <Link href={viewDetailUrl}>{projectTitle}</Link>
            </h3>

            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className={styles.projectId}>
                ID tin: <span className="fw-bold">{newsId}</span>
              </div>
              <div
                className={classNames(
                  "d-flex align-items-center",
                  styles.agency
                )}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span className="ms-2">{publishDateText}</span>
              </div>
            </div>

            <p
              className={styles.projectDescription}
              dangerouslySetInnerHTML={{ __html: projectDescription }}
            ></p>

            <ul
              className={classNames(
                styles.tagContainer,
                "list-unstyled",
                is5Tags && styles.tags5
              )}
            >
              {tags?.map((tag, index) => (
                <li key={index + tag.text}>
                  <Image
                    src={tag.iconUrl || DefaultImg}
                    width={14}
                    height={14}
                    alt={tag.text || "img"}
                  />
                  <span className="ms-1">{tag.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-12 pl-2 px-0">
          <div className="border-top p-2">
            <div className="row align-items-center">
              <div className="col-8 col-md-4 col-lg-4">
                <div className={styles.agency}>
                  <Image
                    src={avatarUrl ?? DefaultImg}
                    alt={agencyName || "img"}
                    width={40}
                    height={40}
                    className={styles.agencyAvatar}
                  />
                  <span className="ms-1">{agencyName}</span>
                </div>
              </div>

              <div className="col-4 col-md-4 col-lg-4 text-left text-lg-center">
                <div
                  className={styles.contactNow}
                  onClick={() => {
                    showChatPopup({
                      fullName: agencyName,
                      avatar: avatarUrl ?? DefaultImg,
                      agencyPhoneNumber: phoneNumber,
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFacebookMessenger as any}
                    className="me-2"
                  />
                  <span>Chat ngay</span>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-4 mt-2 mt-md-0 mt-lg-0">
                <div
                  className={classNames(
                    "d-flex align-items-center justify-content-center justify-content-lg-end",
                    styles.agency
                  )}
                >
                  <div className="me-2">
                    <FontAwesomeIcon icon={faPhoneVolume} />
                  </div>
                  <div
                    className={classNames(
                      "text-center",
                      styles.hoverHighlightOrange
                    )}
                  >
                    {!isShowPhone && (
                      <div>
                        <span>{getPhoneHidden(phoneNumber)}</span>
                        <span className="ms-1" onClick={showPhone}>
                          Nhấn để hiện rõ
                        </span>
                      </div>
                    )}
                    {isShowPhone && (
                      <a href={`tel:${phoneNumber}`} className="fw-normal">
                        <span>{phoneNumber}</span>
                        <span className="ms-1">Nhấn để gọi</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemRender;
