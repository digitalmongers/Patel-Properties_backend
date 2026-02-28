const mongoose = require('mongoose');
const Logger = require('../utils/logger');
const env = require('./env');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGODB_URI, {
            // Enterprise MongoDB Connection Pooling Settings
            maxPoolSize: 50, // Maintain up to 50 socket connections
            minPoolSize: 10, // Keep at least 10 sockets open
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
        });
        Logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        Logger.error(`Error connecting to MongoDB: ${error.message}`, { error });
        process.exit(1);
    }
};

module.exports = connectDB;
