import axiosClient from './axiosClient.js';

const videoApi = {
  addVideo: (params) => axiosClient.post(`/videos`, params),
  getVideo: (videoId) => axiosClient.get(`/videos/${videoId}`),
  getVideoById: (videoId) => axiosClient.get(`/videos/find/${videoId}`),
  getVideoByTags: (tags) => axiosClient.get(`/videos/tags?tags=${tags}`),
  search: (query) => axiosClient.get(`/videos/search?q=${query}`),
  view: (videoId) => axiosClient.put(`/videos/view/${videoId}`),
};

export default videoApi;
