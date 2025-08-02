import React, { useState } from 'react';
import { Bug, Search, Download, Play, AlertTriangle, Shield, ExternalLink, Filter, Upload } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const mockCVEs = [
  {
    id: 'CVE-2024-1234',
    title: 'Remote Code Execution in Apache HTTP Server',
    severity: 'critical' as const,
    cvss: 9.8,
    description: 'A critical vulnerability allowing remote code execution through malformed HTTP requests.',
    affectedSoftware: 'Apache HTTP Server 2.4.x < 2.4.58',
    patchLink: 'https://httpd.apache.org/security/vulnerabilities_24.html',
    publishedDate: '2024-01-15',
    status: 'vulnerable' as const,
    targets: ['example.com', 'api.example.com']
  },
  {
    id: 'CVE-2024-5678',
    title: 'SQL Injection in MySQL Connector',
    severity: 'high' as const,
    cvss: 8.1,
    description: 'SQL injection vulnerability in MySQL connector allowing data exfiltration.',
    affectedSoftware: 'MySQL Connector/J < 8.0.33',
    patchLink: 'https://dev.mysql.com/doc/relnotes/connector-j/8.0/en/',
    publishedDate: '2024-01-10',
    status: 'patched' as const,
    targets: ['db.example.com']
  },
  {
    id: 'CVE-2024-9012',
    title: 'Cross-Site Scripting in React Router',
    severity: 'medium' as const,
    cvss: 6.1,
    description: 'Stored XSS vulnerability in React Router DOM component.',
    affectedSoftware: 'React Router DOM < 6.8.1',
    patchLink: 'https://github.com/remix-run/react-router/releases',
    publishedDate: '2024-01-05',
    status: 'not_applicable' as const,
    targets: []
  }
];

const nucleiTemplates = [
  { id: 'apache-rce', name: 'Apache RCE Detection', severity: 'critical', count: 15 },
  { id: 'sql-injection', name: 'SQL Injection Tests', severity: 'high', count: 42 },
  { id: 'xss-detection', name: 'XSS Vulnerability Tests', severity: 'medium', count: 28 },
  { id: 'ssrf-tests', name: 'SSRF Detection', severity: 'high', count: 18 },
];

export function CVETesting() {
  const [selectedCVE, setSelectedCVE] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isScanning, setIsScanning] = useState(false);
  const [showAddCVE, setShowAddCVE] = useState(false);

  const filteredCVEs = mockCVEs.filter(cve => {
    const matchesSeverity = severityFilter === 'all' || cve.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || cve.status === statusFilter;
    return matchesSeverity && matchesStatus;
  });

  const handleScan = async () => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsScanning(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CVE Testing</h1>
          <p className="text-gray-600 dark:text-gray-400">Scan for known vulnerabilities and CVEs</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => setShowAddCVE(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Import CVEs
          </Button>
          <Button onClick={handleScan} disabled={isScanning}>
            <Play className="h-4 w-4 mr-2" />
            {isScanning ? 'Scanning...' : 'Start CVE Scan'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Critical CVEs</p>
              <p className="text-3xl font-bold mt-2">1</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">High CVEs</p>
              <p className="text-3xl font-bold mt-2">1</p>
            </div>
            <Bug className="h-12 w-12 text-orange-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Medium CVEs</p>
              <p className="text-3xl font-bold mt-2">1</p>
            </div>
            <Shield className="h-12 w-12 text-yellow-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Nuclei Templates</p>
              <p className="text-3xl font-bold mt-2">103</p>
            </div>
            <Search className="h-12 w-12 text-blue-200" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CVE Database */}
        <div className="lg:col-span-2">
          <Card title="CVE Database" description="Known vulnerabilities and their status">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
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
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="vulnerable">Vulnerable</option>
                <option value="patched">Patched</option>
                <option value="not_applicable">Not Applicable</option>
              </select>
            </div>

            {/* CVE List */}
            <div className="space-y-4">
              {filteredCVEs.map((cve) => (
                <div key={cve.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{cve.id}</h3>
                        <Badge variant={cve.severity}>{cve.severity.toUpperCase()}</Badge>
                        <Badge variant={
                          cve.status === 'vulnerable' ? 'error' : 
                          cve.status === 'patched' ? 'success' : 'info'
                        }>
                          {cve.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">CVSS: {cve.cvss}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{cve.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{cve.description}</p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p><strong>Affected:</strong> {cve.affectedSoftware}</p>
                        <p><strong>Published:</strong> {cve.publishedDate}</p>
                        {cve.targets.length > 0 && (
                          <p><strong>Affected Targets:</strong> {cve.targets.join(', ')}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Patch Info
                      </Button>
                      <Button variant="secondary" size="sm">
                        Test Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Nuclei Templates */}
        <Card title="Nuclei Templates" description="Available vulnerability templates">
          <div className="space-y-4">
            {nucleiTemplates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={template.severity}>{template.severity}</Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{template.count} tests</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Run
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="secondary" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Update Templates
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}