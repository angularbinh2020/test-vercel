import classNames from "classnames";
import React, {
  Fragment,
  useId,
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form } from "react-bootstrap";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import styles from "./styles.module.scss";
import { ETFilterTagsItem } from "sites/mogivi/models/ETFilterTagsItem";
import { useRouter } from "next/router";
import { PAGE_PREFIX } from "const/config";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import Link from "next/link";
interface BuyFilterProps {
  data: IETSearchService;
  slug: string[];
  hideApplyResetButton?: boolean;
  resetPath: string;
}

export interface SearchFilterOptionRef {
  handleApply: () => void;
  filterUrlSegmentsSelected: string[];
}

// eslint-disable-next-line react/display-name
export const SearchFilterOption = forwardRef<
  SearchFilterOptionRef,
  BuyFilterProps
>((props: BuyFilterProps, ref) => {
  const { filtersOptions } = props.data.fields;
  const { slug, hideApplyResetButton, resetPath } = props;
  const router = useRouter();
  const [pathFilterSlugCount, setPathFilterSlugCount] = useState<number>(0);
  const [filterUrlSegmentsSelected, setFilterUrlSegmentsSelected] = useState<
    string[]
  >([]);
  const { filterOptions, filterUrlSegments } = useMemo(() => {
    const filterOptions =
      (filtersOptions as ETFilterTagsItem[])?.filter(
        (option) =>
          option.system.contentType !==
            MOGIVI_CONTENT_TYPE.eTLocationSuggestionAPIItem &&
          option.system.contentType !== MOGIVI_CONTENT_TYPE.eTSortTagsItem
      ) || [];
    const filterUrlSegments = new Set<string>();
    filterOptions.forEach((option) => {
      option.fields.filterOptions?.forEach((filter) => {
        const filterUrlSegment = filter.node.system.urlSegment.trim();
        if (filterUrlSegment) filterUrlSegments.add(filterUrlSegment);
      });
    });
    return {
      filterOptions: filterOptions,
      filterUrlSegments: Array.from(filterUrlSegments),
    };
  }, [filtersOptions]);
  const uuid = useId();
  const handleClickCheckBox = (urlSegment: string) => {
    const newFilterSelected = filterUrlSegmentsSelected.filter(
      (segment) => segment !== urlSegment
    );
    if (!filterUrlSegmentsSelected.includes(urlSegment)) {
      newFilterSelected.push(urlSegment);
    }
    setFilterUrlSegmentsSelected(newFilterSelected);
  };
  const handleClickRadio = ({
    urlSegment,
    optionsUrlSegments,
  }: {
    urlSegment: string;
    optionsUrlSegments: string[];
  }) => {
    const newFilterSelected = filterUrlSegmentsSelected.filter(
      (segment) => !optionsUrlSegments.includes(segment)
    );
    if (!filterUrlSegmentsSelected.includes(urlSegment))
      newFilterSelected.push(urlSegment);
    setFilterUrlSegmentsSelected(newFilterSelected);
  };
  const handleApply = () => {
    const rootSlug = slug.filter(
      (slg) =>
        slg && !filterUrlSegments.includes(slg) && !slg.startsWith(PAGE_PREFIX)
    );
    const redirectUrl =
      rootSlug.join("/") + "/" + filterUrlSegmentsSelected.join("/");
    router.push(redirectUrl);
  };

  const isDisableApply =
    !filterUrlSegmentsSelected.length && !pathFilterSlugCount;
  useImperativeHandle(
    ref,
    () => ({
      handleApply,
      filterUrlSegmentsSelected,
    }),
    [handleApply, filterUrlSegmentsSelected]
  );
  useEffect(() => {
    if (slug && filterUrlSegments) {
      const newFilterSelected = slug.filter((slg) =>
        filterUrlSegments.includes(slg)
      );
      setPathFilterSlugCount(newFilterSelected.length);
      setFilterUrlSegmentsSelected(newFilterSelected);
    }
  }, [slug, filterUrlSegments]);

  return (
    <>
      {filterOptions.map((item, i) => {
        const isCheckBox =
          item.fields?.selectControlType.toLowerCase() === "checkbox";
        const serviceType = isCheckBox ? "checkbox" : "radio";
        const className = isCheckBox ? styles.checkBox : styles.select;
        const isFilterOptions = Boolean(item.fields?.filterOptions);
        const options = isFilterOptions
          ? item.fields?.filterOptions
          : item.fields?.options;
        const isHaveOptions = isFilterOptions || Boolean(item.fields?.options);
        if (isHaveOptions) {
          const optionsUrlSegments = options
            .map((option: any) => option.node?.system?.urlSegment ?? "")
            .filter((str) => Boolean(str));
          return (
            <div key={i} className={classNames(styles.row)}>
              <div className={styles.label}>{item.fields.title}</div>
              <div className={styles.rowControl}>
                <Form.Group className={styles.control}>
                  {options.map((filterOption: any, i) => {
                    const id = isFilterOptions
                      ? `${uuid}-${filterOption.id}-${i}`
                      : `${uuid}-${filterOption.fields.key}`;
                    const label = isFilterOptions
                      ? filterOption.node?.fields?.itemTitle
                      : filterOption.fields.value;
                    const urlSegment =
                      filterOption.node?.system?.urlSegment ?? "";
                    const checked =
                      filterUrlSegmentsSelected.includes(urlSegment);
                    return (
                      <Form.Check
                        key={`${i}-${checked}`}
                        type={serviceType}
                        name={item.fields?.parameterNameAPI}
                        id={id}
                        label={label}
                        className={className}
                        checked={checked}
                        onChange={() => {}}
                        onClick={() => {
                          if (isCheckBox) {
                            handleClickCheckBox(urlSegment);
                            return;
                          }
                          handleClickRadio({
                            urlSegment,
                            optionsUrlSegments,
                          });
                        }}
                      />
                    );
                  })}
                </Form.Group>
              </div>
            </div>
          );
        }
        return <Fragment key={i}></Fragment>;
      })}

      <div
        className={classNames(
          styles.advanceFilterFooter,
          hideApplyResetButton && "d-none"
        )}
      >
        <Link
          href={resetPath}
          className={classNames("btn-outline d-block", styles.buttonReset)}
        >
          Đặt lại
        </Link>
        <button
          className={classNames(
            "btn-orange",
            styles.buttonApply,
            isDisableApply && styles.disable
          )}
          onClick={handleApply}
        >
          Áp dụng
        </button>
      </div>
    </>
  );
});
