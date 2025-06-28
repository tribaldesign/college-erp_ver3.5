import React from 'react';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
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
    { id: 1, activity: 'New signup request received', time: '2 hours ago', type: 'enrollment' },
    { id: 2, activity: 'User management system updated', time: '4 hours ago', type: 'system' },
    { id: 3, activity: 'New department added', time: '1 day ago', type: 'department' },
    { id: 4, activity: 'System backup completed', time: '2 days ago', type: 'system' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          change={totalStudents > 0 ? "+New students added" : "No students yet"}
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
              <p className="text-gray-500">No departments added yet</p>
              <p className="text-sm text-gray-400 mt-2">Add departments to see distribution</p>
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

      {/* Quick Stats */}
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