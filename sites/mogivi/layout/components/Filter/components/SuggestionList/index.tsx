import classNames from "classnames";
import { ProjectSuggestionResult } from "sites/mogivi/models/apis";
import LinkItem from "components/LinkItem";
import styles from "./styles.module.scss";
import { useMemo } from "react";
import { TAB_VALUES } from "sites/mogivi/const/search";
import { useGetSetProjectListResultState } from "sites/mogivi/redux/project.slice";
interface Props {
  projectSuggestion: ProjectSuggestionResult[];
  isShowSuggestion: boolean;
  onFocus: any;
  onBlur: any;
  tabSlug: string;
  slug: string[];
}

const SuggestionList = ({
  projectSuggestion,
  onFocus,
  isShowSuggestion,
  onBlur,
}: Props) => {
  const { currentService } = useGetSetProjectListResultState();
  const countLabel = useMemo(() => {
    return currentService === TAB_VALUES.Project ? "dự án" : "tin đăng";
  }, [currentService]);
  return (
    <>
      {Boolean(projectSuggestion?.length) && isShowSuggestion && (
        <div
          className={classNames(styles.suggestionList, "scrollbar")}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <ul>
            {projectSuggestion?.map((item: any, idx: number) => {
              return (
                <li key={idx} className={styles.suggestionItem}>
                  <h6>{item.labelLevel}</h6>
                  <ul>
                    {item.suggestions?.map(
                      (suggestionItem: any, suggestionIdx: number) => {
                        return (
                          <li
                            key={`suggestion item - ${suggestionIdx}`}
                            className={styles.suggestionSubitem}
                            onClick={onBlur}
                          >
                            <LinkItem url={suggestionItem.fullKeyUrl}>
                              {suggestionItem.text}{" "}
                              <strong>{`(${suggestionItem.totalResult} ${countLabel})`}</strong>
                            </LinkItem>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default SuggestionList;
