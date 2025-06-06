import { IBaseEntity } from "./IBaseEntity";

export interface ITeacher extends IBaseEntity {
  name: string;
  email: string;
  phone: string;
  cref: string;
}