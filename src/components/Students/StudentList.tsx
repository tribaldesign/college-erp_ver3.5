import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, MoreVertical, Users, GraduationCap } from 'lucide-react';
import { Student } from '../../types';

interface StudentListProps {
  students: Student[];
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onAddStudent: () => void;
  onDeleteStudent: (studentId: string) => void;
}

export default function StudentList({ 
  students, 
  onViewStudent, 
  onEditStudent, 
  onAddStudent,
  onDeleteStudent
}: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState<'name' | 'rollNumber' | 'gpa' | 'semester'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = !filterDepartment || student.department === filterDepartment;
      const matchesStatus = !filterStatus || student.status === filterStatus;
      const matchesSemester = !filterSemester || student.semester.toString() === filterSemester;
      return matchesSearch && matchesDepartment && matchesStatus && matchesSemester;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const departments = [...new Set(students.map(s => s.department))];
  const semesters = [...new Set(students.map(s => s.semester))].sort((a, b) => a - b);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'Graduated': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600 font-semibold';
    if (gpa >= 3.0) return 'text-blue-600 font-semibold';
    if (gpa >= 2.5) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    onDeleteStudent(studentId);
  };

  const activeStudents = students.filter(s => s.status === 'Active').length;
  const averageGPA = (students.reduce((sum, student) => sum + student.gpa, 0) / students.length).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Student Management</h2>
            <p className="text-blue-100">Comprehensive student records and academic tracking</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{students.length}</p>
              <p className="text-sm text-blue-100">Total Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <GraduationCap className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{activeStudents}</p>
              <p className="text-sm text-blue-100">Active Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <span className="text-lg font-bold">GPA</span>
              </div>
              <p className="text-2xl font-bold">{averageGPA}</p>
              <p className="text-sm text-blue-100">Average GPA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onAddStudent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
            <Upload className="h-4 w-4" />
            <span>Import</span>
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students by name, roll number, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          
          <div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>

          <div>
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedStudents.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Bulk Edit
                </button>
                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {filteredStudents.length} of {students.length} students</span>
        <div className="flex items-center space-x-4">
          <span>Sort by:</span>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field as typeof sortBy);
              setSortOrder(order as typeof sortOrder);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="rollNumber-asc">Roll Number (Low-High)</option>
            <option value="rollNumber-desc">Roll Number (High-Low)</option>
            <option value="gpa-desc">GPA (High-Low)</option>
            <option value="gpa-asc">GPA (Low-High)</option>
            <option value="semester-asc">Semester (Low-High)</option>
            <option value="semester-desc">Semester (High-Low)</option>
          </select>
        </div>
      </div>

      {/* Students Display */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    Student {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('rollNumber')}
                  >
                    Roll Number {sortBy === 'rollNumber' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Department</th>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('semester')}
                  >
                    Semester {sortBy === 'semester' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('gpa')}
                  >
                    GPA {sortBy === 'gpa' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {student.rollNumber}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{student.department}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Semester {student.semester}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-bold ${getGPAColor(student.gpa)}`}>
                        {student.gpa.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onViewStudent(student)}
                          className="text-gray-600 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEditStudent(student)}
                          className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                          title="Edit Student"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleSelectStudent(student.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
              </div>

              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.rollNumber}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Department:</span>
                  <span className="text-gray-900 font-medium">{student.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Semester:</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {student.semester}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">GPA:</span>
                  <span className={`font-bold ${getGPAColor(student.gpa)}`}>
                    {student.gpa.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex space-x-1">
                  <button
                    onClick={() => onViewStudent(student)}
                    className="text-gray-600 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEditStudent(student)}
                    className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                    title="Edit Student"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Student"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <button className="text-gray-600 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredStudents.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterDepartment('');
              setFilterStatus('');
              setFilterSemester('');
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}