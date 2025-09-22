# Rental Website

A full-stack rental website application with React frontend and Node.js backend.

## Project Structure

```
rental_website2/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
├── package.json       # Root package.json for deployment
└── README.md         # This file
```

## Deployment on Render

### Backend Deployment

1. **Service Type**: Web Service
2. **Build Command**: `npm run build`
3. **Start Command**: `npm start`
4. **Node Version**: 18 or higher

### Environment Variables

Set these environment variables in your Render dashboard:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure JWT secret key
- `RAZORPAY_KEY_ID`: Your Razorpay key ID
- `RAZORPAY_KEY_SECRET`: Your Razorpay key secret
- `PORT`: Port number (Render will set this automatically)
- `NODE_ENV`: Set to `production`
- `CORS_ORIGIN`: Your frontend URL

### Frontend Deployment

For the frontend, deploy as a Static Site:

1. **Build Command**: `cd frontend && npm install && npm run build`
2. **Publish Directory**: `frontend/build`

## Local Development

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

## Features

- User authentication and authorization
- Product management
- Shopping cart functionality
- Payment integration with Razorpay
- Admin dashboard
- Image upload and management
- Responsive design