import { IBaseEntity } from "../interfaces/IBaseEntity";

export interface IClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface IClass extends IBaseEntity {
  name: string;
  localId: string;
  teacherId: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface IClassResponse extends IClass {
  localName: string;
  teacherName: string;
}