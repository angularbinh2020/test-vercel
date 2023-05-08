import { useCallback, useEffect, useRef, useState } from "react";
import TourDetail from "./components/TourDetail";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import PreviewModal from "./components/PreviewModal";
import EditModal from "./components/EditModal";
import { I360VrTourPageData } from "sites/mogivi/models/I360VrTourPageData";
import { useSetToastState } from "sites/mogivi/redux/toast.slice";
import ConfirmModal from "../ConfirmModal";
import classNames from "classnames";
import axios from "apis/axios";
import { getFullApiUrl, openNewTab, rebuildPage } from "utils";
import { useSetLoadingFullScreenState } from "sites/mogivi/redux/loadingFullScreen.slice";
import LoadingFullScreen from "sites/mogivi/components/LoadingFullScreen";
import { getVr360Data } from "sites/mogivi/utils/vr360ssr";
import { HIDDEN_CONFIRM_ACTION_ID } from "sites/mogivi/const/vr360";
import EditTourDetailModal, { DefaultValues } from "../EditTourDetailModal";
import { updateTourSettingJson } from "apis/client";
import { rebuildMogiverVrPage } from "sites/mogivi/utils/vr360";
import { useSetConfirmModalState } from "sites/mogivi/redux/confirmModal.slice";
interface Props {
  pageData: I360VrTourPageData;
}

const EditView = ({ pageData }: Props) => {
  const [showPreviewModel, closePreviewModal, openPreviewModal] = useBoolean();
  const [showEditModal, closeEditModal, openEditModal] = useBoolean();
  const [showEditMiniMapModal, closeEditMiniMapModal, openEditMiniMapModal] =
    useBoolean();
  const [showEditAdsModal, closeEditAdsModal, openEditAdsModal] = useBoolean();
  const { showErrorToast, showInfoToast } = useSetToastState();
  const { openConfirmModal } = useSetConfirmModalState();
  const [tourDetailValues, setTourDetailValues] = useState<DefaultValues>();
  const [roomIdFocus, setRoomIdFocus] = useState(0);
  const [vr360Data, setVr360Data] = useState(pageData.data);
  const { showLoading, closeLoading } = useSetLoadingFullScreenState();
  const hideTourDetail = showEditModal || showPreviewModel;
  const pageDataRef = useRef(pageData);
  const refreshTourSetting = useCallback(() => {
    const apiUrl = getFullApiUrl(pageData.mogiverseGetDetailApi);
    axios.get(apiUrl).then((res) => {
      const newVr360Data = getVr360Data(
        res.data.data,
        pageData.hotSpotIcons[0]
      );
      pageDataRef.current.data.tour_settings = newVr360Data.tour_settings;
      setVr360Data(newVr360Data);
    });
  }, []);
  const handleOpenEditMode = useCallback((roomId?: number) => {
    openEditModal();
    setRoomIdFocus(roomId ?? 0);
  }, []);
  const handleRebuildPage = useCallback(() => {
    showLoading();
    const vr360ViewUrlPath = new URL(vr360Data.vr_tour_url_view);
    rebuildPage(vr360ViewUrlPath.pathname)
      .then((res) => {
        openConfirmModal({
          message:
            "Rebuild tour thành công, bạn có muốn mở trang tour đã rebuild?",
          modalTitle: "Rebuild thành công",
          onAccept: () => {
            openNewTab(vr360Data.vr_tour_url_view);
          },
        });
      })
      .catch((e) => {
        showErrorToast(
          "Đã có lỗi xảy ra, không thể rebuild tour. Vui lòng thử lại sau."
        );
      })
      .finally(() => {
        closeLoading();
      });
  }, []);
  const handleCloseEditMode = useCallback(() => {
    closeEditModal();
    setRoomIdFocus(0);
  }, []);
  const handleEditTourDetail = () => {
    const tour_settings = pageDataRef.current.data.tour_settings;
    setTourDetailValues({
      title: tour_settings.title,
      full_name: tour_settings.full_name,
      description: tour_settings.description,
    });
  };
  const closeEditTourDetailModal = useCallback(() => {
    setTourDetailValues(undefined);
  }, []);
  const handleSaveTourDetail = async (values: DefaultValues) => {
    showLoading();
    try {
      const tour_settings = {
        ...vr360Data.tour_settings,
        ...values,
      };
      await updateTourSettingJson(
        pageData.updateTourSettingApi,
        JSON.stringify(tour_settings)
      );
      setVr360Data({ ...vr360Data, tour_settings });
      setTourDetailValues(undefined);
      const titleElement = document.querySelector("title");
      if (titleElement) titleElement.innerText = tour_settings.title;
      showInfoToast("Lưu chỉnh sửa thành công.");

      rebuildMogiverVrPage(
        vr360Data,
        () => {
          refreshTourSetting();
          closeLoading();
        },
        showInfoToast,
        showErrorToast
      );
    } catch (e) {
      showErrorToast("Không thể lưu thông tin tour, vui lòng thử lại sau");
      closeLoading();
    }
  };
  useEffect(() => {
    refreshTourSetting();
  }, []);

  return (
    <div>
      <div className={classNames(hideTourDetail && "d-none")}>
        <TourDetail
          data={vr360Data}
          openEditMode={handleOpenEditMode}
          showPreviewModal={openPreviewModal}
          handleEditTourDetail={handleEditTourDetail}
          handleRebuildPage={handleRebuildPage}
        />
      </div>
      {showPreviewModel && (
        <PreviewModal
          closePreviewModal={closePreviewModal}
          pageData={pageDataRef.current}
        />
      )}

      {showEditModal && (
        <EditModal
          closeModal={handleCloseEditMode}
          showErrorToast={showErrorToast}
          showInfoToast={showInfoToast}
          pageData={pageDataRef.current}
          refreshTourSetting={refreshTourSetting}
          showLoading={showLoading}
          closeLoading={closeLoading}
          roomIdFocus={roomIdFocus}
        />
      )}
      {tourDetailValues && (
        <EditTourDetailModal
          defaultValues={tourDetailValues}
          handleClose={closeEditTourDetailModal}
          handleSave={handleSaveTourDetail}
          modalTitle={pageDataRef.current.data.tour_settings.title}
        />
      )}
      <ConfirmModal />
      <button id={HIDDEN_CONFIRM_ACTION_ID} className="d-none"></button>
      <LoadingFullScreen />
    </div>
  );
};

export default EditView;
