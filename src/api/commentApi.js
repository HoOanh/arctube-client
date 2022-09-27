import axiosClient from './axiosClient';

const commentApi = {
  getComment: (videoId) => axiosClient.get(`/comments/${videoId}`),
  addComment: (params) => axiosClient.post(`/comments`, params),
};

export default commentApi;
