import { AxiosError, AxiosInstance } from 'axios';

export class API {
  constructor(protected fetcher: AxiosInstance) {}

  async get(path: string, params: any) {
    return await this.fetcher.get(path, params);
  }

  async post(path: string, params: any) {
    return await this.fetcher.post(path, params);
  }

  async put(path: string, params: any) {
    return await this.fetcher.put(path, params);
  }

  async delete(path: string, params: any) {
    return await this.fetcher.delete(path, params);
  }

  protected handleError(err: unknown) {
    console.log(err);
    if (err instanceof AxiosError) {
      console.log(err.toJSON());
    }
    return err;
  }
}
