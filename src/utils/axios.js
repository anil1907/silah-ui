/**
 * axios setup to use mock service
 */
import axios from 'axios';
import { BASE_API_PATH } from 'config';

const axiosServices = axios.create({
    baseURL: BASE_API_PATH
});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
