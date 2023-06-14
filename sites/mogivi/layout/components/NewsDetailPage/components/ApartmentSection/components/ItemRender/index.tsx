import classNames from "classnames";
import styles from "../../styles.module.scss";
import Image from "next/image";
import { ApartmentSameLocation } from "sites/mogivi/models/ISubpage";
import Link from "next/link";
import VrIcon from "sites/mogivi/assets/icons/vr-on.gif";
import DefaultImg from "public/images/istockphoto-1147544807-612x612.webp";
import LinkItem from "components/LinkItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import BootstrapTooltip from "components/BootstrapTooltip";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import { getPhoneHidden } from "utils";

interface Props {
  item: ApartmentSameLocation;
  isMobile: boolean;
  badge: string;
}
const ItemRender = ({ item, isMobile, badge }: Props) => {
  const imgAlt = isMobile
    ? item.mobileTeasersImageCaption
    : item.desktopTeasersImageCaption;
  const imgUrl = isMobile
    ? item.mobileTeasersImageUrl
    : item.desktopTeasersImageUrl;
  const phoneNumber = item?.contact?.phone;
  const [isShowPhoneNumber, , showPhoneNumber] = useBoolean(false);
  return (
    <div className={classNames("mt-3", styles.sliderItem)}>
      <div className="row">
        <div className="col-12">
          <div className={styles.sellApartmentHeader}>
            <div className={styles.sellApartmentImage}>
              <Image src={imgUrl} alt={imgAlt} width={524} height={350} />
            </div>
            <span className={styles.badge}>{item.statusText}</span>
            <span className={styles.badgeStatus}>{badge}</span>
            {item.vrTourURL && (
              <Link className={styles.img360} href={item.vrTourURL}>
                <Image src={VrIcon} alt="360" width={40} height={40} />
              </Link>
            )}
          </div>
        </div>
        <div className={classNames("col-12")}>
          <div
            className={classNames(
              "bg-white p-2 shadow-sm",
              styles.sellApartmentBody
            )}
          >
            <div
              className={classNames(
                "mb-2 font-weight-bold",
                styles.projectName
              )}
            >
              <LinkItem url={item.pageURL}>{item.title}</LinkItem>
            </div>
            <div className={classNames("mb-2", styles.projectId)}>
              ID tin: <span className="fw-bold">{item.newsIdText}</span>
            </div>

            <div
              className={classNames(
                "d-flex align-items-center mb-2",
                styles.publishDate
              )}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span className="ml-2">{item.publishDateText}</span>
            </div>

            <div
              className={classNames(
                "d-flex align-items-center",
                styles.extraInfo
              )}
            >
              {item.tags?.map((tag, tagIndex) => (
                <div
                  id={`tag-${tagIndex}`}
                  className="d-flex align-items-center"
                >
                  <Image
                    src={tag.iconUrl}
                    width={13}
                    height={13}
                    alt={tag.text}
                  />{" "}
                  <BootstrapTooltip title={tag.text}>
                    <span
                      className={classNames(
                        styles.extraInfoDetail,
                        "text-truncate"
                      )}
                    >
                      {tag.text}
                    </span>
                  </BootstrapTooltip>
                </div>
              ))}
            </div>
            <div
              className={classNames(
                "border-top d-flex align-items-center",
                styles.contact
              )}
            >
              <Image
                src={item.contact?.avatar ?? DefaultImg}
                alt={item.contact?.full_name || "img"}
                width={40}
                height={40}
                className={styles.agencyAvatar}
              />
              <div>
                <h6>{item.contact?.full_name}</h6>
                <div className={styles.phone}>
                  {!isShowPhoneNumber && (
                    <div className="fst-italic">
                      <span>{getPhoneHidden(phoneNumber)}</span>
                      <span className="ms-1" onClick={showPhoneNumber}>
                        Nhấn để hiện rõ
                      </span>
                    </div>
                  )}
                  {isShowPhoneNumber && (
                    <a
                      href={`tel:${phoneNumber}`}
                      className="fw-normal fst-italic"
                    >
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
  );
};

export default ItemRender;
