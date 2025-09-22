# Rental Website

A full-stack rental website with React frontend and Node.js backend.

## Project Structure

```
rental_website2/
├── backend/           # Node.js/Express API
├── rental_website/    # React frontend
├── versel-backend/    # Vercel deployment backend
└── render.yaml        # Render deployment configuration
```

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd rental_website
npm install
npm start
```

## Deployment

### Render.com Deployment

This project is configured for Render.com deployment using the `render.yaml` file.

**Backend Service:**
- Service Type: Web Service
- Environment: Node.js
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && npm start`
- Health Check: `/api/health`

**Frontend Service:**
- Service Type: Static Site
- Build Command: `cd rental_website && npm install && npm run build`
- Publish Directory: `rental_website/build`

### Manual Render Setup

If you prefer to set up services manually on Render:

1. **Backend Service:**
   - Connect your GitHub repository
   - Set Root Directory to `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables as needed

2. **Frontend Service:**
   - Connect your GitHub repository
   - Set Root Directory to `rental_website`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

## Environment Variables

### Backend
- `NODE_ENV`: production
- `PORT`: 10000 (or your preferred port)
- MongoDB connection string
- Razorpay credentials

### Frontend
- `REACT_APP_API_URL`: Your backend API URL

## API Endpoints

- `/api/products` - Product management
- `/api/categories` - Category management
- `/api/orders` - Order processing
- `/api/payments` - Payment processing
- `/api/auth` - Authentication
- `/api/user` - User management
- `/api/upload` - File uploads

## Technologies Used

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payment:** Razorpay
- **Deployment:** Render.com, Vercel
