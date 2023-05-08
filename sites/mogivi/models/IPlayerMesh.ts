import { Mesh, Line3 } from "three";
export interface IPlayerMesh extends Mesh {
  capsuleInfo?: {
    radius: number;
    segment: Line3;
  };
}
