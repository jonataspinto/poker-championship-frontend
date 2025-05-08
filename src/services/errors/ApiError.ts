export class APIError extends Error {
  response;

  constructor(response: Response) {
    super();
    this.message = `${response.status} - ${response.statusText}`;
    this.name = "APIError";
    this.response = response;
  }
}
