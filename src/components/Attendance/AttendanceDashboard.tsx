import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, XCircle, Clock, Search, Filter, Plus, Edit, Download, Upload, BarChart3 } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  courseId: string;
  courseName: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  markedBy: string;
  timestamp: string;
}

interface AttendanceSession {
  id: string;
  courseId: string;
  courseName: string;
  instructor: string;
  date: string;
  startTime: string;
  endTime: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  lateStudents: number;
  status: 'Ongoing' | 'Completed' | 'Scheduled';
}

export default function AttendanceDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);
  const [selectedSession, setSelectedSession] = useState<AttendanceSession | null>(null);

  const mockAttendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      studentId: '1',
      studentName: 'Alice Johnson',
      rollNumber: 'CS21001',
      courseId: '1',
      courseName: 'Data Structures',
      date: '2024-01-15',
      status: 'Present',
      markedBy: 'Dr. Sarah Johnson',
      timestamp: '10:05 AM'
    },
    {
      id: '2',
      studentId: '2',
      studentName: 'Bob Smith',
      rollNumber: 'EE21002',
      courseId: '2',
      courseName: 'Circuit Analysis',
      date: '2024-01-15',
      status: 'Late',
      markedBy: 'Dr. Michael Brown',
      timestamp: '9:15 AM'
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Carol Davis',
      rollNumber: 'ME20001',
      courseId: '3',
      courseName: 'Thermodynamics',
      date: '2024-01-15',
      status: 'Absent',
      markedBy: 'Dr. Emily Davis',
      timestamp: '2:00 PM'
    }
  ];

  const mockSessions: AttendanceSession[] = [
    {
      id: '1',
      courseId: '1',
      courseName: 'Data Structures (CS301)',
      instructor: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      totalStudents: 45,
      presentStudents: 42,
      absentStudents: 2,
      lateStudents: 1,
      status: 'Completed'
    },
    {
      id: '2',
      courseId: '2',
      courseName: 'Circuit Analysis (EE201)',
      instructor: 'Dr. Michael Brown',
      date: '2024-01-15',
      startTime: '2:00 PM',
      endTime: '3:30 PM',
      totalStudents: 35,
      presentStudents: 33,
      absentStudents: 1,
      lateStudents: 1,
      status: 'Ongoing'
    },
    {
      id: '3',
      courseId: '3',
      courseName: 'Machine Learning (CS501)',
      instructor: 'Dr. Kevin Zhang',
      date: '2024-01-16',
      startTime: '3:30 PM',
      endTime: '5:00 PM',
      totalStudents: 25,
      presentStudents: 0,
      absentStudents: 0,
      lateStudents: 0,
      status: 'Scheduled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800 border-green-200';
      case 'Absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'Late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAttendanceRate = (present: number, total: number) => {
    return total > 0 ? ((present / total) * 100).toFixed(1) : '0';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sessions', label: 'Sessions', icon: Calendar },
    { id: 'records', label: 'Records', icon: Users },
    { id: 'mark', label: 'Mark Attendance', icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Attendance Management</h2>
            <p className="text-green-100">Track and manage student attendance across all courses</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">94.2%</p>
              <p className="text-sm text-green-100">Overall Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <CheckCircle className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-sm text-green-100">Present Today</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <XCircle className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">78</p>
              <p className="text-sm text-green-100">Absent Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
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
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Attendance</p>
                    <p className="text-2xl font-bold text-gray-900">94.2%</p>
                    <p className="text-sm text-green-600">+2.1% from yesterday</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Weekly Average</p>
                    <p className="text-2xl font-bold text-gray-900">92.8%</p>
                    <p className="text-sm text-blue-600">Stable trend</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                    <p className="text-sm text-yellow-600">1.7% of total</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Absent Students</p>
                    <p className="text-2xl font-bold text-gray-900">78</p>
                    <p className="text-sm text-red-600">5.8% of total</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Department-wise Attendance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Attendance</h3>
              <div className="space-y-4">
                {[
                  { dept: 'Computer Science', rate: 95.2, present: 233, total: 245 },
                  { dept: 'Electrical Engineering', rate: 93.1, present: 176, total: 189 },
                  { dept: 'Mechanical Engineering', rate: 91.6, present: 153, total: 167 },
                  { dept: 'Civil Engineering', rate: 94.8, present: 127, total: 134 }
                ].map((item) => (
                  <div key={item.dept} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.dept}</p>
                      <p className="text-sm text-gray-600">{item.present}/{item.total} students present</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{item.rate}%</p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${item.rate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Courses</option>
                    <option value="1">Data Structures</option>
                    <option value="2">Circuit Analysis</option>
                    <option value="3">Machine Learning</option>
                  </select>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>New Session</span>
                </button>
              </div>
            </div>

            {/* Sessions List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Attendance Sessions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {mockSessions.map((session) => (
                  <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-gray-900">{session.courseName}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSessionStatusColor(session.status)}`}>
                            {session.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {session.instructor} • {session.date} • {session.startTime} - {session.endTime}
                        </p>
                        <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Total:</span>
                            <span className="ml-1 font-medium">{session.totalStudents}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Present:</span>
                            <span className="ml-1 font-medium text-green-600">{session.presentStudents}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Absent:</span>
                            <span className="ml-1 font-medium text-red-600">{session.absentStudents}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Late:</span>
                            <span className="ml-1 font-medium text-yellow-600">{session.lateStudents}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right mr-4">
                          <p className="text-lg font-bold text-gray-900">
                            {calculateAttendanceRate(session.presentStudents, session.totalStudents)}%
                          </p>
                          <p className="text-sm text-gray-600">Attendance</p>
                        </div>
                        <button
                          onClick={() => setSelectedSession(session)}
                          className="text-gray-600 hover:text-green-600 p-2 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by student name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Import</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Records Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Student</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Course</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Marked By</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Time</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockAttendanceRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold text-gray-900">{record.studentName}</p>
                            <p className="text-sm text-gray-600">{record.rollNumber}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{record.courseName}</td>
                        <td className="py-4 px-6 text-gray-700">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{record.markedBy}</td>
                        <td className="py-4 px-6 text-gray-700">{record.timestamp}</td>
                        <td className="py-4 px-6">
                          <button className="text-gray-600 hover:text-green-600 p-1 rounded transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mark' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mark Attendance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Select Course</option>
                    <option value="1">Data Structures (CS301)</option>
                    <option value="2">Circuit Analysis (EE201)</option>
                    <option value="3">Machine Learning (CS501)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Select Session</option>
                    <option value="1">10:00 AM - 11:30 AM</option>
                    <option value="2">2:00 PM - 3:30 PM</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Student List</h4>
                  <div className="flex space-x-2">
                    <button className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors">
                      Mark All Present
                    </button>
                    <button className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors">
                      Mark All Absent
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="max-h-96 overflow-y-auto">
                    {[
                      { id: '1', name: 'Alice Johnson', rollNumber: 'CS21001', status: 'Present' },
                      { id: '2', name: 'Bob Smith', rollNumber: 'CS21002', status: 'Present' },
                      { id: '3', name: 'Carol Davis', rollNumber: 'CS21003', status: 'Absent' },
                      { id: '4', name: 'David Wilson', rollNumber: 'CS21004', status: 'Late' },
                    ].map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.rollNumber}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            student.status === 'Present' 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                          }`}>
                            Present
                          </button>
                          <button className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            student.status === 'Late' 
                              ? 'bg-yellow-600 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
                          }`}>
                            Late
                          </button>
                          <button className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            student.status === 'Absent' 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                          }`}>
                            Absent
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Save Attendance
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}