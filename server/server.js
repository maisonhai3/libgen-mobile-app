const express = require('express');
const libgen = require('libgen');

const app = express();

app.get('/search', async (req, res) => {
  const options = {
    mirror: 'http://libgen.is',
    query: req.query.q,
    count: 5
  }

  try {
    const data = await libgen.search(options)
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));