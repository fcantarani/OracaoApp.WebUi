import { IPrayerCategoryModel } from "@/models/PrayerCategoryModel";
import { BaseService } from "./BaseService";
import config from "@/config";

export class CategoryService extends BaseService {
  private baseUrl = `${config.baseApi}/v1/PrayerCategory`;

  public getAll() {
    const url = `${this.baseUrl}`;

    return this.get<IPrayerCategoryModel[]>(url);
  }
}
