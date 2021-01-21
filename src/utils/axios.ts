import axios from 'axios';

const { NEXT_PUBLIC_API_URL } = process.env;

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response || 'Alguma coisa deu errado'),
);

export default axiosInstance;
