import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash2, Filter, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface ScheduleEvent {
  id: string;
  title: string;
  course: string;
  instructor: string;
  room: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'lecture' | 'lab' | 'exam' | 'event';
  students: number;
  department: string;
}

export default function ScheduleDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const mockEvents: ScheduleEvent[] = [
    {
      id: '1',
      title: 'Data Structures Lecture',
      course: 'CS301',
      instructor: 'Dr. Sarah Johnson',
      room: 'CS Lab 1',
      startTime: '10:00',
      endTime: '11:30',
      date: '2024-01-15',
      type: 'lecture',
      students: 45,
      department: 'Computer Science'
    },
    {
      id: '2',
      title: 'Circuit Analysis Lab',
      course: 'EE201',
      instructor: 'Dr. Michael Brown',
      room: 'EE Lab 1',
      startTime: '14:00',
      endTime: '16:00',
      date: '2024-01-15',
      type: 'lab',
      students: 30,
      department: 'Electrical Engineering'
    },
    {
      id: '3',
      title: 'Thermodynamics Exam',
      course: 'ME301',
      instructor: 'Dr. Emily Davis',
      room: 'Exam Hall A',
      startTime: '09:00',
      endTime: '12:00',
      date: '2024-01-16',
      type: 'exam',
      students: 42,
      department: 'Mechanical Engineering'
    },
    {
      id: '4',
      title: 'Machine Learning Workshop',
      course: 'CS501',
      instructor: 'Dr. Kevin Zhang',
      room: 'CS Lab 2',
      startTime: '15:30',
      endTime: '17:00',
      date: '2024-01-17',
      type: 'event',
      students: 25,
      department: 'Computer Science'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lab': return 'bg-green-100 text-green-800 border-green-200';
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const filteredEvents = mockEvents.filter(event => {
    const matchesDepartment = !filterDepartment || event.department === filterDepartment;
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Schedule & Calendar</h2>
            <p className="text-indigo-100">Manage class schedules, events, and academic calendar</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Calendar className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{mockEvents.length}</p>
              <p className="text-sm text-indigo-100">Total Events</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-indigo-100">This Week</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">142</p>
              <p className="text-sm text-indigo-100">Total Students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              {['day', 'week', 'month'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-2 text-sm font-medium capitalize transition-colors ${
                    viewMode === mode
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsEventModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 bg-gray-50 border-r border-gray-200">
              <span className="text-sm font-medium text-gray-500">Time</span>
            </div>
            {getWeekDays().map((day, index) => (
              <div key={index} className="p-4 bg-gray-50 text-center border-r border-gray-200 last:border-r-0">
                <div className="text-sm font-medium text-gray-900">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8 border-b border-gray-100 min-h-16">
                <div className="p-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-600">
                  {time}
                </div>
                {getWeekDays().map((day, dayIndex) => {
                  const dayEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === day.toDateString() &&
                           event.startTime.startsWith(time.split(':')[0]);
                  });
                  
                  return (
                    <div key={dayIndex} className="p-2 border-r border-gray-200 last:border-r-0">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`p-2 rounded text-xs cursor-pointer hover:shadow-md transition-shadow ${getEventTypeColor(event.type)}`}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-xs opacity-75">{event.startTime}-{event.endTime}</div>
                          <div className="text-xs opacity-75">{event.room}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event List View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredEvents.slice(0, 5).map((event) => (
            <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <span className="text-sm text-gray-600">({event.course})</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{event.room}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{event.students} students</span>
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Instructor: {event.instructor}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-green-600 p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-xl">{selectedEvent.title}</h4>
                  <p className="text-gray-600">{selectedEvent.course} • {selectedEvent.department}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Instructor</span>
                    <p className="text-gray-900">{selectedEvent.instructor}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Room</span>
                    <p className="text-gray-900">{selectedEvent.room}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Time</span>
                    <p className="text-gray-900">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Students</span>
                    <p className="text-gray-900">{selectedEvent.students}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Edit Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}