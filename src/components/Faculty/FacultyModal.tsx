import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, MapPin, Calendar, User, Save, Edit3, GraduationCap, BookOpen, Award, Clock, Users, Star } from 'lucide-react';
import { Faculty } from '../../types';

interface FacultyModalProps {
  faculty: Faculty | null;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'add';
  onSave?: (faculty: Faculty) => void;
}

export default function FacultyModal({ faculty, isOpen, onClose, mode, onSave }: FacultyModalProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState<Faculty>(faculty || {
    id: '',
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    designation: '',
    qualification: '',
    experience: 0,
    subjects: [],
    joiningDate: '',
    status: 'Active' as const,
    idNumber: '',
    bloodType: '',
    age: 0,
    dateOfBirth: '',
    homeAddress: '',
    presentAddress: '',
    country: 'United States'
  });

  useEffect(() => {
    if (faculty) {
      setFormData(faculty);
    } else {
      // Reset form for add mode
      setFormData({
        id: '',
        name: '',
        email: '',
        phone: '',
        employeeId: '',
        department: '',
        designation: '',
        qualification: '',
        experience: 0,
        subjects: [],
        joiningDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        idNumber: '',
        bloodType: '',
        age: 0,
        dateOfBirth: '',
        homeAddress: '',
        presentAddress: '',
        country: 'United States'
      });
    }
  }, [faculty, isOpen]);

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Add New Faculty' : 
               mode === 'edit' ? 'Edit Faculty' : 'Faculty Profile';

  const handleInputChange = (field: keyof Faculty, value: any) => {
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

  // Mock data for faculty performance and courses
  const teachingHistory = [
    { semester: 'Fall 2023', courses: 3, students: 120, rating: 4.8 },
    { semester: 'Spring 2023', courses: 2, students: 80, rating: 4.7 },
    { semester: 'Fall 2022', courses: 3, students: 135, rating: 4.9 },
    { semester: 'Spring 2022', courses: 2, students: 75, rating: 4.6 },
  ];

  const currentCourses = [
    { code: 'CS301', name: 'Data Structures', students: 45, schedule: 'Mon, Wed, Fri 10:00 AM', room: 'CS Lab 1' },
    { code: 'CS401', name: 'Advanced Algorithms', students: 30, schedule: 'Tue, Thu 2:00 PM', room: 'Room 201' },
    { code: 'CS501', name: 'Machine Learning', students: 25, schedule: 'Mon, Wed 3:30 PM', room: 'CS Lab 2' },
  ];

  const achievements = [
    { title: 'Best Teacher Award 2023', date: '2023-05-15', type: 'Teaching' },
    { title: 'Research Excellence Award', date: '2022-12-10', type: 'Research' },
    { title: 'Outstanding Faculty Recognition', date: '2022-08-20', type: 'Service' },
    { title: 'Published 15 Research Papers', date: '2023-01-01', type: 'Research' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDesignationColor = (designation: string) => {
    switch (designation) {
      case 'Professor': return 'bg-purple-100 text-purple-800';
      case 'Associate Professor': return 'bg-blue-100 text-blue-800';
      case 'Assistant Professor': return 'bg-indigo-100 text-indigo-800';
      case 'Lecturer': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'Teaching': return <GraduationCap className="h-4 w-4 text-blue-500" />;
      case 'Research': return <BookOpen className="h-4 w-4 text-green-500" />;
      case 'Service': return <Award className="h-4 w-4 text-purple-500" />;
      default: return <Star className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center space-x-4">
            {isViewMode && faculty && (
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                {faculty.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              {isViewMode && faculty && (
                <p className="text-purple-100">{faculty.employeeId} • {faculty.designation}</p>
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
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isViewMode && faculty ? (
            <div className="space-y-6">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  {/* Status and Quick Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(faculty.status)}`}>
                        {faculty.status}
                      </span>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getDesignationColor(faculty.designation)}`}>
                        {faculty.designation}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
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
                            <p className="text-gray-900">{faculty.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone</p>
                            <p className="text-gray-900">{faculty.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Employee ID</p>
                            <p className="text-gray-900 font-mono">{faculty.employeeId}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <GraduationCap className="h-5 w-5 text-gray-400" />
                          <h4 className="font-medium text-gray-900">Academic Information</h4>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Department</p>
                            <p className="text-gray-900">{faculty.department}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Qualification</p>
                            <p className="text-gray-900">{faculty.qualification}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Experience</p>
                            <p className="text-gray-900">{faculty.experience} years</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <h4 className="font-medium text-gray-900">Employment Details</h4>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Joining Date</p>
                            <p className="text-gray-900">{new Date(faculty.joiningDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Years at Institution</p>
                            <p className="text-gray-900">
                              {Math.floor((new Date().getTime() - new Date(faculty.joiningDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                          <h4 className="font-medium text-gray-900">Subjects Taught</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {faculty.subjects.map((subject, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'academic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">{faculty.experience}</p>
                      <p className="text-sm text-purple-600">Years Experience</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{faculty.subjects.length}</p>
                      <p className="text-sm text-blue-600">Subjects</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">4.8</p>
                      <p className="text-sm text-green-600">Avg Rating</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-orange-600">15</p>
                      <p className="text-sm text-orange-600">Publications</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Teaching History</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left py-3 px-6 font-medium text-gray-900">Semester</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-900">Courses</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-900">Students</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-900">Rating</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {teachingHistory.map((record, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-3 px-6">{record.semester}</td>
                              <td className="py-3 px-6">{record.courses}</td>
                              <td className="py-3 px-6">{record.students}</td>
                              <td className="py-3 px-6">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="font-semibold">{record.rating}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements & Recognition</h3>
                    <div className="space-y-3">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          {getAchievementIcon(achievement.type)}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{achievement.title}</p>
                            <p className="text-sm text-gray-600">{new Date(achievement.date).toLocaleDateString()}</p>
                          </div>
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            {achievement.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Current Semester Courses</h3>
                    <span className="text-sm text-gray-600">Fall 2023 • {currentCourses.length} Courses</span>
                  </div>

                  <div className="grid gap-4">
                    {currentCourses.map((course) => (
                      <div key={course.code} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{course.code}</span>
                            <h4 className="font-semibold text-gray-900">{course.name}</h4>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>{course.students} students</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{course.schedule}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{course.room}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Load Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{currentCourses.length}</p>
                        <p className="text-sm text-gray-600">Active Courses</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {currentCourses.reduce((sum, course) => sum + course.students, 0)}
                        </p>
                        <p className="text-sm text-gray-600">Total Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">18</p>
                        <p className="text-sm text-gray-600">Credit Hours</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">95%</p>
                        <p className="text-sm text-gray-600">Attendance Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Feedback Trend</h3>
                      <div className="space-y-3">
                        {teachingHistory.map((record, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{record.semester}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full" 
                                  style={{ width: `${(record.rating / 5) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold">{record.rating}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Metrics</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Publications</span>
                          <span className="font-semibold">15</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Citations</span>
                          <span className="font-semibold">342</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">H-Index</span>
                          <span className="font-semibold">12</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Conference Presentations</span>
                          <span className="font-semibold">8</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">4.8/5</p>
                        <p className="text-sm text-gray-600">Teaching Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">98%</p>
                        <p className="text-sm text-gray-600">Course Completion</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">85%</p>
                        <p className="text-sm text-gray-600">Student Pass Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">12</p>
                        <p className="text-sm text-gray-600">Awards Received</p>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="e.g., FAC001"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="faculty@college.edu"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                    Designation *
                  </label>
                  <select
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Senior Lecturer">Senior Lecturer</option>
                    <option value="Visiting Professor">Visiting Professor</option>
                    <option value="Adjunct Professor">Adjunct Professor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification *
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => handleInputChange('qualification', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="e.g., Ph.D. in Computer Science"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (Years) *
                  </label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joining Date *
                  </label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjects Taught
                </label>
                <textarea
                  value={formData.subjects.join(', ')}
                  onChange={(e) => handleInputChange('subjects', e.target.value.split(', ').filter(s => s.trim()))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter subjects separated by commas (e.g., Data Structures, Algorithms, Machine Learning)"
                />
              </div>
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
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>{mode === 'add' ? 'Add Faculty' : 'Save Changes'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}