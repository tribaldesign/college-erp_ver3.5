import React, { useState } from 'react';
import { Settings, User, Shield, Bell, Database, Globe, Palette, Key, Mail, Phone, MapPin, Save, Edit3, Users, GraduationCap, BookOpen } from 'lucide-react';

interface SystemSettings {
  instituteName: string;
  instituteCode: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  academicYear: string;
  currentSemester: string;
  timezone: string;
  language: string;
  currency: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  attendanceAlerts: boolean;
  gradeUpdates: boolean;
  systemMaintenance: boolean;
  newEnrollments: boolean;
}

interface SecuritySettings {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    expiryDays: number;
  };
  sessionTimeout: number;
  twoFactorAuth: boolean;
  loginAttempts: number;
  accountLockoutTime: number;
}

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    instituteName: 'University College of Technology',
    instituteCode: 'UCT2024',
    address: '123 University Avenue, Education City, State 12345',
    phone: '+1-555-0100',
    email: 'admin@uct.edu',
    website: 'https://www.uct.edu',
    academicYear: '2023-2024',
    currentSemester: 'Fall 2024',
    timezone: 'America/New_York',
    language: 'English',
    currency: 'USD'
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    attendanceAlerts: true,
    gradeUpdates: true,
    systemMaintenance: true,
    newEnrollments: true
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90
    },
    sessionTimeout: 30,
    twoFactorAuth: false,
    loginAttempts: 5,
    accountLockoutTime: 15
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'academic', label: 'Academic Settings', icon: GraduationCap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: Database },
  ];

  const handleSystemSettingChange = (field: keyof SystemSettings, value: string) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: any) => {
    if (field.startsWith('passwordPolicy.')) {
      const policyField = field.split('.')[1];
      setSecuritySettings(prev => ({
        ...prev,
        passwordPolicy: { ...prev.passwordPolicy, [policyField]: value }
      }));
    } else {
      setSecuritySettings(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">System Settings</h2>
            <p className="text-gray-300">Configure system preferences and manage institutional settings</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Settings className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-300">Active Modules</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Shield className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-sm text-gray-300">System Uptime</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Database className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">2.4GB</p>
              <p className="text-sm text-gray-300">Database Size</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-gray-800 text-gray-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Institution Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Institution Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
                  <input
                    type="text"
                    value={systemSettings.instituteName}
                    onChange={(e) => handleSystemSettingChange('instituteName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution Code</label>
                  <input
                    type="text"
                    value={systemSettings.instituteCode}
                    onChange={(e) => handleSystemSettingChange('instituteCode', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={systemSettings.address}
                  onChange={(e) => handleSystemSettingChange('address', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={systemSettings.phone}
                    onChange={(e) => handleSystemSettingChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={systemSettings.email}
                    onChange={(e) => handleSystemSettingChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={systemSettings.website}
                    onChange={(e) => handleSystemSettingChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center space-x-2 transition-colors">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>

            {/* Regional Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={systemSettings.timezone}
                    onChange={(e) => handleSystemSettingChange('timezone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="America/New_York">Eastern Time (UTC-5)</option>
                    <option value="America/Chicago">Central Time (UTC-6)</option>
                    <option value="America/Denver">Mountain Time (UTC-7)</option>
                    <option value="America/Los_Angeles">Pacific Time (UTC-8)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={systemSettings.language}
                    onChange={(e) => handleSystemSettingChange('language', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={systemSettings.currency}
                    onChange={(e) => handleSystemSettingChange('currency', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Roles */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Roles & Permissions</h3>
              <div className="space-y-4">
                {[
                  { role: 'Administrator', users: 3, permissions: 'Full system access', color: 'bg-red-100 text-red-800' },
                  { role: 'Faculty', users: 45, permissions: 'Course management, grading, attendance', color: 'bg-blue-100 text-blue-800' },
                  { role: 'Student', users: 1325, permissions: 'View grades, attendance, profile management', color: 'bg-green-100 text-green-800' },
                  { role: 'Staff', users: 12, permissions: 'Administrative tasks, reports', color: 'bg-yellow-100 text-yellow-800' }
                ].map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${role.color}`}>
                        {role.role}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{role.users} users</p>
                        <p className="text-sm text-gray-600">{role.permissions}</p>
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* User Management Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Bulk User Import</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Import multiple users from CSV or Excel files</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  Import Users
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Key className="h-8 w-8 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Password Reset</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Reset passwords for multiple users</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                  Reset Passwords
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Access Control</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Manage user permissions and access levels</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  Manage Access
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            {/* Academic Year Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Academic Year Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                  <select
                    value={systemSettings.academicYear}
                    onChange={(e) => handleSystemSettingChange('academicYear', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
                  <select
                    value={systemSettings.currentSemester}
                    onChange={(e) => handleSystemSettingChange('currentSemester', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="Fall 2024">Fall 2024</option>
                    <option value="Spring 2024">Spring 2024</option>
                    <option value="Summer 2024">Summer 2024</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grading System */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Grading System</h3>
              <div className="space-y-4">
                {[
                  { grade: 'A', min: 90, max: 100, gpa: 4.0 },
                  { grade: 'B', min: 80, max: 89, gpa: 3.0 },
                  { grade: 'C', min: 70, max: 79, gpa: 2.0 },
                  { grade: 'D', min: 60, max: 69, gpa: 1.0 },
                  { grade: 'F', min: 0, max: 59, gpa: 0.0 }
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center p-3 border border-gray-200 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Grade {item.grade}</span>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={item.min}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Min %"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={item.max}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Max %"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={item.gpa}
                        step="0.1"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="GPA"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Attendance Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Attendance Required (%)</label>
                  <input
                    type="number"
                    defaultValue={75}
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Late Arrival Grace Period (minutes)</label>
                  <input
                    type="number"
                    defaultValue={15}
                    min="0"
                    max="60"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Notification Preferences */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {key === 'emailNotifications' && 'Send notifications via email'}
                        {key === 'smsNotifications' && 'Send notifications via SMS'}
                        {key === 'pushNotifications' && 'Send push notifications to mobile devices'}
                        {key === 'attendanceAlerts' && 'Alert when attendance falls below threshold'}
                        {key === 'gradeUpdates' && 'Notify when grades are updated'}
                        {key === 'systemMaintenance' && 'Notify about system maintenance'}
                        {key === 'newEnrollments' && 'Notify about new student enrollments'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleNotificationChange(key as keyof NotificationSettings, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Configuration */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
                  <input
                    type="text"
                    defaultValue="smtp.gmail.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                  <input
                    type="number"
                    defaultValue={587}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="email"
                    defaultValue="noreply@uct.edu"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password Policy */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Password Policy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
                  <input
                    type="number"
                    value={securitySettings.passwordPolicy.minLength}
                    onChange={(e) => handleSecurityChange('passwordPolicy.minLength', parseInt(e.target.value))}
                    min="6"
                    max="20"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                  <input
                    type="number"
                    value={securitySettings.passwordPolicy.expiryDays}
                    onChange={(e) => handleSecurityChange('passwordPolicy.expiryDays', parseInt(e.target.value))}
                    min="30"
                    max="365"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                {[
                  { key: 'requireUppercase', label: 'Require uppercase letters' },
                  { key: 'requireNumbers', label: 'Require numbers' },
                  { key: 'requireSpecialChars', label: 'Require special characters' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.passwordPolicy[item.key as keyof typeof securitySettings.passwordPolicy] as boolean}
                        onChange={(e) => handleSecurityChange(`passwordPolicy.${item.key}`, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Session & Login Security */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Session & Login Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                    min="5"
                    max="120"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={securitySettings.loginAttempts}
                    onChange={(e) => handleSecurityChange('loginAttempts', parseInt(e.target.value))}
                    min="3"
                    max="10"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lockout Time (minutes)</label>
                  <input
                    type="number"
                    value={securitySettings.accountLockoutTime}
                    onChange={(e) => handleSecurityChange('accountLockoutTime', parseInt(e.target.value))}
                    min="5"
                    max="60"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            {/* System Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">System Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Version:</span>
                    <span className="font-medium">v3.5.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Database Version:</span>
                    <span className="font-medium">PostgreSQL 14.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Backup:</span>
                    <span className="font-medium">2024-01-15 03:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Uptime:</span>
                    <span className="font-medium">15 days, 4 hours</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage Used:</span>
                    <span className="font-medium">2.4 GB / 10 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Users:</span>
                    <span className="font-medium">1,385</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Server Load:</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memory Usage:</span>
                    <span className="font-medium">4.2 GB / 8 GB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Maintenance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="h-8 w-8 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Database Backup</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Create a backup of the database</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  Create Backup
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Settings className="h-8 w-8 text-green-600" />
                  <h3 className="font-semibold text-gray-900">System Update</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Check for and install system updates</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                  Check Updates
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                  <h3 className="font-semibold text-gray-900">System Logs</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">View and download system logs</p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors">
                  View Logs
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
          <Save className="h-5 w-5" />
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  );
}