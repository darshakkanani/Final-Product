import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { TargetManagement } from './pages/TargetManagement';
import { Reconnaissance } from './pages/Reconnaissance';
import { Enumeration } from './pages/Enumeration';
import { CVETesting } from './pages/CVETesting';
import { CustomTesting } from './pages/CustomTesting';
import { ChainTesting } from './pages/ChainTesting';
import { CoreTesting } from './pages/CoreTesting';
import { Results } from './pages/Results';
import { Reports } from './pages/Reports';
import { Scheduler } from './pages/Scheduler';
import { Logging } from './pages/Logging';
import { Plugins } from './pages/Plugins';
import { Notifications } from './pages/Notifications';
import { Users } from './pages/Users';
import { AIAssistant } from './pages/AIAssistant';
import { ThreatIntel } from './pages/ThreatIntel';
import { Trends } from './pages/Trends';
import { Settings } from './pages/Settings';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="targets" element={<TargetManagement />} />
        <Route path="recon" element={<Reconnaissance />} />
        <Route path="enumeration" element={<Enumeration />} />
        <Route path="cve-testing" element={<CVETesting />} />
        <Route path="custom-testing" element={<CustomTesting />} />
        <Route path="chain-testing" element={<ChainTesting />} />
        <Route path="core-testing" element={<CoreTesting />} />
        <Route path="results" element={<Results />} />
        <Route path="reports" element={<Reports />} />
        <Route path="scheduler" element={<Scheduler />} />
        <Route path="logging" element={<Logging />} />
        <Route path="plugins" element={<Plugins />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="users" element={<Users />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="threat-intel" element={<ThreatIntel />} />
        <Route path="trends" element={<Trends />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;