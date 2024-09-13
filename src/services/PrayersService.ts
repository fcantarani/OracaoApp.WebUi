import { IPrayerModel } from "@/models/PrayerModel";
import { BaseService } from "./BaseService";
import config from "@/config";

export class PrayersService extends BaseService {
  private baseUrl = `${config.baseApi}/v1/Prayer`;

  public getAll() {
    const url = `${this.baseUrl}`;

    return this.get<IPrayerModel[]>(url);
  }

  public getAllByUserId(userId: string) {
    const url = `${this.baseUrl}/User/${userId}`;

    return this.get<IPrayerModel[]>(url);
  }

  public getAllByCategoryId(id: number) {
    const url = `${this.baseUrl}/Category/${id}`;

    return this.get<IPrayerModel[]>(url);
  }

  public deleteById(id: number) {
    const url = `${this.baseUrl}/Delete/${id}`;

    return this.delete<IPrayerModel[]>(url);
  }
}
