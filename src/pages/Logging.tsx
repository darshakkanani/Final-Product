import React, { useState } from 'react';
import { Activity, Download, Filter, Search, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const logEntries = [
  {
    id: '1',
    timestamp: '2024-01-15 14:32:15',
    level: 'ERROR',
    category: 'scan',
    message: 'Failed to connect to target: example.com:443 - Connection timeout',
    details: 'Socket timeout after 30 seconds. Target may be behind firewall or service unavailable.',
    user: 'system',
    source: 'scanner-engine'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:30:42',
    level: 'INFO',
    category: 'auth',
    message: 'User login successful',
    details: 'User admin@example.com logged in from IP 192.168.1.100',
    user: 'admin@example.com',
    source: 'auth-service'
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:28:33',
    level: 'WARN',
    category: 'system',
    message: 'High memory usage detected',
    details: 'Memory usage at 85%. Consider increasing available memory or optimizing scan parameters.',
    user: 'system',
    source: 'monitor'
  },
  {
    id: '4',
    timestamp: '2024-01-15 14:25:18',
    level: 'INFO',
    category: 'scan',
    message: 'Scan completed successfully',
    details: 'Full scan of example.com completed. Found 12 vulnerabilities (2 critical, 3 high, 7 medium).',
    user: 'admin@example.com',
    source: 'scanner-engine'
  },
  {
    id: '5',
    timestamp: '2024-01-15 14:20:05',
    level: 'ERROR',
    category: 'plugin',
    message: 'Plugin execution failed',
    details: 'Custom script "sql-injection-test.py" failed with exit code 1. Check script syntax and permissions.',
    user: 'analyst@example.com',
    source: 'plugin-manager'
  },
  {
    id: '6',
    timestamp: '2024-01-15 14:15:22',
    level: 'INFO',
    category: 'system',
    message: 'Database backup completed',
    details: 'Automated database backup completed successfully. Backup size: 245MB',
    user: 'system',
    source: 'backup-service'
  }
];

const auditTrail = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:42',
    user: 'admin@example.com',
    action: 'LOGIN',
    resource: 'Authentication System',
    details: 'Successful login from 192.168.1.100',
    ip: '192.168.1.100'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:25:18',
    user: 'admin@example.com',
    action: 'SCAN_START',
    resource: 'example.com',
    details: 'Started full security scan',
    ip: '192.168.1.100'
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:20:05',
    user: 'analyst@example.com',
    action: 'SCRIPT_UPLOAD',
    resource: 'Custom Scripts',
    details: 'Uploaded sql-injection-test.py',
    ip: '192.168.1.105'
  },
  {
    id: '4',
    timestamp: '2024-01-15 14:15:30',
    user: 'admin@example.com',
    action: 'USER_CREATE',
    resource: 'User Management',
    details: 'Created new user: viewer@example.com',
    ip: '192.168.1.100'
  }
];

export function Logging() {
  const [activeTab, setActiveTab] = useState('system');
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'system', name: 'System Logs', count: logEntries.length },
    { id: 'audit', name: 'Audit Trail', count: auditTrail.length },
    { id: 'scan', name: 'Scan Logs', count: logEntries.filter(log => log.category === 'scan').length }
  ];

  const filteredLogs = logEntries.filter(log => {
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'WARN': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'INFO': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'ERROR': return 'error';
      case 'WARN': return 'warning';
      case 'INFO': return 'info';
      default: return 'success';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Logging</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor system activity and audit trails</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="secondary">
            <Activity className="h-4 w-4 mr-2" />
            Real-time View
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Errors</p>
              <p className="text-3xl font-bold mt-2">
                {logEntries.filter(log => log.level === 'ERROR').length}
              </p>
            </div>
            <XCircle className="h-12 w-12 text-red-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Warnings</p>
              <p className="text-3xl font-bold mt-2">
                {logEntries.filter(log => log.level === 'WARN').length}
              </p>
            </div>
            <AlertTriangle className="h-12 w-12 text-yellow-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Info</p>
              <p className="text-3xl font-bold mt-2">
                {logEntries.filter(log => log.level === 'INFO').length}
              </p>
            </div>
            <Info className="h-12 w-12 text-blue-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Entries</p>
              <p className="text-3xl font-bold mt-2">{logEntries.length}</p>
            </div>
            <Activity className="h-12 w-12 text-green-200" />
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
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            {activeTab === 'system' && (
              <>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Levels</option>
                    <option value="ERROR">Error</option>
                    <option value="WARN">Warning</option>
                    <option value="INFO">Info</option>
                  </select>
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="scan">Scan</option>
                  <option value="auth">Authentication</option>
                  <option value="system">System</option>
                  <option value="plugin">Plugin</option>
                </select>
              </>
            )}
          </div>

          {/* Log Entries */}
          {activeTab === 'system' && (
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getLevelIcon(log.level)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                            {log.timestamp}
                          </span>
                          <Badge variant={getLevelBadge(log.level) as any}>
                            {log.level}
                          </Badge>
                          <Badge variant="info">{log.category}</Badge>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white mt-1">{log.message}</h4>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{log.details}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>User: {log.user}</span>
                      <span>Source: {log.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Audit Trail */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              {auditTrail.map((entry) => (
                <div key={entry.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                            {entry.timestamp}
                          </span>
                          <Badge variant="success">{entry.action}</Badge>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white mt-1">
                          {entry.user} performed {entry.action.toLowerCase().replace('_', ' ')}
                        </h4>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{entry.details}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>Resource: {entry.resource}</span>
                      <span>IP: {entry.ip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Scan Logs */}
          {activeTab === 'scan' && (
            <div className="space-y-4">
              {logEntries.filter(log => log.category === 'scan').map((log) => (
                <div key={log.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getLevelIcon(log.level)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                            {log.timestamp}
                          </span>
                          <Badge variant={getLevelBadge(log.level) as any}>
                            {log.level}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white mt-1">{log.message}</h4>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{log.details}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>User: {log.user}</span>
                      <span>Source: {log.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}