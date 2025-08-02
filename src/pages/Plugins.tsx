import React, { useState } from 'react';
import { Puzzle, Download, Upload, Star, Search, Filter, Play, Settings, Trash2 } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const installedPlugins = [
  {
    id: '1',
    name: 'Nuclei Templates',
    version: '9.7.4',
    author: 'ProjectDiscovery',
    description: 'Community-powered vulnerability scanner with 5000+ templates',
    category: 'Scanner',
    status: 'active',
    rating: 4.9,
    downloads: 125000,
    lastUpdated: '2024-01-10',
    size: '45.2 MB'
  },
  {
    id: '2',
    name: 'SQLMap Integration',
    version: '1.7.2',
    author: 'SQLMap Team',
    description: 'Automatic SQL injection detection and exploitation tool',
    category: 'Exploitation',
    status: 'active',
    rating: 4.8,
    downloads: 89000,
    lastUpdated: '2024-01-08',
    size: '12.8 MB'
  },
  {
    id: '3',
    name: 'Custom Wordlists',
    version: '2.1.0',
    author: 'SecLists',
    description: 'Comprehensive wordlists for directory and file discovery',
    category: 'Wordlists',
    status: 'inactive',
    rating: 4.7,
    downloads: 67000,
    lastUpdated: '2024-01-05',
    size: '234.5 MB'
  }
];

const availablePlugins = [
  {
    id: '4',
    name: 'Burp Suite Extensions',
    version: '2.1.0',
    author: 'PortSwigger',
    description: 'Professional web application security testing extensions',
    category: 'Scanner',
    rating: 4.9,
    downloads: 156000,
    price: 'Free',
    size: '78.3 MB'
  },
  {
    id: '5',
    name: 'OWASP ZAP Scripts',
    version: '2.12.0',
    author: 'OWASP',
    description: 'Automated security testing scripts for web applications',
    category: 'Scanner',
    rating: 4.6,
    downloads: 92000,
    price: 'Free',
    size: '23.1 MB'
  },
  {
    id: '6',
    name: 'Metasploit Modules',
    version: '6.3.4',
    author: 'Rapid7',
    description: 'Exploitation framework modules and payloads',
    category: 'Exploitation',
    rating: 4.8,
    downloads: 78000,
    price: 'Premium',
    size: '156.7 MB'
  }
];

export function Plugins() {
  const [activeTab, setActiveTab] = useState('installed');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const tabs = [
    { id: 'installed', name: 'Installed', count: installedPlugins.length },
    { id: 'available', name: 'Available', count: availablePlugins.length },
    { id: 'community', name: 'Community', count: 42 }
  ];

  const categories = ['all', 'Scanner', 'Exploitation', 'Wordlists', 'Reporting'];

  const filteredPlugins = (activeTab === 'installed' ? installedPlugins : availablePlugins).filter(plugin => {
    const matchesCategory = categoryFilter === 'all' || plugin.category === categoryFilter;
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const togglePlugin = (pluginId: string) => {
    // Simulate toggling plugin status
    console.log('Toggle plugin:', pluginId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Plugin Store</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage scanning plugins and extensions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => setShowUpload(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Plugin
          </Button>
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Update All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Installed</p>
              <p className="text-3xl font-bold mt-2">{installedPlugins.length}</p>
            </div>
            <Puzzle className="h-12 w-12 text-blue-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Active</p>
              <p className="text-3xl font-bold mt-2">
                {installedPlugins.filter(p => p.status === 'active').length}
              </p>
            </div>
            <Play className="h-12 w-12 text-green-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Available</p>
              <p className="text-3xl font-bold mt-2">{availablePlugins.length}</p>
            </div>
            <Download className="h-12 w-12 text-purple-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Updates</p>
              <p className="text-3xl font-bold mt-2">2</p>
            </div>
            <Settings className="h-12 w-12 text-orange-200" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.name}
                <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search plugins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Plugin Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPlugins.map((plugin) => (
              <div key={plugin.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{plugin.name}</h3>
                      <Badge variant="info">{plugin.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{plugin.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>v{plugin.version}</span>
                      <span>by {plugin.author}</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span>{plugin.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  {activeTab === 'installed' && (
                    <div className="flex items-center space-x-2">
                      <Badge variant={plugin.status === 'active' ? 'success' : 'warning'}>
                        {plugin.status}
                      </Badge>
                      <button
                        onClick={() => togglePlugin(plugin.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                    <span>{plugin.downloads.toLocaleString()} downloads</span>
                    <span>{plugin.size}</span>
                  </div>
                  
                  {activeTab === 'installed' ? (
                    <div className="flex space-x-2">
                      <Button
                        variant={plugin.status === 'active' ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => togglePlugin(plugin.id)}
                      >
                        {plugin.status === 'active' ? 'Disable' : 'Enable'}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Install
                      </Button>
                      {plugin.price === 'Premium' && (
                        <Badge variant="warning">Premium</Badge>
                      )}
                    </div>
                  )}
                </div>

                {activeTab === 'installed' && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                    Last updated: {plugin.lastUpdated}
                  </div>
                )}
              </div>
            ))}
          </div>

          {activeTab === 'community' && (
            <div className="text-center py-12">
              <Puzzle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Community Plugins</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Browse and contribute to community-developed security plugins
              </p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Submit Plugin
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upload Plugin</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plugin File
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Drop your plugin file here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Supports .zip, .tar.gz, .py, .sh files
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plugin Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="My Custom Plugin"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Brief description of your plugin..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Upload Plugin
              </Button>
              <Button variant="secondary" onClick={() => setShowUpload(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}