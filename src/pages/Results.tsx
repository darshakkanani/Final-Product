import React, { useState } from 'react';
import { FileText, Download, Filter, Search, Eye, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const mockResults = [
  {
    id: '1',
    target: 'example.com',
    scanType: 'Full Scan',
    startTime: '2024-01-15 14:30:00',
    endTime: '2024-01-15 15:45:00',
    status: 'completed',
    findings: {
      critical: 2,
      high: 5,
      medium: 12,
      low: 8,
      info: 15
    },
    categories: {
      ssl: 3,
      dns: 2,
      tech: 8,
      misconfigs: 7,
      exposed: 4,
      headless: 1
    }
  },
  {
    id: '2',
    target: 'api.example.com',
    scanType: 'CVE Scan',
    startTime: '2024-01-15 10:15:00',
    endTime: '2024-01-15 10:45:00',
    status: 'completed',
    findings: {
      critical: 1,
      high: 3,
      medium: 5,
      low: 2,
      info: 4
    },
    categories: {
      ssl: 1,
      dns: 0,
      tech: 4,
      misconfigs: 3,
      exposed: 2,
      headless: 0
    }
  },
  {
    id: '3',
    target: '192.168.1.0/24',
    scanType: 'Network Enum',
    startTime: '2024-01-15 09:00:00',
    endTime: null,
    status: 'running',
    findings: {
      critical: 0,
      high: 1,
      medium: 3,
      low: 5,
      info: 8
    },
    categories: {
      ssl: 0,
      dns: 1,
      tech: 2,
      misconfigs: 4,
      exposed: 1,
      headless: 0
    }
  }
];

const detailedFindings = [
  {
    id: '1',
    title: 'SQL Injection in Login Form',
    severity: 'critical',
    category: 'tech',
    target: 'example.com/login',
    description: 'The login form is vulnerable to SQL injection attacks through the username parameter.',
    impact: 'An attacker could bypass authentication and access sensitive data.',
    solution: 'Use parameterized queries and input validation.',
    cvss: 9.1,
    cwe: 'CWE-89',
    references: ['https://owasp.org/www-community/attacks/SQL_Injection']
  },
  {
    id: '2',
    title: 'Weak SSL/TLS Configuration',
    severity: 'high',
    category: 'ssl',
    target: 'example.com:443',
    description: 'Server supports weak cipher suites and TLS 1.0.',
    impact: 'Communication could be intercepted or downgraded.',
    solution: 'Disable weak ciphers and enforce TLS 1.2+.',
    cvss: 7.4,
    cwe: 'CWE-326',
    references: ['https://wiki.mozilla.org/Security/Server_Side_TLS']
  },
  {
    id: '3',
    title: 'Directory Listing Enabled',
    severity: 'medium',
    category: 'misconfigs',
    target: 'example.com/uploads/',
    description: 'Directory listing is enabled, exposing file structure.',
    impact: 'Sensitive files and directory structure exposed.',
    solution: 'Disable directory listing in web server configuration.',
    cvss: 5.3,
    cwe: 'CWE-200',
    references: []
  }
];

export function Results() {
  const [selectedResult, setSelectedResult] = useState(mockResults[0]);
  const [activeTab, setActiveTab] = useState('ssl');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'ssl', name: 'SSL/TLS', count: selectedResult.categories.ssl },
    { id: 'dns', name: 'DNS', count: selectedResult.categories.dns },
    { id: 'tech', name: 'Technology', count: selectedResult.categories.tech },
    { id: 'misconfigs', name: 'Misconfigs', count: selectedResult.categories.misconfigs },
    { id: 'exposed', name: 'Exposed', count: selectedResult.categories.exposed },
    { id: 'headless', name: 'Headless', count: selectedResult.categories.headless }
  ];

  const filteredFindings = detailedFindings.filter(finding => {
    const matchesSeverity = severityFilter === 'all' || finding.severity === severityFilter;
    const matchesSearch = finding.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         finding.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = finding.category === activeTab;
    return matchesSeverity && matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scan Results</h1>
          <p className="text-gray-600 dark:text-gray-400">View and analyze security scan findings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
          <Button variant="secondary">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Scan History */}
        <Card title="Recent Scans" description="Select a scan to view results">
          <div className="space-y-3">
            {mockResults.map((result) => (
              <div
                key={result.id}
                onClick={() => setSelectedResult(result)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedResult.id === result.id
                    ? 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
                    : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{result.target}</h4>
                  <Badge variant={
                    result.status === 'completed' ? 'success' : 
                    result.status === 'running' ? 'warning' : 'error'
                  }>
                    {result.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{result.scanType}</p>
                <div className="flex items-center space-x-2 text-xs">
                  <span className={`px-2 py-1 rounded ${getSeverityColor('critical')}`}>
                    {result.findings.critical}
                  </span>
                  <span className={`px-2 py-1 rounded ${getSeverityColor('high')}`}>
                    {result.findings.high}
                  </span>
                  <span className={`px-2 py-1 rounded ${getSeverityColor('medium')}`}>
                    {result.findings.medium}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(result.startTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Results Details */}
        <div className="lg:col-span-3">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {selectedResult.target} - {selectedResult.scanType}
                </h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Started: {new Date(selectedResult.startTime).toLocaleString()}</span>
                  {selectedResult.endTime && (
                    <span>Completed: {new Date(selectedResult.endTime).toLocaleString()}</span>
                  )}
                  <Badge variant={
                    selectedResult.status === 'completed' ? 'success' : 
                    selectedResult.status === 'running' ? 'warning' : 'error'
                  }>
                    {selectedResult.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {selectedResult.status === 'running' && (
                  <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                    <Clock className="h-4 w-4 mr-1 animate-spin" />
                    <span className="text-sm">In Progress</span>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              {Object.entries(selectedResult.findings).map(([severity, count]) => (
                <div key={severity} className={`p-3 rounded-lg ${getSeverityColor(severity)}`}>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm capitalize">{severity}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search findings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="info">Info</option>
                </select>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
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

            {/* Findings List */}
            <div className="space-y-4">
              {filteredFindings.length > 0 ? (
                filteredFindings.map((finding) => (
                  <div key={finding.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{finding.title}</h4>
                          <Badge variant={finding.severity}>{finding.severity.toUpperCase()}</Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">CVSS: {finding.cvss}</span>
                          {finding.cwe && (
                            <Badge variant="info">{finding.cwe}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{finding.target}</p>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{finding.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Impact:</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{finding.impact}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Solution:</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{finding.solution}</p>
                          </div>
                        </div>
                        
                        {finding.references.length > 0 && (
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">References:</h5>
                            <div className="space-y-1">
                              {finding.references.map((ref, index) => (
                                <a
                                  key={index}
                                  href={ref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                                >
                                  {ref}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No {activeTab} findings
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm || severityFilter !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : `No ${activeTab} issues were found in this scan`
                    }
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}