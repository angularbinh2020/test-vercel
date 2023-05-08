import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { IRoom } from "sites/mogivi/models/IRoom";
import { I3DModel } from "sites/mogivi/models/I3DModel";
import MogiverseLogo from "sites/mogivi/assets/icons/mogiverse-logo.svg";
import ToastNotification from "sites/mogivi/components/ToastNotification";
import { IMogiverseStatus } from "sites/mogivi/models/IMogiverseStatus";
import ContentUnPublish from "./components/ContentUnPublish";
import PageHeader from "./components/PageHeader";
import { MESSAGES } from "sites/mogivi/const/message";

const View3D = dynamic(() => import("./components/View3D"), {
  ssr: false,
});

interface Props {
  pageData: {
    data: IRoom;
  };
}

const PageContent = ({ pageData }: Props) => {
  const [models, setModels] = useState<I3DModel[]>([]);
  const data = pageData.data;
  const [errorMessage, setErrorMessage] = useState("");
  const isDeleted = useMemo(() => {
    return data.status === IMogiverseStatus.UN_PUBLISH;
  }, []);

  const getErrorMsg = useCallback((room: I3DModel) => {
    let message = "";
    const isRoomNotSupportOnBrowser =
      room.dbFile && room.objFile && room.plyFile && !room.dracoFile;
    const isRoomInProcess = room.dbFile && (!room.objFile || !room.plyFile);
    const isRoomIsNotCompletedScan = !room.dbFile;
    if (isRoomNotSupportOnBrowser) {
      message = `<p>
      Không gian scan này không được hỗ trợ trên trình duyệt. 
      Vui lòng nhấp vào đường liên kết sau để xem trên ứng dụng Mogiverse: 
      <a href="${room.deepLink}" class="d-block text-break">${room.deepLink}</a></p>`;
    }
    if (isRoomInProcess) {
      message = MESSAGES.dataIsInProcess;
    }
    if (isRoomIsNotCompletedScan) {
      message = MESSAGES.roomIsNotCompletedScan;
    }
    if (message) {
      return {
        message: message,
      };
    }
    return null;
  }, []);

  useEffect(() => {
    if (isDeleted) return;
    const rooms = data.rooms;
    let initModels = rooms?.length
      ? rooms.map((room) => ({
          fileUrl: room.draco_file || room.mesh_texture_file,
          isView: false,
          previewImage: room.thumbnail || MogiverseLogo?.src,
          title: room.name,
          dbFile: room.db_file,
          deepLink: room.deeplink,
          plyFile: room.ply_file,
          objFile: room.mesh_texture_file,
          dracoFile: room.draco_file,
        }))
      : [
          {
            fileUrl: data.draco_file || data.mesh_texture_file,
            isView: false,
            previewImage: data.thumbnail || MogiverseLogo?.src,
            title: data.name,
            dbFile: data.db_file,
            deepLink: data.deeplink,
            plyFile: data.ply_file,
            objFile: data.mesh_texture_file,
            dracoFile: data.draco_file,
          },
        ];
    initModels[0].isView = true;
    const willShowErrorMsg = initModels.every((room) => getErrorMsg(room));
    if (willShowErrorMsg) {
      const checkMessage = getErrorMsg(initModels[0]);
      setErrorMessage(checkMessage?.message || "");
    }
    initModels = initModels.filter((room) => !getErrorMsg(room));
    setModels(initModels);
  }, []);

  if (isDeleted || errorMessage)
    return <ContentUnPublish data={data} message={errorMessage} />;

  if (models.length)
    return (
      <div>
        <View3D models={models} setModels={setModels} />
        <ToastNotification />
      </div>
    );
  return null;
};

const Room3D = ({ pageData }: Props) => {
  return (
    <>
      <PageHeader pageData={pageData} />
      <PageContent pageData={pageData} />
    </>
  );
};

export default Room3D;
