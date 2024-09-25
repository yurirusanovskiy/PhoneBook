require('dotenv').config();
const express = require('express');
const { connectDB, disconnectDB } = require('./configs/db');
const contactRoutes = require('./routes/routes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api', contactRoutes);

// Middleware for handling non-existent routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const gracefulShutdown = () => {
  console.log('Disconnect from database...');
  disconnectDB().then(() => {
    process.exit(0);
  });
};

// Handling application termination signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

