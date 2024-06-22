// app.js

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Adjust path as needed
import apiVisit from './api/visit.js'; // Adjust path as needed

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/visit', apiVisit); // Mount the visit API route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

export default app; // Export the Express app for local development
