import React, { useState } from 'react';
import { X, Save, Calendar, Users, BookOpen, Clock, MapPin } from 'lucide-react';
import { Course } from '../../types';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
  mode: 'add' | 'edit';
}

export default function CourseModal({ course, isOpen, onClose, onSave, mode }: CourseModalProps) {
  const [formData, setFormData] = useState<Course>(course || {
    id: '',
    name: '',
    code: '',
    credits: 3,
    department: '',
    semester: 1,
    instructor: '',
    schedule: [{ day: '', time: '', room: '' }],
    description: '',
    prerequisites: [],
    maxStudents: 30,
    enrolledStudents: 0
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setFormData(prev => ({ ...prev, schedule: newSchedule }));
  };

  const addScheduleSlot = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { day: '', time: '', room: '' }]
    }));
  };

  const removeScheduleSlot = (index: number) => {
    if (formData.schedule.length > 1) {
      const newSchedule = formData.schedule.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, schedule: newSchedule }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = {
      ...formData,
      id: mode === 'add' ? Date.now().toString() : formData.id,
      prerequisites: formData.prerequisites.filter(p => p.trim() !== '')
    };
    onSave(courseData);
  };

  const title = mode === 'add' ? 'Add New Course' : 'Edit Course';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6" />
            <h2 className="text-xl font-semibold">{title}</h2>
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter course name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Code *
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="e.g., CS301"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credits *
                </label>
                <input
                  type="number"
                  value={formData.credits}
                  onChange={(e) => handleInputChange('credits', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  min="1"
                  max="6"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester *
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => handleInputChange('semester', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Students *
                </label>
                <input
                  type="number"
                  value={formData.maxStudents}
                  onChange={(e) => handleInputChange('maxStudents', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  min="1"
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
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Chemical Engineering">Chemical Engineering</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructor *
                </label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Instructor name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Course description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prerequisites
              </label>
              <input
                type="text"
                value={formData.prerequisites.join(', ')}
                onChange={(e) => handleInputChange('prerequisites', e.target.value.split(', ').filter(p => p.trim()))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter prerequisites separated by commas"
              />
            </div>

            {/* Schedule */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Schedule *
                </label>
                <button
                  type="button"
                  onClick={addScheduleSlot}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Time Slot
                </button>
              </div>
              <div className="space-y-3">
                {formData.schedule.map((slot, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border border-gray-200 rounded-lg">
                    <div>
                      <select
                        value={slot.day}
                        onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={slot.time}
                        onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                        placeholder="e.g., 10:00 AM - 11:30 AM"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={slot.room}
                        onChange={(e) => handleScheduleChange(index, 'room', e.target.value)}
                        placeholder="Room/Lab"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="flex justify-center">
                      {formData.schedule.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeScheduleSlot(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>{mode === 'add' ? 'Add Course' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}