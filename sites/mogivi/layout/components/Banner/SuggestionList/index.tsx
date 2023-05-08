import classNames from "classnames";
import LinkItem from "components/LinkItem";
import React from "react";
import { ProjectSuggestionResult } from "sites/mogivi/models/apis";
import styles from "./styles.module.scss";

interface SuggestionListProps {
  handleOnFocus?: () => void;
  handleOnBlur: () => void;
  handleSaveKeyword?: Function;
  suggestionList: ProjectSuggestionResult[];
  suggestionName: "dự án" | "chủ đầu tư" | string;
  className?: string;
}

export const SuggestionList = (props: SuggestionListProps) => {
  const {
    handleOnFocus,
    handleOnBlur,
    className,
    suggestionName,
    suggestionList,
    handleSaveKeyword,
  } = props;

  return (
    <div
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      className={classNames(
        styles.suggestionList,
        "scrollbar",
        className && className
      )}
    >
      <ul>
        {suggestionList.map((item: any, idx: number) => (
          <li key={idx} className={styles.suggestionItem}>
            <h6>{item.labelLevel}</h6>
            <ul>
              {item.suggestions?.map(
                (suggestionItem: any, suggestionIdx: number) => (
                  <li
                    onClick={() => {
                      handleOnBlur();
                      handleSaveKeyword &&
                        handleSaveKeyword(
                          suggestionItem.text,
                          `${suggestionItem.fullKeyUrl}`
                        );
                    }}
                    key={`suggestion item - ${suggestionIdx}`}
                    className={styles.suggestionSubitem}
                  >
                    <LinkItem url={suggestionItem.fullKeyUrl}>
                      {suggestionItem.text}{" "}
                      <strong>{`(${suggestionItem.totalResult} ${suggestionName})`}</strong>
                    </LinkItem>
                  </li>
                )
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
