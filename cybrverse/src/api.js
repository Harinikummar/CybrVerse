import axios from "axios";

const API_URL = "http://localhost:8080/api/topics";

// Fetch all topics
export const fetchTopics = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
};

// Fetch topic details by name
export const fetchTopicDetailsByName = async (topicName) => {
  try {
    const response = await axios.get(`${API_URL}/name/${topicName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching topic details:", error);
    throw error;
  }
};
