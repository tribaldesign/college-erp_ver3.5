import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, MapPin, Calendar, User, Save, Edit3, GraduationCap, BookOpen, Award, Clock } from 'lucide-react';
import { Student } from '../../types';

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'add';
  onSave?: (student: Student) => void;
}

export default function StudentModal({ student, isOpen, onClose, mode, onSave }: StudentModalProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState<Student>(student || {
    id: '',
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    department: '',
    semester: 1,
    dateOfBirth: '',
    address: '',
    parentContact: '',
    admissionDate: '',
    status: 'Active' as const,
    gpa: 0,
    idNumber: '',
    bloodType: '',
    age: 0,
    homeAddress: '',
    presentAddress: '',
    country: 'United States',
    subjectsTaken: [],
    facultyMembers: []
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      // Reset form for add mode
      setFormData({
        id: '',
        name: '',
        email: '',
        phone: '',
        rollNumber: '',
        department: '',
        semester: 1,
        dateOfBirth: '',
        address: '',
        parentContact: '',
        admissionDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        gpa: 0,
        idNumber: '',
        bloodType: '',
        age: 0,
        homeAddress: '',
        presentAddress: '',
        country: 'United States',
        subjectsTaken: [],
        facultyMembers: []
      });
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Add New Student' : 
               mode === 'edit' ? 'Edit Student' : 'Student Profile';

  const handleInputChange = (field: keyof Student, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'performance', label: 'Performance', icon: Award },
  ];

  // Mock data for student performance and courses
  const academicHistory = [
    { semester: 1, gpa: 3.6, credits: 18, status: 'Completed' },
    { semester: 2, gpa: 3.8, credits: 20, status: 'Completed' },
    { semester: 3, gpa: 3.7, credits: 19, status: 'Completed' },
    { semester: 4, gpa: 3.9, credits: 21, status: 'Completed' },
    { semester: 5, gpa: 3.8, credits: 20, status: 'Completed' },
    { semester: 6, gpa: 3.8, credits: 18, status: 'In Progress' },
  ];

  const enrolledCourses = [
    { code: 'CS301', name: 'Data Structures', credits: 4, grade: 'A', instructor: 'Dr. Sarah Johnson' },
    { code: 'CS302', name: 'Database Systems', credits: 3, grade: 'A-', instructor: 'Dr. Michael Brown' },
    { code: 'CS303', name: 'Software Engineering', credits: 4, grade: 'B+', instructor: 'Dr. Emily Davis' },
    { code: 'MATH201', name: 'Discrete Mathematics', credits: 3, grade: 'A', instructor: 'Dr. Robert Wilson' },
    { code: 'ENG101', name: 'Technical Writing', credits: 2, grade: 'A-', instructor: 'Prof. Lisa Anderson' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'Graduated': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 font-semibold';
    if (grade.startsWith('B')) return 'text-blue-600 font-semibold';
    if (grade.startsWith('C')) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center space-x-4">
            {isViewMode && student && (
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              {isViewMode && student && (
                <p className="text-blue-100">{student.rollNumber} • {student.department}</p>
              )}
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
        {isViewMode && (
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
                        ? 'border-blue-500 text-blue-600'
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
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isViewMode && student ? (
            <div className="space-y-6">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  {/* Status and Quick Actions */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                        <Edit3 className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>
                  </div>

                  {/* Personal Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <h4 className="font-medium text-gray-900">Contact Information</h4>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-gray-900">{student.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone</p>
                            <p className="text-gray-900">{student.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Parent Contact</p>
                            <p className="text-gray-900">{student.parentContact}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <h4 className="font-medium text-gray-900">Address</h4>
                        </div>
                        <p className="text-gray-900">{student.address}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <h4 className="font-medium text-gray-900">Important Dates</h4>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                            <p className="text-gray-900">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Admission Date</p>
                            <p className="text-gray-900">{new Date(student.admissionDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <GraduationCap className="h-5 w-5 text-gray-400" />
                          <h4 className="font-medium text-gray-900">Academic Info</h4>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Department</p>
                            <p className="text-gray-900">{student.department}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Current Semester</p>
                            <p className="text-gray-900">Semester {student.semester}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Current GPA</p>
                            <p className="text-gray-900 font-semibold text-lg">{student.gpa.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'academic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{student.gpa.toFixed(2)}</p>
                      <p className="text-sm text-blue-600">Current GPA</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">116</p>
                      <p className="text-sm text-green-600">Credits Earned</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">{student.semester}</p>
                      <p className="text-sm text-purple-600">Current Semester</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Academic History</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left py-3 px-6 font-medium text-gray-900">Semester</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-900">GPA</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-900">Credits</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {academicHistory.map((record) => (
                            <tr key={record.semester} className="hover:bg-gray-50">
                              <td className="py-3 px-6">Semester {record.semester}</td>
                              <td className="py-3 px-6 font-semibold">{record.gpa.toFixed(1)}</td>
                              <td className="py-3 px-6">{record.credits}</td>
                              <td className="py-3 px-6">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  record.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {record.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Current Semester Courses</h3>
                    <span className="text-sm text-gray-600">Semester {student.semester} • 5 Courses</span>
                  </div>

                  <div className="grid gap-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.code} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{course.code}</span>
                              <h4 className="font-semibold text-gray-900">{course.name}</h4>
                              <span className="text-sm text-gray-600">({course.credits} credits)</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Instructor: {course.instructor}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-lg font-bold ${getGradeColor(course.grade)}`}>
                              {course.grade}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">GPA Trend</h3>
                      <div className="space-y-3">
                        {academicHistory.slice(-4).map((record) => (
                          <div key={record.semester} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Semester {record.semester}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${(record.gpa / 4) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold">{record.gpa.toFixed(1)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Award className="h-5 w-5 text-yellow-500" />
                          <span className="text-sm">Dean's List - Fall 2023</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="h-5 w-5 text-blue-500" />
                          <span className="text-sm">Academic Excellence Award</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="h-5 w-5 text-green-500" />
                          <span className="text-sm">Perfect Attendance - Spring 2023</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">95%</p>
                        <p className="text-sm text-gray-600">Overall</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">98%</p>
                        <p className="text-sm text-gray-600">This Semester</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">3</p>
                        <p className="text-sm text-gray-600">Late Arrivals</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">2</p>
                        <p className="text-sm text-gray-600">Absences</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Form for Add/Edit modes
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="e.g., CS21001"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="student@college.edu"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="+1-555-0123"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
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
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Semester *
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => handleInputChange('semester', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select Semester</option>
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admission Date *
                  </label>
                  <input
                    type="date"
                    value={formData.admissionDate}
                    onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter complete address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Contact *
                  </label>
                  <input
                    type="tel"
                    value={formData.parentContact}
                    onChange={(e) => handleInputChange('parentContact', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="+1-555-0123"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>

              {mode === 'edit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPA
                  </label>
                  <input
                    type="number"
                    value={formData.gpa}
                    onChange={(e) => handleInputChange('gpa', parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="0.0"
                    min="0"
                    max="4.0"
                    step="0.1"
                  />
                </div>
              )}
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isViewMode ? 'Close' : 'Cancel'}
          </button>
          {!isViewMode && (
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>{mode === 'add' ? 'Add Student' : 'Save Changes'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}