import { useState, useCallback, useMemo } from "react";
import { I3DModel } from "sites/mogivi/models/I3DModel";
import styles from "../../styles.module.scss";
import classNames from "classnames";
import Slider from "components/ReactSlickSlider";
import ButtonCustom, {
  IColorTypes,
  ISizeTypes,
} from "sites/mogivi/components/ButtonCustom";
import Image from "next/legacy/image";

interface Props {
  rooms: I3DModel[];
  startViewTour: any;
}
const DesktopMenu = ({ rooms, startViewTour }: Props) => {
  const [roomsState, setRoomsState] = useState(rooms);
  const settings = useMemo(() => {
    return {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
  }, []);

  const currentModel = useMemo(() => {
    return roomsState.find((model) => model.isView);
  }, [roomsState]);

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
  return (
    <div>
      <h1>{currentModel?.title}</h1>
      <div
        className={styles.sliderContainer}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Slider {...settings}>
          {roomsState.map((model) => (
            <div key={model.title} className={styles.previewImage}>
              <Image
                src={model.previewImage}
                alt={model.title}
                className={classNames(
                  model.isView ? styles.active : styles.inactive
                )}
                onClick={(e) => {
                  handleSelectModel(model);
                }}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="mb-5">
        <ButtonCustom
          color={IColorTypes.Orange}
          size={ISizeTypes.Medium}
          onClick={() => {
            startViewTour(roomsState);
          }}
          className={styles.startViewBtn}
        >
          Bắt đầu tham quan
        </ButtonCustom>
      </div>
      <p>
        Di chuyển bằng các phím: W, A, S, D<br />
        Nhìn xung quanh bằng cách rê chuột.
        <br />
        Ấn Esc để mở menu
        <br />
        Cuộn chuột để thay đổi độ cao
      </p>
    </div>
  );
};

export default DesktopMenu;
