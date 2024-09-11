import { IOwnerModel } from "./OwnerModel";
import { IPrayerCategoryModel } from "./PrayerCategoryModel";
import { IPrayerCommentModel } from "./PrayerCommentModel";
import { IPrayingForModel } from "./PrayingForModel";

export interface IPrayerModel {
  id: number;
  title: string;
  description: string;
  prayerCategory: IPrayerCategoryModel;
  prayingForName: string;
  prayersQuantity: number;
  isPublic: boolean;
  state: string;
  createdDate: string;
  prayerComments: IPrayerCommentModel[];
  prayingFors: IPrayingForModel[];
  createdBy: IOwnerModel;
}
