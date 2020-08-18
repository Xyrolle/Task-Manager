import axios from 'axios';
import { axiosConfig } from 'utils/axiosConfig';

export const getUserInfo = async () => {
  try {
    const response = await axios.get(
      `http://46.101.172.171:8008/users/by_token/`,
      axiosConfig
    );
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch (err) {
    console.log('Error', err);
  }
};
