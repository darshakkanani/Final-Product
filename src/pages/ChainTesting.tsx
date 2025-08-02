import React, { useState } from 'react';
import { Link, Play, Save, Plus, Settings, ArrowRight, Trash2, Copy } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const mockChains = [
  {
    id: '1',
    name: 'Full Web Assessment',
    description: 'Complete web application security assessment chain',
    steps: 5,
    lastRun: '2024-01-15',
    status: 'ready',
    estimatedTime: '45 min'
  },
  {
    id: '2',
    name: 'Network Discovery',
    description: 'Network reconnaissance and enumeration',
    steps: 3,
    lastRun: '2024-01-14',
    status: 'running',
    estimatedTime: '20 min'
  },
  {
    id: '3',
    name: 'CVE Assessment',
    description: 'Automated CVE scanning and validation',
    steps: 4,
    lastRun: '2024-01-13',
    status: 'completed',
    estimatedTime: '30 min'
  }
];

const availableModules = [
  { id: 'recon', name: 'Reconnaissance', type: 'recon', icon: '🔍' },
  { id: 'enum', name: 'Enumeration', type: 'enumeration', icon: '📡' },
  { id: 'cve', name: 'CVE Testing', type: 'cve', icon: '🐛' },
  { id: 'custom', name: 'Custom Scripts', type: 'custom', icon: '⚡' },
  { id: 'report', name: 'Generate Report', type: 'report', icon: '📊' }
];

const chainSteps = [
  {
    id: '1',
    name: 'Subdomain Discovery',
    type: 'recon',
    config: { tools: ['subfinder', 'amass'], timeout: 300 },
    position: { x: 100, y: 100 }
  },
  {
    id: '2', 
    name: 'Port Scanning',
    type: 'enumeration',
    config: { ports: '1-1000', threads: 100 },
    position: { x: 300, y: 100 }
  },
  {
    id: '3',
    name: 'Service Detection',
    type: 'enumeration', 
    config: { aggressive: true, scripts: true },
    position: { x: 500, y: 100 }
  },
  {
    id: '4',
    name: 'CVE Scanning',
    type: 'cve',
    config: { templates: 'all', severity: 'medium+' },
    position: { x: 300, y: 250 }
  },
  {
    id: '5',
    name: 'Generate Report',
    type: 'report',
    config: { format: 'pdf', sections: ['executive', 'technical'] },
    position: { x: 500, y: 250 }
  }
];

export function ChainTesting() {
  const [selectedChain, setSelectedChain] = useState(mockChains[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderSteps, setBuilderSteps] = useState(chainSteps);

  const handleRunChain = async () => {
    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRunning(false);
  };

  const addStep = (moduleType: string) => {
    const newStep = {
      id: Date.now().toString(),
      name: `New ${moduleType} Step`,
      type: moduleType,
      config: {},
      position: { x: 200, y: 200 }
    };
    setBuilderSteps([...builderSteps, newStep]);
  };

  const removeStep = (stepId: string) => {
    setBuilderSteps(builderSteps.filter(step => step.id !== stepId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chain Testing</h1>
          <p className="text-gray-600 dark:text-gray-400">Automate full attack paths with custom workflows</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => setShowBuilder(!showBuilder)}>
            <Settings className="h-4 w-4 mr-2" />
            {showBuilder ? 'View Chains' : 'Chain Builder'}
          </Button>
          <Button onClick={handleRunChain} disabled={isRunning}>
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Chain'}
          </Button>
        </div>
      </div>

      {!showBuilder ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chain Library */}
          <Card title="Saved Chains" description="Your automated testing workflows">
            <div className="space-y-4">
              {mockChains.map((chain) => (
                <div
                  key={chain.id}
                  onClick={() => setSelectedChain(chain)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedChain.id === chain.id
                      ? 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
                      : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{chain.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{chain.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="info">{chain.steps} steps</Badge>
                        <Badge variant={
                          chain.status === 'running' ? 'warning' : 
                          chain.status === 'completed' ? 'success' : 'info'
                        }>
                          {chain.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Last run: {chain.lastRun} • ~{chain.estimatedTime}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="ghost" size="sm" className="w-full" onClick={() => setShowBuilder(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Chain
              </Button>
            </div>
          </Card>

          {/* Chain Details */}
          <div className="lg:col-span-2">
            <Card title={selectedChain.name} description={selectedChain.description}>
              <div className="space-y-6">
                {/* Chain Flow Visualization */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Workflow Steps</h4>
                  <div className="flex items-center space-x-4 overflow-x-auto">
                    {chainSteps.slice(0, 3).map((step, index) => (
                      <React.Fragment key={step.id}>
                        <div className="flex-shrink-0 text-center">
                          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-2">
                            <span className="text-red-600 dark:text-red-400 font-semibold">{index + 1}</span>
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{step.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{step.type}</div>
                        </div>
                        {index < 2 && (
                          <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Configuration */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Chain Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Target Scope
                        </label>
                        <input
                          type="text"
                          defaultValue="example.com"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Concurrency
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                          <option>Low (1-2 threads)</option>
                          <option>Medium (5-10 threads)</option>
                          <option>High (20+ threads)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          defaultValue="60"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Output Format
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                          <option>JSON + PDF Report</option>
                          <option>JSON Only</option>
                          <option>PDF Report Only</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button onClick={handleRunChain} disabled={isRunning} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? 'Running Chain...' : 'Run Chain'}
                  </Button>
                  <Button variant="secondary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => setShowBuilder(true)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Chain
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* Chain Builder */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Module Palette */}
          <Card title="Available Modules" description="Drag modules to build your chain">
            <div className="space-y-3">
              {availableModules.map((module) => (
                <div
                  key={module.id}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => addStep(module.type)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{module.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{module.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{module.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Visual Builder */}
          <div className="lg:col-span-3">
            <Card title="Chain Builder" description="Design your automated testing workflow">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 min-h-96 relative">
                <div className="grid grid-cols-3 gap-4">
                  {builderSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className="bg-white dark:bg-gray-700 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 transition-colors relative group"
                    >
                      <button
                        onClick={() => removeStep(step.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-red-600 dark:text-red-400 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{step.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{step.type}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Step Button */}
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-center hover:border-red-300 dark:hover:border-red-600 transition-colors cursor-pointer">
                    <div className="text-center">
                      <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add Step</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {builderSteps.length} steps configured
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Chain
                  </Button>
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    Test Chain
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}