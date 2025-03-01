require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connString = process.env.NODE_ENV === 'test'
            ? process.env.MONGO_URI_TEST
            : process.env.MONGO_URI;

        await mongoose.connect(connString);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;