import { APIError } from "../api/BaseAPI";

export function apiHasError(response: any): response is APIError {
  return response?.reason;
}
