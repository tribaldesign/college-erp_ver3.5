import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ClipboardCheck, 
  Award, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  FileText,
  Bell,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Star,
  CheckCircle,
  AlertCircle,
  Target
} from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  students: number;
  schedule: string;
  room: string;
  nextClass: string;
  attendance: number;
  assignments: number;
  pendingGrades: number;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  attendance: number;
  grade: string;
  lastActivity: string;
  status: 'excellent' | 'good' | 'average' | 'needs_attention';
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: 'active' | 'grading' | 'completed';
}

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const mockCourses: Course[] = [
    {
      id: '1',
      code: 'CS301',
      name: 'Data Structures',
      students: 45,
      schedule: 'Mon, Wed, Fri 10:00 AM',
      room: 'CS Lab 1',
      nextClass: '2024-01-16 10:00 AM',
      attendance: 94,
      assignments: 3,
      pendingGrades: 12
    },
    {
      id: '2',
      code: 'CS401',
      name: 'Advanced Algorithms',
      students: 30,
      schedule: 'Tue, Thu 2:00 PM',
      room: 'Room 201',
      nextClass: '2024-01-16 2:00 PM',
      attendance: 89,
      assignments: 2,
      pendingGrades: 8
    },
    {
      id: '3',
      code: 'CS501',
      name: 'Machine Learning',
      students: 25,
      schedule: 'Mon, Wed 3:30 PM',
      room: 'CS Lab 2',
      nextClass: '2024-01-17 3:30 PM',
      attendance: 96,
      assignments: 4,
      pendingGrades: 5
    }
  ];

  const mockStudents: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      rollNumber: 'CS21001',
      course: 'CS301',
      attendance: 98,
      grade: 'A',
      lastActivity: '2 hours ago',
      status: 'excellent'
    },
    {
      id: '2',
      name: 'Bob Smith',
      rollNumber: 'CS21002',
      course: 'CS301',
      attendance: 85,
      grade: 'B+',
      lastActivity: '1 day ago',
      status: 'good'
    },
    {
      id: '3',
      name: 'Carol Davis',
      rollNumber: 'CS21003',
      course: 'CS401',
      attendance: 72,
      grade: 'C+',
      lastActivity: '3 days ago',
      status: 'needs_attention'
    },
    {
      id: '4',
      name: 'David Wilson',
      rollNumber: 'CS21004',
      course: 'CS501',
      attendance: 91,
      grade: 'A-',
      lastActivity: '5 hours ago',
      status: 'good'
    }
  ];

  const mockAssignments: Assignment[] = [
    {
      id: '1',
      title: 'Binary Search Tree Implementation',
      course: 'CS301',
      dueDate: '2024-01-20',
      submissions: 38,
      totalStudents: 45,
      status: 'active'
    },
    {
      id: '2',
      title: 'Graph Algorithms Project',
      course: 'CS401',
      dueDate: '2024-01-18',
      submissions: 25,
      totalStudents: 30,
      status: 'grading'
    },
    {
      id: '3',
      title: 'Neural Network Analysis',
      course: 'CS501',
      dueDate: '2024-01-25',
      submissions: 20,
      totalStudents: 25,
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'average': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'needs_attention': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'grading': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const totalStudents = mockCourses.reduce((sum, course) => sum + course.students, 0);
  const averageAttendance = (mockCourses.reduce((sum, course) => sum + course.attendance, 0) / mockCourses.length).toFixed(1);
  const totalAssignments = mockAssignments.length;
  const pendingGrades = mockCourses.reduce((sum, course) => sum + course.pendingGrades, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Faculty Dashboard</h2>
            <p className="text-indigo-100">Welcome back! Here's your teaching overview for today</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{totalStudents}</p>
              <p className="text-sm text-indigo-100">Total Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{mockCourses.length}</p>
              <p className="text-sm text-indigo-100">Active Courses</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{averageAttendance}%</p>
              <p className="text-sm text-indigo-100">Avg Attendance</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Award className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{pendingGrades}</p>
              <p className="text-sm text-indigo-100">Pending Grades</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">New Assignment</p>
              <p className="text-sm text-gray-600">Create assignment</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ClipboardCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Take Attendance</p>
              <p className="text-sm text-gray-600">Mark today's attendance</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Grade Assignments</p>
              <p className="text-sm text-gray-600">{pendingGrades} pending</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Send Announcement</p>
              <p className="text-sm text-gray-600">Notify students</p>
            </div>
          </div>
        </button>
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
                    ? 'border-indigo-500 text-indigo-600'
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                <span className="text-sm text-gray-600">January 16, 2024</span>
              </div>
              <div className="space-y-3">
                {mockCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{course.name}</p>
                        <p className="text-sm text-gray-600">{course.code} • {course.room}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{course.schedule.split(' ').slice(-2).join(' ')}</p>
                      <p className="text-sm text-gray-600">{course.students} students</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New assignment submitted', student: 'Alice Johnson', course: 'CS301', time: '2 hours ago', type: 'submission' },
                    { action: 'Attendance marked', course: 'CS401', time: '4 hours ago', type: 'attendance' },
                    { action: 'Grade updated', student: 'Bob Smith', course: 'CS301', time: '1 day ago', type: 'grade' },
                    { action: 'New message received', student: 'Carol Davis', time: '2 days ago', type: 'message' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'submission' ? 'bg-blue-100' :
                        activity.type === 'attendance' ? 'bg-green-100' :
                        activity.type === 'grade' ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        {activity.type === 'submission' && <FileText className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'attendance' && <ClipboardCheck className="h-4 w-4 text-green-600" />}
                        {activity.type === 'grade' && <Award className="h-4 w-4 text-purple-600" />}
                        {activity.type === 'message' && <MessageSquare className="h-4 w-4 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">
                          {activity.student && `${activity.student} • `}
                          {activity.course && `${activity.course} • `}
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Assignment deadline approaching', message: 'Binary Search Tree Implementation due in 2 days', type: 'warning', time: '1 hour ago' },
                    { title: 'Low attendance alert', message: 'Carol Davis attendance below 75%', type: 'alert', time: '3 hours ago' },
                    { title: 'New course material uploaded', message: 'Machine Learning lecture notes added', type: 'info', time: '1 day ago' },
                    { title: 'Grade submission reminder', message: '12 assignments pending grading', type: 'reminder', time: '2 days ago' }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'warning' ? 'bg-yellow-100' :
                        notification.type === 'alert' ? 'bg-red-100' :
                        notification.type === 'info' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        {notification.type === 'warning' && <Clock className="h-4 w-4 text-yellow-600" />}
                        {notification.type === 'alert' && <AlertCircle className="h-4 w-4 text-red-600" />}
                        {notification.type === 'info' && <Bell className="h-4 w-4 text-blue-600" />}
                        {notification.type === 'reminder' && <Target className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                  <p className="text-sm text-gray-600">Student Rating</p>
                  <div className="flex justify-center mt-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-sm text-gray-600">Assignment Completion</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">A-</p>
                  <p className="text-sm text-gray-600">Average Grade</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">My Courses</h3>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{course.name}</h4>
                        <p className="text-sm text-gray-600">{course.code}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="text-gray-600 hover:text-indigo-600 p-1 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-green-600 p-1 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Students:</span>
                      <span className="font-medium text-gray-900">{course.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Schedule:</span>
                      <span className="font-medium text-gray-900">{course.schedule}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Room:</span>
                      <span className="font-medium text-gray-900">{course.room}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Attendance:</span>
                      <span className={`font-medium ${course.attendance >= 90 ? 'text-green-600' : course.attendance >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {course.attendance}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-blue-600">{course.assignments}</p>
                      <p className="text-xs text-blue-600">Assignments</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-orange-600">{course.pendingGrades}</p>
                      <p className="text-xs text-orange-600">Pending Grades</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Next Class:</p>
                    <p className="text-sm font-medium text-gray-900">{new Date(course.nextClass).toLocaleDateString()} at {new Date(course.nextClass).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">All Courses</option>
                  {mockCourses.map(course => (
                    <option key={course.id} value={course.code}>{course.code} - {course.name}</option>
                  ))}
                </select>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Student</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Course</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Attendance</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Grade</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Activity</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{student.name}</p>
                              <p className="text-sm text-gray-600">{student.rollNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{student.course}</td>
                        <td className="py-4 px-6">
                          <span className={`font-semibold ${
                            student.attendance >= 90 ? 'text-green-600' : 
                            student.attendance >= 80 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-gray-900">{student.grade}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(student.status)}`}>
                            {student.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{student.lastActivity}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-indigo-600 p-1 rounded">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-green-600 p-1 rounded">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Assignments</h3>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Create Assignment</span>
              </button>
            </div>

            <div className="grid gap-6">
              {mockAssignments.map((assignment) => (
                <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">{assignment.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAssignmentStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                      <div className="flex space-x-1">
                        <button className="text-gray-600 hover:text-indigo-600 p-1 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-green-600 p-1 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="font-medium text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Submissions</p>
                      <p className="font-medium text-gray-900">{assignment.submissions}/{assignment.totalStudents}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completion Rate</p>
                      <p className="font-medium text-gray-900">{Math.round((assignment.submissions / assignment.totalStudents) * 100)}%</p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg text-sm hover:bg-indigo-200 transition-colors">
                        View Submissions
                      </button>
                      <button className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition-colors">
                        Grade All
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Grade</p>
                    <p className="text-2xl font-bold text-gray-900">B+</p>
                    <p className="text-sm text-green-600">+0.3 from last semester</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Class Attendance</p>
                    <p className="text-2xl font-bold text-gray-900">{averageAttendance}%</p>
                    <p className="text-sm text-blue-600">Stable trend</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ClipboardCheck className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assignment Completion</p>
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                    <p className="text-sm text-purple-600">+5% improvement</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Student Satisfaction</p>
                    <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                    <p className="text-sm text-yellow-600">Excellent rating</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Performance Comparison */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance Comparison</h3>
              <div className="space-y-4">
                {mockCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{course.name}</p>
                        <p className="text-sm text-gray-600">{course.code} • {course.students} students</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Attendance</p>
                        <p className={`font-semibold ${course.attendance >= 90 ? 'text-green-600' : course.attendance >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {course.attendance}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Assignments</p>
                        <p className="font-semibold text-gray-900">{course.assignments}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="font-semibold text-orange-600">{course.pendingGrades}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Performance Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Performance Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">25%</p>
                  <p className="text-sm text-green-600">Excellent (A)</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">40%</p>
                  <p className="text-sm text-blue-600">Good (B)</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">30%</p>
                  <p className="text-sm text-yellow-600">Average (C)</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">5%</p>
                  <p className="text-sm text-red-600">Needs Help (D/F)</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}