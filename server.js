require('dotenv').config(); // Load variables from .env
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.port || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB using connection string from .env
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Basic route to test the API
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Dog Adoption Platform API' });
});

// Start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
