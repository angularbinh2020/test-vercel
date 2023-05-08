import React, { useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { I3DModel } from "sites/mogivi/models/I3DModel";
import ButtonCustom, {
  IColorTypes,
  ISizeTypes,
} from "sites/mogivi/components/ButtonCustom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";

interface Props {
  rooms: I3DModel[];
  startViewTour: any;
}

const MobileMenu = ({ rooms, startViewTour }: Props) => {
  const [roomsState, setRoomsState] = useState(rooms);
  const [isShowMenu, setShowMenu] = useState(true);
  const currentRoom = useMemo(() => {
    return roomsState.find((room) => room.isView);
  }, [roomsState]);
  const elem: any = useMemo(() => {
    return document.documentElement;
  }, []);

  const handleSelectModel = useCallback(
    (model3D: I3DModel) => {
      const newModels = roomsState.map((model) => ({
        ...model,
        isView: model.title === model3D.title,
      }));
      setRoomsState(newModels);
    },
    [roomsState]
  );

  const fullscreenElement = useCallback(() => {
    return (
      document.fullscreenElement ||
      //@ts-ignore
      document.webkitFullscreenElement ||
      //@ts-ignore
      document.mozFullScreenElement ||
      //@ts-ignore
      document.msFullscreenElement
    );
  }, []);

  function openFullscreen() {
    if (!fullscreenElement()) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        return;
      }
      if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
        return;
      }
      if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
        return;
      }
      if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
        return;
      }
      document.body.style.overscrollBehavior = "contain";
    }
  }

  function closeFullscreen() {
    if (fullscreenElement()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        return;
      }
      const documentRef = document as any;
      if (documentRef.webkitExitFullscreen) {
        documentRef.webkitExitFullscreen();
        return;
      }
      if (documentRef.mozCancelFullScreen) {
        documentRef.mozCancelFullScreen();
        return;
      }
      if (documentRef.msExitFullscreen) {
        documentRef.msExitFullscreen();
        return;
      }
      elem.style.overscrollBehavior = "unset";
    }
  }

  return (
    <>
      <div
        className={classNames(styles.menuBtn, isShowMenu && styles.hidden)}
        onClick={() => {
          closeFullscreen();
          setShowMenu(true);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <Modal
        show={isShowMenu}
        onHide={() => setShowMenu(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>{currentRoom?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {roomsState.map((room) => (
                <Col key={room.title} xs={4}>
                  <div className={styles.previewImage}>
                    <Image
                      src={room.previewImage}
                      alt={room.title}
                      className={classNames(
                        room.isView ? styles.active : styles.inactive
                      )}
                      onClick={(e) => {
                        handleSelectModel(room);
                      }}
                      quality={100}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <ButtonCustom
            color={IColorTypes.Orange}
            size={ISizeTypes.Medium}
            onClick={() => {
              openFullscreen();
              setShowMenu(false);
              startViewTour(roomsState);
            }}
            className={styles.startViewBtn}
          >
            Bắt đầu tham quan
          </ButtonCustom>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MobileMenu;
