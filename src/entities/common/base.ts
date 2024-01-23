import { StatusType } from './constants';

export interface Base {
  _id?: string;
  uuid: string;
  status: StatusType;
  createdAt: Date;
  updatedAt: Date;
}