import axios from 'axios';

export const getResponse = async (url) => {
  const response = await axios.get(url);
  return response;
};