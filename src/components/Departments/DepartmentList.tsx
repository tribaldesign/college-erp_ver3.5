import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Building, Users, GraduationCap, BookOpen, Phone, Mail, Calendar, MoreVertical } from 'lucide-react';
import { Department } from '../../types';
import { mockDepartments } from '../../data/mockData';
import DepartmentModal from './DepartmentModal';
import DepartmentDetailsModal from './DepartmentDetailsModal';

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.head.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || dept.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddDepartment = (department: Department) => {
    setDepartments(prev => [...prev, department]);
    setModalMode(null);
    setSelectedDepartment(null);
  };

  const handleEditDepartment = (department: Department) => {
    setDepartments(prev => prev.map(d => d.id === department.id ? department : d));
    setModalMode(null);
    setSelectedDepartment(null);
  };

  const handleDeleteDepartment = (departmentId: string) => {
    if (window.confirm('Are you sure you want to delete this department? This action cannot be undone.')) {
      setDepartments(prev => prev.filter(d => d.id !== departmentId));
    }
  };

  const handleOpenAddModal = () => {
    setSelectedDepartment(null);
    setModalMode('add');
  };

  const handleOpenEditModal = (department: Department) => {
    setSelectedDepartment(department);
    setModalMode('edit');
  };

  const handleOpenDetailsModal = (department: Department) => {
    setSelectedDepartment(department);
    setDetailsOpen(true);
  };

  const handleSaveDepartment = (department: Department) => {
    if (modalMode === 'add') {
      handleAddDepartment(department);
    } else if (modalMode === 'edit') {
      handleEditDepartment(department);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalStudents = departments.reduce((sum, dept) => sum + dept.totalStudents, 0);
  const totalFaculty = departments.reduce((sum, dept) => sum + dept.totalFaculty, 0);
  const totalCourses = departments.reduce((sum, dept) => sum + dept.totalCourses, 0);
  const activeDepartments = departments.filter(d => d.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Department Management</h2>
            <p className="text-indigo-100">Manage academic departments and their curriculum structure</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Building className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{departments.length}</p>
              <p className="text-sm text-indigo-100">Total Departments</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{totalStudents}</p>
              <p className="text-sm text-indigo-100">Total Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <GraduationCap className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{totalFaculty}</p>
              <p className="text-sm text-indigo-100">Total Faculty</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{totalCourses}</p>
              <p className="text-sm text-indigo-100">Total Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleOpenAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Department</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search departments by name, code, or head..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {filteredDepartments.length} of {departments.length} departments</span>
        <span>{activeDepartments} active departments</span>
      </div>

      {/* Departments Display */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Department</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Head</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Students</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Faculty</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Courses</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDepartments.map((department) => (
                  <tr key={department.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                          {department.code}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{department.name}</p>
                          <p className="text-sm text-gray-600">{department.building}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{department.head}</td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">{department.totalStudents}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">{department.totalFaculty}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">{department.totalCourses}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(department.status)}`}>
                        {department.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenDetailsModal(department)}
                          className="text-gray-600 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(department)}
                          className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                          title="Edit Department"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(department.id)}
                          className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Department"
                        >
                          <Trash2 className="h-4 w-4" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <div key={department.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {department.code}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{department.name}</h3>
                    <p className="text-sm text-gray-600">Est. {department.establishedYear}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(department.status)}`}>
                  {department.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Department Head:</span>
                  <span className="text-gray-900 font-medium">{department.head}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Building:</span>
                  <span className="text-gray-900">{department.building}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{department.contactEmail}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{department.contactPhone}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{department.totalStudents}</p>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-1">
                    <GraduationCap className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{department.totalFaculty}</p>
                  <p className="text-xs text-gray-600">Faculty</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-1">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{department.totalCourses}</p>
                  <p className="text-xs text-gray-600">Courses</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {department.subjects.slice(0, 3).map((subject, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                      {subject.code}
                    </span>
                  ))}
                  {department.subjects.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      +{department.subjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleOpenDetailsModal(department)}
                    className="text-gray-600 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(department)}
                    className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                    title="Edit Department"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department.id)}
                    className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Department"
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

      {filteredDepartments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('');
            }}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Department Modal */}
      <DepartmentModal
        department={modalMode === 'edit' ? selectedDepartment : null}
        isOpen={modalMode !== null}
        onClose={() => { setModalMode(null); setSelectedDepartment(null); }}
        onSave={handleSaveDepartment}
        mode={modalMode || 'add'}
      />

      {/* Department Details Modal */}
      <DepartmentDetailsModal
        department={selectedDepartment}
        isOpen={detailsOpen}
        onClose={() => { setDetailsOpen(false); setSelectedDepartment(null); }}
      />
    </div>
  );
}