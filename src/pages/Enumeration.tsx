import React, { useState } from 'react';
import { Scan, Server, Shield, Eye, Play, Loader, Settings, Filter } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const portData = [
  { port: '22', service: 'SSH', count: 15, status: 'open' },
  { port: '80', service: 'HTTP', count: 45, status: 'open' },
  { port: '443', service: 'HTTPS', count: 42, status: 'open' },
  { port: '21', service: 'FTP', count: 3, status: 'filtered' },
  { port: '25', service: 'SMTP', count: 8, status: 'open' },
  { port: '53', service: 'DNS', count: 12, status: 'open' },
  { port: '3389', service: 'RDP', count: 2, status: 'filtered' },
];

const osFingerprints = [
  { os: 'Linux Ubuntu 20.04', confidence: 95, hosts: 12 },
  { os: 'Windows Server 2019', confidence: 87, hosts: 5 },
  { os: 'Linux CentOS 8', confidence: 92, hosts: 8 },
  { os: 'Unknown', confidence: 0, hosts: 3 },
];

const serviceDetails = [
  {
    host: '192.168.1.10',
    port: 80,
    service: 'nginx 1.18.0',
    version: '1.18.0 (Ubuntu)',
    banner: 'Server: nginx/1.18.0 (Ubuntu)',
    status: 'open'
  },
  {
    host: '192.168.1.11',
    port: 22,
    service: 'OpenSSH 8.2p1',
    version: '8.2p1 Ubuntu 4ubuntu0.5',
    banner: 'SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5',
    status: 'open'
  },
  {
    host: '192.168.1.12',
    port: 443,
    service: 'Apache httpd 2.4.41',
    version: '2.4.41 (Ubuntu)',
    banner: 'Server: Apache/2.4.41 (Ubuntu)',
    status: 'open'
  },
];

export function Enumeration() {
  const [target, setTarget] = useState('192.168.1.0/24');
  const [scanType, setScanType] = useState('fast');
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('ports');
  const [portFilter, setPortFilter] = useState('open');

  const scanTypes = [
    { id: 'fast', name: 'Fast Scan', description: 'Top 1000 ports', time: '2-5 min' },
    { id: 'full', name: 'Full Scan', description: 'All 65535 ports', time: '30-60 min' },
    { id: 'stealth', name: 'Stealth Scan', description: 'SYN scan, slower', time: '10-20 min' },
    { id: 'udp', name: 'UDP Scan', description: 'UDP services only', time: '15-30 min' },
  ];

  const handleScan = async () => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsScanning(false);
  };

  const tabs = [
    { id: 'ports', name: 'Port Scan', icon: Server },
    { id: 'services', name: 'Service Detection', icon: Eye },
    { id: 'os', name: 'OS Fingerprinting', icon: Shield },
    { id: 'scripts', name: 'NSE Scripts', icon: Settings },
  ];

  const filteredPorts = portData.filter(port => 
    portFilter === 'all' || port.status === portFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Enumeration</h1>
        <p className="text-gray-600 dark:text-gray-400">Active scanning for services, ports, and system information</p>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Scan Configuration" description="Configure your enumeration scan">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target (IP/CIDR/Hostname)
              </label>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="192.168.1.0/24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Scan Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {scanTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setScanType(type.id)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      scanType === type.id
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{type.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{type.description}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">~{type.time}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleScan} disabled={isScanning} className="w-full">
              {isScanning ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isScanning ? 'Scanning...' : 'Start Enumeration'}
            </Button>
          </div>
        </Card>

        <Card title="Port Distribution" description="Overview of discovered services">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="port" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, 'Hosts']}
                  labelFormatter={(label) => `Port ${label}`}
                />
                <Bar dataKey="count" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Results */}
      <Card>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'ports' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Port Scan Results</h3>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={portFilter}
                    onChange={(e) => setPortFilter(e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Ports</option>
                    <option value="open">Open Only</option>
                    <option value="filtered">Filtered Only</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Port</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Service</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Hosts</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPorts.map((port, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 text-sm font-mono text-gray-900 dark:text-white">{port.port}/tcp</td>
                        <td className="py-3 text-sm text-gray-900 dark:text-white">{port.service}</td>
                        <td className="py-3">
                          <Badge variant={port.status === 'open' ? 'success' : 'warning'}>
                            {port.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{port.count}</td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Service Detection Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Host</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Port</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Service</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Version</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Banner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceDetails.map((service, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 text-sm font-mono text-gray-900 dark:text-white">{service.host}</td>
                        <td className="py-3 text-sm font-mono text-gray-900 dark:text-white">{service.port}</td>
                        <td className="py-3 text-sm text-gray-900 dark:text-white">{service.service}</td>
                        <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{service.version}</td>
                        <td className="py-3 text-xs font-mono text-gray-500 dark:text-gray-400 max-w-xs truncate">
                          {service.banner}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'os' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">OS Fingerprinting Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {osFingerprints.map((os, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{os.os}</h4>
                      <Badge variant={os.confidence > 80 ? 'success' : os.confidence > 50 ? 'warning' : 'error'}>
                        {os.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{os.hosts} hosts detected</p>
                    <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${os.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scripts' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">NSE Script Results</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No NSE scripts executed yet. Configure and run enumeration scan to see script results.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}