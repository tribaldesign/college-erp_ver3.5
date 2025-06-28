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
import LibraryDashboard from './components/Library/LibraryDashboard';
import UserManagement from './components/Admin/UserManagement';
import SignupRequestsPanel from './components/Admin/SignupRequestsPanel';
import ProfileDashboard from './components/Profile/ProfileDashboard';
import ScheduleDashboard from './components/Schedule/ScheduleDashboard';
import AttendanceDashboard from './components/Attendance/AttendanceDashboard';
import ReportsDashboard from './components/Reports/ReportsDashboard';
import SettingsDashboard from './components/Settings/SettingsDashboard';
import { Student, Faculty, Course } from './types';
import { useAppContext, actions } from './context/AppContext';

function App() {
  const { state, dispatch } = useAppContext();
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

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
  }, []);

  // Auto-hide sidebar on mobile/tablet when clicking outside or changing tabs
  useEffect(() => {
    const handleResize = () => {
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

  // Update global state when user changes
  useEffect(() => {
    if (user) {
      dispatch(actions.setCurrentUser(user));
    }
  }, [user, dispatch]);

  // If user is not authenticated, show auth pages
  if (!user?.isAuthenticated) {
    return <AuthWrapper onAuthenticated={setUser} />;
  }

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setIsSidebarOpen(false);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    dispatch(actions.setCurrentUser(null));
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

  const handleSaveStudent = (studentData: Student) => {
    if (studentModalMode === 'add') {
      const newStudent = {
        ...studentData,
        id: Date.now().toString()
      };
      dispatch(actions.addStudent(newStudent));
    } else if (studentModalMode === 'edit' && selectedStudent) {
      dispatch(actions.updateStudent(studentData));
    }
    setIsStudentModalOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(actions.deleteStudent(studentId));
    }
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

  const handleSaveFaculty = (facultyData: Faculty) => {
    if (facultyModalMode === 'add') {
      const newFaculty = {
        ...facultyData,
        id: Date.now().toString()
      };
      dispatch(actions.addFaculty(newFaculty));
    } else if (facultyModalMode === 'edit' && selectedFaculty) {
      dispatch(actions.updateFaculty(facultyData));
    }
    setIsFacultyModalOpen(false);
    setSelectedFaculty(null);
  };

  const handleDeleteFaculty = (facultyId: string) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      dispatch(actions.deleteFaculty(facultyId));
    }
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

  const handleSaveCourse = (courseData: Course) => {
    if (selectedCourse) {
      dispatch(actions.updateCourse(courseData));
    } else {
      const newCourse = {
        ...courseData,
        id: Date.now().toString()
      };
      dispatch(actions.addCourse(newCourse));
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      dispatch(actions.deleteCourse(courseId));
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleMainContentClick = () => {
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
      case 'library': return 'Library';
      case 'users': return 'User Management';
      case 'signup-requests': return 'Signup Requests';
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
      case 'dashboard': return user?.userType === 'faculty' ? 'Your teaching overview and course management' : 'Overview of your college management';
      case 'students': return 'Manage student records and information';
      case 'faculty': return 'Manage faculty members and their details';
      case 'courses': return 'Manage course offerings and schedules';
      case 'departments': return 'Manage academic departments and curriculum';
      case 'library': return 'Manage library books, members, and transactions';
      case 'users': return 'Add and manage user accounts with login credentials';
      case 'signup-requests': return 'Review and approve new user registration requests';
      case 'schedule': return 'Manage class schedules and academic calendar';
      case 'attendance': return 'Track and manage student attendance';
      case 'reports': return 'Generate and view various reports';
      case 'profile': return 'Manage your profile information';
      case 'settings': return 'System settings and configuration';
      default: return 'Overview of your college management';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user?.userType === 'faculty' ? <FacultyDashboard /> : <Dashboard />;
      case 'students':
        return (
          <StudentList
            students={state.students}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        );
      case 'faculty':
        return (
          <FacultyList
            faculty={state.faculty}
            onViewFaculty={handleViewFaculty}
            onEditFaculty={handleEditFaculty}
            onAddFaculty={handleAddFaculty}
            onDeleteFaculty={handleDeleteFaculty}
          />
        );
      case 'courses':
        return (
          <CourseList
            courses={state.courses}
            onViewCourse={handleViewCourse}
            onEditCourse={handleEditCourse}
            onAddCourse={handleAddCourse}
            onSaveCourse={handleSaveCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        );
      case 'departments':
        return <DepartmentList departments={state.departments} />;
      case 'library':
        return <LibraryDashboard user={user} />;
      case 'users':
        return <UserManagement />;
      case 'signup-requests':
        return <SignupRequestsPanel />;
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
    <div className="flex h-screen bg-gray-50 flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/*  Sidebar */}
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
          
          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-600">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                &copy; {new Date().getFullYear()} St. Dominic's College. All rights reserved.
              </div>
              <div>
                Made by <a href="https://www.tribaldesignsolution.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Tribal Design Solutions</a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Student Modal */}
      <StudentModal
        student={selectedStudent}
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        mode={studentModalMode}
        onSave={handleSaveStudent}
      />

      {/* Faculty Modal */}
      <FacultyModal
        faculty={selectedFaculty}
        isOpen={isFacultyModalOpen}
        onClose={() => setIsFacultyModalOpen(false)}
        mode={facultyModalMode}
        onSave={handleSaveFaculty}
      />
    </div>
  );
}

export default App;