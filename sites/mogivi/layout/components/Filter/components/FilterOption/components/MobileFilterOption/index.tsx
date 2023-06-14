import React, { useMemo, useRef } from "react";
import styles from "./styles.module.scss";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import classNames from "classnames";
import { TABS_SEARCH } from "sites/mogivi/const/search";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import FilterActive from "sites/mogivi/assets/icons/filter_active.svg";
import FilterInActive from "sites/mogivi/assets/icons/filter_inactive.svg";
import Image from "next/image";
import { useSearchSuggestion } from "sites/mogivi/hooks/useSearchSuggestion";
import { Form } from "react-bootstrap";
import { RootState } from "store";
import Modal from "react-bootstrap/Modal";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import {
  SearchFilterOption,
  SearchFilterOptionRef,
} from "../../../SearchFilterOption";
import SuggestionList from "../../../SuggestionList";
import { getFirstSlug } from "utils";
import { useRouter } from "next/router";

interface Props {
  currentService: string;
  servicesSearch: IETSearchService[];
  handleRouter: (url: string) => void;
  slug: string[];
}

const MobileFilterOption = ({
  currentService,
  servicesSearch,
  slug,
}: Props) => {
  const {
    onBlur,
    onFocus,
    onInputSearchKeyword,
    keyword,
    loadingSearchBar,
    projectSuggestion,
    isShowSuggestion,
    tabSlug,
  } = useSearchSuggestion({ servicesSearch });
  const router = useRouter();
  const filterOptionsRef = useRef<SearchFilterOptionRef>(null);
  const [isShowFiltersModal, closeFiltersModal, showFiltersModal] =
    useBoolean(false);
  const { filterOptions, resetPath } = useMemo(() => {
    const filterOptions = servicesSearch?.find(
      (service) =>
        currentService === service.fields.serviceType?.node?.system?.urlSegment
    );
    const resetPath = `/${getFirstSlug(slug)}/${
      filterOptions?.fields.serviceType?.node?.system?.urlSegment
    }`;
    return { filterOptions, resetPath };
  }, [currentService, servicesSearch]);
  const { filtersCount } = useSelector((state: RootState) => state.project);
  return (
    <>
      <div className={classNames(styles.container, "desktopHide")}>
        <div className={styles.tabContainer}>
          {currentService &&
            servicesSearch.map((item, i) => {
              const isActive =
                currentService ===
                item.fields.serviceType?.node?.system?.urlSegment;
              return (
                <Link
                  key={item.fields.itemTitle}
                  className={classNames(isActive && styles.active)}
                  href={`/${getFirstSlug(slug)}/${
                    item.fields.serviceType?.node?.system?.urlSegment
                  }`}
                >
                  <SvgIcon icon={TABS_SEARCH[i].icon} />
                  <span className="mx-2">
                    {item.fields.serviceType?.contentName}
                  </span>
                </Link>
              );
            })}
        </div>

        <div className={styles.searchContainer}>
          <Form.Group className={classNames(styles.searchInput)}>
            <Form.Control
              type="text"
              placeholder="Nhập địa điểm hoặc tên dự án (3 ký tự)..."
              className={styles.input}
              value={keyword}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={(e) => onInputSearchKeyword(e)}
            />
            <div className={styles.iconSearchContainer}>
              {loadingSearchBar ? (
                <div className={styles.spinner}>
                  <div
                    className={classNames("spinner-border text-secondary")}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className={styles.searchIcon}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
              )}
            </div>
            <SuggestionList
              projectSuggestion={projectSuggestion}
              onFocus={onFocus}
              isShowSuggestion={isShowSuggestion}
              onBlur={onBlur}
              tabSlug={tabSlug}
              slug={slug}
            />
          </Form.Group>
          <div
            className={classNames(
              styles.filterIcon,
              styles.filterIconOnSmallMobile
            )}
            onClick={showFiltersModal}
          >
            <Image
              src={filtersCount ? FilterActive : FilterInActive}
              alt="filter"
              width={45}
              height={45}
            />
            {Boolean(filtersCount) && (
              <div className={classNames(styles.filtersCount, "shadow-sm")}>
                {filtersCount}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={isShowFiltersModal} fullscreen onHide={closeFiltersModal}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>
            Bộ lọc tìm kiếm - {filterOptions?.fields.serviceType?.contentName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filterOptions && (
            <SearchFilterOption
              data={filterOptions}
              slug={slug}
              hideApplyResetButton
              ref={filterOptionsRef}
              resetPath={resetPath}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              router.push(resetPath);
              closeFiltersModal();
            }}
            className={classNames("btn-outline", styles.buttonReset)}
          >
            Đặt lại
          </button>
          <button
            className={classNames(
              "btn-orange",
              styles.buttonApply,
              !filterOptionsRef.current?.filterUrlSegmentsSelected.length &&
                styles.disable
            )}
            onClick={() => {
              const handleApply = filterOptionsRef.current?.handleApply;
              handleApply && handleApply();
              closeFiltersModal();
            }}
          >
            Áp dụng
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MobileFilterOption;
