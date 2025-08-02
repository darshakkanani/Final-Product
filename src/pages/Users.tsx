import React, { useState } from 'react';
import { Users as UsersIcon, Plus, Edit, Trash2, Shield, Eye, Key, Mail } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

const mockUsers = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@example.com',
    role: 'admin' as const,
    status: 'active',
    lastLogin: '2024-01-15 14:30:00',
    twoFactorEnabled: true,
    avatar: 'https://ui-avatars.com/api/?name=John+Admin&background=dc2626&color=fff'
  },
  {
    id: '2',
    name: 'Sarah Analyst',
    email: 'analyst@example.com',
    role: 'analyst' as const,
    status: 'active',
    lastLogin: '2024-01-15 13:45:00',
    twoFactorEnabled: true,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Analyst&background=2563eb&color=fff'
  },
  {
    id: '3',
    name: 'Mike Viewer',
    email: 'viewer@example.com',
    role: 'viewer' as const,
    status: 'active',
    lastLogin: '2024-01-15 12:20:00',
    twoFactorEnabled: false,
    avatar: 'https://ui-avatars.com/api/?name=Mike+Viewer&background=16a34a&color=fff'
  },
  {
    id: '4',
    name: 'Lisa Security',
    email: 'security@example.com',
    role: 'analyst' as const,
    status: 'inactive',
    lastLogin: '2024-01-10 09:15:00',
    twoFactorEnabled: true,
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Security&background=ca8a04&color=fff'
  }
];

const rolePermissions = {
  admin: {
    name: 'Administrator',
    description: 'Full system access and user management',
    permissions: [
      'Manage users and roles',
      'Configure system settings',
      'Run all scan types',
      'View all reports',
      'Manage plugins and integrations',
      'Access audit logs'
    ],
    color: 'red'
  },
  analyst: {
    name: 'Security Analyst',
    description: 'Scan execution and analysis capabilities',
    permissions: [
      'Run security scans',
      'View scan results',
      'Generate reports',
      'Upload custom scripts',
      'Configure scan parameters'
    ],
    color: 'blue'
  },
  viewer: {
    name: 'Viewer',
    description: 'Read-only access to results and reports',
    permissions: [
      'View scan results',
      'View reports',
      'Export data',
      'View dashboard metrics'
    ],
    color: 'green'
  }
};

export function Users() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'viewer' as const,
    twoFactorEnabled: false
  });

  const handleAddUser = () => {
    // Simulate adding user
    setShowAddUser(false);
    setNewUser({
      name: '',
      email: '',
      role: 'viewer',
      twoFactorEnabled: false
    });
  };

  const handleEditUser = () => {
    // Simulate editing user
    setShowEditUser(false);
  };

  const toggleUserStatus = (userId: string) => {
    // Simulate toggling user status
    console.log('Toggle user status:', userId);
  };

  const resetPassword = (userId: string) => {
    // Simulate password reset
    console.log('Reset password for user:', userId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage users and role-based access control</p>
        </div>
        <Button onClick={() => setShowAddUser(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Users</p>
              <p className="text-3xl font-bold mt-2">{mockUsers.length}</p>
            </div>
            <UsersIcon className="h-12 w-12 text-blue-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Active Users</p>
              <p className="text-3xl font-bold mt-2">
                {mockUsers.filter(u => u.status === 'active').length}
              </p>
            </div>
            <Shield className="h-12 w-12 text-green-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Administrators</p>
              <p className="text-3xl font-bold mt-2">
                {mockUsers.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <Key className="h-12 w-12 text-red-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">2FA Enabled</p>
              <p className="text-3xl font-bold mt-2">
                {mockUsers.filter(u => u.twoFactorEnabled).length}
              </p>
            </div>
            <Shield className="h-12 w-12 text-purple-200" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users List */}
        <div className="lg:col-span-2">
          <Card title="Users" description="Manage system users and their access">
            <div className="space-y-4">
              {mockUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{user.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={
                          user.role === 'admin' ? 'error' : 
                          user.role === 'analyst' ? 'info' : 'success'
                        }>
                          {rolePermissions[user.role].name}
                        </Badge>
                        <Badge variant={user.status === 'active' ? 'success' : 'warning'}>
                          {user.status}
                        </Badge>
                        {user.twoFactorEnabled && (
                          <Badge variant="info">2FA</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400 mr-4">
                      <p>Last login:</p>
                      <p>{new Date(user.lastLogin).toLocaleString()}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditUser(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => resetPassword(user.id)}
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === 'active' ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <Shield className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Role Permissions */}
        <Card title="Role Permissions" description="Role-based access control">
          <div className="space-y-4">
            {Object.entries(rolePermissions).map(([roleKey, role]) => (
              <div key={roleKey} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant={role.color as any}>{role.name}</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{role.description}</p>
                <div className="space-y-1">
                  {role.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New User</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="viewer">Viewer</option>
                  <option value="analyst">Security Analyst</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={newUser.twoFactorEnabled}
                  onChange={(e) => setNewUser({...newUser, twoFactorEnabled: e.target.checked})}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Require two-factor authentication
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleAddUser} className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
              <Button variant="secondary" onClick={() => setShowAddUser(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Edit User: {selectedUser.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  defaultValue={selectedUser.role}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="viewer">Viewer</option>
                  <option value="analyst">Security Analyst</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  defaultValue={selectedUser.status}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="editTwoFactor"
                  defaultChecked={selectedUser.twoFactorEnabled}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="editTwoFactor" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Two-factor authentication enabled
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleEditUser} className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="secondary" onClick={() => setShowEditUser(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}