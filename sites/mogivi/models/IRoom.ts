import { IMogiverseStatus } from "./IMogiverseStatus";

export interface IRoom {
  mesh_texture_file: string;
  name: string;
  thumbnail: string;
  rooms: IRoom[];
  status: IMogiverseStatus;
  full_name: string;
  phone: string;
  email: string;
  project_name: string;
  draco_file: string;
  db_file: string;
  deeplink: string;
  ply_file: string;
}
