import Modal from "react-bootstrap/Modal";
import UserView from "../../../UserView";

interface Props {
  pageData: any;
  closePreviewModal: any;
}

const PreviewModal = ({ pageData, closePreviewModal }: Props) => {
  return (
    <div className="vw-100 vh-100">
      <UserView pageData={pageData} onBack={closePreviewModal} />
    </div>
  );
};

export default PreviewModal;
