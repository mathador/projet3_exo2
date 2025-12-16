import axios from 'axios';

const API_BASE_URL = 'http://monolithic-app.test';

const apiSanctum = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for sending cookies, e.g., for Sanctum authentication
});

// Optional: Add an interceptor to include the Bearer token if available
apiSanctum.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Or wherever you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiSanctum;