import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Smartphone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/UI/Button';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState<'app' | 'email'>('app');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!show2FA) {
      // First step - email/password
      if (email && password) {
        setShow2FA(true);
      } else {
        setError('Please enter both email and password');
      }
    } else {
      // Second step - 2FA
      const success = await login(email, password, twoFactorCode);
      if (!success) {
        setError('Invalid credentials or 2FA code');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Wildfire Security Suite
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Sign in to your security dashboard
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!show2FA ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="admin@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Enter the verification code from your authenticator app
                  </p>
                </div>

                <div className="flex justify-center space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setTwoFactorMethod('app')}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      twoFactorMethod === 'app' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Authenticator App
                  </button>
                  <button
                    type="button"
                    onClick={() => setTwoFactorMethod('email')}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      twoFactorMethod === 'email' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email OTP
                  </button>
                </div>

                <div>
                  <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Verification Code
                  </label>
                  <input
                    id="twoFactorCode"
                    name="twoFactorCode"
                    type="text"
                    required
                    maxLength={6}
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500 text-center text-lg font-mono"
                    placeholder="123456"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Signing in...' : show2FA ? 'Verify & Sign In' : 'Continue'}
              </Button>
            </div>

            {!show2FA && (
              <div className="text-center">
                <a href="#" className="text-sm text-red-600 hover:text-red-500 dark:text-red-400">
                  Forgot your password?
                </a>
              </div>
            )}

            {show2FA && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShow2FA(false)}
                  className="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400"
                >
                  ← Back to login
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}