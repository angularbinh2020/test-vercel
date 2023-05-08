import { useSetToastState } from "./../redux/toast.slice";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Vector2,
  Raycaster,
  PerspectiveCamera,
  Intersection,
  Mesh,
  Line,
  Vector3,
  Clock,
  WebGLRenderer,
  Scene,
  MeshStandardMaterial,
  Line3,
  Box3,
  Matrix4,
  BoxGeometry,
  MeshBasicMaterial,
  BufferGeometry,
  LineSegments,
  LineBasicMaterial,
  LoadingManager,
  Group,
  AmbientLight,
  PointsMaterial,
  Color,
  Points,
  sRGBEncoding,
} from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import { JoystickManager, create } from "nipplejs";
import { PointerLockControls } from "../objectClass/PointerLockControls";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { IPlayerMesh } from "../models/IPlayerMesh";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as JSZip from "jszip";
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { MeshBVH } from "three-mesh-bvh";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const bgColor = new Color("rgb(173,216,230)");

const TIME_SCREEN_REFRESH = 1000 / 60;
const COLOR_WHITE = 0xffffff;

let idSetTimeoutDrawLine: any = null;

export const useRenderTour3D = (
  measurementLabelCssClassName: string = "measurementLabel"
) => {
  const { showErrorToast } = useSetToastState();
  const mouse = useRef(new Vector2());
  const drawingLine = useRef(false);
  const raycaster = useRef(new Raycaster());
  const camera = useRef<PerspectiveCamera>();
  const intersects = useRef<Intersection[]>();
  const pickAbleObjects = useRef<Mesh[]>([]);
  const line = useRef<Line>();
  const lineId = useRef<number>(0);
  const measurementLabels = useRef<{ [key: number]: CSS2DObject }>({});
  const clock = useRef(new Clock());
  const leftJoystick = useRef<JoystickManager>();
  const collider = useRef<Mesh>();
  const controls = useRef<PointerLockControls>();
  const playerHeight = useRef<number>(0);
  const containerElementRef = useRef<HTMLDivElement>();
  const blockerElementRef = useRef<HTMLDivElement>();
  const params = useRef({
    firstPerson: true,
    displayCollider: false,
    displayBVH: false,
    visualizeDepth: 10,
    gravity: -30,
    playerSpeed: 1,
    physicsSteps: 5,
  });
  const renderer = useMemo(() => {
    const renderRef = new WebGLRenderer({ antialias: true });
    renderRef.setClearColor(bgColor, 1);
    renderRef.outputEncoding = sRGBEncoding;
    return renderRef;
  }, []);
  const labelRenderer = useRef<CSS2DRenderer>(new CSS2DRenderer());
  const scene = useRef(new Scene());
  const playerVelocity = useRef(new Vector3());
  const tempVector = useRef(new Vector3());
  const tempVector2 = useRef(new Vector3());
  const upVector = useRef(new Vector3(0, 1, 0));
  const playerIsOnGround = useRef<boolean>(false);
  const forwardBtnPressed = useRef<boolean>(false);
  const backBtnPressed = useRef<boolean>(false);
  const leftBtnPressed = useRef<boolean>(false);
  const rightBtnPressed = useRef<boolean>(false);
  const [isViewing, setViewing] = useState<boolean>(isTouchDevice || false);
  const player = useMemo<IPlayerMesh>(() => {
    const playerRef: IPlayerMesh = new Mesh(
      new RoundedBoxGeometry(0.1, 0.5, 0.1, 1, 0.5),
      new MeshStandardMaterial()
    );
    playerRef.geometry.translate(0, -1, 0);
    playerRef.capsuleInfo = {
      radius: 0.1,
      segment: new Line3(new Vector3(), new Vector3(0, -1.0, 0.0)),
    };
    scene.current.add(playerRef);
    return playerRef;
  }, []);
  const tempBox = useRef(new Box3());
  const tempMat = useRef(new Matrix4());
  const tempSegment = useRef(new Line3());
  const joystickPos = useRef({ x: 0, y: 0 });
  const isDrawingMeasureLine = useRef(false);
  const lines = useRef<Line[]>([]);
  const currentObject = useRef<
    Group | Points<BufferGeometry, PointsMaterial>
  >();
  const fileMap = useRef(new Map());
  const requestResourceController = useRef<AbortController>();
  const [isRenderReady, setRenderReady] = useState<boolean>(false);
  const [isLoadingModel, setLoadingModel] = useState<boolean>(false);
  const [isUsingMeasureTool, setUsingMeasureTool] = useState<boolean>(false);
  const isViewingRef = useRef<boolean>(false);
  const reset = useCallback(() => {
    playerVelocity.current.set(0, 0, 0);
    player.position.set(-1, 0, 0);
  }, []);
  const adjustPlayerHeight = useCallback((e: any) => {
    // checked
    var target = e.target || e.srcElement;
    playerHeight.current = +target.value;
    if (controls.current)
      controls.current.getObject().position.y = playerHeight.current;
  }, []);

  const setSliderMinMax = (max: any) => {
    const slider = document.getElementById("slider");
    //@ts-ignore
    slider.max = max > 2 ? max : 2;
    //@ts-ignore
    slider.min = -1;
  };

  const loadColliderEnvironment = useCallback(
    (obj: Group | Points<BufferGeometry, PointsMaterial>) => {
      pickAbleObjects.current = [];
      lines.current.forEach((item) => {
        scene.current.remove(item);
      });
      if (obj instanceof Group) {
        const box = new Box3();
        box.setFromObject(obj);
        box.getCenter(obj.position).negate();
        obj.updateMatrixWorld(true);
        // collect all geometries to merge
        const geometries = [];
        obj.updateMatrixWorld(true);
        let boundingBox: any;
        obj.traverse((c: any) => {
          if (c.geometry) {
            boundingBox = c.geometry.boundingBox.clone();
          }
          if (c.isMesh) pickAbleObjects.current.push(c);
        });
        const { max, min } = boundingBox;
        const ground = new BoxGeometry(
          max.x - min.x,
          max.y - min.y,
          max.z - min.z
        );
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh(ground, material);
        cube.position.set(
          (min.x + max.x) / 2,
          (max.y + min.y) / 2,
          (min.z + max.z) / 2
        );
        geometries.push(ground);
        playerVelocity.current.set(0, 0, 0);
        player.position.set(0, 1, 0);

        // create the merged geometry
        const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
          geometries,
          false
        );
        mergedGeometry.boundsTree = new MeshBVH(mergedGeometry);
        const newCollider = new Mesh(mergedGeometry);
        const colliderMaterial: any = newCollider.material;
        colliderMaterial.opacity = 0;
        colliderMaterial.transparent = true;
        newCollider.geometry.boundingBox;
        collider.current = newCollider;
        scene.current.add(collider.current);
        setSliderMinMax(max.y - min.y);
      } else {
        const box = new Box3();
        box.setFromObject(obj);
        box.getCenter(obj.position).negate();
        obj.updateMatrixWorld(true);

        // collect all geometries to merge
        const geometries = [];
        obj.updateMatrixWorld(true);
        let boundingBox: any;
        obj.traverse((c: any) => {
          if (c.geometry) {
            boundingBox = c.geometry.boundingBox.clone();
          }
          if (c.isMesh) pickAbleObjects.current.push(c);
        });
        const { max, min } = boundingBox;
        const ground = new BoxGeometry(
          max.x - min.x,
          max.y - min.y,
          max.z - min.z
        );
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh(ground, material);
        cube.position.set(
          (min.x + max.x) / 2,
          (max.y + min.y) / 2,
          (min.z + max.z) / 2
        );
        geometries.push(ground);
        playerVelocity.current.set(0, 0, 0);
        player.position.set(0, 1, 0);

        // create the merged geometry
        const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
          geometries,
          false
        );
        mergedGeometry.boundsTree = new MeshBVH(mergedGeometry);
        const newCollider = new Mesh(mergedGeometry);
        const colliderMaterial: any = newCollider.material;
        colliderMaterial.opacity = 0;
        colliderMaterial.transparent = true;
        collider.current = newCollider;
        scene.current.add(collider.current);
        setSliderMinMax(max.y - min.y);
      }

      scene.current.add(obj);
      currentObject.current = obj;
      setLoadingModel(false);
    },
    []
  );

  const removeAllMeasurementLabel = useCallback(() => {
    for (let labelIndex in measurementLabels.current) {
      scene.current.remove(measurementLabels.current[labelIndex]);
    }
    measurementLabels.current = {};
  }, []);

  const renderModel = useCallback(async (fileUrl: string, isShow = false) => {
    removeAllMeasurementLabel();
    setLoadingModel(true);
    if (isShow) {
      const object3DRemoves = [currentObject.current, collider.current];
      object3DRemoves.forEach((object3d) => {
        if (object3d) scene.current.remove(object3d);
      });
    }
    if (fileMap.current.has(fileUrl)) {
      loadColliderEnvironment(fileMap.current.get(fileUrl).clone());
      return;
    }
    try {
      requestResourceController.current = new AbortController();
      const response: any = await fetch(fileUrl, {
        signal: requestResourceController.current.signal,
        method: "GET",
      });

      const isLoadSuccess = response.status === 200 || response.status === 0;
      if (isLoadSuccess) {
        const zip = await JSZip.loadAsync(response.blob());
        let mtlFilePath = "";
        let objFile!: JSZip.JSZipObject;
        let glTFFile!: JSZip.JSZipObject;
        let mtlFile!: JSZip.JSZipObject;
        let textureFile!: JSZip.JSZipObject;
        let plyFile!: JSZip.JSZipObject;
        zip.forEach(function (relativePath, file) {
          if (relativePath.endsWith(".obj")) objFile = file;
          if (relativePath.endsWith(".mtl")) {
            mtlFilePath = relativePath;
            mtlFile = file;
          }
          if (relativePath.endsWith(".jpg")) textureFile = file;
          if (relativePath.endsWith(".ply")) plyFile = file;
          if (relativePath.endsWith(".gltf")) glTFFile = file;
        });
        let mesh!: Points | Group;

        const loadObj = async () => {
          const blob = await textureFile.async("blob");
          const manager = new LoadingManager();
          manager.addHandler(/\.dds$/i, new DDSLoader());
          manager.setURLModifier((url) => {
            //@ts-ignore
            const newUrl = URL.createObjectURL(blob);
            return newUrl;
          });
          const mtlLoader = new MTLLoader(manager);
          const mtlContent = await mtlFile.async("string");
          const materials = mtlLoader.parse(mtlContent, mtlFilePath);
          const objContent = await objFile.async("blob");
          mesh = await new OBJLoader()
            .setMaterials(materials)
            .loadAsync(URL.createObjectURL(objContent));
        };

        const loadGltF = async () => {
          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath("/libs/draco/");
          const loader = new GLTFLoader();
          loader.setDRACOLoader(dracoLoader);
          const objContent = await glTFFile.async("blob");
          const glTF = await loader.loadAsync(URL.createObjectURL(objContent));
          mesh = glTF.scene;
        };

        const loadPly = async () => {
          const loader = new PLYLoader();
          const blob = await plyFile.async("blob");
          const geometry = await loader.loadAsync(URL.createObjectURL(blob));
          geometry.computeVertexNormals();
          geometry.center();
          const material = new PointsMaterial({
            size: 0.03,
            vertexColors: true,
          });
          mesh = new Points(geometry, material);
          if (geometry.boundingBox) {
            const { max, min } = geometry.boundingBox;
            mesh.position.set(
              (min.x + max.x) / 2,
              (max.y + min.y) / 2,
              (min.z + max.z) / 2
            );
          }
        };
        if (glTFFile) {
          await loadGltF();
        } else if (plyFile) {
          await loadPly();
        } else {
          await loadObj();
        }
        if (mesh) {
          if (!fileMap.current.has(fileUrl))
            if (isShow) fileMap.current.set(fileUrl, mesh.clone());
          //@ts-ignore
          loadColliderEnvironment(mesh);
        }
        return;
      }
      throw "Không tải được dữ liệu, vui lòng thử lại sau.";
    } catch (e) {
      console.log(e);
      showErrorToast(
        "Có lỗi xảy ra trong khi tải dữ liệu, vui lòng thử lại sau"
      );
      setLoadingModel(false);
    }
  }, []);

  const updatePlayer = useCallback((delta: number) => {
    playerVelocity.current.y += playerIsOnGround.current
      ? 0
      : delta * params.current.gravity;
    player.position.addScaledVector(playerVelocity.current, delta);

    // move the player
    let target: THREE.Vector3 = new Vector3();
    const vector = controls.current?.getDirection();
    vector && vector(target);
    const angle = Math.atan2(-target.x, -target.z);
    if (isTouchDevice) {
      tempVector.current
        .set(joystickPos.current.x, 0, -joystickPos.current.y)
        .applyAxisAngle(upVector.current, angle);
      player.position.addScaledVector(
        tempVector.current,
        params.current.playerSpeed * delta
      );
    } else {
      const updateTempVector = (x: number, y: number, z: number) => {
        tempVector.current.set(x, y, z).applyAxisAngle(upVector.current, angle);
        player.position.addScaledVector(
          tempVector.current,
          params.current.playerSpeed * delta
        );
      };

      if (forwardBtnPressed.current) {
        updateTempVector(0, 0, -1);
      }

      if (backBtnPressed.current) {
        updateTempVector(0, 0, 1);
      }

      if (leftBtnPressed.current) {
        updateTempVector(-1, 0, 0);
      }

      if (rightBtnPressed.current) {
        updateTempVector(1, 0, 0);
      }
    }

    player.updateMatrixWorld();

    // adjust player position based on collisions
    const capsuleInfo = player.capsuleInfo;
    tempBox.current.makeEmpty();
    collider.current &&
      tempMat.current.copy(collider.current.matrixWorld).invert();
    capsuleInfo && tempSegment.current.copy(capsuleInfo.segment);

    // get the position of the capsule in the local space of the collider
    tempSegment.current.start
      .applyMatrix4(player.matrixWorld)
      .applyMatrix4(tempMat.current);
    tempSegment.current.end
      .applyMatrix4(player.matrixWorld)
      .applyMatrix4(tempMat.current);

    // get the axis aligned bounding box of the capsule
    tempBox.current.expandByPoint(tempSegment.current.start);
    tempBox.current.expandByPoint(tempSegment.current.end);

    if (capsuleInfo) {
      tempBox.current.min.addScalar(-capsuleInfo.radius);
      tempBox.current.max.addScalar(capsuleInfo.radius);
    }

    collider.current &&
      (collider.current?.geometry as any).boundsTree.shapecast({
        intersectsBounds: (box: any) => box.intersectsBox(tempBox.current),
        intersectsTriangle: (tri: any) => {
          // check if the triangle is intersecting the capsule and adjust the
          // capsule position if it is.
          const triPoint = tempVector.current;
          const capsulePoint: any = tempVector2.current;

          const distance = tri.closestPointToSegment(
            tempSegment.current,
            triPoint,
            capsulePoint
          );
          if (capsuleInfo && distance < capsuleInfo.radius) {
            const depth = capsuleInfo.radius - distance;
            const direction = capsulePoint.sub(triPoint).normalize();

            tempSegment.current.start.addScaledVector(direction, depth);
            tempSegment.current.end.addScaledVector(direction, depth);
          }
        },
      });

    // get the adjusted position of the capsule collider in world space after checking
    // triangle collisions and moving it. capsuleInfo.segment.start is assumed to be
    // the origin of the player model.
    const newPosition = tempVector.current;
    collider.current &&
      newPosition
        .copy(tempSegment.current.start)
        .applyMatrix4(collider.current.matrixWorld);

    // check how much the collider was moved
    const deltaVector = tempVector2.current;
    deltaVector.subVectors(newPosition, player.position);

    // if the player was primarily adjusted vertically we assume it's on something we should consider ground
    playerIsOnGround.current =
      deltaVector.y > Math.abs(delta * playerVelocity.current.y * 0.25);

    const offset = Math.max(0.0, deltaVector.length() - 1e-5);
    deltaVector.normalize().multiplyScalar(offset);

    // adjust the player model
    player.position.add(deltaVector);

    if (!playerIsOnGround.current) {
      deltaVector.normalize();
      playerVelocity.current.addScaledVector(
        deltaVector,
        -deltaVector.dot(playerVelocity.current)
      );
    } else {
      playerVelocity.current.set(0, 0, 0);
    }

    // if the player has fallen too far below the level reset their position to the start
    if (player.position.y < -25) {
      reset();
    }
  }, []);

  const render = useCallback(() => {
    const delta = Math.min(clock.current.getDelta(), 0.1);
    const currentCamera = camera.current;
    if (
      (leftJoystick.current && isTouchDevice && collider.current) ||
      (collider.current && controls.current?.isLocked)
    ) {
      collider.current.visible = params.current.displayCollider;
      const physicsSteps = params.current.physicsSteps;
      for (let i = 0; i < physicsSteps; i++) {
        updatePlayer(delta / physicsSteps);
      }
    }
    if (currentCamera) {
      renderer.render(scene.current, currentCamera);
      labelRenderer.current.render(scene.current, currentCamera);
    }
    requestAnimationFrame(render);
  }, []);

  const onDocumentMouseMove = useCallback((event: MouseEvent) => {
    event.preventDefault();
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    if (idSetTimeoutDrawLine) return;
    idSetTimeoutDrawLine = setTimeout(() => {
      idSetTimeoutDrawLine = null;
      if (drawingLine.current && camera.current && line.current) {
        raycaster.current.setFromCamera(mouse.current, camera.current);
        intersects.current = raycaster.current.intersectObjects(
          pickAbleObjects.current,
          false
        );
        if (intersects.current.length) {
          const linePosition = line.current.geometry.attributes.position;
          const positions = linePosition.array as Array<number>;
          const v0 = new Vector3(positions[0], positions[1], positions[2]);
          const point = intersects.current[0].point;
          const v1 = new Vector3(point.x, point.y, point.z);
          positions[3] = point.x;
          positions[4] = point.y;
          positions[5] = point.z;
          linePosition.needsUpdate = true;
          const distance = v0.distanceTo(v1);
          const lineLabel = measurementLabels.current[lineId.current];
          lineLabel.element.innerText = distance.toFixed(2) + "m";
          lineLabel.position.lerpVectors(v0, v1, 0.5);
        }
      }
    }, TIME_SCREEN_REFRESH);
  }, []);

  const handleMouseWheel = useCallback((event: WheelEvent) => {
    if (isViewingRef.current && controls.current) {
      let currentPositionY = controls.current.getObject().position.y;
      const sliderInput: any = document.getElementById("slider");
      const minY = Number(sliderInput.min);
      const maxY = Number(sliderInput.max);
      if (event.deltaY > 0) {
        currentPositionY -= 0.1;
      } else {
        currentPositionY += 0.1;
      }
      if (currentPositionY < minY) currentPositionY = minY;
      if (currentPositionY > maxY) currentPositionY = maxY;
      controls.current.getObject().position.y = currentPositionY;
      if (sliderInput) sliderInput.value = String(currentPositionY);
    }
  }, []);

  const onClick = useCallback(() => {
    if (isDrawingMeasureLine.current && !window.isChangeSceneView) {
      camera.current &&
        raycaster.current.setFromCamera(mouse.current, camera.current);
      intersects.current = raycaster.current.intersectObjects(
        pickAbleObjects.current,
        false
      );
      if (intersects.current.length) {
        const firstIntersect = intersects.current[0];
        if (drawingLine.current) {
          //finish the line
          const linePosition = line.current?.geometry.attributes.position;
          if (linePosition) {
            const positions = linePosition.array as Array<number>;
            positions[3] = firstIntersect.point.x;
            positions[4] = firstIntersect.point.y;
            positions[5] = firstIntersect.point.z;
            linePosition.needsUpdate = true;
            lineId.current = lineId.current + 1;
            drawingLine.current = false;
          }
        } else {
          //start the line
          const points = [];
          points.push(firstIntersect.point);
          points.push(firstIntersect.point.clone());
          const geometry = new BufferGeometry().setFromPoints(points);
          line.current = new LineSegments(
            geometry,
            new LineBasicMaterial({
              color: COLOR_WHITE,
              transparent: true,
              opacity: 0.75,
              depthTest: false,
              // depthWrite: false
              linewidth: 3,
            })
          );
          line.current.frustumCulled = false;
          scene.current.add(line.current);
          lines.current.push(line.current);
          const measurementDiv = document.createElement(
            "div"
          ) as HTMLDivElement;
          measurementDiv.className = measurementLabelCssClassName;
          measurementDiv.innerText = "0.0m";
          const measurementLabel = new CSS2DObject(measurementDiv);
          measurementLabel.position.copy(firstIntersect.point);
          measurementLabels.current[lineId.current] = measurementLabel;
          scene.current.add(measurementLabel);
          drawingLine.current = true;
        }
      }
    }
  }, []);

  const controlKeyPressToMove = useCallback(
    (e: KeyboardEvent, isMoving: boolean) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          forwardBtnPressed.current = isMoving;
          break;
        case "KeyS":
        case "ArrowDown":
          backBtnPressed.current = isMoving;
          break;
        case "KeyD":
        case "ArrowRight":
          rightBtnPressed.current = isMoving;
          break;
        case "KeyA":
        case "ArrowLeft":
          leftBtnPressed.current = isMoving;
          break;
        case "Space":
          if (playerIsOnGround.current && isMoving) {
            playerVelocity.current.y = 10.0;
          }
          break;
      }
    },
    []
  );

  const handleKeydownToMove = useCallback((e: KeyboardEvent) => {
    controlKeyPressToMove(e, true);
  }, []);

  const handleKeyupStopMove = useCallback((e: KeyboardEvent) => {
    controlKeyPressToMove(e, false);
  }, []);

  const handleWindowResize = useCallback(() => {
    if (camera.current && containerElementRef.current) {
      const containerInnerWidth = containerElementRef.current.offsetWidth;
      const containerInnerHeight = containerElementRef.current.offsetHeight;
      camera.current.aspect = containerInnerWidth / containerInnerHeight;
      camera.current.updateProjectionMatrix();

      renderer.setSize(containerInnerWidth, containerInnerHeight);
      labelRenderer.current.setSize(containerInnerWidth, containerInnerHeight);
    }
  }, []);

  const startViewTour = useCallback(() => {
    controls.current?.lock();
  }, []);

  const init = useCallback(() => {
    if (containerElementRef.current) {
      const containerInnerWidth = containerElementRef.current.offsetWidth;
      const containerInnerHeight = containerElementRef.current.offsetHeight;

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(containerInnerWidth, containerInnerHeight);

      const light = new AmbientLight(COLOR_WHITE, 1);
      scene.current.add(light);
      camera.current = new PerspectiveCamera(
        75,
        containerInnerWidth / containerInnerHeight,
        0.01,
        100
      );
      camera.current.updateProjectionMatrix();

      controls.current = new PointerLockControls(
        camera.current,
        renderer.domElement
      );

      const blocker = blockerElementRef.current;
      if (blocker) {
        if (isTouchDevice) {
          blocker.style.display = "none";
        } else {
          controls.current.addEventListener("lock", function () {
            blocker.style.display = "none";
            setViewing(true);
          });

          controls.current.addEventListener("unlock", function () {
            blocker.style.display = "block";
            setViewing(false);
          });
        }
      }
      const MIN_HEIGHT = -1;
      const MAX_HEIGHT = 2;
      var slider = document.getElementById("slider");
      slider?.addEventListener("input", adjustPlayerHeight);
      //@ts-ignore
      slider.max = MAX_HEIGHT;
      //@ts-ignore
      slider.min = MIN_HEIGHT;
      //@ts-ignore
      slider.value = playerHeight;

      if (isTouchDevice) {
        leftJoystick.current = create({
          //@ts-ignore
          zone: document.getElementById("left_joystick"),
          mode: "static",
          position: { left: "50%", top: "50%" },
          color: "white",
          size: 120,
        });
        leftJoystick.current.on("move", function (evt: any, data: any) {
          joystickPos.current = data.vector;
        });
        leftJoystick.current.on("end", function () {
          joystickPos.current = { x: 0, y: 0 };
        });
      }
      const newLabelRenderer = new CSS2DRenderer();
      newLabelRenderer.setSize(containerInnerWidth, containerInnerHeight);
      newLabelRenderer.domElement.style.position = "absolute";
      newLabelRenderer.domElement.style.top = "0px";
      newLabelRenderer.domElement.style.pointerEvents = "none";
      document.body.appendChild(newLabelRenderer.domElement);
      labelRenderer.current = newLabelRenderer;
      controls.current.getObject().position.set(0, playerHeight.current, 0);
      player.add(controls.current.getObject());
      window.addEventListener("resize", handleWindowResize, false);
      window.addEventListener("keydown", handleKeydownToMove);
      window.addEventListener("keyup", handleKeyupStopMove);
    }
  }, []);

  const startRender = useCallback(
    (containerElement: HTMLDivElement, blockerElement: HTMLDivElement) => {
      containerElementRef.current = containerElement;
      blockerElementRef.current = blockerElement;
      containerElement.appendChild(renderer.domElement);
      renderer.domElement.addEventListener("pointerdown", onClick, false);
      containerElementRef.current.addEventListener("wheel", handleMouseWheel);
      init();
      render();
      setRenderReady(true);
    },
    []
  );

  const toggleUseMeasureTools = useCallback(() => {
    setUsingMeasureTool(!isUsingMeasureTool);
    isDrawingMeasureLine.current = !isUsingMeasureTool;
    const isStopUsingMeasureTool = isDrawingMeasureLine.current === false;
    const deleteLastLineNotCompleted =
      drawingLine.current && isStopUsingMeasureTool;
    if (deleteLastLineNotCompleted) {
      //delete the last line because it wasn't committed
      line.current && scene.current.remove(line.current);
      lineId.current &&
        //@ts-ignore
        scene.current.remove(measurementLabels.current[lineId.current]);
      drawingLine.current = false;
    }
  }, [isUsingMeasureTool]);

  useEffect(() => {
    isViewingRef.current = isViewing;
  }, [isViewing]);

  useEffect(() => {
    document.addEventListener("mousemove", onDocumentMouseMove);
    const handleKeydown = function (event: any) {
      if (event.code === "Escape") controls.current?.unlock();
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyupStopMove);
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("keydown", handleKeydownToMove);
      containerElementRef.current?.removeEventListener(
        "wheel",
        handleMouseWheel
      );
      scene.current.clear();
      requestResourceController.current?.abort();
      renderer.domElement.remove();
      renderer.dispose();
    };
  }, []);

  return {
    renderer,
    startRender,
    renderModel,
    isRenderReady,
    isLoadingModel,
    reset,
    startViewTour,
    isViewing,
    isTouchDevice,
    isUsingMeasureTool,
    toggleUseMeasureTools,
  };
};
