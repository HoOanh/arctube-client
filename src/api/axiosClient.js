import axios from 'axios';
import queryString from 'query-string';

const baseUrl = 'https://oanho-arctube.herokuapp.com/api';
const getToken = () => localStorage.getItem('access_token');

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      'content-Type': 'application/json',
      Authorization: `${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      alert('Err! Network err!');
    }

    throw err;
  }
);

export default axiosClient;
