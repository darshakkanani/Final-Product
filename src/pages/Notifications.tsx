import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Webhook, Settings, Check, X, AlertTriangle, Info } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const notifications = [
  {
    id: '1',
    type: 'critical',
    title: 'Critical Vulnerability Detected',
    message: 'SQL injection vulnerability found in example.com login form',
    timestamp: '2024-01-15 14:32:15',
    read: false,
    source: 'CVE Scanner',
    actions: ['View Details', 'Mark as Fixed']
  },
  {
    id: '2',
    type: 'warning',
    title: 'Scan Timeout Warning',
    message: 'Network scan of 192.168.1.0/24 exceeded timeout limit',
    timestamp: '2024-01-15 13:45:22',
    read: false,
    source: 'Network Scanner',
    actions: ['Retry Scan', 'Adjust Timeout']
  },
  {
    id: '3',
    type: 'info',
    title: 'Scan Completed Successfully',
    message: 'Full security scan of api.example.com completed with 5 findings',
    timestamp: '2024-01-15 12:30:18',
    read: true,
    source: 'Full Scanner',
    actions: ['View Report']
  },
  {
    id: '4',
    type: 'success',
    title: 'Vulnerability Fixed',
    message: 'XSS vulnerability in contact form has been resolved',
    timestamp: '2024-01-15 11:15:45',
    read: true,
    source: 'Manual Update',
    actions: ['Verify Fix']
  }
];

const integrations = [
  {
    id: 'email',
    name: 'Email Notifications',
    description: 'Send alerts via email',
    icon: Mail,
    enabled: true,
    config: {
      recipients: ['admin@example.com', 'security@example.com'],
      threshold: 'medium'
    }
  },
  {
    id: 'slack',
    name: 'Slack Integration',
    description: 'Post alerts to Slack channels',
    icon: MessageSquare,
    enabled: true,
    config: {
      webhook: 'https://hooks.slack.com/services/...',
      channel: '#security-alerts'
    }
  },
  {
    id: 'webhook',
    name: 'Custom Webhook',
    description: 'Send alerts to custom endpoints',
    icon: Webhook,
    enabled: false,
    config: {
      url: '',
      method: 'POST'
    }
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Post alerts to Teams channels',
    icon: MessageSquare,
    enabled: false,
    config: {
      webhook: '',
      channel: ''
    }
  }
];

export function Notifications() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [filterType, setFilterType] = useState('all');
  const [showConfig, setShowConfig] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(integrations[0]);

  const tabs = [
    { id: 'alerts', name: 'Alerts', count: notifications.filter(n => !n.read).length },
    { id: 'integrations', name: 'Integrations', count: integrations.filter(i => i.enabled).length },
    { id: 'settings', name: 'Settings', count: 0 }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !notification.read;
    return notification.type === filterType;
  });

  const markAsRead = (notificationId: string) => {
    // Simulate marking as read
    console.log('Mark as read:', notificationId);
  };

  const markAllAsRead = () => {
    // Simulate marking all as read
    console.log('Mark all as read');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success': return <Check className="h-5 w-5 text-green-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'critical': return 'error';
      case 'warning': return 'warning';
      case 'success': return 'success';
      default: return 'info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage alerts and notification channels</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="secondary">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Critical</p>
              <p className="text-3xl font-bold mt-2">
                {notifications.filter(n => n.type === 'critical').length}
              </p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Warnings</p>
              <p className="text-3xl font-bold mt-2">
                {notifications.filter(n => n.type === 'warning').length}
              </p>
            </div>
            <AlertTriangle className="h-12 w-12 text-yellow-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Unread</p>
              <p className="text-3xl font-bold mt-2">
                {notifications.filter(n => !n.read).length}
              </p>
            </div>
            <Bell className="h-12 w-12 text-blue-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Integrations</p>
              <p className="text-3xl font-bold mt-2">
                {integrations.filter(i => i.enabled).length}
              </p>
            </div>
            <MessageSquare className="h-12 w-12 text-green-200" />
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
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex space-x-2">
                {['all', 'unread', 'critical', 'warning', 'info', 'success'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterType(filter)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      filterType === filter
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              {/* Notification List */}
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      notification.read
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                        : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </h4>
                            <Badge variant={getNotificationBadge(notification.type) as any}>
                              {notification.type}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>{notification.timestamp}</span>
                            <span>Source: {notification.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {notification.actions.length > 0 && (
                      <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        {notification.actions.map((action, index) => (
                          <Button key={index} variant="ghost" size="sm">
                            {action}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <integration.icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {integration.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant={integration.enabled ? 'success' : 'error'}>
                      {integration.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {integration.id === 'email' && integration.enabled && (
                      <>
                        <p>Recipients: {integration.config.recipients.join(', ')}</p>
                        <p>Threshold: {integration.config.threshold}</p>
                      </>
                    )}
                    {integration.id === 'slack' && integration.enabled && (
                      <>
                        <p>Channel: {integration.config.channel}</p>
                        <p>Webhook configured</p>
                      </>
                    )}
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button
                      variant={integration.enabled ? 'secondary' : 'primary'}
                      size="sm"
                      className="flex-1"
                    >
                      {integration.enabled ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedIntegration(integration);
                        setShowConfig(true);
                      }}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Alert Thresholds
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Critical Vulnerability Threshold
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option>Immediate</option>
                      <option>Within 5 minutes</option>
                      <option>Within 15 minutes</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      High Vulnerability Threshold
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option>Within 15 minutes</option>
                      <option>Within 30 minutes</option>
                      <option>Within 1 hour</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Scan Completion Notifications
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option>All scans</option>
                      <option>Only failed scans</option>
                      <option>Only scans with findings</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Notification Preferences
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      'Email notifications for critical vulnerabilities',
                      'Desktop notifications for scan completion',
                      'Weekly summary reports',
                      'Monthly security metrics',
                      'System maintenance notifications'
                    ].map((preference, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`pref-${index}`}
                          defaultChecked={index < 3}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`pref-${index}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          {preference}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Configuration Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Configure {selectedIntegration.name}
            </h3>
            
            <div className="space-y-4">
              {selectedIntegration.id === 'email' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Recipients (comma-separated)
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedIntegration.config.recipients.join(', ')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Alert Threshold
                    </label>
                    <select
                      defaultValue={selectedIntegration.config.threshold}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="low">Low and above</option>
                      <option value="medium">Medium and above</option>
                      <option value="high">High and above</option>
                      <option value="critical">Critical only</option>
                    </select>
                  </div>
                </>
              )}
              
              {selectedIntegration.id === 'slack' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      defaultValue={selectedIntegration.config.webhook}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Channel
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedIntegration.config.channel}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="#security-alerts"
                    />
                  </div>
                </>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
              <Button variant="secondary" onClick={() => setShowConfig(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}