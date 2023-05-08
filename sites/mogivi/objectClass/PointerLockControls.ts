import { Camera, Euler, EventDispatcher, Vector3 } from "three";

const CHANGE_EVENT = { type: "change" };
const LOCK_EVENT = { type: "lock" };
const UNLOCK_EVENT = { type: "unlock" };

const PI_2 = Math.PI / 2;
let isChangeViewDirection = false;
class PointerLockControls extends EventDispatcher {
  domElement: HTMLElement;
  camera: Camera;
  isLocked = false;

  minPolarAngle = 0; // radians
  maxPolarAngle = Math.PI; // radians

  vector = new Vector3();
  euler = new Euler(0, 0, 0, "YXZ");

  previousTouch?: Touch;
  onMouseMoveBind = this.onMouseMove.bind(this);
  onPointerlockChangeBind = this.onPointerlockChange.bind(this);
  onPointerlockErrorBind = this.onPointerlockError.bind(this);
  onTouchMoveBind = this.onTouchMove.bind(this);
  onTouchEndBind = this.onTouchEnd.bind(this);

  constructor(camera: Camera, domElement: HTMLElement) {
    super();

    if (domElement === undefined) {
      console.warn(
        'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.'
      );
      domElement = document.body;
    }

    this.camera = camera;
    this.domElement = domElement;
    isChangeViewDirection = false;
    this.connect();
  }

  onMouseDown(e: MouseEvent) {
    window.isChangeSceneView = true;
    isChangeViewDirection = true;
  }

  onMouseUp(e: MouseEvent) {
    window.isChangeSceneView = false;
    isChangeViewDirection = false;
  }

  onTouchMove(e: TouchEvent) {
    let touch: Touch | undefined;

    switch (e.touches.length) {
      case 1:
        console.log(
          "e.touches[0].target: " +
            e.touches[0].target +
            ", this.domElement: " +
            this.domElement
        );
        if (e.touches[0].target === this.domElement) touch = e.touches[0];
        break;
      case 2:
        if (e.touches[0].target === this.domElement) {
          console.log("2 - e.touches[0].target: " + e.touches[0].target);
          touch = e.touches[0];
        } else if (e.touches[1].target === this.domElement) {
          touch = e.touches[1];
          console.log("2 - e.touches[1].target: " + e.touches[1].target);
        }
        break;
    }

    if (!touch) return;

    console.log(touch.target);

    const movementX = this.previousTouch
      ? touch.pageX - this.previousTouch.pageX
      : 0;
    const movementY = this.previousTouch
      ? touch.pageY - this.previousTouch.pageY
      : 0;

    this.updatePosition(movementX * -1, movementY * -1, 0.004);

    this.previousTouch = touch;
  }

  onTouchEnd() {
    this.previousTouch = undefined;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isLocked === false || !isChangeViewDirection) return;

    const movementX: number =
      // @ts-ignore
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY: number =
      // @ts-ignore
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    this.updatePosition(movementX * -1, movementY * -1, 0.002);
  }

  updatePosition(movementX: number, movementY: number, multiplier: number) {
    this.euler.setFromQuaternion(this.camera.quaternion);

    this.euler.y -= movementX * multiplier;
    this.euler.x -= movementY * multiplier;

    this.euler.x = Math.max(
      PI_2 - this.maxPolarAngle,
      Math.min(PI_2 - this.minPolarAngle, this.euler.x)
    );

    this.camera.quaternion.setFromEuler(this.euler);

    this.dispatchEvent(CHANGE_EVENT);
  }

  onPointerlockChange() {
    if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
      this.dispatchEvent(LOCK_EVENT);

      this.isLocked = true;
    } else {
      this.dispatchEvent(UNLOCK_EVENT);

      this.isLocked = false;
    }
  }

  onPointerlockError() {
    console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
  }

  connect() {
    this.domElement.addEventListener("touchmove", this.onTouchMoveBind, false);
    this.domElement.addEventListener("touchend", this.onTouchEndBind, false);
    this.domElement.ownerDocument.addEventListener(
      "mousemove",
      this.onMouseMoveBind
    );
    this.domElement.ownerDocument.addEventListener(
      "mousedown",
      this.onMouseDown
    );
    this.domElement.ownerDocument.addEventListener("mouseup", this.onMouseUp);
    this.domElement.ownerDocument.addEventListener(
      "pointerlockchange",
      this.onPointerlockChangeBind
    );
    this.domElement.ownerDocument.addEventListener(
      "pointerlockerror",
      this.onPointerlockErrorBind
    );
  }

  disconnect() {
    this.domElement.removeEventListener(
      "touchmove",
      this.onTouchMoveBind,
      false
    );
    this.domElement.removeEventListener("touchend", this.onTouchEndBind, false);
    this.domElement.ownerDocument.removeEventListener(
      "mousemove",
      this.onMouseMoveBind
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerlockchange",
      this.onPointerlockChangeBind
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerlockerror",
      this.onPointerlockErrorBind
    );
    this.domElement.ownerDocument.removeEventListener(
      "mousedown",
      this.onMouseDown
    );
    this.domElement.ownerDocument.removeEventListener(
      "mouseup",
      this.onMouseUp
    );
  }

  dispose() {
    this.disconnect();
  }

  getObject() {
    return this.camera;
  }

  getDirection() {
    const direction = new Vector3(0, 0, -1);

    return (v: Vector3) => {
      return v.copy(direction).applyQuaternion(this.camera.quaternion);
    };
  }

  moveForward(distance: number) {
    this.vector.setFromMatrixColumn(this.camera.matrix, 0);

    this.vector.crossVectors(this.camera.up, this.vector);

    this.camera.position.addScaledVector(this.vector, distance);
  }

  moveRight(distance: number) {
    this.vector.setFromMatrixColumn(this.camera.matrix, 0);

    this.camera.position.addScaledVector(this.vector, distance);
  }

  lock() {
    this.dispatchEvent(LOCK_EVENT);
    this.isLocked = true;
  }

  unlock() {
    this.dispatchEvent(UNLOCK_EVENT);
    this.isLocked = false;
  }
}

export { PointerLockControls };
