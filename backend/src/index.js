const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const logRoutes = require('./routes/logs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});