import classNames from "classnames";
import React, { useEffect, useState, useCallback } from "react";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import styles from "./styles.module.scss";

interface SocialShareProps {
  iconSize?: number;
  className?: string;
}

const SocialShare = (props: SocialShareProps) => {
  const { iconSize, className } = props;
  const [currentPageUrl, setCurrentPageUrl] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const linkSocialFacebook = `http://www.facebook.com/share.php?u=${currentPageUrl}&title=${documentTitle}`;
  const linkSocialLinkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${currentPageUrl}`;
  const linkSocialTwitter = `https://twitter.com/intent/tweet?url=${currentPageUrl}&text=${documentTitle}`;
  const linkSocialWhatsapp = `whatsapp://send?text=${currentPageUrl}`;
  const iconStyles = {
    width: iconSize,
    height: iconSize,
  };
  const onClickSocialIcon = useCallback(
    (e: React.SyntheticEvent, openUrl: string) => {
      e.preventDefault();
      window.open(openUrl, "_blank", "fullscreen=no,width=550,height=400");
    },
    []
  );
  useEffect(() => {
    setCurrentPageUrl(window?.location?.href);
    setDocumentTitle(document?.title);
  }, []);
  return (
    <div className={classNames(className)}>
      <a
        href={linkSocialFacebook}
        className="facebook-icon"
        aria-label="Share Facebook"
        onClick={(e) => onClickSocialIcon(e, linkSocialFacebook)}
      >
        <SvgIcon
          icon="facebook"
          style={iconStyles}
          className={styles.socialIcon}
        />
      </a>
      <a
        href={linkSocialLinkedin}
        className="in-icon"
        aria-label="Share Linkin"
        onClick={(e) => onClickSocialIcon(e, linkSocialLinkedin)}
      >
        <SvgIcon
          icon="linkedin"
          style={iconStyles}
          className={styles.socialIcon}
        />
      </a>
      <a
        href={linkSocialTwitter}
        className="twitter-icon"
        aria-label="Share Twitter"
        onClick={(e) => onClickSocialIcon(e, linkSocialTwitter)}
      >
        <SvgIcon
          icon="twitter"
          style={iconStyles}
          className={styles.socialIcon}
        />
      </a>

      <a
        href={linkSocialWhatsapp}
        className="whatsapp-icon"
        data-action="share/whatsapp/share"
        aria-label="Share Whatsapp"
        onClick={(e) => onClickSocialIcon(e, linkSocialWhatsapp)}
      >
        <SvgIcon
          icon="whatsapp"
          style={iconStyles}
          className={styles.socialIcon}
        />
      </a>
    </div>
  );
};

SocialShare.defaultProps = {
  iconSize: 35,
};

export default SocialShare;
