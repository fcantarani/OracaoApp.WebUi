import { ServiceResponseErrorModel } from "@/models/ServiceResponseErrorModel";
import { ServiceResponseModel } from "@/models/ServiceResponseModel";

export class BaseService {
  constructor(protected accessToken?: string) {}

  private getRequestInit(init?: RequestInit) {
    if (!init) init = {};

    init.headers = { ...init.headers, "Content-Type": "application/json" };

    if (this.accessToken) {
      init.headers = {
        ...init.headers,
        Authorization: `Bearer ${this.accessToken}`,
      };
    }

    return init;
  }

  private async handleResponse<T>(response: Response) {
    const text = await response.text();

    if (response.status >= 200 && response.status <= 299) {
      let json: T | undefined = undefined;
      if (text) json = JSON.parse(text) as T;
      return {
        status: response.status,
        data: json,
      } as ServiceResponseModel<T>;
    } else if (response.status === 403) {
      // Forbidden
      throw new Error("Forbidden");
    } else if (response.status === 401) {
      // Unauthorized
      throw new Error("Unauthorized");
    } else {
      // Unknown errors
      const json = JSON.parse(text) as ServiceResponseErrorModel;
      throw new Error(json.message);
    }
  }

  protected async get<T>(
    url: string,
    init?: RequestInit,
  ): Promise<ServiceResponseModel<T>> {
    init = this.getRequestInit(init);

    const response = await fetch(url, init);
    return this.handleResponse<T>(response);
  }

  protected async post<T>(
    url: string,
    data: unknown,
    init?: RequestInit,
  ): Promise<ServiceResponseModel<T>> {
    init = this.getRequestInit(init);

    init.body = JSON.stringify(data);
    init.method = "POST";

    const response = await fetch(url, init);
    return this.handleResponse<T>(response);
  }

  protected async delete<T>(
    url: string,
    init?: RequestInit,
  ): Promise<ServiceResponseModel<T>> {
    init = this.getRequestInit(init);
    init.method = "DELETE";

    const response = await fetch(url, init);
    return this.handleResponse<T>(response);
  }

  protected makePromise<T>(obj: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(obj);
      }, 2000);
    });
  }
}
