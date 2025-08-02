import React from 'react';
import { Play, Pause, Activity, AlertTriangle, CheckCircle, Clock, Target, Bug, Zap, Shield } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const recentScans = [
  { id: 1, target: 'example.com', type: 'Full Scan', status: 'completed', vulns: 12, startTime: '2 hours ago' },
  { id: 2, target: '192.168.1.0/24', type: 'Network Enum', status: 'running', vulns: 0, startTime: '30 min ago' },
  { id: 3, target: 'api.example.com', type: 'CVE Scan', status: 'completed', vulns: 5, startTime: '4 hours ago' },
  { id: 4, target: 'staging.example.com', type: 'Custom Test', status: 'failed', vulns: 0, startTime: '6 hours ago' },
  { id: 5, target: 'secure.example.com', type: 'Chain Scan', status: 'completed', vulns: 3, startTime: '1 day ago' },
];

const moduleStatus = [
  { name: 'Fire-Cloud', enabled: true, description: 'Cloud security scanning' },
  { name: 'Fire-Scanner', enabled: true, description: 'Port and service discovery' },  
  { name: 'Fire-Enumeration', enabled: true, description: 'Active enumeration tools' },
  { name: 'Fire-CVE', enabled: false, description: 'CVE vulnerability testing' },
  { name: 'Fire-Custom', enabled: true, description: 'Custom script execution' },
  { name: 'Fire-Chain', enabled: true, description: 'Automated attack chains' },
];

const vulnData = [
  { name: 'Critical', count: 8, color: '#dc2626' },
  { name: 'High', count: 23, color: '#ea580c' },
  { name: 'Medium', count: 45, color: '#ca8a04' },
  { name: 'Low', count: 67, color: '#16a34a' },
  { name: 'Info', count: 12, color: '#2563eb' },
];

const activityData = [
  { time: '00:00', scans: 12, vulns: 5 },
  { time: '04:00', scans: 8, vulns: 3 },
  { time: '08:00', scans: 25, vulns: 12 },
  { time: '12:00', scans: 35, vulns: 18 },
  { time: '16:00', scans: 28, vulns: 15 },
  { time: '20:00', scans: 22, vulns: 9 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Scan Status</p>
              <div className="flex items-center mt-2">
                <Activity className="h-5 w-5 mr-2" />
                <span className="text-2xl font-bold">Active</span>
              </div>
            </div>
            <CheckCircle className="h-12 w-12 text-green-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Targets</p>
              <p className="text-3xl font-bold mt-2">247</p>
            </div>
            <Target className="h-12 w-12 text-blue-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Critical Vulns</p>
              <p className="text-3xl font-bold mt-2">8</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Active Modules</p>
              <p className="text-3xl font-bold mt-2">5/6</p>
            </div>
            <Shield className="h-12 w-12 text-purple-200" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card title="Quick Actions" description="Launch scans and manage modules">
          <div className="space-y-4">
            <Button className="w-full flex items-center justify-center">
              <Zap className="h-4 w-4 mr-2" />
              Start Wildfire.py
            </Button>
            <Button variant="secondary" className="w-full flex items-center justify-center">
              <Play className="h-4 w-4 mr-2" />
              Launch Chain Scan
            </Button>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Module Status</h4>
              <div className="space-y-2">
                {moduleStatus.slice(0, 3).map((module) => (
                  <div key={module.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${module.enabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{module.name}</span>
                    </div>
                    <button className={`text-xs px-2 py-1 rounded ${module.enabled ? 'text-green-700 bg-green-100' : 'text-gray-600 bg-gray-100'}`}>
                      {module.enabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Vulnerability Overview */}
        <Card title="Vulnerability Distribution" description="Current security findings">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vulnData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {vulnData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Vulnerabilities']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {vulnData.map((item) => (
              <div key={item.name} className="flex items-center text-sm">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                <span className="text-gray-600 dark:text-gray-400">{item.name}: {item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Feed */}
        <Card title="Real-time Activity" description="Recent scan activity">
          <div className="space-y-3 max-h-80 overflow-y-auto">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">Scan completed: example.com</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Found 12 vulnerabilities • 2 min ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">Running: Network enumeration</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Target: 192.168.1.0/24 • 30 min ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">Critical vulnerability detected</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">CVE-2024-1234 on api.example.com • 1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">Chain scan initialized</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Custom workflow started • 2 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Scans Table */}
      <Card title="Recent Scans" description="Latest scan results and status">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Target</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Vulnerabilities</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Started</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan) => (
                <tr key={scan.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">{scan.target}</div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="info">{scan.type}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge 
                      variant={
                        scan.status === 'completed' ? 'success' : 
                        scan.status === 'running' ? 'warning' : 'error'
                      }
                    >
                      {scan.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900 dark:text-white">{scan.vulns}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-500 dark:text-gray-400">{scan.startTime}</span>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Activity Chart */}
      <Card title="Scan Activity (24h)" description="Scans and vulnerabilities found over time">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="scans" stroke="#3b82f6" strokeWidth={2} name="Scans" />
              <Line type="monotone" dataKey="vulns" stroke="#dc2626" strokeWidth={2} name="Vulnerabilities" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}