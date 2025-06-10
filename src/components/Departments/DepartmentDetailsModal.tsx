import React, { useState } from 'react';
import { X, Building, Users, GraduationCap, BookOpen, Mail, Phone, MapPin, Calendar, Award, Edit3, Plus, Trash2 } from 'lucide-react';
import { Department, Subject } from '../../types';

interface DepartmentDetailsModalProps {
  department: Department | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DepartmentDetailsModal({ department, isOpen, onClose }: DepartmentDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !department) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSubjectTypeColor = (type: string) => {
    switch (type) {
      case 'Core': return 'bg-blue-100 text-blue-800';
      case 'Elective': return 'bg-green-100 text-green-800';
      case 'Lab': return 'bg-purple-100 text-purple-800';
      case 'Project': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'statistics', label: 'Statistics', icon: Award },
  ];

  const subjectsBySemester = department.subjects.reduce((acc, subject) => {
    if (!acc[subject.semester]) {
      acc[subject.semester] = [];
    }
    acc[subject.semester].push(subject);
    return acc;
  }, {} as Record<number, Subject[]>);

  const totalCredits = department.subjects.reduce((sum, subject) => sum + subject.credits, 0);
  const coreSubjects = department.subjects.filter(s => s.type === 'Core').length;
  const electiveSubjects = department.subjects.filter(s => s.type === 'Elective').length;
  const labSubjects = department.subjects.filter(s => s.type === 'Lab').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold">
              {department.code}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{department.name}</h2>
              <p className="text-indigo-100">Department Details • Est. {department.establishedYear}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Status and Quick Actions */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(department.status)}`}>
                  {department.status}
                </span>
                <div className="flex space-x-2">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Department</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{department.totalStudents}</p>
                  <p className="text-sm text-blue-600">Students</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{department.totalFaculty}</p>
                  <p className="text-sm text-green-600">Faculty</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{department.totalCourses}</p>
                  <p className="text-sm text-purple-600">Courses</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
                    <span className="text-lg font-bold text-orange-600">📚</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{department.subjects.length}</p>
                  <p className="text-sm text-orange-600">Subjects</p>
                </div>
              </div>

              {/* Department Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Building className="h-5 w-5 text-gray-400" />
                    <h3 className="font-semibold text-gray-900">Department Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Department Head</p>
                      <p className="text-gray-900">{department.head}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Established</p>
                      <p className="text-gray-900">{department.establishedYear}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Department Code</p>
                      <p className="text-gray-900 font-mono">{department.code}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <h3 className="font-semibold text-gray-900">Contact & Location</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Building</p>
                      <p className="text-gray-900">{department.building}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{department.contactEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{department.contactPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Department Description</h3>
                <p className="text-gray-700 leading-relaxed">{department.description}</p>
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Department Subjects</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{department.subjects.length} total subjects</span>
                  <span>•</span>
                  <span>{totalCredits} total credits</span>
                </div>
              </div>

              {/* Subject Type Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">{coreSubjects}</p>
                  <p className="text-sm text-blue-600">Core Subjects</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-green-600">{electiveSubjects}</p>
                  <p className="text-sm text-green-600">Electives</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-purple-600">{labSubjects}</p>
                  <p className="text-sm text-purple-600">Lab Subjects</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-orange-600">{totalCredits}</p>
                  <p className="text-sm text-orange-600">Total Credits</p>
                </div>
              </div>

              {/* Subjects by Semester */}
              <div className="space-y-6">
                {Object.keys(subjectsBySemester)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(semester => (
                    <div key={semester} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h4 className="font-semibold text-gray-900">
                          Semester {semester} ({subjectsBySemester[parseInt(semester)].length} subjects)
                        </h4>
                      </div>
                      <div className="p-6">
                        <div className="grid gap-4">
                          {subjectsBySemester[parseInt(semester)].map((subject) => (
                            <div key={subject.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subject.code}</span>
                                  <h5 className="font-semibold text-gray-900">{subject.name}</h5>
                                  <span className="text-sm text-gray-600">({subject.credits} credits)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSubjectTypeColor(subject.type)}`}>
                                    {subject.type}
                                  </span>
                                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(subject.status)}`}>
                                    {subject.status}
                                  </span>
                                </div>
                              </div>
                              
                              {subject.description && (
                                <p className="text-sm text-gray-600 mb-2">{subject.description}</p>
                              )}
                              
                              {subject.prerequisites.length > 0 && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500">Prerequisites:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {subject.prerequisites.map((prereq, index) => (
                                      <span key={index} className="inline-flex px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                                        {prereq}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {department.subjects.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No subjects defined</h3>
                  <p className="text-gray-600">This department doesn't have any subjects configured yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Department Statistics</h3>

              {/* Academic Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Academic Distribution</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Students per Faculty</span>
                      <span className="font-semibold">
                        {department.totalFaculty > 0 ? Math.round(department.totalStudents / department.totalFaculty) : 0}:1
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Courses per Faculty</span>
                      <span className="font-semibold">
                        {department.totalFaculty > 0 ? Math.round(department.totalCourses / department.totalFaculty) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Credits per Subject</span>
                      <span className="font-semibold">
                        {department.subjects.length > 0 ? (totalCredits / department.subjects.length).toFixed(1) : 0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Subject Type Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Core Subjects</span>
                      </div>
                      <span className="font-semibold">{coreSubjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Elective Subjects</span>
                      </div>
                      <span className="font-semibold">{electiveSubjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Lab Subjects</span>
                      </div>
                      <span className="font-semibold">{labSubjects}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Timeline */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Department Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Department Established</p>
                      <p className="text-sm text-gray-600">{department.establishedYear} • {new Date().getFullYear() - department.establishedYear} years ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Current Status</p>
                      <p className="text-sm text-gray-600">{department.status} department with {department.subjects.length} subjects</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">{department.totalStudents}</p>
                    <p className="text-sm text-gray-600">Total Enrollment</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{department.totalFaculty}</p>
                    <p className="text-sm text-gray-600">Faculty Strength</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{department.totalCourses}</p>
                    <p className="text-sm text-gray-600">Course Offerings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{totalCredits}</p>
                    <p className="text-sm text-gray-600">Total Credits</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Edit Department
          </button>
        </div>
      </div>
    </div>
  );
}