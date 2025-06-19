import React from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, Users, Building, ArrowRight, Star, MapPin, Calendar } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find exactly what you're looking for
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Search for people, companies, research papers, and more with unprecedented accuracy and comprehensiveness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search" className="btn-primary text-lg px-8 py-3">
                Start Searching
              </Link>
              <Link to="/api" className="btn-secondary text-lg px-8 py-3">
                View API
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why choose Websets?
            </h2>
            <p className="text-lg text-gray-600">
              Three key features that make our search engine unique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accuracy</h3>
              <p className="text-gray-600">
                Get precise results that match your exact requirements with advanced filtering and verification.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensiveness</h3>
              <p className="text-gray-600">
                Access a vast database of professionals, companies, and research across multiple domains.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verification</h3>
              <p className="text-gray-600">
                All data is verified and up-to-date, ensuring you get reliable information every time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See it in action
            </h2>
            <p className="text-lg text-gray-600">
              Explore our sample data to see the power of Websets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Engineers Demo */}
            <div className="card">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-primary-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Engineers</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Michael Zhang</h4>
                    <p className="text-sm text-gray-600">Senior Full-Stack Engineer at Anthropic</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Frontend Engineer at Scale AI</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>2018</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Companies Demo */}
            <div className="card">
              <div className="flex items-center mb-4">
                <Building className="w-6 h-6 text-primary-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">YC Companies</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Hadrius</h4>
                    <p className="text-sm text-gray-600">Effortless Financial Compliance</p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">W23</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Fairway Health</h4>
                    <p className="text-sm text-gray-600">AI Co-Pilot for Health Insurers</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Acquired</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start searching for exactly what you need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/search" 
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center"
            >
              Start Searching
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              to="/api" 
              className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors"
            >
              View API Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 