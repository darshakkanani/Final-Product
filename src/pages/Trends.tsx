import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Download } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Area, AreaChart } from 'recharts';

const vulnerabilityTrends = [
  { month: 'Jul', critical: 12, high: 28, medium: 45, low: 23, total: 108 },
  { month: 'Aug', critical: 8, high: 32, medium: 52, low: 28, total: 120 },
  { month: 'Sep', critical: 15, high: 25, medium: 38, low: 19, total: 97 },
  { month: 'Oct', critical: 6, high: 29, medium: 41, low: 25, total: 101 },
  { month: 'Nov', critical: 4, high: 22, medium: 35, low: 18, total: 79 },
  { month: 'Dec', critical: 2, high: 18, medium: 28, low: 15, total: 63 },
  { month: 'Jan', critical: 3, high: 15, medium: 22, low: 12, total: 52 }
];

const scanMetrics = [
  { date: '2024-01-01', scans: 45, targets: 12, findings: 156 },
  { date: '2024-01-02', scans: 52, targets: 15, findings: 189 },
  { date: '2024-01-03', scans: 38, targets: 10, findings: 134 },
  { date: '2024-01-04', scans: 61, targets: 18, findings: 203 },
  { date: '2024-01-05', scans: 47, targets: 14, findings: 167 },
  { date: '2024-01-06', scans: 55, targets: 16, findings: 178 },
  { date: '2024-01-07', scans: 42, targets: 13, findings: 145 }
];

const categoryDistribution = [
  { name: 'Web Application', value: 35, color: '#dc2626' },
  { name: 'Network', value: 25, color: '#ea580c' },
  { name: 'SSL/TLS', value: 20, color: '#ca8a04' },
  { name: 'Configuration', value: 15, color: '#16a34a' },
  { name: 'Other', value: 5, color: '#2563eb' }
];

const analystMetrics = [
  {
    name: 'Sarah Johnson',
    scansCompleted: 156,
    vulnerabilitiesFound: 423,
    avgScanTime: '45 min',
    efficiency: 92,
    trend: 'up'
  },
  {
    name: 'Mike Chen',
    scansCompleted: 134,
    vulnerabilitiesFound: 389,
    avgScanTime: '52 min',
    efficiency: 88,
    trend: 'up'
  },
  {
    name: 'Lisa Rodriguez',
    scansCompleted: 98,
    vulnerabilitiesFound: 267,
    avgScanTime: '38 min',
    efficiency: 95,
    trend: 'down'
  }
];

const riskTrends = [
  { date: '2024-01-01', riskScore: 7.2, criticalAssets: 15, exposedServices: 23 },
  { date: '2024-01-02', riskScore: 6.8, criticalAssets: 14, exposedServices: 21 },
  { date: '2024-01-03', riskScore: 7.5, criticalAssets: 16, exposedServices: 25 },
  { date: '2024-01-04', riskScore: 6.9, criticalAssets: 13, exposedServices: 20 },
  { date: '2024-01-05', riskScore: 6.2, criticalAssets: 12, exposedServices: 18 },
  { date: '2024-01-06', riskScore: 5.8, criticalAssets: 11, exposedServices: 16 },
  { date: '2024-01-07', riskScore: 5.4, criticalAssets: 10, exposedServices: 15 }
];

export function Trends() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('vulnerabilities');

  const tabs = [
    { id: 'vulnerabilities', name: 'Vulnerabilities', icon: TrendingUp },
    { id: 'scans', name: 'Scan Activity', icon: BarChart3 },
    { id: 'risk', name: 'Risk Metrics', icon: TrendingDown },
    { id: 'performance', name: 'Team Performance', icon: PieChart }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vulnerability Trends</h1>
          <p className="text-gray-600 dark:text-gray-400">Security metrics and trend analysis</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Risk Reduction</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-5 w-5 mr-2" />
                <span className="text-3xl font-bold">25%</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">This month</p>
              <p className="text-green-200 text-xs">↓ 1.8 points</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Scan Efficiency</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-5 w-5 mr-2" />
                <span className="text-3xl font-bold">92%</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Average</p>
              <p className="text-blue-200 text-xs">↑ 5% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">MTTR</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-5 w-5 mr-2" />
                <span className="text-3xl font-bold">2.3d</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm">Mean Time to Resolve</p>
              <p className="text-purple-200 text-xs">↓ 0.7 days</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Coverage</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-5 w-5 mr-2" />
                <span className="text-3xl font-bold">87%</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-sm">Asset Coverage</p>
              <p className="text-orange-200 text-xs">↑ 12% this quarter</p>
            </div>
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
          {/* Vulnerability Trends */}
          {activeTab === 'vulnerabilities' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Vulnerability Trends Over Time" description="Monthly vulnerability discovery and resolution">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={vulnerabilityTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="critical" stackId="1" stroke="#dc2626" fill="#dc2626" />
                        <Area type="monotone" dataKey="high" stackId="1" stroke="#ea580c" fill="#ea580c" />
                        <Area type="monotone" dataKey="medium" stackId="1" stroke="#ca8a04" fill="#ca8a04" />
                        <Area type="monotone" dataKey="low" stackId="1" stroke="#16a34a" fill="#16a34a" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card title="Vulnerability Categories" description="Distribution by vulnerability type">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {categoryDistribution.map((item) => (
                      <div key={item.name} className="flex items-center text-sm">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600 dark:text-gray-400">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card title="Severity Breakdown" description="Detailed vulnerability severity analysis">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vulnerabilityTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="critical" fill="#dc2626" name="Critical" />
                      <Bar dataKey="high" fill="#ea580c" name="High" />
                      <Bar dataKey="medium" fill="#ca8a04" name="Medium" />
                      <Bar dataKey="low" fill="#16a34a" name="Low" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          )}

          {/* Scan Activity */}
          {activeTab === 'scans' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Daily Scan Activity" description="Scans performed over time">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={scanMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="scans" stroke="#2563eb" strokeWidth={2} name="Scans" />
                        <Line type="monotone" dataKey="targets" stroke="#16a34a" strokeWidth={2} name="Targets" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card title="Findings per Scan" description="Average findings discovered">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={scanMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="findings" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              <Card title="Scan Performance Metrics" description="Key performance indicators">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">47</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Average Daily Scans</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12% from last week</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">14</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Average Targets per Scan</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 8% from last week</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">167</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Average Findings per Scan</div>
                    <div className="text-xs text-red-600 dark:text-red-400 mt-1">↓ 5% from last week</div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Risk Metrics */}
          {activeTab === 'risk' && (
            <div className="space-y-6">
              <Card title="Risk Score Trends" description="Overall security risk over time">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={riskTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="riskScore" stroke="#dc2626" strokeWidth={3} name="Risk Score" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Critical Assets at Risk" description="High-value assets with vulnerabilities">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={riskTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="criticalAssets" stroke="#ea580c" fill="#ea580c" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card title="Exposed Services" description="Internet-facing services with issues">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={riskTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="exposedServices" stroke="#ca8a04" fill="#ca8a04" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Team Performance */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <Card title="Analyst Performance" description="Individual team member metrics">
                <div className="space-y-4">
                  {analystMetrics.map((analyst, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 dark:text-gray-300 font-medium">
                            {analyst.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{analyst.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {analyst.scansCompleted} scans • {analyst.vulnerabilitiesFound} findings
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-gray-900 dark:text-white">{analyst.avgScanTime}</div>
                          <div className="text-gray-500 dark:text-gray-400">Avg Time</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900 dark:text-white mr-1">{analyst.efficiency}%</span>
                            {analyst.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">Efficiency</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Team Productivity" description="Scans completed by team members">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analystMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="scansCompleted" fill="#2563eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card title="Vulnerability Discovery" description="Findings by team members">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analystMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="vulnerabilitiesFound" fill="#dc2626" />
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