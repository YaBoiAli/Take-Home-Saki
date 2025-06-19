# Websets Clone

A simple clone with **2 REST APIs** and a React frontend.

## Quick Start

Please use insomnia or postman to test the API's else you could do this which is not very clean. 

```bash
npm run install-all
npm run dev
```

This starts:
- Backend on port 5000 (2 APIs)
- Frontend on port 3000 (React app)

## The 2 APIs

### 1. Search API
```bash
GET /api/search?query=full-stack&type=engineers&limit=10
```

**Parameters:**
- `query` - Search term
- `type` - "engineers" or "companies"  
- `limit` - Number of results (default: 50)
- `offset` - Page offset (default: 0)

**Example:**
```bash
curl "http://localhost:5000/api/search?query=full-stack&type=engineers&limit=5"
```

**Response:**
```json
{
  "results": [
    {
      "id": 1,
      "name": "Michael Zhang",
      "position": "Senior Full-Stack Engineer",
      "company": "Anthropic"
    }
  ],
  "total": 5
}
```

### 2. Enrichment API
```bash
POST /api/enrich
```

**Body:**
```json
{
  "id": 1,
  "type": "engineer",
  "enrichments": ["github", "email", "linkedin"]
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/enrich \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "type": "engineer", "enrichments": ["github", "email"]}'
```

**Response:**
```json
{
  "id": 1,
  "name": "Michael Zhang",
  "position": "Senior Full-Stack Engineer",
  "enrichments": {
    "github": {
      "url": "https://github.com/exa-labs/exa-mcp-server",
      "repositories": ["michael-zhang-api"],
      "contributions": 450
    },
    "email": {
      "primary": "michael.zhang@anthropic.com",
      "verified": true
    }
  }
}
```

## Enrichment Types

**Engineers:** `github`, `email`, `linkedin`
**Companies:** `funding`, `team`, `metrics`

## Frontend

Visit http://localhost:3000 to see:
- Home page
- Search page (uses the Search API)
- API docs page (test the APIs)


