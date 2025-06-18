import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Clock, Users } from 'lucide-react';
import { Course } from '../../types';
import CourseModal from './CourseModal';
import CourseDetailsModal from './CourseDetailsModal';

interface CourseListProps {
  courses: Course[];
  onViewCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
  onAddCourse: () => void;
  onSaveCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

export default function CourseList({ 
  courses, 
  onViewCourse, 
  onEditCourse, 
  onAddCourse,
  onSaveCourse,
  onDeleteCourse
}: CourseListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || course.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(courses.map(c => c.department))];

  // Handlers
  const handleAddCourse = (course: Course) => {
    onSaveCourse(course);
    setModalMode(null);
    setSelectedCourse(null);
  };

  const handleEditCourse = (course: Course) => {
    onSaveCourse(course);
    setModalMode(null);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    onDeleteCourse(courseId);
  };

  const handleOpenAddModal = () => {
    setSelectedCourse(null);
    setModalMode('add');
    onAddCourse();
  };

  const handleOpenEditModal = (course: Course) => {
    setSelectedCourse(course);
    setModalMode('edit');
    onEditCourse(course);
  };

  const handleOpenDetailsModal = (course: Course) => {
    setSelectedCourse(course);
    setDetailsOpen(true);
    onViewCourse(course);
  };

  const handleSaveCourse = (course: Course) => {
    if (modalMode === 'add') {
      handleAddCourse(course);
    } else if (modalMode === 'edit') {
      handleEditCourse(course);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
          <p className="text-gray-600">Manage course offerings and schedules</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.code} • {course.credits} Credits</p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleOpenDetailsModal(course)}
                  className="text-gray-600 hover:text-blue-600 p-1 rounded"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleOpenEditModal(course)}
                  className="text-gray-600 hover:text-green-600 p-1 rounded"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-gray-600 hover:text-red-600 p-1 rounded"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Department:</span>
                <span className="text-gray-900">{course.department}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Instructor:</span>
                <span className="text-gray-900">{course.instructor}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Semester:</span>
                <span className="text-gray-900">{course.semester}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Schedule:</p>
              <div className="space-y-1">
                {course.schedule.map((slot, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <Clock className="h-3 w-3 mr-2 text-gray-400" />
                    <span>{slot.day} • {slot.time} • {slot.room}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                <span>{course.enrolledStudents}/{course.maxStudents} enrolled</span>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Modal */}
      <CourseModal
        course={modalMode === 'edit' ? selectedCourse : null}
        isOpen={modalMode !== null}
        onClose={() => { setModalMode(null); setSelectedCourse(null); }}
        onSave={handleSaveCourse}
        mode={modalMode || 'add'}
      />

      {/* Course Details Modal */}
      <CourseDetailsModal
        course={selectedCourse}
        isOpen={detailsOpen}
        onClose={() => { setDetailsOpen(false); setSelectedCourse(null); }}
      />
    </div>
  );
}