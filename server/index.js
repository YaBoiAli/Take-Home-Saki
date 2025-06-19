const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample data for the APIs
const engineers = [
  {
    id: 1,
    name: 'Michael Zhang',
    position: 'Senior Full-Stack Engineer',
    company: 'Anthropic',
    linkedin_url: 'https://www.linkedin.com/in/william-bryk',
    github_url: 'https://github.com/exa-labs/exa-mcp-server',
    graduation_date: 2016,
    seniority: 'Lead, Senior',
    location: 'San Francisco, CA',
    skills: 'React, Node.js, Python, AI/ML'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Frontend Engineer',
    company: 'Scale AI',
    linkedin_url: 'https://linkedin.com/in/wangzjeff/',
    github_url: 'https://github.com/exa-labs/company-researcher',
    graduation_date: 2018,
    seniority: 'Mid-Level',
    location: 'San Francisco, CA',
    skills: 'React, TypeScript, UI/UX Design'
  },
  {
    id: 3,
    name: 'Thomas Park',
    position: 'Full-Stack Engineer',
    company: 'Cohere',
    linkedin_url: 'https://www.linkedin.com/in/william-bryk',
    github_url: 'https://github.com/exa-labs/exa-js',
    graduation_date: 2015,
    seniority: 'Mid-Level',
    location: 'San Francisco, CA',
    skills: 'JavaScript, Python, Machine Learning'
  },
  {
    id: 4,
    name: 'Elena Rodriguez',
    position: 'Product Engineer',
    company: 'Hugging Face',
    linkedin_url: 'https://linkedin.com/in/wangzjeff/',
    github_url: 'https://github.com/exa-labs/openapi-spec',
    graduation_date: 2023,
    seniority: 'Mid-Level, Lead',
    location: 'San Francisco, CA',
    skills: 'Python, AI, Product Design'
  },
  {
    id: 5,
    name: 'Alex Rivera',
    position: 'Senior Software Engineer',
    company: 'Adept AI',
    linkedin_url: 'https://www.linkedin.com/in/william-bryk',
    github_url: 'https://github.com/exa-labs/exa-py',
    graduation_date: 2021,
    seniority: 'Senior, Lead',
    location: 'San Francisco, CA',
    skills: 'Python, AI/ML, System Design'
  }
];

const companies = [
  {
    id: 1,
    name: 'Hadrius',
    description: 'Effortless Financial Compliance',
    url: 'https://www.hadrius.com',
    batch: 'W23',
    status: 'Active',
    industries: 'Fintech, Asset Management'
  },
  {
    id: 2,
    name: 'Fairway Health',
    description: 'AI Co-Pilot for Health Insurers to Authorize Treatment Faster',
    url: 'https://www.fairwayhealth.co/',
    batch: 'W23',
    status: 'Acquired',
    industries: 'Healthcare, Healthcare IT'
  },
  {
    id: 3,
    name: 'Pointwise',
    description: 'App that tells you which credit cards to get and when',
    url: 'http://www.getpointwise.com',
    batch: 'W23',
    status: 'Active',
    industries: 'Consumer'
  },
  {
    id: 4,
    name: 'Shortbread',
    description: 'Read romance comics.',
    url: 'https://www.shortbread.ai/',
    batch: 'W23',
    status: 'Active',
    industries: 'Consumer, Content'
  },
  {
    id: 5,
    name: 'SPRX',
    description: 'AI for corporate R&D tax credits',
    url: 'https://sprx.tax',
    batch: 'W23',
    status: 'Active',
    industries: 'B2B, Finance and Accounting'
  }
];

// API 1: Search API
app.get('/api/search', (req, res) => {
  const { query = '', type = 'engineers', limit = 50, offset = 0 } = req.query;
  
  let results = [];
  const searchTerm = query.toLowerCase();
  
  if (type === 'engineers') {
    results = engineers.filter(engineer => 
      engineer.name.toLowerCase().includes(searchTerm) ||
      engineer.position.toLowerCase().includes(searchTerm) ||
      engineer.company.toLowerCase().includes(searchTerm) ||
      engineer.skills.toLowerCase().includes(searchTerm)
    );
  } else if (type === 'companies') {
    results = companies.filter(company => 
      company.name.toLowerCase().includes(searchTerm) ||
      company.description.toLowerCase().includes(searchTerm) ||
      company.industries.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply pagination
  const paginatedResults = results.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json({
    results: paginatedResults,
    total: results.length,
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
});

// API 2: Enrichment API
app.post('/api/enrich', (req, res) => {
  const { id, type, enrichments = [] } = req.body;
  
  if (!id || !type) {
    return res.status(400).json({ error: 'ID and type are required' });
  }
  
  let item = null;
  
  if (type === 'engineer') {
    item = engineers.find(e => e.id === parseInt(id));
  } else if (type === 'company') {
    item = companies.find(c => c.id === parseInt(id));
  }
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const enrichedData = { ...item, enrichments: {} };
  
  // Add enrichments based on type
  enrichments.forEach(enrichment => {
    if (type === 'engineer') {
      switch (enrichment) {
        case 'github':
          enrichedData.enrichments.github = {
            url: item.github_url,
            repositories: [`${item.name.toLowerCase().replace(/\s+/g, '')}-api`, 'awesome-project'],
            contributions: Math.floor(Math.random() * 1000) + 100,
            followers: Math.floor(Math.random() * 500) + 10
          };
          break;
        case 'email':
          enrichedData.enrichments.email = {
            primary: `${item.name.toLowerCase().replace(/\s+/g, '.')}@${item.company.toLowerCase().replace(/\s+/g, '')}.com`,
            verified: Math.random() > 0.3
          };
          break;
        case 'linkedin':
          enrichedData.enrichments.linkedin = {
            url: item.linkedin_url,
            connections: Math.floor(Math.random() * 500) + 50,
            endorsements: Math.floor(Math.random() * 100) + 5
          };
          break;
      }
    } else if (type === 'company') {
      switch (enrichment) {
        case 'funding':
          enrichedData.enrichments.funding = {
            total_raised: ['$500K', '$1M', '$5M'][Math.floor(Math.random() * 3)],
            rounds: ['Seed', 'Series A'],
            investors: ['Y Combinator', 'Sequoia']
          };
          break;
        case 'team':
          enrichedData.enrichments.team = {
            founders: ['Alex Smith', 'Sarah Johnson'],
            team_size: Math.floor(Math.random() * 50) + 5,
            locations: ['San Francisco, CA']
          };
          break;
        case 'metrics':
          enrichedData.enrichments.metrics = {
            revenue: ['$100K', '$500K', '$1M'][Math.floor(Math.random() * 3)],
            users: ['1K', '10K', '100K'][Math.floor(Math.random() * 3)],
            growth_rate: Math.floor(Math.random() * 200) + 20
          };
          break;
      }
    }
  });
  
  res.json(enrichedData);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Websets API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
}); 