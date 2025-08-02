import React, { useState } from 'react';
import { Search, Globe, Database, Eye, Download, Play, Loader, CheckCircle } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const reconTools = [
  { id: 'subfinder', name: 'Subfinder', description: 'Fast subdomain discovery', enabled: true },
  { id: 'amass', name: 'Amass', description: 'Network mapping of attack surfaces', enabled: true },
  { id: 'whois', name: 'WHOIS', description: 'Domain registration information', enabled: true },
  { id: 'dnsdumpster', name: 'DNSdumpster', description: 'DNS reconnaissance tool', enabled: true },
  { id: 'shodan', name: 'Shodan', description: 'Internet-connected device search', enabled: false },
  { id: 'censys', name: 'Censys', description: 'Internet-wide scanning platform', enabled: true },
];

const mockResults = {
  subdomains: [
    { domain: 'www.example.com', ip: '192.0.2.1', status: 'active' },
    { domain: 'api.example.com', ip: '192.0.2.2', status: 'active' },
    { domain: 'blog.example.com', ip: '192.0.2.3', status: 'active' },
    { domain: 'staging.example.com', ip: '192.0.2.4', status: 'inactive' },
    { domain: 'dev.example.com', ip: '192.0.2.5', status: 'active' },
  ],
  dns: [
    { type: 'A', name: 'example.com', value: '192.0.2.1', ttl: 300 },
    { type: 'AAAA', name: 'example.com', value: '2001:db8::1', ttl: 300 },
    { type: 'MX', name: 'example.com', value: 'mail.example.com', ttl: 3600 },
    { type: 'TXT', name: 'example.com', value: 'v=spf1 include:_spf.google.com ~all', ttl: 300 },
  ],
  whois: {
    registrar: 'Example Registrar Inc.',
    created: '2020-01-15',
    expires: '2025-01-15',
    nameservers: ['ns1.example.com', 'ns2.example.com'],
    status: 'clientTransferProhibited'
  }
};

export function Reconnaissance() {
  const [target, setTarget] = useState('example.com');
  const [activeTab, setActiveTab] = useState('subdomains');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    setScanComplete(false);
    
    // Simulate scan
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsScanning(false);
    setScanComplete(true);
  };

  const tabs = [
    { id: 'subdomains', name: 'Subdomains', count: mockResults.subdomains.length },
    { id: 'dns', name: 'DNS Records', count: mockResults.dns.length },
    { id: 'whois', name: 'WHOIS Info', count: 1 },
    { id: 'asn', name: 'ASN Data', count: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reconnaissance</h1>
        <p className="text-gray-600 dark:text-gray-400">Passive and active information gathering</p>
      </div>

      {/* Target Input & Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Target Configuration" description="Configure your reconnaissance target">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Domain/IP
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="example.com"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <Button onClick={handleScan} disabled={isScanning || !target}>
                    {isScanning ? (
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {isScanning ? 'Scanning...' : 'Start Recon'}
                  </Button>
                </div>
              </div>

              {scanComplete && (
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">Reconnaissance completed successfully</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        <Card title="Tools Status" description="Available reconnaissance tools">
          <div className="space-y-3">
            {reconTools.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${tool.enabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{tool.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{tool.description}</div>
                  </div>
                </div>
                <Badge variant={tool.enabled ? 'success' : 'error'}>
                  {tool.enabled ? 'Ready' : 'Config'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Results */}
      {scanComplete && (
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
            {activeTab === 'subdomains' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Discovered Subdomains</h3>
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Domain</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">IP Address</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockResults.subdomains.map((subdomain, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 text-sm text-gray-900 dark:text-white">{subdomain.domain}</td>
                          <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{subdomain.ip}</td>
                          <td className="py-3">
                            <Badge variant={subdomain.status === 'active' ? 'success' : 'error'}>
                              {subdomain.status}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Inspect
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'dns' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">DNS Records</h3>
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export JSON
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Value</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockResults.dns.map((record, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3">
                            <Badge variant="info">{record.type}</Badge>
                          </td>
                          <td className="py-3 text-sm text-gray-900 dark:text-white">{record.name}</td>
                          <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{record.value}</td>
                          <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{record.ttl}s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'whois' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">WHOIS Information</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Registrar</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{mockResults.whois.registrar}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{mockResults.whois.created}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Expires</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{mockResults.whois.expires}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{mockResults.whois.status}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name Servers</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">
                        {mockResults.whois.nameservers.join(', ')}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}