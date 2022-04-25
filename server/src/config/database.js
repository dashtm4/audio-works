const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../config/logger');

dotenv.config();

const DATABASE = process.env.DATABASE;

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info('DB Connected');
  })
  .catch((err) => {
    logger.error('DB Connection Failed');
    process.exit(1);
  });

const database = mongoose.connection;

module.exports = database;
