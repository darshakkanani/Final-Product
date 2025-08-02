import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, Shield, Target, Search, Scan, Bug, Code, Link,
  TestTube, FileText, Calendar, FileCheck, Puzzle,
  Bell, Users, Settings, Bot, TrendingUp, Activity,
  ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Target Management', href: '/targets', icon: Target },
  { name: 'Reconnaissance', href: '/recon', icon: Search },
  { name: 'Enumeration', href: '/enumeration', icon: Scan },
  { name: 'CVE Testing', href: '/cve-testing', icon: Bug },
  { name: 'Custom Testing', href: '/custom-testing', icon: Code },
  { name: 'Chain Testing', href: '/chain-testing', icon: Link },
  { name: 'Core Testing', href: '/core-testing', icon: TestTube },
  { name: 'Scan Results', href: '/results', icon: FileText },
  { name: 'Reports', href: '/reports', icon: FileCheck },
  { name: 'Scheduler', href: '/scheduler', icon: Calendar },
  { name: 'Logging', href: '/logging', icon: Activity },
  { name: 'Plugin Store', href: '/plugins', icon: Puzzle },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'User Management', href: '/users', icon: Users },
  { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
  { name: 'Threat Intel', href: '/threat-intel', icon: Shield },
  { name: 'Vuln Trends', href: '/trends', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  return (
    <div className={`bg-gray-900 text-white ${collapsed ? 'w-16' : 'w-64'} transition-all duration-200 flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold">Wildfire</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-700 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className={`flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}