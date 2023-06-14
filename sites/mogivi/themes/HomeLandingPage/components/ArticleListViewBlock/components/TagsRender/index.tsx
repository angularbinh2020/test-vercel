import classNames from "classnames";
import styles from "../../article-list.module.scss";
import Image from "next/image";
import BootstrapTooltip from "components/BootstrapTooltip";

interface Props {
  tags: any[];
}

const TagsRender = ({ tags }: Props) => {
  const shouldRender2TagInLine1 = tags?.length <= 5;
  return (
    <div
      className={classNames(
        styles.tagContainer,
        shouldRender2TagInLine1 && styles.line1Contain2Tag
      )}
    >
      {tags?.map((tag) => (
        <div key={tag.text + tag.iconUrl}>
          <Image src={tag.iconUrl} alt={tag.text} width={14} height={14} />
          <BootstrapTooltip title={tag.text}>
            <span className="ms-2 mx-4 text-truncate">{tag.text}</span>
          </BootstrapTooltip>
        </div>
      ))}
    </div>
  );
};

export default TagsRender;
