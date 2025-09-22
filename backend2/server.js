const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const productRoutes = require('./apis/product');
const addressRoutes = require('./apis/address');
const categoryRoutes = require('./apis/category');
const subcategoryRoutes = require('./apis/subcategory');
const orderRoutes = require('./apis/order');
const paymentRoutes = require('./apis/payment');
const razorpayRoutes = require('./apis/razorpay');
const carouselRoutes = require('./apis/carousel');
const photoCarouselRoutes = require('./apis/photoCarousel');
const homepageCategoryRoutes = require('./apis/homepagecategory');
const faqRoutes = require('./apis/faq');
const userRoutes = require('./apis/user');
const { router: authRoutes } = require('./apis/auth');
const uploadRoutes = require('./apis/upload');
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ CORS configuration to allow React frontend
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests

    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://rental-website2-1eqwe.onrender.com', // deployed frontend
      process.env.CORS_ORIGIN
    ].filter(Boolean);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../rental_website/public/uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/razorpay', razorpayRoutes);
app.use('/api/carousels', carouselRoutes);
app.use('/api/photo-carousel', photoCarouselRoutes);
app.use('/api/homepage-categories', homepageCategoryRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Product API Backend is running 🚀' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found', message: `Cannot ${req.method} ${req.originalUrl}` });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
