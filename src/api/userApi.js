import axiosClient from './axiosClient.js';

const userApi = {
  getUser: (userId) => axiosClient.get(`/user/find/${userId}`),
  like: (userId) => axiosClient.put(`/user/like/${userId}`),
  disLike: (userId) => axiosClient.put(`/user/dislike/${userId}`),
  sub: (userId) => axiosClient.put(`/user/sub/${userId}`),
  unSub: (userId) => axiosClient.put(`/user/un-sub/${userId}`),
  search: (query) => axiosClient.get(`/user/search?q=${query}`),
};

export default userApi;
