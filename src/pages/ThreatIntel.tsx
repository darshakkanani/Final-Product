import React, { useState } from 'react';
import { Shield, Globe, AlertTriangle, TrendingUp, ExternalLink, Search, Filter } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const threatFeeds = [
  {
    id: '1',
    name: 'MISP Threat Intelligence',
    description: 'Malware Information Sharing Platform',
    status: 'active',
    lastUpdate: '2024-01-15 14:30:00',
    indicators: 15420,
    reliability: 95
  },
  {
    id: '2',
    name: 'AbuseIPDB',
    description: 'IP address reputation database',
    status: 'active',
    lastUpdate: '2024-01-15 14:25:00',
    indicators: 8930,
    reliability: 92
  },
  {
    id: '3',
    name: 'VirusTotal',
    description: 'File and URL analysis service',
    status: 'active',
    lastUpdate: '2024-01-15 14:20:00',
    indicators: 12650,
    reliability: 98
  },
  {
    id: '4',
    name: 'AlienVault OTX',
    description: 'Open Threat Exchange',
    status: 'inactive',
    lastUpdate: '2024-01-14 18:00:00',
    indicators: 0,
    reliability: 0
  }
];

const trendingCVEs = [
  {
    id: 'CVE-2024-0001',
    title: 'Critical RCE in Apache Struts',
    severity: 'critical',
    cvss: 9.8,
    publishedDate: '2024-01-15',
    exploitAvailable: true,
    trending: true,
    affectedProducts: ['Apache Struts 2.x'],
    description: 'Remote code execution vulnerability in Apache Struts framework'
  },
  {
    id: 'CVE-2024-0002',
    title: 'SQL Injection in WordPress Plugin',
    severity: 'high',
    cvss: 8.1,
    publishedDate: '2024-01-14',
    exploitAvailable: false,
    trending: true,
    affectedProducts: ['WordPress Contact Form 7'],
    description: 'SQL injection vulnerability in popular WordPress plugin'
  },
  {
    id: 'CVE-2024-0003',
    title: 'XSS in React Component Library',
    severity: 'medium',
    cvss: 6.1,
    publishedDate: '2024-01-13',
    exploitAvailable: false,
    trending: false,
    affectedProducts: ['React Bootstrap < 2.9.2'],
    description: 'Cross-site scripting vulnerability in React Bootstrap'
  }
];

const iocData = [
  {
    type: 'IP Address',
    value: '192.168.1.100',
    threat: 'Malware C&C',
    confidence: 'High',
    source: 'MISP',
    firstSeen: '2024-01-15',
    lastSeen: '2024-01-15'
  },
  {
    type: 'Domain',
    value: 'malicious-site.com',
    threat: 'Phishing',
    confidence: 'Medium',
    source: 'AbuseIPDB',
    firstSeen: '2024-01-14',
    lastSeen: '2024-01-15'
  },
  {
    type: 'File Hash',
    value: 'a1b2c3d4e5f6...',
    threat: 'Ransomware',
    confidence: 'High',
    source: 'VirusTotal',
    firstSeen: '2024-01-13',
    lastSeen: '2024-01-14'
  }
];

const threatTrendData = [
  { date: '2024-01-01', malware: 120, phishing: 85, botnet: 45 },
  { date: '2024-01-02', malware: 135, phishing: 92, botnet: 52 },
  { date: '2024-01-03', malware: 128, phishing: 88, botnet: 48 },
  { date: '2024-01-04', malware: 142, phishing: 95, botnet: 55 },
  { date: '2024-01-05', malware: 156, phishing: 103, botnet: 62 },
  { date: '2024-01-06', malware: 148, phishing: 98, botnet: 58 },
  { date: '2024-01-07', malware: 162, phishing: 108, botnet: 65 }
];

export function ThreatIntel() {
  const [activeTab, setActiveTab] = useState('feeds');
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const tabs = [
    { id: 'feeds', name: 'Threat Feeds', count: threatFeeds.filter(f => f.status === 'active').length },
    { id: 'cves', name: 'Trending CVEs', count: trendingCVEs.filter(c => c.trending).length },
    { id: 'iocs', name: 'IOCs', count: iocData.length },
    { id: 'trends', name: 'Threat Trends', count: 0 }
  ];

  const filteredCVEs = trendingCVEs.filter(cve => {
    const matchesSeverity = severityFilter === 'all' || cve.severity === severityFilter;
    const matchesSearch = cve.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cve.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Threat Intelligence</h1>
          <p className="text-gray-600 dark:text-gray-400">Global threat feeds and security intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Globe className="h-4 w-4 mr-2" />
            Update Feeds
          </Button>
          <Button variant="secondary">
            <ExternalLink className="h-4 w-4 mr-2" />
            External Sources
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Active Threats</p>
              <p className="text-3xl font-bold mt-2">1,247</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">New CVEs</p>
              <p className="text-3xl font-bold mt-2">23</p>
            </div>
            <Shield className="h-12 w-12 text-orange-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">IOCs</p>
              <p className="text-3xl font-bold mt-2">37,000</p>
            </div>
            <Globe className="h-12 w-12 text-blue-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Feed Sources</p>
              <p className="text-3xl font-bold mt-2">
                {threatFeeds.filter(f => f.status === 'active').length}
              </p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-200" />
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
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Threat Feeds */}
          {activeTab === 'feeds' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {threatFeeds.map((feed) => (
                  <div key={feed.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{feed.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feed.description}</p>
                      </div>
                      <Badge variant={feed.status === 'active' ? 'success' : 'error'}>
                        {feed.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Indicators:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {feed.indicators.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Reliability:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {feed.reliability}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Last update: {new Date(feed.lastUpdate).toLocaleString()}
                        </span>
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending CVEs */}
          {activeTab === 'cves' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search CVEs..."
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
                  </select>
                </div>
              </div>

              {/* CVE List */}
              <div className="space-y-4">
                {filteredCVEs.map((cve) => (
                  <div key={cve.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{cve.id}</h3>
                          <Badge variant={cve.severity}>{cve.severity.toUpperCase()}</Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">CVSS: {cve.cvss}</span>
                          {cve.trending && (
                            <Badge variant="warning">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          {cve.exploitAvailable && (
                            <Badge variant="error">Exploit Available</Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">{cve.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{cve.description}</p>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <p><strong>Affected Products:</strong> {cve.affectedProducts.join(', ')}</p>
                          <p><strong>Published:</strong> {cve.publishedDate}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button variant="secondary" size="sm">
                          Check Assets
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IOCs */}
          {activeTab === 'iocs' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Value</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Threat</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Confidence</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Source</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Last Seen</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iocData.map((ioc, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-4 px-4">
                          <Badge variant="info">{ioc.type}</Badge>
                        </td>
                        <td className="py-4 px-4 font-mono text-sm text-gray-900 dark:text-white">
                          {ioc.value}
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={
                            ioc.threat === 'Ransomware' ? 'error' :
                            ioc.threat === 'Malware C&C' ? 'error' :
                            ioc.threat === 'Phishing' ? 'warning' : 'info'
                          }>
                            {ioc.threat}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={ioc.confidence === 'High' ? 'success' : 'warning'}>
                            {ioc.confidence}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {ioc.source}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {ioc.lastSeen}
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">
                            Block
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Threat Trends */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Threat Activity Trends" description="7-day threat activity overview">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={threatTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="malware" stroke="#dc2626" strokeWidth={2} name="Malware" />
                        <Line type="monotone" dataKey="phishing" stroke="#ea580c" strokeWidth={2} name="Phishing" />
                        <Line type="monotone" dataKey="botnet" stroke="#ca8a04" strokeWidth={2} name="Botnet" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card title="Threat Categories" description="Distribution by threat type">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { category: 'Malware', count: 456 },
                        { category: 'Phishing', count: 324 },
                        { category: 'Botnet', count: 189 },
                        { category: 'Ransomware', count: 156 },
                        { category: 'APT', count: 89 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#dc2626" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}