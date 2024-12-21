const mongoose = require('mongoose');
const chalk = require('chalk'); 

const connectDB = async () => {
    try {
        // console.log("Attempting to connect to MongoDB...");
        // console.log("Connection string:", process.env.MONGODB_URI);
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(chalk.blue('------- MongoDB connected -------'));
    } catch (err) {
        console.log(chalk.red("MongoDB Connection Error:", err));
        console.log(chalk.red("Error details:", {
            name: err.name,
            message: err.message,
            code: err.code
        }));
        process.exit(1);
    }
};

module.exports = connectDB;