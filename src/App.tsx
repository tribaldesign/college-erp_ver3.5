import React, { useState, useEffect } from 'react';
import AuthWrapper from './components/Auth/AuthWrapper';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import StudentList from './components/Students/StudentList';
import StudentModal from './components/Students/StudentModal';
import FacultyList from './components/Faculty/FacultyList';
import FacultyModal from './components/Faculty/FacultyModal';
import FacultyDashboard from './components/Faculty/FacultyDashboard';
import CourseList from './components/Courses/CourseList';
import DepartmentList from './components/Departments/DepartmentList';
import ProfileDashboard from './components/Profile/ProfileDashboard';
import ScheduleDashboard from './components/Schedule/ScheduleDashboard';
import AttendanceDashboard from './components/Attendance/AttendanceDashboard';
import ReportsDashboard from './components/Reports/ReportsDashboard';
import SettingsDashboard from './components/Settings/SettingsDashboard';
import { Student, Faculty, Course } from './types';

function App() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [studentModalMode, setStudentModalMode] = useState<'view' | 'edit' | 'add'>('view');
  const [facultyModalMode, setFacultyModalMode] = useState<'view' | 'edit' | 'add'>('view');
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto-hide sidebar on mobile/tablet when clicking outside or changing tabs
  useEffect(() => {
    const handleResize = () => {
      // Auto-close sidebar on mobile/tablet when resizing to larger screen
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-hide sidebar when tab changes on mobile/tablet
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [activeTab]);

  // If user is not authenticated, show auth pages
  if (!user?.isAuthenticated) {
    return <AuthWrapper onAuthenticated={setUser} />;
  }

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setIsSidebarOpen(false);
    // Clear any stored session data
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setStudentModalMode('view');
    setIsStudentModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setStudentModalMode('edit');
    setIsStudentModalOpen(true);
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setStudentModalMode('add');
    setIsStudentModalOpen(true);
  };

  const handleViewFaculty = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setFacultyModalMode('view');
    setIsFacultyModalOpen(true);
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setFacultyModalMode('edit');
    setIsFacultyModalOpen(true);
  };

  const handleAddFaculty = () => {
    setSelectedFaculty(null);
    setFacultyModalMode('add');
    setIsFacultyModalOpen(true);
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    console.log('View course:', course);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    console.log('Edit course:', course);
  };

  const handleAddCourse = () => {
    setSelectedCourse(null);
    console.log('Add course');
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleMainContentClick = () => {
    // Auto-close sidebar when clicking on main content on mobile/tablet
    if (window.innerWidth < 1024 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return user?.userType === 'faculty' ? 'Faculty Dashboard' : 'Dashboard';
      case 'students': return 'Students';
      case 'faculty': return 'Faculty';
      case 'courses': return 'Courses';
      case 'departments': return 'Departments';
      case 'schedule': return 'Schedule & Calendar';
      case 'attendance': return 'Attendance Management';
      case 'reports': return 'Reports & Analytics';
      case 'profile': return 'Profile';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'dashboard': return user?.userType === 'faculty' ? 'Your teaching overview and course management' : 'Overview of your college management system';
      case 'students': return 'Manage student records and information';
      case 'faculty': return 'Manage faculty members and their details';
      case 'courses': return 'Manage course offerings and schedules';
      case 'departments': return 'Manage academic departments and curriculum';
      case 'schedule': return 'Manage class schedules and academic calendar';
      case 'attendance': return 'Track and manage student attendance';
      case 'reports': return 'Generate and view various reports';
      case 'profile': return 'Manage your profile information';
      case 'settings': return 'System settings and configuration';
      default: return 'Overview of your college management system';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        // Show Faculty Dashboard for faculty users, regular Dashboard for others
        return user?.userType === 'faculty' ? <FacultyDashboard /> : <Dashboard />;
      case 'students':
        return (
          <StudentList
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
            onAddStudent={handleAddStudent}
          />
        );
      case 'faculty':
        return (
          <FacultyList
            onViewFaculty={handleViewFaculty}
            onEditFaculty={handleEditFaculty}
            onAddFaculty={handleAddFaculty}
          />
        );
      case 'courses':
        return (
          <CourseList
            onViewCourse={handleViewCourse}
            onEditCourse={handleEditCourse}
            onAddCourse={handleAddCourse}
          />
        );
      case 'departments':
        return <DepartmentList />;
      case 'schedule':
        return <ScheduleDashboard />;
      case 'attendance':
        return <AttendanceDashboard />;
      case 'reports':
        return <ReportsDashboard />;
      case 'profile':
        return <ProfileDashboard />;
      case 'settings':
        return <SettingsDashboard />;
      default:
        return user?.userType === 'faculty' ? <FacultyDashboard /> : <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user}
          onClose={handleSidebarClose}
        />
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={handleSidebarClose}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64" onClick={handleMainContentClick}>
        <Header 
          title={getPageTitle()} 
          subtitle={getPageSubtitle()}
          onMenuClick={handleSidebarToggle}
          user={user}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Student Modal */}
      <StudentModal
        student={selectedStudent}
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        mode={studentModalMode}
      />

      {/* Faculty Modal */}
      <FacultyModal
        faculty={selectedFaculty}
        isOpen={isFacultyModalOpen}
        onClose={() => setIsFacultyModalOpen(false)}
        mode={facultyModalMode}
      />
    </div>
  );
}

export default App;