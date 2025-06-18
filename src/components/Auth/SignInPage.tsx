import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, GraduationCap, Users, Shield } from 'lucide-react';

interface SignInPageProps {
  onSignIn: (usernameOrEmail: string, password: string, userType: string) => void;
  onSwitchToSignUp: () => void;
}

export default function SignInPage({ onSignIn, onSwitchToSignUp }: SignInPageProps) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSignIn(usernameOrEmail, password, userType);
    } catch (err: any) {
      setError(err.message || 'Invalid username or password. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    { id: 'admin', label: 'Admin', icon: Shield, color: 'bg-purple-500' },
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'bg-blue-500' },
    { id: 'faculty', label: 'Faculty', icon: Users, color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-lg border border-gray-100">
                <img 
                  src="https://i.ibb.co/1GyxzVc0/logo.png" 
                  alt="St. Dominic's College Logo" 
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    // Fallback to a colored div if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">SD</div>';
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">St. Dominic's College</h1>
                <p className="text-gray-600">College ERP System</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome Back to Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Digital Campus</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Access your academic world with a single sign-in. Manage courses, track progress, and stay connected with your education.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Course Management</h3>
              <p className="text-sm text-gray-600">Access all your courses, assignments, and academic resources in one place.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-600">Connect with faculty, classmates, and staff across your institution.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center lg:justify-start space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">1,325</p>
              <p className="text-sm text-gray-600">Active Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">45</p>
              <p className="text-sm text-gray-600">Faculty Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">120+</p>
              <p className="text-sm text-gray-600">Courses</p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-lg border border-gray-100">
                  <img 
                    src="https://i.ibb.co/1GyxzVc0/logo.png" 
                    alt="St. Dominic's College Logo" 
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      // Fallback to a colored div if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">SD</div>';
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">St. Dominic's College</h1>
                  <p className="text-sm text-gray-600">College ERP System</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">Welcome back! Please sign in to your account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
              <div className="grid grid-cols-3 gap-3">
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setUserType(type.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        userType === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username/Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === 'admin' ? 'Username' : 'Email Address'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={userType === 'admin' ? 'text' : 'email'}
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder={userType === 'admin' ? 'Enter your username' : 'Enter your email'}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                {userType !== 'admin' && (
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Sign Up Link - Only for non-admin users */}
            {userType !== 'admin' && (
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={onSwitchToSignUp}
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    Request access from admin
                  </button>
                </p>
              </div>
            )}

            {/* Admin Credentials Info */}
            {userType === 'admin' && (
              <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <p className="text-xs text-purple-700 text-center mb-2">Admin Access Only</p>
                <div className="text-xs text-center">
                  <p className="text-purple-600">Contact system administrator for credentials</p>
                </div>
              </div>
            )}

            {/* Non-Admin Notice */}
            {userType !== 'admin' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-700 text-center mb-2">Student & Faculty Access</p>
                <div className="text-xs text-center">
                  <p className="text-blue-600">Login credentials are assigned by the administrator</p>
                  <p className="text-blue-600 mt-1">Please contact admin for your username and password</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}