# Rental Website

A full-stack rental website application with React frontend and Node.js backend.

## Project Structure

```
rental_website2/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
├── package.json       # Root package.json for deployment
├── render.yaml        # Render deployment configuration
└── README.md         # This file
```

## 🚀 Render Deployment Guide

### Backend Deployment (Web Service)

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `bhargavkow/rental_website2`

2. **Service Configuration**
   - **Name**: `rental-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `18` or higher

3. **Environment Variables**
   Set these in your Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rental_website
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CORS_ORIGIN=https://your-frontend-url.onrender.com
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://rental-backend.onrender.com`

### Frontend Deployment (Static Site)

1. **Create Static Site**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository: `bhargavkow/rental_website2`

2. **Build Configuration**
   - **Name**: `rental-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

3. **Environment Variables**
   ```
   REACT_APP_API_URL=https://rental-backend.onrender.com
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete
   - Note your frontend URL: `https://rental-frontend.onrender.com`

### Update Backend CORS
After frontend deployment, update the backend environment variable:
```
CORS_ORIGIN=https://rental-frontend.onrender.com
FRONTEND_URL=https://rental-frontend.onrender.com
```

## 🛠️ Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📋 Required Services

1. **MongoDB Database**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get connection string for `MONGODB_URI`

2. **Razorpay Payment Gateway**
   - Sign up at [Razorpay](https://razorpay.com)
   - Get API keys for payment integration

## 🔧 Features

- User authentication and authorization
- Product management
- Shopping cart functionality
- Payment integration with Razorpay
- Admin dashboard
- Image upload and management
- Responsive design

## 📝 Notes

- Backend runs on port 5000 locally, 10000 on Render
- Frontend runs on port 3000 locally
- All file uploads are stored in `frontend/public/uploads/`
- Make sure to update CORS_ORIGIN after frontend deployment