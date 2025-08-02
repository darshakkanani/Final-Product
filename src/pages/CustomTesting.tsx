import React, { useState } from 'react';
import { Code, Play, Save, Upload, Download, Terminal, FileText, Folder } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import Editor from '@monaco-editor/react';

const mockScripts = [
  {
    id: '1',
    name: 'Port Scanner',
    language: 'python',
    description: 'Custom port scanning script with threading',
    lastModified: '2024-01-15',
    status: 'ready'
  },
  {
    id: '2',
    name: 'SQL Injection Tester',
    language: 'python',
    description: 'Advanced SQL injection detection script',
    lastModified: '2024-01-14',
    status: 'running'
  },
  {
    id: '3',
    name: 'Directory Bruteforcer',
    language: 'bash',
    description: 'Fast directory and file discovery',
    lastModified: '2024-01-13',
    status: 'ready'
  }
];

const samplePythonCode = `#!/usr/bin/env python3
"""
Custom Vulnerability Scanner
Author: Security Team
"""

import socket
import threading
import argparse
from datetime import datetime

class PortScanner:
    def __init__(self, target, threads=100):
        self.target = target
        self.threads = threads
        self.open_ports = []
        
    def scan_port(self, port):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((self.target, port))
            if result == 0:
                self.open_ports.append(port)
                print(f"[+] Port {port} is open")
            sock.close()
        except Exception as e:
            pass
    
    def run_scan(self, start_port=1, end_port=1000):
        print(f"Starting scan on {self.target}")
        print(f"Time started: {datetime.now()}")
        
        for port in range(start_port, end_port + 1):
            thread = threading.Thread(target=self.scan_port, args=(port,))
            thread.start()
        
        return self.open_ports

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Custom Port Scanner')
    parser.add_argument('target', help='Target IP address')
    parser.add_argument('--start', type=int, default=1, help='Start port')
    parser.add_argument('--end', type=int, default=1000, help='End port')
    
    args = parser.parse_args()
    
    scanner = PortScanner(args.target)
    open_ports = scanner.run_scan(args.start, args.end)
    
    print(f"\\nScan completed. Found {len(open_ports)} open ports")
    print(f"Open ports: {open_ports}")
`;

export function CustomTesting() {
  const [selectedScript, setSelectedScript] = useState(mockScripts[0]);
  const [code, setCode] = useState(samplePythonCode);
  const [language, setLanguage] = useState('python');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [showNewScript, setShowNewScript] = useState(false);

  const handleRunScript = async () => {
    setIsRunning(true);
    setOutput('Starting script execution...\n');
    
    // Simulate script execution
    const outputs = [
      'Initializing scanner...',
      'Target: example.com',
      'Starting port scan...',
      '[+] Port 22 is open',
      '[+] Port 80 is open', 
      '[+] Port 443 is open',
      'Scan completed. Found 3 open ports',
      'Open ports: [22, 80, 443]'
    ];
    
    for (let i = 0; i < outputs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setOutput(prev => prev + outputs[i] + '\n');
    }
    
    setIsRunning(false);
  };

  const handleSaveScript = () => {
    // Simulate saving
    alert('Script saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Custom Testing</h1>
          <p className="text-gray-600 dark:text-gray-400">Upload and run custom security testing scripts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => setShowNewScript(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Script
          </Button>
          <Button onClick={() => setShowNewScript(true)}>
            <Code className="h-4 w-4 mr-2" />
            New Script
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Script Library */}
        <Card title="Script Library" description="Your custom testing scripts">
          <div className="space-y-3">
            {mockScripts.map((script) => (
              <div
                key={script.id}
                onClick={() => setSelectedScript(script)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedScript.id === script.id
                    ? 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
                    : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{script.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{script.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="info">{script.language}</Badge>
                      <Badge variant={script.status === 'running' ? 'warning' : 'success'}>
                        {script.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Modified: {script.lastModified}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="ghost" size="sm" className="w-full">
              <Folder className="h-4 w-4 mr-2" />
              Browse All Scripts
            </Button>
          </div>
        </Card>

        {/* Code Editor */}
        <div className="lg:col-span-3">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {selectedScript.name}
                </h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
                >
                  <option value="python">Python</option>
                  <option value="bash">Bash</option>
                  <option value="javascript">JavaScript</option>
                  <option value="go">Go</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm" onClick={handleSaveScript}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="secondary" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button size="sm" onClick={handleRunScript} disabled={isRunning}>
                  <Play className="h-4 w-4 mr-1" />
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
              </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <Editor
                height="400px"
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </Card>

          {/* Output Terminal */}
          <Card title="Script Output" description="Execution results and logs" className="mt-6">
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
              <div className="flex items-center mb-2">
                <Terminal className="h-4 w-4 mr-2" />
                <span className="text-gray-400">Terminal Output</span>
              </div>
              <pre className="whitespace-pre-wrap">{output || 'No output yet. Run a script to see results here.'}</pre>
              {isRunning && (
                <div className="flex items-center mt-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
                  <span>Script is running...</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}