export interface ServiceResponseErrorModel {
  traceId: string;
  message: string;
  validationErrors?: { [key: string]: string };
}
