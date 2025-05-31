import { IBaseEntity } from "./IBaseEntity";

export interface IHeadOffice extends IBaseEntity {
  name: string;
  address: string;
  phone?: string;
  addressNumber: string;
  city: string;
  state: string;
  postalCode: string;
  neighborhood: string;
}
