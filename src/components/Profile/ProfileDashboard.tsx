import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, Shield, Key, Bell, MessageSquare, CheckCircle, X } from 'lucide-react';
import { useAppContext, actions } from '../../context/AppContext';
import { useNotifications } from '../Notifications/NotificationService';

export default function ProfileDashboard() {
  const { state, dispatch } = useAppContext();
  const { sendEmailNotification, sendWhatsAppNotification, sendAllNotifications } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: state.currentUser?.name || '',
    email: state.currentUser?.email || '',
    phone: state.currentUser?.phone || '',
    address: state.currentUser?.address || '',
    dateOfBirth: state.currentUser?.dateOfBirth || '',
    department: state.currentUser?.department || '',
    profileImage: state.currentUser?.profileImage || ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    dueDateReminders: true,
    systemAnnouncements: true,
    gradeUpdates: true,
    attendanceAlerts: true
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Update user profile in global state
    if (state.currentUser) {
      const updatedUser = {
        ...state.currentUser,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        department: formData.department
      };
      
      dispatch(actions.setCurrentUser(updatedUser));
      
      // Add notification
      dispatch(actions.addNotification({
        id: Date.now().toString(),
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile information has been updated successfully',
        timestamp: new Date().toISOString(),
        read: false
      }));
    }
    
    setIsEditing(false);
  };

  const handleSaveNotificationSettings = () => {
    // In a real app, this would save to the database
    console.log('Saving notification settings:', notificationSettings);
    
    // Add notification
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'success',
      title: 'Notification Settings Updated',
      message: 'Your notification preferences have been saved',
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    setIsNotificationSettingsOpen(false);
  };

  const handleTestNotifications = () => {
    if (formData.email && formData.phone) {
      sendAllNotifications(
        { email: formData.email, phone: formData.phone, name: formData.name },
        'Test Notification',
        'This is a test notification to verify your notification settings are working correctly.'
      );
    } else {
      alert('Please provide both email and phone number to test notifications');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {formData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{formData.name}</h2>
              <p className="text-blue-100 capitalize">{state.currentUser?.userType || 'User'}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={() => setIsNotificationSettingsOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span>Notification Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          {isEditing && (
            <button
              onClick={handleSaveProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <p className="text-gray-900">{formData.name}</p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <p className="text-gray-900">{formData.email}</p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <p className="text-gray-900">{formData.phone}</p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            {isEditing ? (
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Political Science">Political Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Education">Education</option>
                <option value="Sociology">Sociology</option>
                <option value="Economics">Economics</option>
                <option value="Geography">Geography</option>
                <option value="Library">Library</option>
                <option value="Administration">Administration</option>
              </select>
            ) : (
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <p className="text-gray-900">{formData.department || 'Not specified'}</p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <p className="text-gray-900">{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not specified'}</p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <p className="text-gray-900">{formData.address || 'Not specified'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Key className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-600">Last changed: 30 days ago</p>
              </div>
            </div>
            <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
              Change Password
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
            </div>
            <button className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>

      {/* Notification Test */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Test</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Test Notifications</p>
              <p className="text-sm text-gray-600">Send a test notification to verify your settings</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => sendEmailNotification(formData.email, 'Test Email Notification', 'This is a test email notification from the system.')}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Test Email</span>
            </button>
            <button 
              onClick={() => sendWhatsAppNotification(formData.phone, 'This is a test WhatsApp notification from the system.')}
              className="bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Test WhatsApp</span>
            </button>
            <button 
              onClick={handleTestNotifications}
              className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span>Test All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings Modal */}
      {isNotificationSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center space-x-3">
                <Bell className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Notification Settings</h2>
              </div>
              <button
                onClick={() => setIsNotificationSettingsOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Communication Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">WhatsApp Notifications</p>
                          <p className="text-sm text-gray-600">Receive notifications via WhatsApp</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.whatsappNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, whatsappNotifications: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Due Date Reminders</p>
                        <p className="text-sm text-gray-600">Notifications about library due dates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.dueDateReminders}
                          onChange={(e) => setNotificationSettings({...notificationSettings, dueDateReminders: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">System Announcements</p>
                        <p className="text-sm text-gray-600">Important announcements from the system</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.systemAnnouncements}
                          onChange={(e) => setNotificationSettings({...notificationSettings, systemAnnouncements: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Grade Updates</p>
                        <p className="text-sm text-gray-600">Notifications when grades are updated</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.gradeUpdates}
                          onChange={(e) => setNotificationSettings({...notificationSettings, gradeUpdates: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Attendance Alerts</p>
                        <p className="text-sm text-gray-600">Notifications about attendance status</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.attendanceAlerts}
                          onChange={(e) => setNotificationSettings({...notificationSettings, attendanceAlerts: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsNotificationSettingsOpen(false)}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotificationSettings}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}