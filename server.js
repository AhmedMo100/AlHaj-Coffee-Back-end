const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON from incoming requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
    res.send('Al-HaJ Coffee Backend Running...');
});

// Test protected routes
const testRoutes = require('./routes/testProtected');
app.use('/api/test', testRoutes);

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Product types routes
const typeRoutes = require('./routes/productTypes');
app.use('/api/types', typeRoutes);

// Products routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Orders routes
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

// User routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));