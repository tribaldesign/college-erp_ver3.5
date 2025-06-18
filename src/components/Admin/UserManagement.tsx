import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Key, 
  UserPlus, 
  GraduationCap, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Bell
} from 'lucide-react';
import { useAppContext, actions } from '../../context/AppContext';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'student' | 'faculty' | 'admin' | 'staff' | 'librarian';
  designation?: string;
  department?: string;
  rollNumber?: string;
  employeeId?: string;
  status: 'Active' | 'Inactive' | 'Pending';
  hasPassword: boolean;
  lastLogin?: string;
  createdDate: string;
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  userType: 'student' | 'faculty' | 'staff' | 'librarian';
  designation: string;
  department: string;
  rollNumber?: string;
  employeeId?: string;
  address: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

export default function UserManagement() {
  const { state, dispatch } = useAppContext();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@college.edu',
      phone: '+91-98765-43210',
      userType: 'faculty',
      designation: 'Professor',
      department: 'Computer Science',
      employeeId: 'FAC001',
      status: 'Active',
      hasPassword: true,
      lastLogin: '2024-01-15 09:30 AM',
      createdDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'Alice Johnson',
      email: 'alice.johnson@college.edu',
      phone: '+91-87654-32109',
      userType: 'student',
      department: 'Computer Science',
      rollNumber: 'CS21001',
      status: 'Active',
      hasPassword: true,
      lastLogin: '2024-01-15 08:45 AM',
      createdDate: '2024-01-01'
    },
    {
      id: '3',
      name: 'Bob Smith',
      email: 'bob.smith@college.edu',
      phone: '+91-76543-21098',
      userType: 'student',
      department: 'Political Science',
      rollNumber: 'PS21002',
      status: 'Pending',
      hasPassword: false,
      createdDate: '2024-01-15'
    },
    {
      id: '4',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@college.edu',
      phone: '+91-98765-12345',
      userType: 'librarian',
      designation: 'Librarian',
      department: 'Library',
      employeeId: 'LIB001',
      status: 'Active',
      hasPassword: true,
      lastLogin: '2024-01-14 10:15 AM',
      createdDate: '2024-01-01'
    },
    {
      id: '5',
      name: 'Priya Sharma',
      email: 'priya.sharma@college.edu',
      phone: '+91-87654-56789',
      userType: 'staff',
      designation: 'Administrative Assistant',
      department: 'Administration',
      employeeId: 'STF001',
      status: 'Active',
      hasPassword: true,
      lastLogin: '2024-01-15 11:20 AM',
      createdDate: '2024-01-01'
    }
  ]);

  // Sync with global state
  useEffect(() => {
    if (state.users && state.users.length > 0) {
      setUsers(state.users);
    } else {
      // Initialize global state with local users
      dispatch({ type: 'SYNC_DATA', payload: { users } });
    }
  }, [state.users, dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [signupRequestsCount, setSignupRequestsCount] = useState(0);

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    userType: 'student',
    designation: '',
    department: '',
    rollNumber: '',
    employeeId: '',
    address: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordData, setPasswordData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    sendEmail: true
  });

  // Get signup requests count
  useEffect(() => {
    if (state.signupRequests) {
      const pendingCount = state.signupRequests.filter(req => req.status === 'pending_approval').length;
      setSignupRequestsCount(pendingCount);
    }
  }, [state.signupRequests]);

  const departments = [
    'Computer Science',
    'Political Science',
    'English',
    'History',
    'Education',
    'Sociology',
    'Economics',
    'Geography',
    'Library',
    'Administration',
    'Staff'
  ];

  const facultyDesignations = [
    'Principal',
    'Director',
    'Dean',
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Senior Lecturer',
    'Visiting Professor',
    'Adjunct Professor',
    'Research Professor',
    'Clinical Professor',
    'Professor Emeritus',
    'Staff',
    'Librarian'
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.rollNumber && user.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (user.employeeId && user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !filterType || user.userType === filterType;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'students' && user.userType === 'student') ||
                      (activeTab === 'faculty' && user.userType === 'faculty') ||
                      (activeTab === 'staff' && (user.userType === 'staff' || user.userType === 'librarian')) ||
                      (activeTab === 'pending' && user.status === 'Pending');
    return matchesSearch && matchesType && matchesStatus && matchesTab;
  });

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      userType: formData.userType,
      designation: formData.userType === 'faculty' || formData.userType === 'staff' || formData.userType === 'librarian' ? formData.designation : undefined,
      department: formData.department,
      rollNumber: formData.userType === 'student' ? formData.rollNumber : undefined,
      employeeId: formData.userType !== 'student' ? formData.employeeId : undefined,
      status: 'Active',
      hasPassword: true,
      createdDate: new Date().toISOString().split('T')[0]
    };

    dispatch(actions.addUser(newUser));
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      userType: 'student',
      designation: '',
      department: '',
      rollNumber: '',
      employeeId: '',
      address: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: ''
    });

    alert(`${formData.userType === 'student' ? 'Student' : formData.userType === 'faculty' ? 'Faculty member' : formData.userType === 'librarian' ? 'Librarian' : 'Staff member'} added successfully with login credentials!`);
  };

  const handleAssignPassword = (user: User) => {
    setSelectedUser(user);
    setPasswordData({
      userId: user.id,
      password: '',
      confirmPassword: '',
      sendEmail: true
    });
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.password !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const updatedUser = {
      ...selectedUser,
      hasPassword: true,
      status: 'Active' as const
    };

    dispatch(actions.updateUser(updatedUser));
    setIsPasswordModalOpen(false);
    setPasswordData({
      userId: '',
      password: '',
      confirmPassword: '',
      sendEmail: true
    });

    alert(`Password assigned successfully! ${passwordData.sendEmail ? 'Login credentials have been sent via email.' : ''}`);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      dispatch(actions.deleteUser(userId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'student': return <GraduationCap className="h-4 w-4" />;
      case 'faculty': return <Users className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'librarian': return <BookOpen className="h-4 w-4" />;
      case 'staff': return <Users className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const tabs = [
    { id: 'all', label: 'All Users', count: users.length },
    { id: 'students', label: 'Students', count: users.filter(u => u.userType === 'student').length },
    { id: 'faculty', label: 'Faculty', count: users.filter(u => u.userType === 'faculty').length },
    { id: 'staff', label: 'Staff', count: users.filter(u => u.userType === 'staff' || u.userType === 'librarian').length },
    { id: 'pending', label: 'Pending', count: users.filter(u => u.status === 'Pending').length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">User Management</h2>
            <p className="text-purple-100">Add and manage students and faculty members with login credentials</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-sm text-purple-100">Total Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <GraduationCap className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{users.filter(u => u.userType === 'student').length}</p>
              <p className="text-sm text-purple-100">Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{users.filter(u => u.userType === 'faculty').length}</p>
              <p className="text-sm text-purple-100">Faculty</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Key className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{users.filter(u => !u.hasPassword).length}</p>
              <p className="text-sm text-purple-100">Pending Passwords</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
            <Upload className="h-4 w-4" />
            <span>Import Users</span>
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>

        {signupRequestsCount > 0 && (
          <button 
            onClick={() => setActiveTab('signup-requests')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
          >
            <Bell className="h-4 w-4" />
            <span>Signup Requests ({signupRequestsCount})</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                activeTab === tab.id ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, roll number, or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              <option value="">All Types</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
              <option value="staff">Staff</option>
              <option value="librarian">Librarian</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Department</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">ID/Roll Number</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Password</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Login</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getUserTypeIcon(user.userType)}
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{user.userType}</p>
                        {user.designation && (
                          <p className="text-sm text-gray-600">{user.designation}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{user.department}</td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {user.rollNumber || user.employeeId}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {user.hasPassword ? (
                        <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Assigned
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pending
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {user.lastLogin || 'Never'}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-gray-600 hover:text-purple-600 p-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {!user.hasPassword && (
                        <button
                          onClick={() => handleAssignPassword(user)}
                          className="text-gray-600 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Assign Password"
                        >
                          <Key className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <div className="flex items-center space-x-3">
                <UserPlus className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Add New User</h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">User Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['student', 'faculty', 'staff', 'librarian'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleInputChange('userType', type as any)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          formData.userType === type
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {type === 'student' ? <GraduationCap className="h-5 w-5" /> : 
                           type === 'faculty' ? <Users className="h-5 w-5" /> :
                           type === 'librarian' ? <BookOpen className="h-5 w-5" /> :
                           <Users className="h-5 w-5" />}
                          <span className="font-medium capitalize">{type}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="user@college.edu"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Indian) *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="+91-98765-43210"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: +91-XXXXX-XXXXX</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Faculty/Staff/Librarian-specific fields */}
                {(formData.userType === 'faculty' || formData.userType === 'staff' || formData.userType === 'librarian') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                      <select
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        required
                      >
                        <option value="">Select Designation</option>
                        {facultyDesignations.map(designation => (
                          <option key={designation} value={designation}>{designation}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID *</label>
                      <input
                        type="text"
                        value={formData.employeeId}
                        onChange={(e) => handleInputChange('employeeId', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder={`e.g., ${formData.userType === 'faculty' ? 'FAC001' : formData.userType === 'librarian' ? 'LIB001' : 'STF001'}`}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Student-specific fields */}
                {formData.userType === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
                    <input
                      type="text"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="e.g., CS21001"
                      required
                    />
                  </div>
                )}

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Enter address"
                    />
                  </div>
                </div>

                {/* Password Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Credentials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-600 mt-2">Passwords do not match</p>
                  )}
                </div>
              </form>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Assignment Modal */}
      {isPasswordModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center space-x-3">
                <Key className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Assign Password</h2>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">Assigning password for:</p>
                <p className="font-semibold text-gray-900">{selectedUser.name}</p>
                <p className="text-sm text-gray-600">{selectedUser.email}</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password *</label>
                  <input
                    type="password"
                    value={passwordData.password}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                {passwordData.password && passwordData.confirmPassword && passwordData.password !== passwordData.confirmPassword && (
                  <p className="text-sm text-red-600">Passwords do not match</p>
                )}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sendEmail"
                    checked={passwordData.sendEmail}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, sendEmail: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="sendEmail" className="ml-2 text-sm text-gray-700">
                    Send login credentials via email
                  </label>
                </div>
              </form>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
              >
                <Key className="h-4 w-4" />
                <span>Assign Password</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}