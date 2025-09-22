# Rental Website

A full-stack rental website with React frontend and Node.js backend.

## Project Structure

```
rental_website3/
├── backend/           # Node.js/Express API
│   ├── apis/          # API route handlers
│   ├── config/        # Database and payment configuration
│   ├── models/        # MongoDB models
│   ├── server.js      # Main server file
│   └── package.json   # Backend dependencies
├── frontend/          # React frontend
│   ├── src/           # React source code
│   ├── public/        # Static assets
│   ├── build/         # Production build
│   └── package.json   # Frontend dependencies
└── README.md          # This file
```

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
The backend will run on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:3000`

## Environment Variables

### Backend
Create a `.env` file in the backend directory with:
- MongoDB connection string
- Razorpay credentials (if using payment features)
- JWT secret key

### Frontend
The frontend is configured to use `http://localhost:5000` as the API URL by default.

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
- **Development:** Local development environment
