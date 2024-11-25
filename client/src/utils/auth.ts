import { jwtDecode } from 'jwt-decode';

// Define the structure of our JWT token payload
interface DecodedToken {
  username: string;
  exp: number;
}

class AuthService {
  /**
   * Decodes and returns user profile from JWT token
   * @returns Decoded token
   */
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<DecodedToken>(token) : null;
  }

  // Check if user is logged in
  loggedIn() {
    const token = this.getToken();
    // Check if there is a token and it's not expired
    return token && !this.isTokenExpired(token) ? true : false;
  }
  
  // Check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      // Check if expiration time is past current time
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  }

  // Get token from localStorage
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Login user and handle token storage
  login(idToken: string) {
    // Save token to localStorage
    localStorage.setItem('token', idToken);
    // Redirect to main page
    window.location.assign('/');
  }

  // Logout user and clean up
  logout() {
    // Remove auth items from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.assign('/login');
  }
}

export default new AuthService();
