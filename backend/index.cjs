const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Example route for home page data
app.get('/api/threads', (req, res) => {
  res.json([
    // Return mock threads here, or fetch from DB later
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
