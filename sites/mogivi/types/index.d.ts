export as namespace Types;

declare global {
  interface Window {
    isChangeSceneView?: boolean;
    instgrm?: any;
  }
}

export * from "./state";
