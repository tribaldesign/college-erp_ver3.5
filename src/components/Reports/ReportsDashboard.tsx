import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, GraduationCap, BookOpen, Download, Filter, Calendar, PieChart, LineChart, FileText } from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  type: 'academic' | 'attendance' | 'financial' | 'enrollment';
  description: string;
  lastGenerated: string;
  format: 'PDF' | 'Excel' | 'CSV';
  status: 'Ready' | 'Generating' | 'Failed';
}

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('current-semester');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [reportType, setReportType] = useState('');

  const mockReports: ReportData[] = [
    {
      id: '1',
      title: 'Student Academic Performance Report',
      type: 'academic',
      description: 'Comprehensive analysis of student grades and GPA trends',
      lastGenerated: '2024-01-15',
      format: 'PDF',
      status: 'Ready'
    },
    {
      id: '2',
      title: 'Attendance Summary Report',
      type: 'attendance',
      description: 'Department-wise attendance statistics and trends',
      lastGenerated: '2024-01-14',
      format: 'Excel',
      status: 'Ready'
    },
    {
      id: '3',
      title: 'Enrollment Analytics',
      type: 'enrollment',
      description: 'Student enrollment patterns and demographic analysis',
      lastGenerated: '2024-01-13',
      format: 'PDF',
      status: 'Generating'
    },
    {
      id: '4',
      title: 'Faculty Performance Report',
      type: 'academic',
      description: 'Teaching effectiveness and course evaluation metrics',
      lastGenerated: '2024-01-12',
      format: 'Excel',
      status: 'Ready'
    }
  ];

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'attendance': return 'bg-green-100 text-green-800';
      case 'financial': return 'bg-yellow-100 text-yellow-800';
      case 'enrollment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'Generating': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'academic', label: 'Academic Reports', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance Reports', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Reports & Analytics</h2>
            <p className="text-purple-100">Generate comprehensive reports and analyze institutional data</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <FileText className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{mockReports.length}</p>
              <p className="text-sm text-purple-100">Total Reports</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <TrendingUp className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">94.2%</p>
              <p className="text-sm text-purple-100">Data Accuracy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Download className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-purple-100">Downloads</p>
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
                    ? 'border-purple-500 text-purple-600'
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
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">1,325</p>
                    <p className="text-sm text-green-600">+5.2% this semester</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average GPA</p>
                    <p className="text-2xl font-bold text-gray-900">3.42</p>
                    <p className="text-sm text-green-600">+0.15 improvement</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                    <p className="text-2xl font-bold text-gray-900">94.2%</p>
                    <p className="text-sm text-blue-600">Stable trend</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Course Completion</p>
                    <p className="text-2xl font-bold text-gray-900">89.7%</p>
                    <p className="text-sm text-green-600">+2.3% increase</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {mockReports.slice(0, 3).map((report) => (
                  <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-gray-900">{report.title}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getReportTypeColor(report.type)}`}>
                            {report.type}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Last generated: {new Date(report.lastGenerated).toLocaleDateString()} • Format: {report.format}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-600 hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <PieChart className="h-8 w-8 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Generate Academic Report</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Create comprehensive academic performance reports</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <LineChart className="h-8 w-8 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Attendance Analytics</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Analyze attendance patterns and trends</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                  View Analytics
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Custom Report</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Build custom reports with specific parameters</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  Create Custom
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="current-semester">Current Semester</option>
                    <option value="previous-semester">Previous Semester</option>
                    <option value="academic-year">Academic Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Departments</option>
                    <option value="cs">Computer Science</option>
                    <option value="ee">Electrical Engineering</option>
                    <option value="me">Mechanical Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="gpa">GPA Analysis</option>
                    <option value="grades">Grade Distribution</option>
                    <option value="performance">Performance Trends</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Reports */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">GPA Distribution</h3>
                <div className="space-y-3">
                  {[
                    { range: '3.5 - 4.0', count: 245, percentage: 35.2 },
                    { range: '3.0 - 3.49', count: 198, percentage: 28.4 },
                    { range: '2.5 - 2.99', count: 156, percentage: 22.4 },
                    { range: '2.0 - 2.49', count: 98, percentage: 14.0 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.range}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                <div className="space-y-3">
                  {[
                    { dept: 'Computer Science', avg: 3.65, trend: '+0.12' },
                    { dept: 'Electrical Engineering', avg: 3.42, trend: '+0.08' },
                    { dept: 'Mechanical Engineering', avg: 3.38, trend: '+0.05' },
                    { dept: 'Civil Engineering', avg: 3.51, trend: '+0.15' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{item.dept}</span>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{item.avg}</p>
                        <p className="text-xs text-green-600">{item.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            {/* Attendance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Attendance</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">94.2%</p>
                  <p className="text-sm text-gray-600">Current Semester</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Present:</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Absent:</span>
                    <span className="font-medium">78</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trend</h3>
                <div className="space-y-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
                    const rates = [95.2, 94.8, 93.5, 94.1, 92.8];
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{day}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${rates[index]}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{rates[index]}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Classes</h3>
                <div className="space-y-3">
                  {[
                    { course: 'CS301', rate: 98.2 },
                    { course: 'EE201', rate: 96.8 },
                    { course: 'ME301', rate: 95.4 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{item.course}</span>
                      <span className="text-sm font-bold text-green-600">{item.rate}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Attendance Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Attendance Reports</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Daily Attendance Report', desc: 'Day-wise attendance summary', icon: Calendar },
                    { title: 'Student Attendance Report', desc: 'Individual student attendance records', icon: Users },
                    { title: 'Course Attendance Report', desc: 'Course-wise attendance analysis', icon: BookOpen },
                    { title: 'Department Attendance Report', desc: 'Department-wise attendance statistics', icon: BarChart3 },
                    { title: 'Low Attendance Alert', desc: 'Students with attendance below threshold', icon: TrendingUp },
                    { title: 'Attendance Trends', desc: 'Historical attendance pattern analysis', icon: LineChart }
                  ].map((report, index) => {
                    const Icon = report.icon;
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center space-x-3 mb-2">
                          <Icon className="h-5 w-5 text-purple-600" />
                          <h4 className="font-medium text-gray-900">{report.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{report.desc}</p>
                        <button className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-lg hover:bg-purple-200 transition-colors">
                          Generate
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Trends</h3>
                <div className="space-y-4">
                  {[
                    { year: '2024', students: 1325, change: '+5.2%' },
                    { year: '2023', students: 1259, change: '+3.8%' },
                    { year: '2022', students: 1213, change: '+2.1%' },
                    { year: '2021', students: 1188, change: '+1.5%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{item.year}</span>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{item.students}</p>
                        <p className="text-sm text-green-600">{item.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pass Rate</span>
                    <span className="font-bold text-green-600">89.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Dropout Rate</span>
                    <span className="font-bold text-red-600">3.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average GPA</span>
                    <span className="font-bold text-blue-600">3.42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Graduation Rate</span>
                    <span className="font-bold text-purple-600">92.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Analytics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <PieChart className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Predictive Analytics</h4>
                  <p className="text-sm text-gray-600 mb-3">Predict student performance and outcomes</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Run Analysis
                  </button>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <LineChart className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Trend Analysis</h4>
                  <p className="text-sm text-gray-600 mb-3">Analyze long-term trends and patterns</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                    View Trends
                  </button>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Comparative Analysis</h4>
                  <p className="text-sm text-gray-600 mb-3">Compare performance across departments</p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Compare Data
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