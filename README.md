# Rental Website

A full-stack rental website with React frontend and Node.js backend.

## Project Structure

```
rental_website2/
├── backend/           # Node.js/Express API
├── rental_website/    # React frontend
├── versel-backend/    # Vercel deployment backend
├── render.yaml        # Render deployment configuration
└── .renderignore      # Render ignore file
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

### Render.com Deployment (Recommended)

This project is configured for Render.com deployment using the `render.yaml` file.

**Important:** You need to create TWO separate services on Render:

1. **Backend Service (Web Service):**
   - Connect your GitHub repository: `https://github.com/bhargavkow/rental_website2.git`
   - Service Type: Web Service
   - Environment: Node.js
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check Path: `/api/health`

2. **Frontend Service (Static Site):**
   - Connect your GitHub repository: `https://github.com/bhargavkow/rental_website2.git`
   - Service Type: Static Site
   - Root Directory: `rental_website`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

### Using Render Blueprint

1. Go to your Render dashboard
2. Click "New" → "Blueprint"
3. Connect your GitHub repository: `https://github.com/bhargavkow/rental_website2.git`
4. Render will automatically detect the `render.yaml` file and create both services

## Environment Variables

### Backend Service
- `NODE_ENV`: `production`
- `PORT`: `10000` (or your preferred port)
- MongoDB connection string
- Razorpay credentials

### Frontend Service
- `REACT_APP_API_URL`: Your backend API URL (will be provided by Render)

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
