const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Basic route to test if server is running
app.get('/', (req, res) => {
  res.send('ROI Calculator API is running');
});

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected Successfully');
})
.catch(err => {
  console.error('MongoDB Connection Error:', err.message);
});

// Lead submission endpoint
app.post('/api/leads', async (req, res) => {
  try {
    const { email, inputs, results } = req.body;

    if (!email || !inputs || !results) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Received lead submission:', { email, inputs, results });
    
    const collection = mongoose.connection.collection('leads');
    const lead = {
      email,
      inputs,
      results,
      timestamp: new Date()
    };

    await collection.insertOne(lead);
    console.log('Lead saved successfully:', lead);
    
    res.status(200).json({ message: 'Lead saved successfully' });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});