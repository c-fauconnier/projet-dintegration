import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://bangoo-deploy.herokuapp.com/api/verif';

class UserService {
    /*
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }*/

  getUserBoard() {
    return axios.get(API_URL + 'verif', { headers: authHeader() });
  }

  getSellerBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();