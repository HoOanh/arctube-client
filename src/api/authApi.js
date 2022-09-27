import axiosClient from './axiosClient.js';

const authApi = {
  login: (params) => axiosClient.post('/auth/sign-in', params),
  loginGoogle: (params) => axiosClient.post('/auth/google', params),
};

export default authApi;
