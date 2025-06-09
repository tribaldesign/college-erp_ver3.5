import React from 'react';
import { X, BookOpen, Users, Clock, MapPin, Calendar, Award, User } from 'lucide-react';
import { Course } from '../../types';

interface CourseDetailsModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseDetailsModal({ course, isOpen, onClose }: CourseDetailsModalProps) {
  if (!isOpen || !course) return null;

  const enrollmentPercentage = (course.enrolledStudents / course.maxStudents) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-blue-100">{course.code} • {course.credits} Credits • {course.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{course.enrolledStudents}</p>
                <p className="text-sm text-blue-600">Enrolled</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{course.credits}</p>
                <p className="text-sm text-green-600">Credits</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-600">{course.semester}</p>
                <p className="text-sm text-purple-600">Semester</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
                  <span className="text-lg font-bold text-orange-600">%</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{enrollmentPercentage.toFixed(0)}%</p>
                <p className="text-sm text-orange-600">Capacity</p>
              </div>
            </div>

            {/* Course Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Course Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Course Code</p>
                    <p className="text-gray-900 font-mono">{course.code}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="text-gray-900">{course.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Credits</p>
                    <p className="text-gray-900">{course.credits} credit hours</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Semester</p>
                    <p className="text-gray-900">Semester {course.semester}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Instructor & Enrollment</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Instructor</p>
                    <p className="text-gray-900">{course.instructor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Enrollment</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900">{course.enrolledStudents} / {course.maxStudents}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${enrollmentPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Available Spots</p>
                    <p className="text-gray-900">{course.maxStudents - course.enrolledStudents} remaining</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {course.description && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Course Description</h3>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
              </div>
            )}

            {/* Prerequisites */}
            {course.prerequisites.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Prerequisites</h3>
                <div className="flex flex-wrap gap-2">
                  {course.prerequisites.map((prereq, index) => (
                    <span key={index} className="inline-flex px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-5 w-5 text-gray-400" />
                <h3 className="font-semibold text-gray-900">Class Schedule</h3>
              </div>
              <div className="space-y-3">
                {course.schedule.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{slot.day}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{slot.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{slot.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Enrollment Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Current Enrollment:</span>
                    <span className="font-semibold text-blue-900">{course.enrolledStudents} students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Maximum Capacity:</span>
                    <span className="font-semibold text-blue-900">{course.maxStudents} students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Enrollment Rate:</span>
                    <span className="font-semibold text-blue-900">{enrollmentPercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">Course Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-700">Total Classes:</span>
                    <span className="font-semibold text-green-900">{course.schedule.length} per week</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Credit Hours:</span>
                    <span className="font-semibold text-green-900">{course.credits} credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Academic Level:</span>
                    <span className="font-semibold text-green-900">Semester {course.semester}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Course
          </button>
        </div>
      </div>
    </div>
  );
}