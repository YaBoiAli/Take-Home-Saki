import React, { useState } from 'react';
import { Code, Copy, Check, Play, Search, Database } from 'lucide-react';
import axios from 'axios';

const ApiPage: React.FC = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [testResponse, setTestResponse] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);

  const copyToClipboard = async (text: string, endpoint: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEndpoint(endpoint);
      setTimeout(() => setCopiedEndpoint(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const testEndpoint = async (endpoint: string, params?: any) => {
    setTestLoading(true);
    setTestResponse(null);
    
    try {
      const response = await axios.get(`/api${endpoint}`, { params });
      setTestResponse(response.data);
    } catch (error: any) {
      setTestResponse({
        error: error.response?.data?.error || error.message
      });
    } finally {
      setTestLoading(false);
    }
  };

  const endpoints = [
    {
      name: 'Search API',
      method: 'GET',
      path: '/search',
      description: 'Search for engineers or companies with query and filters',
      parameters: [
        { name: 'query', type: 'string', description: 'Search query' },
        { name: 'type', type: 'string', description: 'Type of search (engineers or companies)' },
        { name: 'limit', type: 'number', description: 'Number of results (default: 50)' },
        { name: 'offset', type: 'number', description: 'Pagination offset (default: 0)' }
      ],
      example: '/api/search?query=full-stack&type=engineers&limit=10'
    },
    {
      name: 'Enrichment API',
      method: 'POST',
      path: '/enrich',
      description: 'Add additional data to engineer or company profiles',
      parameters: [
        { name: 'id', type: 'number', description: 'Item ID' },
        { name: 'type', type: 'string', description: 'Type of item (engineer or company)' },
        { name: 'enrichments', type: 'array', description: 'Array of enrichment types' }
      ],
      example: 'POST /api/enrich\nBody: {"id": 1, "type": "engineer", "enrichments": ["github", "email"]}'
    }
  ];

  const codeExample = `import axios from 'axios';

// Search for engineers
const searchEngineers = async () => {
  const response = await axios.get('/api/search', {
    params: {
      query: 'full-stack engineer',
      type: 'engineers',
      limit: 10
    }
  });
  return response.data;
};

// Search for companies
const searchCompanies = async () => {
  const response = await axios.get('/api/search', {
    params: {
      query: 'AI startup',
      type: 'companies',
      limit: 10
    }
  });
  return response.data;
};

// Enrich engineer data
const enrichEngineer = async (engineerId: number) => {
  const response = await axios.post('/api/enrich', {
    id: engineerId,
    type: 'engineer',
    enrichments: ['github', 'email', 'linkedin']
  });
  return response.data;
};

// Enrich company data
const enrichCompany = async (companyId: number) => {
  const response = await axios.post('/api/enrich', {
    id: companyId,
    type: 'company',
    enrichments: ['funding', 'team', 'metrics']
  });
  return response.data;
};`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Websets API Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple and powerful REST APIs for search and data enrichment.
          </p>
        </div>

        {/* Quick Start */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 text-sm">JavaScript Example</span>
              <button
                onClick={() => copyToClipboard(codeExample, 'code')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                {copiedEndpoint === 'code' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">Copy</span>
              </button>
            </div>
            <pre className="text-gray-300 text-sm overflow-x-auto">
              <code>{codeExample}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Search</h3>
              <p className="text-gray-600 text-sm">
                Find engineers and companies with simple search queries
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enrich</h3>
              <p className="text-gray-600 text-sm">
                Add additional data like GitHub info, emails, and company details
              </p>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">API Endpoints</h2>
          
          {endpoints.map((endpoint, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{endpoint.name}</h3>
                  </div>
                  <p className="text-gray-600">{endpoint.description}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(endpoint.example, `endpoint-${index}`)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                  >
                    {copiedEndpoint === `endpoint-${index}` ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-sm">Copy</span>
                  </button>
                  
                  {endpoint.method === 'GET' && (
                    <button
                      onClick={() => testEndpoint(endpoint.path, { query: 'test', type: 'engineers', limit: 5 })}
                      className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                    >
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Test</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <code className="text-sm text-gray-800">{endpoint.path}</code>
              </div>

              {/* Parameters */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Parameters</h4>
                <div className="space-y-2">
                  {endpoint.parameters.map((param, paramIndex) => (
                    <div key={paramIndex} className="flex items-start space-x-4 text-sm">
                      <div className="w-24 flex-shrink-0">
                        <span className="font-medium text-gray-700">{param.name}</span>
                        <span className="text-gray-500 ml-1">({param.type})</span>
                      </div>
                      <p className="text-gray-600">{param.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Example</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    <code>{endpoint.example}</code>
                  </pre>
                </div>
              </div>

              {/* Test Response */}
              {testLoading && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-blue-700">Testing endpoint...</span>
                  </div>
                </div>
              )}

              {testResponse && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Test Response</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>{JSON.stringify(testResponse, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Response Format */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Response Format</h2>
          <p className="text-gray-600 mb-4">
            All API responses are returned in JSON format with the following structure:
          </p>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <pre className="text-gray-300 text-sm overflow-x-auto">
              <code>{`{
  "results": [...],        // Array of search results
  "total": 150,           // Total number of results
  "limit": 10,            // Number of results per page
  "offset": 0             // Current page offset
}`}</code>
            </pre>
          </div>
        </div>

        {/* Enrichment Types */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Enrichment Types</h2>
          <p className="text-gray-600 mb-4">
            Available enrichment types for engineers and companies:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Engineer Enrichments</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="font-medium">github:</span> GitHub repositories and activity</li>
                <li><span className="font-medium">email:</span> Email addresses</li>
                <li><span className="font-medium">linkedin:</span> LinkedIn connections and endorsements</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Company Enrichments</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="font-medium">funding:</span> Funding rounds and investors</li>
                <li><span className="font-medium">team:</span> Founders and team size</li>
                <li><span className="font-medium">metrics:</span> Revenue and user metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
          <p className="text-gray-600 mb-4">
            The API uses standard HTTP status codes and returns error details in JSON format:
          </p>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">400 Bad Request</h4>
              <p className="text-red-700 text-sm">Invalid parameters or missing required fields</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">404 Not Found</h4>
              <p className="text-red-700 text-sm">Resource not found</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">500 Internal Server Error</h4>
              <p className="text-red-700 text-sm">Server error, please try again later</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-6">
            Start building with the Websets API today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Get API Key
            </button>
            <button className="btn-secondary">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiPage; 