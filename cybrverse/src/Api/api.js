// frontend\src\api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/topics';

export const fetchTopics = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

// Updated fetchTopicDetails to get topic by name
export const fetchTopicDetailsByName = async (topicName) => {
  try {
    const response = await axios.get(`${API_URL}/name/${topicName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching topic details by name:', error);
    throw error;
  }
};

export const addTopic = async (topic) => {
  try {
    const response = await axios.post(API_URL, topic);
    return response.data;
  } catch (error) {
    console.error('Error adding topic:', error);
    throw error;
  }
};

export const updateTopic = async (id, topic) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, topic);
    return response.data;
  } catch (error) {
    console.error('Error updating topic:', error);
    throw error;
  }
};

export const deleteTopic = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw error;
  }
};

