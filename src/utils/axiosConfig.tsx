export const axiosConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};
