export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

export class UnprocessableEntityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnprocessableEntityError";
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

export class UnknownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnknownError";
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiClientError";
  }
}

export class ApiServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiServerError";
  }
}

export interface AxiosError {
  response?: {
    status: number;
    data: any;
  };
  message: string;
}

export const handleServiceError = (error: AxiosError | any): void => {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        throw new BadRequestError(data);
      case 401:
        throw new UnauthorizedError(data);
      case 403:
        throw new ForbiddenError(data);
      case 404:
        throw new NotFoundError(data);
      case 409:
        throw new ConflictError(data);
      case 422:
        throw new UnprocessableEntityError(data);
      case 500:
        throw new InternalServerError(data);
      default:
        throw new UnknownError(data);
    }
  } else {
    throw new UnknownError(error.message);
  }
};
