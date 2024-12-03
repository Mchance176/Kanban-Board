import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

/**
 * Handles user login API request
 * @param userInfo - Object containing username and password
 * @returns Response data containing token and user info
 */
const login = async (userInfo: UserLogin) => {
  try {
    // Make POST request to login endpoint
    const response = await axios.post('/auth/login', userInfo);

    // If successful, store auth data
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    // Handle specific API errors
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    // Handle network or other errors
    throw new Error('An error occurred during login');
  }
};

export { login };
