import React from "react";
import { I360VrTourPageData } from "sites/mogivi/models/I360VrTourPageData";
import HotSpotTemplate from "../../../UserView/components/HotSpotTemplate";
import NavigationImageStep from "../NavigationImageStep";
import styles from "./styles.module.scss";
import IconPreview from "sites/mogivi/assets/icons/ic-preview.svg";
import Image from "next/legacy/image";
import SettingImageCustom from "./components/SettingImageCustom";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import { IAdsData } from "models/IAdsData";
import { Image360, ITourSettings, IVR360 } from "sites/mogivi/models/IVR360";
import { IHotSpot } from "sites/mogivi/models/ICommonHotSpotOption";
import { isNumber } from "lodash";
import { updateTourSettingJson } from "apis/client";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { createSetConfirmModalDispatch } from "sites/mogivi/redux/confirmModal.slice";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditRoomTitleModal from "./components/EditRoomTitleModal";
import { rebuildMogiverVrPage } from "sites/mogivi/utils/vr360";
interface Props {
  pageData: I360VrTourPageData;
  closeModal: any;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  dispatch?: any;
  refreshTourSetting: any;
  showLoading: any;
  closeLoading: any;
  roomIdFocus?: number;
}

interface State {
  firstImage: Image360;
  currentFirstImageIndex: number;
  hotSpotIcons: IHotSpotIcon[];
  tagIcons: IHotSpotIcon[];
  adsAvailable: IAdsData[];
  tourSetting: ITourSettings;
  tourDetailOrigin: IVR360;
  tourHotSpotIcon: IHotSpotIcon;
  openConfirmModal: any;
  roomTitleBeingEdit: string;
}

class EditModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { pageData, dispatch, roomIdFocus } = this.props;
    const tourSetting = pageData.data.tour_settings;
    let firstImage = tourSetting.Image360s[0];
    let currentFirstImageIndex = 0;
    if (roomIdFocus) {
      const roomIndex = tourSetting.Image360s.findIndex(
        (img) => img.id === roomIdFocus
      );
      if (roomIndex !== -1) {
        currentFirstImageIndex = roomIndex;
        firstImage = tourSetting.Image360s[roomIndex];
      }
    }
    this.state = {
      firstImage: firstImage,
      currentFirstImageIndex: currentFirstImageIndex,
      hotSpotIcons: pageData.hotSpotIcons,
      openConfirmModal:
        createSetConfirmModalDispatch(dispatch).openConfirmModal,
      tagIcons: pageData.tagIcons,
      tourDetailOrigin: pageData.data,
      tourSetting: tourSetting,
      tourHotSpotIcon: tourSetting.tourHotSpotIcon ?? pageData.hotSpotIcons[0],
      adsAvailable: pageData.ads,
      roomTitleBeingEdit: "",
    };

    const handleFunctions = [
      "handleSave",
      "handleGoBackSection",
      "handleNextSection",
      "onChangeTourHotSpotIcon",
      "openEditRoomTitle",
      "closeEditRoomTitle",
      "handleSaveRoomTitle",
    ];
    handleFunctions.map((functionName: string) => {
      //@ts-ignore
      this[functionName] = this[functionName].bind(this);
    });
  }

  openEditRoomTitle() {
    this.setState({
      roomTitleBeingEdit: this.state.firstImage.title,
    });
  }

  closeEditRoomTitle() {
    this.setState({
      roomTitleBeingEdit: "",
    });
  }

  isHaveHotSpotSameCoords() {
    const { firstImage } = this.state;
    const { showErrorToast } = this.props;
    const isHaveSameCoords = (imageSetting: Image360) => {
      let hotSpots: IHotSpot[] = [];
      if (imageSetting.nextMarkerPosition)
        hotSpots.push(imageSetting.nextMarkerPosition);
      if (imageSetting.previousMarkerPosition)
        hotSpots.push(imageSetting.previousMarkerPosition);
      if (imageSetting.tagHotSpots?.length)
        hotSpots = [...hotSpots, ...imageSetting.tagHotSpots];
      if (imageSetting.customHotSpots?.length) {
        hotSpots = [...hotSpots, ...imageSetting.customHotSpots];
      }
      const hotSpotsCoords: string[] = [];
      hotSpots.map((x) => {
        if (isNumber(x.yaw) && isNumber(x.pitch)) {
          hotSpotsCoords.push(`${x.yaw}|${x.pitch}`);
        }
      });
      const uniqueCoords = Array.from(new Set(hotSpotsCoords));
      return uniqueCoords.length !== hotSpotsCoords.length;
    };
    let result = isHaveSameCoords(firstImage);
    if (result) {
      showErrorToast(
        "Có hai hotspot hoặc nhãn dán đang bị đè lên nhau. Vui lòng sửa vị trí 1 trong 2 trước khi tiếp tục"
      );
    }
    return result;
  }

  saveCurrentImageChange(callBack: any = null) {
    const { tourSetting, firstImage } = this.state;
    const newImagesSetting = tourSetting.Image360s.map((image) => {
      if (image.id === firstImage.id) return firstImage;
      return image;
    });
    const newTourSetting = { ...tourSetting, Image360s: newImagesSetting };
    this.setState(
      {
        tourSetting: newTourSetting,
      },
      () => {
        callBack && callBack();
      }
    );
    return newImagesSetting;
  }

  saveBeingEdited() {
    this.saveCurrentImageChange(this.handleSave);
  }

  handleSave = async () => {
    const {
      closeModal,
      showInfoToast,
      showErrorToast,
      pageData,
      refreshTourSetting,
      showLoading,
      closeLoading,
    } = this.props;
    showLoading();
    const { tourSetting, tourHotSpotIcon } = this.state;
    try {
      const tourSettingModel = { ...tourSetting };
      tourSettingModel.tourHotSpotIcon = tourHotSpotIcon;
      tourSettingModel.Image360s.forEach((img) => {
        img.customHotSpots?.forEach((hotSpot) => {
          hotSpot.icon = tourHotSpotIcon;
        });
      });
      await updateTourSettingJson(
        pageData.updateTourSettingApi,
        JSON.stringify(tourSettingModel)
      );
      showInfoToast("Lưu chỉnh sửa thành công");
      rebuildMogiverVrPage(
        pageData.data,
        () => {
          closeLoading();
          refreshTourSetting();
          setTimeout(() => {
            closeModal();
          }, 1500);
        },
        showInfoToast,
        showErrorToast
      );
    } catch (e) {
      console.error(e);
      showErrorToast("Lỗi: Không thể Lưu tour");
      closeLoading();
    }
  };

  handleGoBackSection() {
    if (this.isHaveHotSpotSameCoords()) return;
    const { currentFirstImageIndex } = this.state;
    const newImages = this.saveCurrentImageChange();
    const newCurrentFirstImageIndex = currentFirstImageIndex - 1;
    const nextFirstImage = newImages[newCurrentFirstImageIndex];
    this.setState({
      firstImage: nextFirstImage,
      currentFirstImageIndex: newCurrentFirstImageIndex,
    });
  }

  handleNextSection() {
    if (this.isHaveHotSpotSameCoords()) return;
    const { currentFirstImageIndex } = this.state;
    const newImages = this.saveCurrentImageChange();
    const newCurrentFirstImageIndex = currentFirstImageIndex + 1;
    const nextFirstImage = newImages[newCurrentFirstImageIndex];
    const nextSecondImage =
      newImages[newCurrentFirstImageIndex + 1] || newImages[0];
    this.setState({
      firstImage: nextFirstImage,
      currentFirstImageIndex: newCurrentFirstImageIndex,
    });
  }

  handleGoBack() {
    const { openConfirmModal } = this.state;
    const { closeModal } = this.props;
    openConfirmModal({
      modalTitle: "Trở lại màn hình chính",
      message:
        "Nếu chưa lưu, những thay đổi của bạn sẽ không được áp dụng. Tiếp tục chứ?",
      onAccept: () => {
        console.log("test");
        closeModal();
      },
    });
  }

  handleSaveRoomTitle(newTitle: string) {
    const firstImage = { ...this.state.firstImage, title: newTitle };
    const Image360s = this.state.tourSetting.Image360s;
    Image360s.forEach((img) => {
      img.customHotSpots.forEach((hotSpot) => {
        if (hotSpot.imageTarget?.id === firstImage.id) {
          hotSpot.imageTarget.title = firstImage.title;
        }
      });
    });
    const tourSetting = { ...this.state.tourSetting, Image360s };
    this.setState({
      firstImage,
      tourSetting,
    });
  }

  onChangeTourHotSpotIcon(newTourHotSpotIcon: IHotSpotIcon) {
    const { firstImage, tourSetting } = this.state;
    firstImage.customHotSpots?.forEach((hotSpot) => {
      hotSpot.icon = newTourHotSpotIcon;
    });
    tourSetting.Image360s.forEach((img) => {
      img.customHotSpots?.forEach((hotSpot) => {
        hotSpot.icon = newTourHotSpotIcon;
      });
    });
    this.setState({
      tourHotSpotIcon: newTourHotSpotIcon,
      firstImage: { ...firstImage },
      tourSetting: { ...tourSetting },
    });
  }

  render() {
    const {
      currentFirstImageIndex,
      firstImage,
      tourDetailOrigin,
      adsAvailable,
      tagIcons,
      tourSetting,
      tourHotSpotIcon,
      roomTitleBeingEdit,
    } = this.state;
    const { footerImages, hotSpotIcons } = this.props.pageData;
    const isCanNotGoNextSection =
      tourDetailOrigin &&
      currentFirstImageIndex === tourSetting.Image360s.length - 1;
    const isCanNotGoBack = currentFirstImageIndex === 0;

    return (
      <>
        <Container maxWidth="xl" className={styles.setupFirstTimeContainer}>
          <h2 className="pt-4 mb-0">Chỉnh sửa dự án</h2>

          <Box className="mt-3">
            <div className={styles.tourInfo}>
              <span>Tiêu đề tin đăng:</span>
              <h6 className="font-weight-medium">{tourDetailOrigin.title}</h6>
            </div>
            <div className={styles.tourInfo}>
              <span>Số cảnh:</span>
              <h6 className="font-weight-medium">{`${tourSetting.Image360s.length} ảnh`}</h6>
            </div>
          </Box>

          <Box className="mt-6">
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <NavigationImageStep
                  handleGoBack={this.handleGoBackSection}
                  handleGoNext={this.handleNextSection}
                  isCanNotGoBack={isCanNotGoBack}
                  isCanNotGoNextSection={isCanNotGoNextSection}
                >
                  <div className="text-center">
                    <span>{firstImage.title}</span>
                    <Tooltip title="Sửa tiêu đề">
                      <IconButton
                        className="ms-2"
                        onClick={this.openEditRoomTitle}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </NavigationImageStep>
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={1} className={styles.setupAction}>
                  <Grid item xs={6}>
                    <button
                      className={styles.btnReset}
                      onClick={() => this.handleGoBack()}
                    >
                      Trở về Chi tiết
                    </button>
                  </Grid>
                  <Grid item xs={6}>
                    <button
                      className={styles.btnPreviewAndComplete}
                      onClick={() => this.saveBeingEdited()}
                    >
                      <Image src={IconPreview} alt="Preview" />
                      <span>Lưu chỉnh sửa</span>
                    </button>
                  </Grid>
                </Grid>
              </Grid>

              <SettingImageCustom
                imageSetting={firstImage}
                tagIcons={tagIcons}
                updateImageSetting={(newImageSetting: Image360) =>
                  this.setState({
                    firstImage: newImageSetting,
                  })
                }
                tourDetail={tourDetailOrigin}
                adsAvailable={adsAvailable}
                footerImages={footerImages}
                hotSpotIcons={hotSpotIcons}
                tourHotSpotIcon={tourHotSpotIcon}
                handleChangeHotSpotIcon={this.onChangeTourHotSpotIcon}
                tourSetting={tourSetting}
              />
            </Grid>
          </Box>
          <HotSpotTemplate />
        </Container>
        {roomTitleBeingEdit && (
          <EditRoomTitleModal
            defaultValue={roomTitleBeingEdit}
            handleClose={this.closeEditRoomTitle}
            handleSave={this.handleSaveRoomTitle}
          />
        )}
      </>
    );
  }
}
export default connect(null, null)(EditModal);
