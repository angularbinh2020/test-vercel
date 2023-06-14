import classNames from "classnames";
import { IFileContent } from "models/IFileContent";
import { IRootNode } from "models/IRootNode";
import { ISiteLanguageNode } from "models/ISiteLanguageNode";
import Image from "next/legacy/image";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useState,
  useDeferredValue,
} from "react";
import { Offcanvas } from "react-bootstrap";
import { IHighlightedNavigationItem } from "sites/mogivi/models/IHighlightedNavigationItem";
import styles from "./header.module.scss";
import { useRouter } from "next/router";
import LinkItem from "components/LinkItem";
import Accordion from "../Accordion";
import logoWhite from "sites/mogivi/assets/images/logo/mogivi-logo-text-white.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { useGetLayoutNodeConfig } from "hooks/useGetLayoutNodeConfig";

interface HeaderProps {
  rootNode: IRootNode;
  siteLanguageNode: ISiteLanguageNode;
  className?: string;
}

const Header = (props: HeaderProps) => {
  const { rootNode, siteLanguageNode, className } = props;
  const { getFieldConfig } = useGetLayoutNodeConfig(rootNode, siteLanguageNode);
  const router = useRouter();
  const isHomePage = router.asPath.length <= 1;
  const highlightedNavigation: IHighlightedNavigationItem[] = getFieldConfig(
    "highlightedNavigation"
  );
  const logo: IFileContent = getFieldConfig("logo");

  const [show, setShow] = useState(false);
  const [isHomepage, setIsHomepage] = useState(false);
  const showDeferred = useDeferredValue(show);
  const handleClose = useCallback(() => {
    setShow(false);
  }, []);
  const handleShow = () => setShow(true);
  const hideMenuOnClick = useCallback(
    (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
      const ulElement = e.currentTarget;
      const oldSetting = ulElement.style.display;
      ulElement.style.display = "none";
      setTimeout(() => {
        ulElement.style.display = oldSetting;
      }, 1000);
    },
    []
  );
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname) {
      setIsHomepage(pathname === "/");
    }
  }, [router]);

  return (
    <div
      className={classNames(
        isHomepage ? styles.headerHomepageContainer : styles.headerContainer
      )}
    >
      <div className={classNames("container", styles.headerSection, className)}>
        <div className="d-flex justify-content-between align-items-center px-3 px-md-3 px-lg-3 px-xl-3">
          <div className={styles.mogiviLogo}>
            {logo && (
              <Link href="/">
                {isHomePage ? (
                  <Image
                    src={logoWhite}
                    alt="Mogivi Logo"
                    width={150}
                    height={40}
                  />
                ) : (
                  <Image
                    src={logo.fields?.umbracoFile}
                    alt="Mogivi Logo"
                    width={150}
                    height={40}
                  />
                )}
              </Link>
            )}
          </div>
          <div className="navigation d-none d-lg-block d-xl-block">
            <ul
              className={classNames(
                "d-flex m-0 list-unstyled align-items-center",
                styles.headerNav
              )}
            >
              {highlightedNavigation?.map((item, idx) => {
                const { subMenus } = item?.fields || [];
                return (
                  <li key={idx} className={styles.subMenu}>
                    <LinkItem
                      url={item.fields?.node?.url}
                      target={item.fields?.node?.target || ""}
                    >
                      {item.fields.cmsTitle}{" "}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={styles.dropdownList}
                      />
                    </LinkItem>
                    {Boolean(subMenus?.length) && (
                      <ul
                        className={styles.subMenuList}
                        onClick={hideMenuOnClick}
                      >
                        {subMenus.map((subMenu, i) => (
                          <li key={i}>
                            {subMenus?.length > 1 && (
                              <div className={styles.subMenuTitle}>
                                <h6>{subMenu.fields.label}</h6>
                              </div>
                            )}
                            {subMenu.fields.menus.map((subMenuItem, subIdx) => (
                              <LinkItem
                                className={styles.subMenuItem}
                                key={subIdx}
                                target={subMenuItem?.target}
                                url={subMenuItem?.aliasUrl || subMenuItem?.url}
                              >
                                {subMenuItem.name}
                              </LinkItem>
                            ))}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            className={classNames(
              styles.burgerMenuBtn,
              "d-block d-lg-none d-xl-none"
            )}
            onClick={handleShow}
            aria-label="burger menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      <Offcanvas
        placement={"end"}
        show={showDeferred}
        onHide={handleClose}
        className={styles.modal}
      >
        <div className={styles.burgerMenuContainer}>
          <Offcanvas.Header
            closeButton
            className="position-sticky top-0 left-0 bg-white"
          >
            <Offcanvas.Title>
              {logo && (
                <Link href="/">
                  <Image
                    src={logo.fields?.umbracoFile}
                    alt="Mogivi Logo"
                    width={150}
                    height={40}
                  />
                </Link>
              )}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div
              className={classNames(
                "navigation d-block",
                styles.burgerMenuList
              )}
            >
              <ul className={classNames("m-0 list-unstyled", styles.headerNav)}>
                {/* This code is used for submenu */}
                {highlightedNavigation?.map((item, idx) => {
                  const { subMenus } = item?.fields || [];

                  return (
                    <li
                      key={idx}
                      className={classNames(styles.subMenu, styles.burgerMenu)}
                    >
                      <Accordion
                        title={item.fields.cmsTitle}
                        handleClose={handleClose}
                        content={subMenus}
                        themes="burger"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </div>
  );
};

export default Header;
