import React, { useState } from 'react';
import { Shield, Zap, Globe, Lock, AlertTriangle, Play, Settings, Eye } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const coreModules = [
  {
    id: 'firewall',
    name: 'Firewall Testing',
    description: 'Test firewall rules and bypass techniques',
    icon: Shield,
    status: 'ready',
    tests: 15,
    severity: 'high'
  },
  {
    id: 'waf',
    name: 'WAF Bypass',
    description: 'Web Application Firewall evasion techniques',
    icon: Globe,
    status: 'ready', 
    tests: 23,
    severity: 'critical'
  },
  {
    id: 'vpn',
    name: 'VPN Analysis',
    description: 'VPN configuration and security assessment',
    icon: Lock,
    status: 'ready',
    tests: 8,
    severity: 'medium'
  },
  {
    id: 'smuggling',
    name: 'HTTP Smuggling',
    description: 'HTTP request smuggling vulnerability tests',
    icon: Zap,
    status: 'ready',
    tests: 12,
    severity: 'critical'
  },
  {
    id: 'ssrf',
    name: 'SSRF Testing',
    description: 'Server-Side Request Forgery detection',
    icon: AlertTriangle,
    status: 'ready',
    tests: 18,
    severity: 'high'
  },
  {
    id: 'idor',
    name: 'IDOR Detection',
    description: 'Insecure Direct Object Reference testing',
    icon: Eye,
    status: 'ready',
    tests: 10,
    severity: 'medium'
  }
];

const testResults = [
  {
    module: 'WAF Bypass',
    test: 'SQL Injection Bypass',
    status: 'vulnerable',
    severity: 'critical',
    description: 'WAF can be bypassed using encoded payloads',
    payload: "' UNION SELECT 1,2,3--",
    recommendation: 'Update WAF rules to detect encoded SQL injection attempts'
  },
  {
    module: 'HTTP Smuggling',
    test: 'CL.TE Smuggling',
    status: 'vulnerable',
    severity: 'high',
    description: 'Server vulnerable to Content-Length/Transfer-Encoding smuggling',
    payload: 'POST /search HTTP/1.1\\r\\nContent-Length: 4\\r\\nTransfer-Encoding: chunked',
    recommendation: 'Configure server to reject ambiguous requests'
  },
  {
    module: 'SSRF Testing',
    test: 'Internal Network Access',
    status: 'safe',
    severity: 'info',
    description: 'SSRF protection is working correctly',
    payload: 'http://169.254.169.254/latest/meta-data/',
    recommendation: 'Continue monitoring for new SSRF vectors'
  }
];

export function CoreTesting() {
  const [selectedModule, setSelectedModule] = useState(coreModules[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('modules');
  const [target, setTarget] = useState('https://example.com');

  const handleRunTest = async () => {
    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRunning(false);
  };

  const tabs = [
    { id: 'modules', name: 'Test Modules' },
    { id: 'results', name: 'Results' },
    { id: 'config', name: 'Configuration' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Core Testing</h1>
          <p className="text-gray-600 dark:text-gray-400">Deep security testing for critical infrastructure</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button onClick={handleRunTest} disabled={isRunning}>
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Tests'}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Critical Tests</p>
              <p className="text-3xl font-bold mt-2">2</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">High Priority</p>
              <p className="text-3xl font-bold mt-2">2</p>
            </div>
            <Shield className="h-12 w-12 text-orange-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Medium Tests</p>
              <p className="text-3xl font-bold mt-2">2</p>
            </div>
            <Eye className="h-12 w-12 text-yellow-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Tests</p>
              <p className="text-3xl font-bold mt-2">86</p>
            </div>
            <Zap className="h-12 w-12 text-blue-200" />
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
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'modules' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {coreModules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedModule.id === module.id
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <module.icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <Badge variant={module.severity}>{module.severity}</Badge>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{module.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{module.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant={module.status === 'ready' ? 'success' : 'warning'}>
                        {module.status}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {module.tests} tests
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Test Results</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last run: 2 hours ago
                </div>
              </div>

              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{result.test}</h4>
                          <Badge variant={result.severity}>{result.severity}</Badge>
                          <Badge variant={
                            result.status === 'vulnerable' ? 'error' : 
                            result.status === 'safe' ? 'success' : 'warning'
                          }>
                            {result.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{result.module}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{result.description}</p>
                    
                    {result.payload && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payload:</h5>
                        <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono">
                          {result.payload}
                        </code>
                      </div>
                    )}
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Recommendation:</h5>
                      <p className="text-sm text-blue-700 dark:text-blue-300">{result.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Test Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target URL
                    </label>
                    <input
                      type="text"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Test Intensity
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option>Light (Basic tests only)</option>
                      <option>Medium (Standard test suite)</option>
                      <option>Aggressive (All tests + fuzzing)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      User Agent
                    </label>
                    <input
                      type="text"
                      defaultValue="Wildfire Security Scanner v1.0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Concurrent Threads
                    </label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="followRedirects"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="followRedirects" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Follow redirects
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}