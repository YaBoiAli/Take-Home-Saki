import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Building, FileText, ExternalLink, Github, MapPin, Calendar, Star } from 'lucide-react';
import axios from 'axios';

interface SearchResult {
  id: number;
  name: string;
  position?: string;
  company?: string;
  linkedin_url?: string;
  github_url?: string;
  graduation_date?: number;
  seniority?: string;
  location?: string;
  skills?: string;
  description?: string;
  url?: string;
  batch?: string;
  status?: string;
  industries?: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  limit: number;
  offset: number;
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'engineers' | 'companies'>('engineers');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchTypes = [
    { id: 'engineers', name: 'People', icon: Users },
    { id: 'companies', name: 'Companies', icon: Building },
    { id: 'papers', name: 'Research Papers', icon: FileText }
  ];

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        query: searchQuery,
        type: searchType,
        limit: '10',
        offset: ((currentPage - 1) * 10).toString()
      });

      const response = await axios.get<SearchResponse>(`/api/search?${params}`);
      
      setResults(response.data.results);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    }
  }, [searchQuery, searchType, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    performSearch();
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find exactly what you're looking for
          </h1>
          <p className="text-lg text-gray-600">
            Search for people, companies, research papers, and more
          </p>
        </div>

        {/* Search Form */}
        <div className="card mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Search Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {searchTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSearchType(type.id as 'engineers' | 'companies')}
                      className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-colors ${
                        searchType === type.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Query
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    searchType === 'engineers' 
                      ? "e.g., Full-stack engineers in SF that are great at design"
                      : searchType === 'companies'
                      ? "e.g., AI startups funded by YC"
                      : "e.g., machine learning research papers"
                  }
                  className="input-field pl-10"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Found {total} results
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Filter className="w-4 h-4" />
                <span>Filtered results</span>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {searchType === 'engineers' ? (
                        <Users className="w-6 h-6 text-primary-600" />
                      ) : (
                        <Building className="w-6 h-6 text-primary-600" />
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {result.name}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {searchType === 'engineers' ? result.position : result.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            {searchType === 'engineers' ? (
                              <>
                                {result.company && (
                                  <div className="flex items-center space-x-1">
                                    <Building className="w-4 h-4" />
                                    <span>{result.company}</span>
                                  </div>
                                )}
                                {result.location && (
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{result.location}</span>
                                  </div>
                                )}
                                {result.graduation_date && (
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{result.graduation_date}</span>
                                  </div>
                                )}
                                {result.seniority && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4" />
                                    <span>{result.seniority}</span>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                {result.batch && (
                                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                                    {result.batch}
                                  </span>
                                )}
                                {result.status && (
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    result.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {result.status}
                                  </span>
                                )}
                                {result.industries && (
                                  <span className="text-gray-600">{result.industries}</span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {searchType === 'engineers' && result.linkedin_url && (
                            <a
                              href={result.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          {searchType === 'engineers' && result.github_url && (
                            <a
                              href={result.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-700"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {searchType === 'companies' && result.url && (
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <span className="px-3 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : searchQuery && !loading ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try adjusting your search query to find what you're looking for.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage; 