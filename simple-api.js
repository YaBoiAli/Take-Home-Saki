const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample data
const engineers = [
  { id: 1, name: 'Michael Zhang', position: 'Senior Engineer', company: 'Anthropic' },
  { id: 2, name: 'Sarah Johnson', position: 'Frontend Engineer', company: 'Scale AI' }
];

const companies = [
  { id: 1, name: 'Hadrius', description: 'Financial Compliance' },
  { id: 2, name: 'Fairway Health', description: 'AI for Health Insurers' }
];

// API 1: Search
app.get('/api/search', (req, res) => {
  const { query = '', type = 'engineers' } = req.query;
  
  let results = type === 'engineers' ? engineers : companies;
  
  if (query) {
    results = results.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  res.json({ results, total: results.length });
});

// API 2: Enrich
app.post('/api/enrich', (req, res) => {
  const { id, type, enrichments = [] } = req.body;
  
  let item = type === 'engineer' 
    ? engineers.find(e => e.id === id)
    : companies.find(c => c.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  const enriched = { ...item, enrichments: enrichments };
  res.json(enriched);
});

app.listen(PORT, () => {
  console.log(`Simple API running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/search?query=test&type=engineers');
  console.log('  POST /api/enrich');
}); 