import { APIError } from "../errors/ApiError";

export class HttpClient<T = unknown, DTO = unknown> {
  baseUrl: string;
  options: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      ...options,
      headers: { ...options?.headers, "Content-Type": "application/json" }
    };
  }

  async get(path: string, options?: RequestInit) {
    let data = null;

    if (options) {
      this.options = {
        ...this.options,
        ...options,
        headers: {
          ...this.options.headers,
          ...options?.headers
        }
      };
    }

    const response = await fetch(`${this.baseUrl}${path}`, this.options);

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    }

    if (response.ok) {
      return data as DTO;
    }

    throw new APIError(response);
  }

  async post(
    path: string,
    body: Record<string, unknown>,
    options?: RequestInit
  ) {
    let data = null;

    if (options) {
      this.options = {
        ...this.options,
        ...options,
        headers: {
          ...this.options.headers,
          ...options?.headers
        }
      };
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...this.options,
      ...(body && { body: JSON.stringify(body) }),
      method: "POST"
    });

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    }

    if (response.ok) {
      return data as DTO;
    }

    throw new APIError(response);
  }

  async delete(
    path: string,
    body: Record<string, unknown>,
    options?: RequestInit
  ) {
    let data = null;

    if (options) {
      this.options = {
        ...this.options,
        ...options,
        headers: {
          ...this.options.headers,
          ...options?.headers
        }
      };
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...this.options,
      ...(body && { body: JSON.stringify(body) }),
      method: "DELETE"
    });

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    }

    if (response.ok) {
      return data as DTO;
    }

    throw new APIError(response);
  }

  async put(path: string, body: T, options?: RequestInit) {
    let data = null;

    if (options) {
      this.options = {
        ...this.options,
        ...options,
        headers: {
          ...this.options.headers,
          ...options?.headers
        }
      };
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...this.options,
      ...(body && { body: JSON.stringify(body) }),
      method: "PUT"
    });

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    }

    if (response.ok) {
      return data as DTO;
    }

    throw new APIError(response);
  }
}
