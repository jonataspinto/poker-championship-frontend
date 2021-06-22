import { IAddress } from "./Address";

export interface IPlayer {
  id?: string;
  uuid: string;
  name: string;
  displayName?: string;
  dateBirth?: Date | string;
  email: string;
  photoURL?: string;
  address?: IAddress;
  points: number
}
