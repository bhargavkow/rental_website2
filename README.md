# Rental Website

A full-stack rental website with React frontend and Node.js backend.

## Project Structure

```
rental_website2/
├── apis/              # API route handlers
├── config/            # Database and payment configuration
├── models/            # MongoDB models
├── server.js          # Main server file
├── package.json       # Backend dependencies
├── rental_website/    # React frontend
└── backend/           # Original backend (backup)
```

## Local Development

### Backend
```bash
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

### Render.com Deployment (Backend)

**IMPORTANT:** The backend files are now in the root directory for easier deployment.

#### Create Backend Service

1. Go to your Render dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository: `https://github.com/bhargavkow/rental_website2.git`
4. Configure the service:
   - **Name:** `rental-backend`
   - **Environment:** `Node`
   - **Region:** Choose your preferred region
   - **Branch:** `master`
   - **Root Directory:** Leave empty (uses root directory)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`

5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - Add your MongoDB connection string
   - Add your Razorpay credentials

6. Click "Create Web Service"

#### Create Frontend Service

1. Go to your Render dashboard
2. Click "New" → "Static Site"
3. Connect your GitHub repository: `https://github.com/bhargavkow/rental_website2.git`
4. Configure the service:
   - **Name:** `rental-frontend`
   - **Branch:** `master`
   - **Root Directory:** `rental_website`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`

5. Add Environment Variables:
   - `REACT_APP_API_URL`: Your backend service URL (e.g., `https://rental-backend.onrender.com`)

6. Click "Create Static Site"

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
