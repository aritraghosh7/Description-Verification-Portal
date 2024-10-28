const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const certificateRoutes = require('./routes/certificateRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/Cerficates', certificateRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
