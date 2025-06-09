import React from 'react';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import { mockStudents, mockFaculty, mockCourses } from '../../data/mockData';

export default function Dashboard() {
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === 'Active').length;
  const totalFaculty = mockFaculty.length;
  const totalCourses = mockCourses.length;
  const averageGPA = (mockStudents.reduce((sum, student) => sum + student.gpa, 0) / totalStudents).toFixed(2);

  const recentActivities = [
    { id: 1, activity: 'New student Alice Johnson enrolled in Computer Science', time: '2 hours ago', type: 'enrollment' },
    { id: 2, activity: 'Dr. Sarah Johnson updated course schedule for Data Structures', time: '4 hours ago', type: 'schedule' },
    { id: 3, activity: 'Attendance recorded for CS301 - 45 students present', time: '6 hours ago', type: 'attendance' },
    { id: 4, activity: 'New faculty member Dr. Michael Brown joined Electrical Engineering', time: '1 day ago', type: 'faculty' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          change="+12% from last month"
          changeType="increase"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Faculty"
          value={totalFaculty}
          change="+2 new this month"
          changeType="increase"
          icon={GraduationCap}
          color="green"
        />
        <StatsCard
          title="Total Courses"
          value={totalCourses}
          change="No change"
          changeType="neutral"
          icon={BookOpen}
          color="purple"
        />
        <StatsCard
          title="Average GPA"
          value={averageGPA}
          change="+0.2 from last semester"
          changeType="increase"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <div className="space-y-4">
            {[
              { dept: 'Computer Science', students: 2, color: 'bg-blue-500' },
              { dept: 'Electrical Engineering', students: 1, color: 'bg-green-500' },
              { dept: 'Mechanical Engineering', students: 1, color: 'bg-purple-500' },
            ].map((item) => (
              <div key={item.dept} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{item.dept}</span>
                </div>
                <span className="text-sm text-gray-600">{item.students} students</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{activity.activity}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{activeStudents}</p>
            <p className="text-sm text-gray-600">Active Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">98%</p>
            <p className="text-sm text-gray-600">Attendance Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">142</p>
            <p className="text-sm text-gray-600">Total Classes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">15</p>
            <p className="text-sm text-gray-600">Departments</p>
          </div>
        </div>
      </div>
    </div>
  );
}