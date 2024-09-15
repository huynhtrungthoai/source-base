import axios from 'axios';
import {globalConfigs} from './globalConfig';

export const api = axios.create({
  baseURL: globalConfigs.BASE_URL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(
  async config => {
    // const accessToken = useAuthStore.getState().accessToken;
    // const tokenType = useAuthStore.getState().tokenType;
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  async response => {
    return response?.data;
  },
  async error => {
    // Ensure failed requests throw after interception

    if (error.response) {
      // console.error('response error:', error.response?.data || error.response);
      return Promise.reject(error.response?.data || error.response);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  },
);
