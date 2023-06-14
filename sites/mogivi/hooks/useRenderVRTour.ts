import { IAdsData } from "./../../../models/IAdsData";
import { IVR360, Image360, IImageJson } from "./../models/IVR360";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  ImageUrlSource,
  RectilinearView,
  autorotate,
  Viewer,
  ElementPressControlMethod,
  CubeGeometry,
} from "marzipano";
import {
  createEmbeddedHotSpot,
  createFooterCoverHotSpot,
  createInfoHotSpot,
  createLinkHotSpot,
  hideAllHotSpot,
  isHotSpotHaveCoords,
  showAllHotSpot,
} from "sites/mogivi/utils/vr360";
import Easing from "sites/mogivi/utils/easing";
import transitionFunctions from "sites/mogivi/utils/transitions";
import { FOOTER_IMAGE_DEFAULT_SETTING } from "sites/mogivi/const/vr360";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import { IHotSpot } from "../models/ICommonHotSpotOption";
import { isIOS } from "react-device-detect";
import { HTML_DATA_ATTRIBUTE_NAME } from "../const/html-data-config";

interface Option {
  vr360: IVR360;
  adsAvailable: IAdsData[];
  tagIcons: IHotSpotIcon[];
}

const useRenderTour = ({ vr360, adsAvailable, tagIcons }: Option) => {
  const [viewer, setViewer] = useState<Viewer>();
  const [isAutoRotate, setAutoRotate] = useState(false);
  const [currentHotSpotIcon, setCurrentHotSpotIcon] = useState<IHotSpotIcon>();
  const [currentImageSetting, setCurrentImageSetting] = useState<Image360>();
  const [sceneDefaultView, setDefaultView] = useState<any>(null);
  //@ts-ignore
  const imagesSetting = useRef<Image360[]>(vr360.tour_settings?.Image360s);
  const currentIndex = useMemo(() => {
    const index = vr360.tour_settings?.Image360s.findIndex(
      (data) => data.id === currentImageSetting?.id
    );
    return (index !== -1 ? index : 0) || 0;
  }, [vr360, currentImageSetting]);
  const currentRoom = useMemo(() => {
    if (currentImageSetting && vr360) {
      return vr360.rooms.find((room) => room.id === currentImageSetting.id);
    }
    return undefined;
  }, [currentImageSetting]);
  const cachedScenes = useRef<any[]>([]);
  const isDisabledPreviousButton = currentIndex === 0;
  const isDisabledNextButton = !imagesSetting.current[currentIndex + 1];
  const containerRef = useRef();

  const initViewer = useCallback(() => {
    // done
    //@ts-ignore
    const newViewer = new Viewer(containerRef.current);
    const velocity = 0.7;
    const friction = 3;
    const controls = newViewer.controls();
    document
      .querySelectorAll(`[${HTML_DATA_ATTRIBUTE_NAME.ZOOM_IN}]`)
      .forEach((element: any, index) => {
        controls.registerMethod(
          `inElement${index}`,
          new ElementPressControlMethod(element, "zoom", -velocity, friction),
          true
        );
      });
    document
      .querySelectorAll(`[${HTML_DATA_ATTRIBUTE_NAME.ZOOM_OUT}]`)
      .forEach((element: any, index) => {
        controls.registerMethod(
          `outElement${index}`,
          new ElementPressControlMethod(element, "zoom", velocity, friction),
          true
        );
      });

    const handleScreenRotate = () => {
      setTimeout(() => {
        newViewer.updateSize();
      }, 500);
    };
    const storedHandleRotate =
      window["handleScreenRotate" as keyof typeof window];
    if (storedHandleRotate) {
      screen.orientation.removeEventListener("change", storedHandleRotate);
    }
    //@ts-ignore
    window["handleScreenRotate"] = handleScreenRotate;
    screen.orientation.addEventListener("change", handleScreenRotate);

    setViewer(newViewer);
    const containerElement: any = containerRef.current;
    const handleTouchMove = (e: any) => {
      if (isIOS) {
        e.preventDefault();
      }
    };
    containerElement?.addEventListener("touchmove", handleTouchMove);
  }, []);

  const handleGoToImageSetting = (newImageIndex: number) => {
    // done
    setCurrentImageSetting(imagesSetting.current[newImageIndex]);
  };

  const handleGoToImageSettingByImageId = (imageGuid: number) => {
    // done
    imagesSetting.current.map((imageSetting) => {
      if (imageSetting.id === imageGuid) {
        setCurrentImageSetting(imageSetting);
      }
    });
  };
  const focusHotSpot = (hotSpotData: any) => {
    const view = (viewer as any).view();
    view.setYaw(hotSpotData.yaw);
    view.setPitch(hotSpotData.pitch);
  };

  const getNewScene = (currentImageSetting: Image360) => {
    const {
      tagHotSpots,
      defaultView,
      nextMarkerPosition,
      previousMarkerPosition,
      customHotSpots,
      previewImageSize,
    } = currentImageSetting;
    const rawImageData: any = vr360.rooms.find(
      (room) => room.id === currentImageSetting.id
    )?.imagesJsonParsed;
    const { originalWidth, titleSize } = rawImageData;
    let defaultSceneView = sceneDefaultView || defaultView;
    const imageId = currentImageSetting.id;

    const sceneCached: any = cachedScenes.current.find(
      (x: any) => x.Id === imageId
    );
    if (sceneCached) {
      const view = sceneCached.scene.view();
      view.setParameters({ ...defaultSceneView });
      return sceneCached.scene;
    }

    const maxFovDefault = (120 * Math.PI) / 180;

    //@ts-ignore
    const newSource = new ImageUrlSource((tile: any) => {
      // const imageCoord = `${currentImageSetting.id}_${tile.face}_${tile.x}_${tile.y}`;
      const imageCoord = `${tile.face}_${tile.x}_${tile.y}`;
      if (tile.z) {
        const imageMatch = rawImageData.titleImages.find((imageUrl: string) =>
          imageUrl.includes(imageCoord)
        );

        return {
          url: imageMatch,
        };
      }
      const imageMatch = rawImageData.preview;
      const mapY = "bdflru".indexOf(tile.face) / 6;
      return {
        url: imageMatch,
        rect: { x: 0, y: mapY, width: 1, height: 1 / 6 },
      };
    });

    const newGeometry = new CubeGeometry([
      {
        tileSize: previewImageSize,
        size: previewImageSize,
        //@ts-ignore
        fallbackOnly: true,
      },
      { tileSize: titleSize, size: originalWidth / 4 },
    ]);

    const newLimiter = RectilinearView.limit.traditional(
      originalWidth / 4,
      maxFovDefault
    );
    const newView = new RectilinearView({ ...defaultSceneView }, newLimiter);
    const newScene = viewer?.createScene({
      source: newSource,
      geometry: newGeometry,
      view: newView,
      pinFirstLevel: true,
    });
    cachedScenes.current = [
      ...cachedScenes.current,
      {
        Id: imageId,
        scene: newScene,
      },
    ];

    const hotSpots = [nextMarkerPosition, previousMarkerPosition];
    if (currentHotSpotIcon) {
      const hotSpotLists = [hotSpots, customHotSpots];
      hotSpotLists.forEach((arrHotSpot) => {
        arrHotSpot?.forEach((hotSpot) => {
          if (hotSpot && isHotSpotHaveCoords(hotSpot as any)) {
            const hotSpotConfig: any = {
              ...hotSpot,
              onClick: () => {
                focusHotSpot(hotSpot);
                setDefaultView(hotSpot.defaultView || null);
                if (hotSpot.imageTarget?.id)
                  handleGoToImageSettingByImageId(hotSpot.imageTarget?.id);
              },
            };
            createLinkHotSpot({
              hotSpotConfig,
              scene: newScene,
            });
          }
        });
      });
    }

    tagHotSpots.map((infoHotSpot: IHotSpot) => {
      const tagIconSelected = tagIcons.find(
        (x: IHotSpotIcon) => x.keyword === infoHotSpot.icon?.keyword
      );

      if (!tagIconSelected) {
        console.error("Missing tag Icon");
        return;
      }

      createInfoHotSpot({
        scene: newScene,
        hotSpotConfig: { ...infoHotSpot, icon: tagIconSelected },
      });
    });

    const adsSetting = currentImageSetting.ads;

    // const isImageSettingHaveAds = adsSetting && adsSetting.length > 0;
    // if (isImageSettingHaveAds) {
    //   const embeddedHotSpot = adsSetting[0];
    //   const adsMatch = adsAvailable.find(
    //     (x: any) => x.Code === embeddedHotSpot.adsCode
    //   );
    //   createEmbeddedHotSpot({
    //     hotSpotConfig: embeddedHotSpot,
    //     scene: newScene,
    //     ads: {
    //       type: adsMatch?.keyword || "",
    //       url: adsMatch?.url || "",
    //       YoutubeId: adsMatch?.url || "",
    //     },
    //   });
    // }
    const imageFooterCoverSetting: any =
      currentImageSetting.imageFooterCoverSetting ||
      FOOTER_IMAGE_DEFAULT_SETTING;
    if (imageFooterCoverSetting?.isUsed) {
      createFooterCoverHotSpot({
        scene: newScene,
        hotSpotConfig: imageFooterCoverSetting,
      });
    }

    hideAllHotSpot(newScene);
    return newScene;
  };

  useEffect(() => {
    // done
    if (viewer) {
      if (isAutoRotate) {
        const autorotateConfig = autorotate({
          yawSpeed: 0.05,
          targetPitch: 0,
          targetFov: Math.PI / 2,
        });
        viewer.startMovement(autorotateConfig, () => {
          setAutoRotate(false);
          viewer.setIdleMovement(Infinity);
        });
        viewer.setIdleMovement(3000, autorotateConfig);
      } else {
        viewer.stopMovement();
        viewer.setIdleMovement(Infinity);
      }
    }
  }, [isAutoRotate]);

  useEffect(() => {
    if (!viewer || !currentImageSetting) {
      return;
    }
    const currentScene = viewer.scene();
    hideAllHotSpot(currentScene);
    const nextScene = getNewScene(currentImageSetting);
    viewer.switchScene(
      nextScene,
      {
        transitionDuration: 750,
        //@ts-ignore
        transitionUpdate: transitionFunctions.fromCenterAndOpacity(
          Easing.easeOutQuart
        ),
      },
      () => {
        showAllHotSpot(nextScene);
      }
    );
  }, [currentImageSetting, viewer]);

  return {
    viewer,
    setViewer,
    isAutoRotate,
    setAutoRotate,
    currentHotSpotIcon,
    setCurrentHotSpotIcon,
    containerRef,
    currentImageSetting,
    setCurrentImageSetting,
    currentIndex,
    handleGoToImageSetting,
    handleGoToImageSettingByImageId,
    isDisabledPreviousButton,
    isDisabledNextButton,
    imagesSetting,
    initViewer,
    currentRoom,
  };
};

export default useRenderTour;
