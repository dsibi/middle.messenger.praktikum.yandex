export function apiHasError(response: any): response is APIError {
  return response?.reason;
}
