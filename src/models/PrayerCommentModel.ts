import { IOwnerModel } from "./OwnerModel";

export interface IPrayerCommentModel {
  id: number;
  message: string;
  createdAt: string;
  createdBy: IOwnerModel;
}
