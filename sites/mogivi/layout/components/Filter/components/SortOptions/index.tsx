import ReactSelect from "sites/mogivi/components/ReactSelect";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetCurrentPathInfo } from "hooks/useGetCurrentPathInfo";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { PAGE_PREFIX } from "const/config";
import classNames from "classnames";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import { getSortOptions } from "sites/mogivi/utils";

interface Props {
  className?: string;
  currentService: string;
  servicesSearch: IETSearchService[];
}

const SortOptions = ({ className, currentService, servicesSearch }: Props) => {
  const { slug } = useGetCurrentPathInfo();
  const router = useRouter();
  const [value, setValue] = useState<any>(null);
  const options = useMemo(() => {
    return getSortOptions(servicesSearch, currentService);
  }, [currentService, servicesSearch]);
  const onSelectSort = useCallback(
    (selectedOption: any) => {
      setValue(selectedOption);
      const filterUrlSegments = options.map((option: any) => option.value);
      const rootSlug = slug.filter(
        (slg) =>
          slg &&
          !filterUrlSegments.includes(slg) &&
          !slg.startsWith(PAGE_PREFIX)
      );
      const redirectUrl = rootSlug.join("/") + "/" + selectedOption.value;
      router.push(redirectUrl);
    },
    [slug, options]
  );

  useEffect(() => {
    if (!slug?.length || !options?.length) return;
    let optionMatch = options[0];
    slug.forEach((slg) => {
      optionMatch =
        options.find((option: any) => option.value === slg) || optionMatch;
    });
    setValue(optionMatch);
  }, [slug, options]);
  if (!options) return null;
  return (
    <ReactSelect
      options={options}
      value={value}
      getOptionLabel={(option: any) => option.label}
      getOptionValue={(option: any) => option.value}
      placeholder="Sắp xếp"
      onChange={onSelectSort}
      className={classNames(styles.select, className)}
    />
  );
};

export default SortOptions;
