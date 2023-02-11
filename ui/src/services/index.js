import axios from 'axios';

export const getResponse = (url) => {
  console.log('url', url);
  return axios.get(url)
};