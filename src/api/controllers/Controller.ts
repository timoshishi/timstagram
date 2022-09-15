interface SuccessResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export class Controller {
  constructor() {}

  formatSuccessResponse = <T>({ data, message = 'success', status = 200 }: SuccessResponse<T>): SuccessResponse<T> => {
    return {
      status,
      message,
      data,
    };
  };
}
