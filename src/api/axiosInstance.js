import axios from 'axios';

// Create and configure the axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_GRAPHQL_API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Optionally add authorization token here or in specific requests
    // 'Authorization': `Bearer ${yourToken}`
  },
});

export default axiosInstance;
