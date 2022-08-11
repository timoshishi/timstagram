import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export function fetcher(url: string) {
  return axios.get(url).then(({ data }) => data);
}
export default axios;
