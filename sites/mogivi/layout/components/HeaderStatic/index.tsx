import classNames from "classnames";
import { removeVNSuffix } from "helpers/url";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import styles from "./styles.module.scss";
import LogoMogivi from "../../../assets/icons/mogivi-logo-text-black.webp";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const HeaderStatic = () => {
  const router = useRouter();

  const highlightedNavigation = [
    {
      name: "Mua",
      url: "/mua-can-ho",
      target: "blank",
    },
    {
      name: "Thuê",
      url: "/thue-can-ho",
      target: "blank",
    },
    {
      name: "Dự án",
      url: "/du-an",
      target: "blank",
    },
    {
      name: "Bán & Cho Thuê",
      url: "/ban-cho-thue",
      target: "blank",
    },
  ];

  const [show, setShow] = useState(false);
  // const [showSubMenu, setShowSubMenu] = useState(false);
  const [isHomepage, setIsHomepage] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname) {
      setIsHomepage(pathname === "/");
    }
  }, [router]);

  return (
    <div
      className={
        isHomepage ? styles.headerHomepageContainer : styles.headerContainer
      }
    >
      <div className={classNames(styles.headerSection)}>
        <div className="d-flex justify-content-between align-items-center px-3 px-md-3 px-lg-3 px-xl-3">
          <div className={styles.mogiviLogo}>
            <Link href="/">
              <a>
                <Image
                  src={LogoMogivi}
                  alt="Mogivi Logo"
                  width={150}
                  height={40}
                />
              </a>
            </Link>
          </div>
          <div className="navigation d-none d-lg-block d-xl-block">
            <ul
              className={classNames(
                "d-flex m-0 list-unstyled align-items-center",
                styles.headerNav
              )}
            >
              {/* This code is used for submenu */}
              {/* <li className={styles.subMenu}>
                <Link href="/ban">
                  <a>
                    Mua Bán
                    <i className="fas fa-chevron-down"></i>
                  </a>
                </Link>
                <ul className={styles.subMenuList}>
                  <li>
                    <Link href="#">
                      <a>Tất cả nhà đất bán</a>
                    </Link>
                  </li>
                </ul>
              </li> */}
              {highlightedNavigation?.map((item, idx) => {
                return (
                  <li key={idx} className={styles.subMenu}>
                    <Link href={removeVNSuffix(item.url)}>
                      <a>{item.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <Button
            variant="primary"
            className={classNames(
              styles.burgerMenuBtn,
              "d-block d-lg-none d-xl-none"
            )}
            onClick={handleShow}
            aria-label="burger menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
      </div>

      <Offcanvas placement={"end"} show={show} onHide={handleClose}>
        <div className={styles.burgerMenuContainer}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Link href="/">
                <a>
                  <Image
                    src={LogoMogivi}
                    alt="Mogivi Logo"
                    width={150}
                    height={40}
                  />
                </a>
              </Link>
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
                {/* <li className={classNames(styles.subMenu, "mb-3")}>
                  <Link href="#nav1">
                    <a className={styles.subMenuLink}>
                      <span>Mua Bán</span>
                      <i
                        className={classNames(
                          "fas fa-chevron-down",
                          styles.dropdownList
                        )}
                        onClick={() => setShowSubMenu(!showSubMenu)}
                      ></i>
                    </a>
                  </Link>

                  <ul className={classNames(styles.subMenuList)} style={{display: showSubMenu ? "block" : "none"}} id="nav1">
                    <li>
                      <Link href="#">
                        <a>Tất cả nhà đất bán</a>
                      </Link>
                    </li>
                  </ul>
                </li> */}
                {highlightedNavigation?.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className={classNames(styles.subMenu, "mb-3")}
                    >
                      <Link href={removeVNSuffix(item.url)}>
                        <a className={styles.subMenuLink}>
                          <span>{item.name}</span>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className={styles.dropdownList}
                          />
                        </a>
                      </Link>
                      {/* <LinkItem url={item.fields.node.url} className={styles.subMenuLink}>
                        <span>{item.fields.cmsTitle}</span>
                      </LinkItem> */}
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

export default HeaderStatic;
