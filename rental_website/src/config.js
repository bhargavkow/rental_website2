// API URL Configuration
const API_URL = "https://stylehub-backend-nu.vercel.app"
if (!API_URL) {
  console.error('⚠️  REACT_APP_API_URL environment variable is not set!');
  console.error('Please create a .env file with: REACT_APP_API_URL=https://stylehub-backend-nu.vercel.app');
  console.error('Or set it in your deployment environment (Vercel, Netlify, etc.)');
}

export { API_URL };