import React from 'react';
import { Users, GraduationCap, BookOpen, TrendingUp, Plus, UserPlus, Building } from 'lucide-react';
import StatsCard from './StatsCard';
import { useAppContext } from '../../context/AppContext';

export default function Dashboard() {
  const { state } = useAppContext();
  
  const totalStudents = state.students.length;
  const activeStudents = state.students.filter(s => s.status === 'Active').length;
  const totalFaculty = state.faculty.length;
  const totalCourses = state.courses.length;
  const averageGPA = totalStudents > 0 ? 
    (state.students.reduce((sum, student) => sum + student.gpa, 0) / totalStudents).toFixed(2) : 
    "0.00";

  const recentActivities = [
    { id: 1, activity: 'System initialized and ready for use', time: 'Just now', type: 'system' },
    { id: 2, activity: 'Welcome to St. Dominic\'s College ERP', time: 'Just now', type: 'system' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message for Empty System */}
      {totalStudents === 0 && totalFaculty === 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to St. Dominic's College ERP System</h2>
            <p className="text-blue-100 mb-6">Your college management system is ready to use. Start by adding departments, faculty, and students.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                <Building className="h-5 w-5" />
                <span>Add Departments</span>
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                <GraduationCap className="h-5 w-5" />
                <span>Add Faculty</span>
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                <UserPlus className="h-5 w-5" />
                <span>Add Students</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          change={totalStudents > 0 ? "Students enrolled" : "No students yet"}
          changeType={totalStudents > 0 ? "increase" : "neutral"}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Faculty"
          value={totalFaculty}
          change={totalFaculty > 0 ? `${totalFaculty} faculty members` : "No faculty yet"}
          changeType={totalFaculty > 0 ? "increase" : "neutral"}
          icon={GraduationCap}
          color="green"
        />
        <StatsCard
          title="Total Courses"
          value={totalCourses}
          change={totalCourses > 0 ? `${totalCourses} courses available` : "No courses yet"}
          changeType={totalCourses > 0 ? "increase" : "neutral"}
          icon={BookOpen}
          color="purple"
        />
        <StatsCard
          title="Average GPA"
          value={averageGPA}
          change={totalStudents > 0 ? "Based on current students" : "No data available"}
          changeType={totalStudents > 0 ? "increase" : "neutral"}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          {state.departments.length > 0 ? (
            <div className="space-y-4">
              {state.departments.map((dept) => (
                <div key={dept.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-blue-500`}></div>
                    <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{dept.totalStudents} students</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No departments added yet</p>
              <p className="text-sm text-gray-400">Add departments to see distribution</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Department</span>
              </button>
            </div>
          )}
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

      {/* Quick Actions */}
      {(totalStudents === 0 || totalFaculty === 0) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">1. Add Departments</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Create academic departments to organize your institution</p>
              <button className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors">
                Go to Departments
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">2. Add Faculty</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Register faculty members and assign them to departments</p>
              <button className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors">
                Add Faculty
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900">3. Add Students</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Enroll students and manage their academic records</p>
              <button className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-lg hover:bg-purple-200 transition-colors">
                Add Students
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{activeStudents}</p>
            <p className="text-sm text-gray-600">Active Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{state.signupRequests?.length || 0}</p>
            <p className="text-sm text-gray-600">Pending Requests</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{state.users?.length || 0}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{state.departments?.length || 0}</p>
            <p className="text-sm text-gray-600">Departments</p>
          </div>
        </div>
      </div>
    </div>
  );
}