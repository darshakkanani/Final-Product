import React, { useState } from 'react';
import { Calendar, Clock, Plus, Play, Pause, Edit, Trash2, Bell } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const scheduledScans = [
  {
    id: '1',
    name: 'Weekly Web App Scan',
    target: 'example.com',
    scanType: 'Full Scan',
    schedule: 'Every Monday at 09:00',
    nextRun: '2024-01-22 09:00:00',
    lastRun: '2024-01-15 09:00:00',
    status: 'active',
    notifications: true
  },
  {
    id: '2',
    name: 'Daily CVE Check',
    target: 'api.example.com',
    scanType: 'CVE Scan',
    schedule: 'Daily at 02:00',
    nextRun: '2024-01-16 02:00:00',
    lastRun: '2024-01-15 02:00:00',
    status: 'active',
    notifications: true
  },
  {
    id: '3',
    name: 'Monthly Network Audit',
    target: '192.168.1.0/24',
    scanType: 'Network Enum',
    schedule: 'First Monday of month at 18:00',
    nextRun: '2024-02-05 18:00:00',
    lastRun: '2024-01-01 18:00:00',
    status: 'paused',
    notifications: false
  }
];

const scanHistory = [
  {
    id: '1',
    name: 'Weekly Web App Scan',
    target: 'example.com',
    startTime: '2024-01-15 09:00:00',
    endTime: '2024-01-15 10:30:00',
    status: 'completed',
    findings: 12
  },
  {
    id: '2',
    name: 'Daily CVE Check',
    target: 'api.example.com',
    startTime: '2024-01-15 02:00:00',
    endTime: '2024-01-15 02:15:00',
    status: 'completed',
    findings: 3
  },
  {
    id: '3',
    name: 'Weekly Web App Scan',
    target: 'example.com',
    startTime: '2024-01-08 09:00:00',
    endTime: '2024-01-08 10:45:00',
    status: 'completed',
    findings: 8
  }
];

export function Scheduler() {
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [showNewScan, setShowNewScan] = useState(false);
  const [newScan, setNewScan] = useState({
    name: '',
    target: '',
    scanType: 'full',
    schedule: 'weekly',
    time: '09:00',
    dayOfWeek: 'monday',
    notifications: true
  });

  const handleCreateScan = () => {
    // Simulate creating scan
    setShowNewScan(false);
    setNewScan({
      name: '',
      target: '',
      scanType: 'full',
      schedule: 'weekly',
      time: '09:00',
      dayOfWeek: 'monday',
      notifications: true
    });
  };

  const toggleScanStatus = (scanId: string) => {
    // Simulate toggling scan status
    console.log('Toggle scan status:', scanId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scheduler</h1>
          <p className="text-gray-600 dark:text-gray-400">Schedule and manage automated security scans</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                view === 'list'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                view === 'calendar'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Calendar
            </button>
          </div>
          <Button onClick={() => setShowNewScan(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Scan
          </Button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scheduled Scans */}
          <Card title="Scheduled Scans" description="Your automated scan schedules">
            <div className="space-y-4">
              {scheduledScans.map((scan) => (
                <div key={scan.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{scan.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{scan.target}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={scan.status === 'active' ? 'success' : 'warning'}>
                        {scan.status}
                      </Badge>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => toggleScanStatus(scan.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {scan.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Type:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{scan.scanType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Schedule:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{scan.schedule}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Next Run:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {new Date(scan.nextRun).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Last Run:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {new Date(scan.lastRun).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <Bell className={`h-4 w-4 mr-1 ${scan.notifications ? 'text-blue-500' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Notifications {scan.notifications ? 'enabled' : 'disabled'}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Run Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Scan History */}
          <Card title="Recent Executions" description="History of scheduled scan runs">
            <div className="space-y-4">
              {scanHistory.map((execution) => (
                <div key={execution.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{execution.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{execution.target}</p>
                    </div>
                    <Badge variant={execution.status === 'completed' ? 'success' : 'error'}>
                      {execution.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Started:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {new Date(execution.startTime).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {Math.round((new Date(execution.endTime).getTime() - new Date(execution.startTime).getTime()) / 60000)} min
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {execution.findings} findings
                    </span>
                    <Button variant="ghost" size="sm">
                      View Results
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        /* Calendar View */
        <Card title="Scan Calendar" description="Calendar view of scheduled scans">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 min-h-96">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Calendar className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Calendar View</h3>
              <p>Interactive calendar view would be implemented here with a calendar library like react-big-calendar</p>
            </div>
          </div>
        </Card>
      )}

      {/* New Scan Modal */}
      {showNewScan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Schedule New Scan</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Scan Name
                </label>
                <input
                  type="text"
                  value={newScan.name}
                  onChange={(e) => setNewScan({...newScan, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Weekly security scan"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target
                </label>
                <input
                  type="text"
                  value={newScan.target}
                  onChange={(e) => setNewScan({...newScan, target: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Scan Type
                </label>
                <select
                  value={newScan.scanType}
                  onChange={(e) => setNewScan({...newScan, scanType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="full">Full Scan</option>
                  <option value="cve">CVE Scan</option>
                  <option value="network">Network Enum</option>
                  <option value="custom">Custom Scan</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Frequency
                  </label>
                  <select
                    value={newScan.schedule}
                    onChange={(e) => setNewScan({...newScan, schedule: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newScan.time}
                    onChange={(e) => setNewScan({...newScan, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={newScan.notifications}
                  onChange={(e) => setNewScan({...newScan, notifications: e.target.checked})}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Send notifications before scan starts
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleCreateScan} className="flex-1">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Scan
              </Button>
              <Button variant="secondary" onClick={() => setShowNewScan(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}