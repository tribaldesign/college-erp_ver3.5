import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, MoreVertical, Users, GraduationCap, Award, Calendar } from 'lucide-react';
import { Faculty } from '../../types';

interface FacultyListProps {
  faculty: Faculty[];
  onViewFaculty: (faculty: Faculty) => void;
  onEditFaculty: (faculty: Faculty) => void;
  onAddFaculty: () => void;
  onDeleteFaculty: (facultyId: string) => void;
}

export default function FacultyList({ 
  faculty, 
  onViewFaculty, 
  onEditFaculty, 
  onAddFaculty,
  onDeleteFaculty
}: FacultyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterDesignation, setFilterDesignation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'employeeId' | 'experience' | 'joiningDate'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredFaculty = faculty
    .filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = !filterDepartment || member.department === filterDepartment;
      const matchesDesignation = !filterDesignation || member.designation === filterDesignation;
      const matchesStatus = !filterStatus || member.status === filterStatus;
      return matchesSearch && matchesDepartment && matchesDesignation && matchesStatus;
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

  const departments = [...new Set(faculty.map(f => f.department))];
  const designations = [...new Set(faculty.map(f => f.designation))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDesignationColor = (designation: string) => {
    switch (designation) {
      case 'Principal': return 'bg-purple-100 text-purple-800';
      case 'Director': return 'bg-indigo-100 text-indigo-800';
      case 'Dean': return 'bg-blue-100 text-blue-800';
      case 'Professor': return 'bg-green-100 text-green-800';
      case 'Associate Professor': return 'bg-teal-100 text-teal-800';
      case 'Assistant Professor': return 'bg-cyan-100 text-cyan-800';
      case 'Lecturer': return 'bg-yellow-100 text-yellow-800';
      case 'Senior Lecturer': return 'bg-orange-100 text-orange-800';
      case 'Staff': return 'bg-gray-100 text-gray-800';
      case 'Librarian': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectAll = () => {
    if (selectedFaculty.length === filteredFaculty.length) {
      setSelectedFaculty([]);
    } else {
      setSelectedFaculty(filteredFaculty.map(f => f.id));
    }
  };

  const handleSelectFaculty = (facultyId: string) => {
    setSelectedFaculty(prev => 
      prev.includes(facultyId) 
        ? prev.filter(id => id !== facultyId)
        : [...prev, facultyId]
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

  const handleDeleteFaculty = (facultyId: string) => {
    onDeleteFaculty(facultyId);
  };

  const activeFaculty = faculty.filter(f => f.status === 'Active').length;
  const averageExperience = (faculty.reduce((sum, f) => sum + f.experience, 0) / faculty.length).toFixed(1);
  const totalSubjects = [...new Set(faculty.flatMap(f => f.subjects))].length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Faculty Management</h2>
            <p className="text-purple-100">Comprehensive faculty records and academic expertise tracking</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{faculty.length}</p>
              <p className="text-sm text-purple-100">Total Faculty</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <GraduationCap className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{activeFaculty}</p>
              <p className="text-sm text-purple-100">Active Faculty</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Award className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{averageExperience}</p>
              <p className="text-sm text-purple-100">Avg Experience</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <span className="text-lg font-bold">📚</span>
              </div>
              <p className="text-2xl font-bold">{totalSubjects}</p>
              <p className="text-sm text-purple-100">Total Subjects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onAddFaculty}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Faculty</span>
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
            className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
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
                placeholder="Search faculty by name, employee ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          
          <div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterDesignation}
              onChange={(e) => setFilterDesignation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              <option value="">All Designations</option>
              {designations.map(designation => (
                <option key={designation} value={designation}>{designation}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {selectedFaculty.length > 0 && (
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">
                {selectedFaculty.length} faculty member{selectedFaculty.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
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
        <span>Showing {filteredFaculty.length} of {faculty.length} faculty members</span>
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
            <option value="employeeId-asc">Employee ID (Low-High)</option>
            <option value="employeeId-desc">Employee ID (High-Low)</option>
            <option value="experience-desc">Experience (High-Low)</option>
            <option value="experience-asc">Experience (Low-High)</option>
            <option value="joiningDate-desc">Joining Date (Recent)</option>
            <option value="joiningDate-asc">Joining Date (Oldest)</option>
          </select>
        </div>
      </div>

      {/* Faculty Display */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedFaculty.length === filteredFaculty.length && filteredFaculty.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    Faculty {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('employeeId')}
                  >
                    Employee ID {sortBy === 'employeeId' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Department</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Designation</th>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('experience')}
                  >
                    Experience {sortBy === 'experience' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFaculty.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedFaculty.includes(member.id)}
                        onChange={() => handleSelectFaculty(member.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {member.employeeId}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{member.department}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${getDesignationColor(member.designation)}`}>
                        {member.designation}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">{member.experience} years</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onViewFaculty(member)}
                          className="text-gray-600 hover:text-purple-600 p-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEditFaculty(member)}
                          className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                          title="Edit Faculty"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaculty(member.id)}
                          className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Faculty"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="checkbox"
                  checked={selectedFaculty.includes(member.id)}
                  onChange={() => handleSelectFaculty(member.id)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>

              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.employeeId}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${getDesignationColor(member.designation)}`}>
                  {member.designation}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Department:</span>
                  <span className="text-gray-900 font-medium">{member.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Experience:</span>
                  <span className="text-gray-900 font-medium">{member.experience} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qualification:</span>
                  <span className="text-gray-900 font-medium text-xs">{member.qualification}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {member.subjects.slice(0, 2).map((subject, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                      {subject}
                    </span>
                  ))}
                  {member.subjects.length > 2 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      +{member.subjects.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex space-x-1">
                  <button
                    onClick={() => onViewFaculty(member)}
                    className="text-gray-600 hover:text-purple-600 p-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEditFaculty(member)}
                    className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                    title="Edit Faculty"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFaculty(member.id)}
                    className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Faculty"
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

      {filteredFaculty.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No faculty members found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterDepartment('');
              setFilterDesignation('');
              setFilterStatus('');
            }}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}