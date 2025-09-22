// API URL Configuration
const API_URL = "http://localhost:5000"
if (!API_URL) {
  console.error('⚠️  REACT_APP_API_URL environment variable is not set!');
  console.error('Please create a .env file with: REACT_APP_API_URL=http://localhost:5000');
  console.error('Or set it in your deployment environment');
}

export { API_URL };