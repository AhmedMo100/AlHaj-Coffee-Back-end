const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log('MongoDB Connected...');
        console.log('Active Database:', mongoose.connection.name);
    } catch (err) {
        console.error('DB connection failed:', err.message);
        process.exit(1); // Stop app if DB fails
    }
};

module.exports = connectDB;
