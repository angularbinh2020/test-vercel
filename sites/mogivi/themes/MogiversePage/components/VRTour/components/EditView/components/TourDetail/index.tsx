import classNames from "classnames";
import { DATE_TIME_FORMAT } from "const/date-time-format";
import dayjs from "dayjs";
import { IVR360 } from "sites/mogivi/models/IVR360";
import H2HeaderTitle from "../../../H2HeaderTitle";
import styles from "./styles.module.scss";
import Badge from "@material-ui/core/Badge";
import ImageListPreview from "./components/ImageListPreview";
import IconPreview from "sites/mogivi/assets/icons/ic-preview.svg";
import Image from "next/image";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
interface Props {
  data: IVR360;
  showPreviewModal: any;
  openEditMode: any;
  handleRebuildPage: any;
  handleEditTourDetail: any;
}

const TourDetail = ({
  data,
  showPreviewModal,
  openEditMode,
  handleEditTourDetail,
  handleRebuildPage,
}: Props) => {
  return (
    <Container className={classNames(styles.tourDetailContainer, "pt-4")}>
      <H2HeaderTitle>
        Thông tin dự án
        <Tooltip title="Sửa thông tin">
          <IconButton className="ms-2" onClick={handleEditTourDetail}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </H2HeaderTitle>

      <Box className="mt-4">
        <div className={styles.tourDetailInfo}>
          <span>Tiêu đề:</span>
          <h6>{data.tour_settings.title}</h6>
        </div>
        <div className={styles.tourDetailInfo}>
          <span>Người khởi tạo:</span>
          <h6>{data.tour_settings.full_name}</h6>
        </div>
        <div className={styles.tourDetailInfo}>
          <span>Ngày tạo:</span>
          <h6>{dayjs(data.created_at).format(DATE_TIME_FORMAT.FULL)}</h6>
        </div>
        <div className={styles.tourDetailInfo}>
          <span>Mô tả:</span>
          <h6>{data.tour_settings.description}</h6>
        </div>
      </Box>

      <Box className={classNames(styles.tourDetailAction, "my-5 text-end")}>
        {/* <button className={styles.btnEdit}>Thiết lập mini map</button>
        <button className={styles.btnEdit}>Thiết lập quảng cáo</button> */}
        <button onClick={handleRebuildPage} className={styles.btnEdit}>
          Rebuild Tour
        </button>

        <button onClick={openEditMode} className={styles.btnEdit}>
          Chỉnh sửa
        </button>

        <button
          className={styles.btnPreview}
          onClick={() => showPreviewModal()}
        >
          <Image src={IconPreview} alt="Preview" />
          <span>Xem trước</span>
        </button>
      </Box>

      <Box className={classNames(styles.tourDetailList, "mt-4")}>
        <H2HeaderTitle>
          {" "}
          Ảnh 360
          <Badge
            color="error"
            className={styles.tourDetailBadge}
            badgeContent={data.rooms.length}
          />
        </H2HeaderTitle>

        <Box className="mt-4">
          <Grid container spacing={4}>
            <ImageListPreview
              rooms={data.rooms}
              imagesSetting={data.tour_settings.Image360s}
              openEditMode={openEditMode}
            />
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default TourDetail;
