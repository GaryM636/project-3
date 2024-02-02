const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project-3');

module.exports = mongoose.connection;