import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const fetchUsers = async (email, password) => {
  const response = await axios.get(API_URL, {
    params: { email, password },
  });
  return response.data;
};

export const createUser  = async (userData) => {
  await axios.post(API_URL, userData);
};