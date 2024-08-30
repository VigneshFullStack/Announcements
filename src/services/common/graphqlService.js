import axiosInstance from "../../api/axiosInstance.js";

// Generic function to perform a GraphQL request
const fetchGraphQLData = async (query, variables = {}) => {
  try {
    const response = await axiosInstance.post('', { query, variables });
    if (response?.data?.data) {
      return response.data.data;
    } else {
      console.error("No data found in response");
      return {};
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export default fetchGraphQLData;
