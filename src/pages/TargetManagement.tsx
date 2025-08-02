import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Target, Globe, Server, Link } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const mockTargets = [
  {
    id: '1',
    name: 'Main Website',
    type: 'domain' as const,
    value: 'example.com',
    category: 'Production',
    criticality: 'high' as const,
    status: 'scanned' as const,
    lastScan: new Date('2024-01-15'),
    tags: ['web', 'public', 'primary']
  },
  {
    id: '2', 
    name: 'API Server',
    type: 'domain' as const,
    value: 'api.example.com',
    category: 'Production',
    criticality: 'critical' as const,
    status: 'pending' as const,
    tags: ['api', 'backend']
  },
  {
    id: '3',
    name: 'Internal Network',
    type: 'cidr' as const,
    value: '192.168.1.0/24',
    category: 'Internal',
    criticality: 'medium' as const,
    status: 'scanned' as const,
    lastScan: new Date('2024-01-14'),
    tags: ['internal', 'network']
  },
  {
    id: '4',
    name: 'Dev Environment',
    type: 'url' as const,
    value: 'https://dev.example.com',
    category: 'Development',
    criticality: 'low' as const,
    status: 'excluded' as const,
    tags: ['dev', 'staging']
  }
];

export function TargetManagement() {
  const [targets, setTargets] = useState(mockTargets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['All', 'Production', 'Development', 'Internal', 'Testing'];

  const filteredTargets = targets.filter(target => {
    const matchesSearch = target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         target.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || target.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'domain': return <Globe className="h-4 w-4" />;
      case 'ip': return <Server className="h-4 w-4" />;
      case 'cidr': return <Target className="h-4 w-4" />;
      case 'url': return <Link className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Target Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Organize and control your scan targets</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Target
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search targets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Targets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTargets.map((target) => (
          <Card key={target.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {getTypeIcon(target.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{target.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{target.value}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                  <Badge variant="info">{target.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Criticality</span>
                  <Badge variant={target.criticality}>{target.criticality}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                  <Badge 
                    variant={
                      target.status === 'scanned' ? 'success' : 
                      target.status === 'pending' ? 'warning' : 'error'
                    }
                  >
                    {target.status}
                  </Badge>
                </div>
                {target.lastScan && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Last Scan</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {target.lastScan.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {target.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <Button variant="secondary" size="sm" className="flex-1">
                  Scan Now
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTargets.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No targets found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first target'
              }
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Target
            </Button>
          </div>
        </Card>
      )}

      {/* Add Target Modal would go here */}
    </div>
  );
}