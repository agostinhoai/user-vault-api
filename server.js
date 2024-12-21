const express = require('express');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
connectDB();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(chalk.blue(`------- Server running on port ${port} -------`));
    });
}

module.exports = app;
