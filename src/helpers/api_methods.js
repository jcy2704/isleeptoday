import axios from 'axios';

const getLoginStatus = () => {
  axios.get('http://localhost:3001/logged_in', { withCredentials: true });
};

export default getLoginStatus;
