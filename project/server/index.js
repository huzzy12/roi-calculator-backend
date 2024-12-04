import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Lead Schema
const leadSchema = new mongoose.Schema({
  email: String,
  customerServiceHours: Number,
  leadNurturingHours: Number,
  hourlyWage: Number,
  monthlyTimeSaved: Number,
  annualCostSaved: Number,
  productivityGain: Number,
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'ROI Calculator API is running' });
});

app.post('/api/leads', async (req, res) => {
  try {
    const {
      email,
      inputs,
      results
    } = req.body;

    console.log('Received submission:', { email, inputs, results });

    if (!email || !inputs || !results) {
      console.error('Missing required fields:', { email, inputs, results });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Try to find existing lead
    const existingLead = await Lead.findOne({ email });

    let savedLead;
    if (existingLead) {
      console.log('Updating existing lead:', email);
      Object.assign(existingLead, {
        ...inputs,
        monthlyTimeSaved: results.monthlyTimeSaved,
        annualCostSaved: results.annualCostSaved,
        productivityGain: results.productivityGain
      });
      savedLead = await existingLead.save();
    } else {
      console.log('Creating new lead:', email);
      const lead = new Lead({
        email,
        ...inputs,
        monthlyTimeSaved: results.monthlyTimeSaved,
        annualCostSaved: results.annualCostSaved,
        productivityGain: results.productivityGain
      });
      savedLead = await lead.save();
    }

    console.log('Successfully saved lead:', savedLead);
    res.status(200).json({ message: 'Lead saved successfully', lead: savedLead });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ error: error.message || 'Failed to save lead' });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});