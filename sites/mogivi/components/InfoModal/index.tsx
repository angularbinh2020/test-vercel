import { Modal } from "react-bootstrap";
import ButtonCustom, { IColorTypes } from "../ButtonCustom";

interface Props {
  isOpen: boolean;
  handleCloseModal: any;
  headerTitle: string;
  children: any;
  size?: "sm" | "lg" | "xl";
}

const InfoModal = ({
  isOpen,
  handleCloseModal,
  headerTitle,
  children,
  size,
}: Props) => {
  return (
    <Modal show={isOpen} onHide={handleCloseModal} size={size} centered>
      <Modal.Header closeButton>
        <Modal.Title>{headerTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <ButtonCustom color={IColorTypes.Orange} onClick={handleCloseModal}>
          Đóng
        </ButtonCustom>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
