import classNames from "classnames";
import LinkItem from "components/LinkItem";
import { IFileContent } from "models/IFileContent";
import { IRootNode } from "models/IRootNode";
import { ISiteLanguageNode } from "models/ISiteLanguageNode";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { ILinkInfo } from "sites/mogivi/models/ILinkInfo";
import { ISocialAccountItem } from "sites/mogivi/models/ISocialAccountItem";
import Accordion from "../Accordion";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
  faYoutube,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
interface FooterProps {
  rootNode: IRootNode;
  siteLanguageNode: ISiteLanguageNode;
  className?: string;
}

const Footer = (props: FooterProps) => {
  const { rootNode, siteLanguageNode, className } = props;
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const getFieldConfig = useCallback(
    (fieldName: any) =>
      //@ts-ignore
      siteLanguageNode?.fields[fieldName] || rootNode?.fields[fieldName],
    [rootNode, siteLanguageNode]
  );

  const footerLogo: IFileContent = getFieldConfig("footerLogo");
  const emailAddress: string = getFieldConfig("emailAddress");
  const phone: string = getFieldConfig("phone");
  const copyrightMessage: string = getFieldConfig("copyrightMessage");
  const footerAddressText: string = getFieldConfig("footerAddressText");
  const footerNavigationLinksTitle: string = getFieldConfig(
    "footerNavigationLinksTitle"
  );
  const footerNavigationLinksTitle2: string = getFieldConfig(
    "footerNavigationLinksTitle2"
  );
  const footerNavigationLinksTitle3: string = getFieldConfig(
    "footerNavigationLinksTitle3"
  );
  const footerNavigationLinksTitle4: string = getFieldConfig(
    "footerNavigationLinksTitle4"
  );
  const footerNavigationLinks: ILinkInfo[] = getFieldConfig(
    "footerNavigationLinks"
  );
  const footerNavigationLinks2: ILinkInfo[] = getFieldConfig(
    "footerNavigationLinks2"
  );
  const footerNavigationLinks3: ILinkInfo[] = getFieldConfig(
    "footerNavigationLinks3"
  );
  const footerNavigationLinks4: ILinkInfo[] = getFieldConfig(
    "footerNavigationLinks4"
  );
  const footerAncillaryLinks: ILinkInfo[] = getFieldConfig(
    "footerAncillaryLinks"
  );
  const socialAccounts: ISocialAccountItem[] = getFieldConfig("socialAccounts");

  const checkIcon = (icon: string) => {
    const iconSign = icon.toLowerCase();
    const iconMap = {
      ["facebook"]: faFacebookF,
      ["twitter"]: faTwitter,
      ["whatsapp"]: faWhatsapp,
      ["youtube"]: faYoutube,
      ["instagram"]: faInstagram,
      ["linkedin"]: faLinkedin,
    };
    const iconDisplay: any = iconMap[iconSign as keyof typeof iconMap];
    if (iconDisplay) return <FontAwesomeIcon icon={iconDisplay} />;
  };

  const FooterLogoBlock: Function = () => {
    return (
      <div className="position-relative h-100">
        <div className={styles.mogiviLogo}>
          <h1 className="fs-1rem">Công ty cổ phần</h1>
          <Image
            src={footerLogo?.fields.umbracoFile}
            alt="Mogivi logo"
            width="150"
            height="40"
          />
        </div>
        <p className={styles.mogiviMission}>
          Sứ mệnh của Mogivi nhằm cung cấp mọi tiện ích và phúc lợi tốt nhất cho
          môi giới Việt trong ngành bất động sản.
        </p>
        <div className={styles.detailInfo}>
          <div className={classNames(styles.detailInfoItem, styles.location)}>
            <SvgIcon
              width={50}
              height={50}
              className="svg-white"
              icon="position"
            />
            <div
              className={classNames(styles.footerCompanyInfo, "ms-3")}
              dangerouslySetInnerHTML={{ __html: footerAddressText }}
            ></div>
          </div>
          <div className={styles.detailInfoItem}>
            <SvgIcon className="svg-white" icon="mail" />
            <a
              href={`mailto:${emailAddress}`}
              className={classNames(
                "link-email ms-3",
                styles.footerCompanyInfo
              )}
            >
              {emailAddress}
            </a>
          </div>
          <div className={styles.detailInfoItem}>
            <SvgIcon className="svg-white" icon="phone" />
            <a
              href={`tel:${phone}`}
              className={classNames(
                "ms-3",
                styles.phone,
                styles.footerCompanyInfo
              )}
            >
              {phone}
            </a>
          </div>
          <div className={`${styles.socialMedia} ${styles.detailInfoItem}`}>
            {socialAccounts?.map((item, idx) => {
              return (
                <div key={idx} className={styles.socialLink}>
                  <LinkItem
                    url={item.fields.externalUrl}
                    ariaLabel={item.fields.title}
                  >
                    {checkIcon(item.fields.icon)}
                  </LinkItem>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const FooterCompanyBlock: Function = () => {
    return (
      <div className="col-12 col-md-4 col-lg-2">
        <div
          className={classNames(
            styles.linkServicesContainer,
            "d-none d-md-block d-xl-block"
          )}
        >
          <h1>{footerNavigationLinksTitle}</h1>
          <ul className={styles.linkServices}>
            {footerNavigationLinks.map((item, idx) => {
              return (
                <li key={idx}>
                  <LinkItem
                    target={item.target}
                    url={item.aliasUrl ? item.aliasUrl : item.url}
                  >
                    {item.name}
                  </LinkItem>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const FooterCustomerInfoBlock: Function = () => {
    return (
      <div className="col-12 col-md-4 col-lg-2">
        <div
          className={classNames(
            styles.linkServicesContainer,
            "d-none d-md-block d-xl-block"
          )}
        >
          <h1>{footerNavigationLinksTitle2}</h1>
          <ul className={styles.linkServices}>
            {footerNavigationLinks2.map((item, idx) => {
              return (
                <li key={idx}>
                  <LinkItem
                    target={item.target}
                    url={item.aliasUrl ? item.aliasUrl : item.url}
                  >
                    {item.name}
                  </LinkItem>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const FooterPartnerInfoBlock: Function = () => {
    return (
      <div className="col-12 col-md-4 col-lg-2">
        <div
          className={classNames(
            styles.linkServicesContainer,
            "d-none d-md-block d-xl-block"
          )}
        >
          <h1>{footerNavigationLinksTitle3}</h1>
          <ul className={styles.linkServices}>
            {footerNavigationLinks3.map((item, idx) => {
              return (
                <li key={idx}>
                  <LinkItem
                    target={item.target}
                    url={item.aliasUrl ? item.aliasUrl : item.url}
                  >
                    {item.name}
                  </LinkItem>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const FooterExtraLink: Function = () => {
    return (
      <div className="col-12 col-md-4 col-lg-2">
        <div
          className={classNames(
            styles.linkServicesContainer,
            "d-none d-md-block d-xl-block"
          )}
        >
          <h1>{footerNavigationLinksTitle4}</h1>
          <ul className={styles.linkServices}>
            {footerNavigationLinks4.map((item, idx) => {
              return (
                <li key={idx}>
                  <LinkItem
                    target={item.target}
                    url={item.aliasUrl ? item.aliasUrl : item.url}
                  >
                    {item.name}
                  </LinkItem>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const initIsMobile = window?.innerWidth < 481;
    const initIsTablet = window?.innerWidth < 821 && window?.innerWidth > 481;
    setIsMobile(initIsMobile);
    setIsTablet(initIsTablet);
  }, []);

  return (
    <>
      <div
        id="footer"
        className={classNames("bg-black-russian pt-5 pb-5", styles.footer)}
      >
        <div className={classNames("container", className)}>
          <div className="row">
            <div className="col-12 col-md-3 col-lg-3 d-block d-md-none d-lg-block d-xl-block">
              <FooterLogoBlock />
            </div>
            <FooterCompanyBlock />
            <FooterCustomerInfoBlock />
            <FooterPartnerInfoBlock />
            <FooterExtraLink />
            <div className="d-block d-md-none d-lg-none d-xl-none">
              <Accordion
                title={footerNavigationLinksTitle}
                content={footerNavigationLinks}
                themes="footer"
              ></Accordion>
              <Accordion
                title={footerNavigationLinksTitle2}
                content={footerNavigationLinks2}
                themes="footer"
              ></Accordion>
              <Accordion
                title={footerNavigationLinksTitle3}
                content={footerNavigationLinks3}
                themes="footer"
              ></Accordion>
              <Accordion
                title={footerNavigationLinksTitle4}
                content={footerNavigationLinks4}
                themes="footer"
              ></Accordion>
              {/* <div className={classNames(styles.copyRight, "d-block d-md-none d-xl-none d-lg-none")}>
                {copyrightMessage}
              </div> */}
            </div>
          </div>

          <div
            className={classNames(
              "row pt-4 justify-content-between align-items-center mt-4",
              styles.ancillaryLinksContainer,
              styles.footerBorder
            )}
          >
            <div className={classNames(styles.copyRight, "col-md-3 p-0")}>
              {copyrightMessage}
            </div>
            <div className={classNames("col-md-6 p-0")}>
              <ul className={styles.footerAncillaryLinks}>
                {footerAncillaryLinks.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <LinkItem
                        target={item.target}
                        url={item.aliasUrl ? item.aliasUrl : item.url}
                      >
                        {item.name}
                      </LinkItem>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div
            className={classNames(
              "row justify-content-center d-none d-md-block d-lg-none",
              styles.logoFooterSection
            )}
          >
            <div className="col-12 col-md-12 col-lg-4">
              <FooterLogoBlock />
            </div>
            <div
              className={classNames(
                "p-0 col-12 col-md-12 col-lg-4 row pt-4 justify-content-between align-items-center mt-4",
                styles.footerBorder
              )}
            >
              <div className={classNames(styles.copyRight, "col-md-6 p-0")}>
                {copyrightMessage}
              </div>
              <div className={classNames("col-md-6 p-0")}>
                <ul className={styles.footerAncillaryLinks}>
                  {footerAncillaryLinks.map((item, idx) => {
                    return (
                      <li key={idx}>
                        <LinkItem
                          target={item.target}
                          url={item.aliasUrl ? item.aliasUrl : item.url}
                        >
                          {item.name}
                        </LinkItem>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style type="text/css">
        {`
        .accordion {
          border: 0;
          --bs-accordion-bg: transparent;
          --bs-accordion-border-color: transparent;
        }
          .accordion-item {
            border-bottom: none;
            border-left: none;
            border-right: none;
            background-color: transparent;
          }

          .accordion-button {
            padding-left: 0;
            padding-right: 0;
            color: #fff;
            box-shadow: unset;
          }

          .accordion-button:not(.collapsed) {
            color: #fff;
            background-color: transparent;
            box-shadow: unset;
          }

          .accordion-button:focus {
            border-color: unset;
            box-shadow: unset;
          }

          .accordion-button:not(.collapsed)::after {
            background-image: var(--bs-accordion-btn-icon);
          }
        `}
      </style>
    </>
  );
};

export default Footer;
