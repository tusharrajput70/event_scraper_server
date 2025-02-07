const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// API route to fetch events
app.get('/events', async (req, res) => {
  const city = req.query.city;
  try {
    const response = await axios.get('https://api.predicthq.com/v1/events/', {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        Accept: 'application/json',
      },
      params: {
        q: city,
      },
    });
    res.status(200).json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));