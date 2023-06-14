import classNames from "classnames";
import LinkItem from "components/LinkItem";
import { COLOR_TYPE } from "const/color-type";
import React from "react";
import Image from "next/legacy/image";
import styles from "./styles.module.scss";

interface GalleryImageItem {
  project: any;
}

export const GalleryImageItem = (props: GalleryImageItem) => {
  const { project } = props;
  const currentYear = new Date().getFullYear();

  return (
    <LinkItem className={styles.textImageItem} url={project.pageURL}>
      <div className={classNames(styles.cardImageContainer)}>
        <div className={styles.cardImg}>
          {project?.logo && (
            <Image
              className="lazyloaded"
              alt="icon"
              src={project?.logo?.logoUrl}
              width={460}
              height={300}
              objectFit="cover"
            />
          )}
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardInfo}>
            <h3>{project.name}</h3>
            <p className={styles.cardPosition}>{project.addressText}</p>
            <div className={styles.cardStatus}>
              <div
                className={classNames(
                  "d-flex align-items-start gap-2",
                  styles.cardHeader
                )}
              >
                {project.statusProcedure?.name !== "" &&
                  project.statusProcedure?.name !== undefined && (
                    <div
                      className={classNames(
                        styles.tag,
                        "default-tag",
                        project.statusProcedure?.nodeId ===
                          COLOR_TYPE.upcomingProject && "tag-danger",
                        project.statusProcedure?.nodeId ===
                          COLOR_TYPE.sellingProject && "tag-success",
                        project.statusProcedure?.nodeId ===
                          COLOR_TYPE.undefineProject && "tag-orange",
                        project.statusProcedure?.nodeId ===
                          COLOR_TYPE.handoverProject && "tag-teal",
                        project.statusProcedure?.nodeId ===
                          COLOR_TYPE.updatingProject && "tag-warning"
                      )}
                    >
                      {project.statusProcedure?.name}
                      {project.statusProcedure?.nodeId ===
                        COLOR_TYPE.handoverProject &&
                        ` • ${project.finishedYear.name}`}
                    </div>
                  )}
                {project.isProjectHasCommissionFromMgv && (
                  <div className={classNames(styles.tag, "default-tag")}>
                    MGV Phân phối
                  </div>
                )}
                {+project.finishedYear.name > currentYear && (
                  <div className={classNames(styles.tag, "tag-warning")}>
                    Dự kiến bàn giao {`• ${project.finishedYear.name}`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LinkItem>
  );
};
