import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Student, Faculty, Course, Department, LibraryBook, LibraryMember, LibraryTransaction } from '../types';

// Define the global state interface
interface AppState {
  students: Student[];
  faculty: Faculty[];
  courses: Course[];
  departments: Department[];
  libraryBooks: LibraryBook[];
  libraryMembers: LibraryMember[];
  libraryTransactions: LibraryTransaction[];
  users: any[];
  signupRequests: any[];
  currentUser: any;
  notifications: Notification[];
  lastUpdated: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  userId?: string;
}

// Define action types
type AppAction = 
  | { type: 'SET_CURRENT_USER'; payload: any }
  | { type: 'ADD_STUDENT'; payload: Student }
  | { type: 'UPDATE_STUDENT'; payload: Student }
  | { type: 'DELETE_STUDENT'; payload: string }
  | { type: 'ADD_FACULTY'; payload: Faculty }
  | { type: 'UPDATE_FACULTY'; payload: Faculty }
  | { type: 'DELETE_FACULTY'; payload: string }
  | { type: 'ADD_COURSE'; payload: Course }
  | { type: 'UPDATE_COURSE'; payload: Course }
  | { type: 'DELETE_COURSE'; payload: string }
  | { type: 'ADD_DEPARTMENT'; payload: Department }
  | { type: 'UPDATE_DEPARTMENT'; payload: Department }
  | { type: 'DELETE_DEPARTMENT'; payload: string }
  | { type: 'ADD_LIBRARY_BOOK'; payload: LibraryBook }
  | { type: 'UPDATE_LIBRARY_BOOK'; payload: LibraryBook }
  | { type: 'DELETE_LIBRARY_BOOK'; payload: string }
  | { type: 'ADD_LIBRARY_MEMBER'; payload: LibraryMember }
  | { type: 'UPDATE_LIBRARY_MEMBER'; payload: LibraryMember }
  | { type: 'DELETE_LIBRARY_MEMBER'; payload: string }
  | { type: 'ADD_LIBRARY_TRANSACTION'; payload: LibraryTransaction }
  | { type: 'UPDATE_LIBRARY_TRANSACTION'; payload: LibraryTransaction }
  | { type: 'ADD_USER'; payload: any }
  | { type: 'UPDATE_USER'; payload: any }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'ADD_SIGNUP_REQUEST'; payload: any }
  | { type: 'UPDATE_SIGNUP_REQUEST'; payload: any }
  | { type: 'DELETE_SIGNUP_REQUEST'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS'; payload?: void }
  | { type: 'SYNC_DATA'; payload: Partial<AppState> };

// Initial state
const initialState: AppState = {
  students: [],
  faculty: [],
  courses: [],
  departments: [],
  libraryBooks: [],
  libraryMembers: [],
  libraryTransactions: [],
  users: [],
  signupRequests: [],
  currentUser: null,
  notifications: [],
  lastUpdated: new Date().toISOString()
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  const newState = { ...state, lastUpdated: new Date().toISOString() };

  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...newState, currentUser: action.payload };

    case 'ADD_STUDENT':
      return { 
        ...newState, 
        students: [...state.students, action.payload],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'success',
          title: 'Student Added',
          message: `${action.payload.name} has been added to the system`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'UPDATE_STUDENT':
      return { 
        ...newState, 
        students: state.students.map(s => s.id === action.payload.id ? action.payload : s),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'Student Updated',
          message: `${action.payload.name}'s information has been updated`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'DELETE_STUDENT':
      const deletedStudent = state.students.find(s => s.id === action.payload);
      return { 
        ...newState, 
        students: state.students.filter(s => s.id !== action.payload),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'warning',
          title: 'Student Removed',
          message: `${deletedStudent?.name || 'Student'} has been removed from the system`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'ADD_FACULTY':
      return { 
        ...newState, 
        faculty: [...state.faculty, action.payload],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'success',
          title: 'Faculty Added',
          message: `${action.payload.name} has been added to the faculty`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'UPDATE_FACULTY':
      return { 
        ...newState, 
        faculty: state.faculty.map(f => f.id === action.payload.id ? action.payload : f),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'Faculty Updated',
          message: `${action.payload.name}'s information has been updated`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'DELETE_FACULTY':
      const deletedFaculty = state.faculty.find(f => f.id === action.payload);
      return { 
        ...newState, 
        faculty: state.faculty.filter(f => f.id !== action.payload),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'warning',
          title: 'Faculty Removed',
          message: `${deletedFaculty?.name || 'Faculty member'} has been removed from the system`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'ADD_COURSE':
      return { 
        ...newState, 
        courses: [...state.courses, action.payload],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'success',
          title: 'Course Added',
          message: `${action.payload.name} (${action.payload.code}) has been added`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'UPDATE_COURSE':
      return { 
        ...newState, 
        courses: state.courses.map(c => c.id === action.payload.id ? action.payload : c),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'Course Updated',
          message: `${action.payload.name} has been updated`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'DELETE_COURSE':
      const deletedCourse = state.courses.find(c => c.id === action.payload);
      return { 
        ...newState, 
        courses: state.courses.filter(c => c.id !== action.payload),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'warning',
          title: 'Course Removed',
          message: `${deletedCourse?.name || 'Course'} has been removed`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'ADD_DEPARTMENT':
      return { 
        ...newState, 
        departments: [...state.departments, action.payload],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'success',
          title: 'Department Added',
          message: `${action.payload.name} department has been created`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'UPDATE_DEPARTMENT':
      return { 
        ...newState, 
        departments: state.departments.map(d => d.id === action.payload.id ? action.payload : d),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'Department Updated',
          message: `${action.payload.name} department has been updated`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'DELETE_DEPARTMENT':
      const deletedDepartment = state.departments.find(d => d.id === action.payload);
      return { 
        ...newState, 
        departments: state.departments.filter(d => d.id !== action.payload),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'warning',
          title: 'Department Removed',
          message: `${deletedDepartment?.name || 'Department'} has been removed`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'ADD_LIBRARY_BOOK':
      return { 
        ...newState, 
        libraryBooks: [...state.libraryBooks, action.payload],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'success',
          title: 'Book Added',
          message: `"${action.payload.title}" has been added to the library`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'UPDATE_LIBRARY_BOOK':
      return { 
        ...newState, 
        libraryBooks: state.libraryBooks.map(b => b.id === action.payload.id ? action.payload : b),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'Book Updated',
          message: `"${action.payload.title}" information has been updated`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'DELETE_LIBRARY_BOOK':
      const deletedBook = state.libraryBooks.find(b => b.id === action.payload);
      return { 
        ...newState, 
        libraryBooks: state.libraryBooks.filter(b => b.id !== action.payload),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'warning',
          title: 'Book Removed',
          message: `"${deletedBook?.title || 'Book'}" has been removed from the library`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'ADD_LIBRARY_MEMBER':
      return { 
        ...newState, 
        libraryMembers: [...state.libraryMembers, action.payload],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'success',
          title: 'Library Member Added',
          message: `${action.payload.name} has been registered as a library member`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'UPDATE_LIBRARY_MEMBER':
      return { 
        ...newState, 
        libraryMembers: state.libraryMembers.map(m => m.id === action.payload.id ? action.payload : m),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'Library Member Updated',
          message: `${action.payload.name}'s membership has been updated`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'DELETE_LIBRARY_MEMBER':
      const deletedMember = state.libraryMembers.find(m => m.id === action.payload);
      return { 
        ...newState, 
        libraryMembers: state.libraryMembers.filter(m => m.id !== action.payload),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'warning',
          title: 'Library Member Removed',
          message: `${deletedMember?.name || 'Member'} has been removed from library membership`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'ADD_LIBRARY_TRANSACTION':
      return { 
        ...newState, 
        libraryTransactions: [...state.libraryTransactions, action.payload],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'success',
          title: 'Book Issued',
          message: `"${action.payload.bookTitle}" has been issued to ${action.payload.memberName}`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'UPDATE_LIBRARY_TRANSACTION':
      return { 
        ...newState, 
        libraryTransactions: state.libraryTransactions.map(t => t.id === action.payload.id ? action.payload : t),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'Transaction Updated',
          message: `Transaction for "${action.payload.bookTitle}" has been updated`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'ADD_USER':
      return { 
        ...newState, 
        users: [...state.users, action.payload],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'success',
          title: 'User Added',
          message: `${action.payload.name} has been added to the system`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'UPDATE_USER':
      return { 
        ...newState, 
        users: state.users.map(u => u.id === action.payload.id ? action.payload : u),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'User Updated',
          message: `${action.payload.name}'s account has been updated`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'DELETE_USER':
      const deletedUser = state.users.find(u => u.id === action.payload);
      return { 
        ...newState, 
        users: state.users.filter(u => u.id !== action.payload),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'warning',
          title: 'User Removed',
          message: `${deletedUser?.name || 'User'} has been removed from the system`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'ADD_SIGNUP_REQUEST':
      return { 
        ...newState, 
        signupRequests: [...state.signupRequests, action.payload],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'New Signup Request',
          message: `${action.payload.firstName} ${action.payload.lastName} has requested account access`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };

    case 'UPDATE_SIGNUP_REQUEST':
      return { 
        ...newState, 
        signupRequests: state.signupRequests.map(r => r.id === action.payload.id ? action.payload : r)
      };

    case 'DELETE_SIGNUP_REQUEST':
      return { 
        ...newState, 
        signupRequests: state.signupRequests.filter(r => r.id !== action.payload)
      };

    case 'ADD_NOTIFICATION':
      return { 
        ...newState, 
        notifications: [...state.notifications, action.payload]
      };

    case 'MARK_NOTIFICATION_READ':
      return { 
        ...newState, 
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, read: true } : n
        )
      };

    case 'CLEAR_NOTIFICATIONS':
      return { 
        ...newState, 
        notifications: []
      };

    case 'SYNC_DATA':
      return { 
        ...newState, 
        ...action.payload
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auto-save to localStorage
  useEffect(() => {
    const saveData = {
      students: state.students,
      faculty: state.faculty,
      courses: state.courses,
      departments: state.departments,
      libraryBooks: state.libraryBooks,
      libraryMembers: state.libraryMembers,
      libraryTransactions: state.libraryTransactions,
      users: state.users,
      signupRequests: state.signupRequests,
      notifications: state.notifications,
      lastUpdated: state.lastUpdated
    };
    localStorage.setItem('collegeERPData', JSON.stringify(saveData));
  }, [state]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('collegeERPData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'SYNC_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Action creators for easier usage
export const actions = {
  setCurrentUser: (user: any) => ({ type: 'SET_CURRENT_USER' as const, payload: user }),
  addStudent: (student: Student) => ({ type: 'ADD_STUDENT' as const, payload: student }),
  updateStudent: (student: Student) => ({ type: 'UPDATE_STUDENT' as const, payload: student }),
  deleteStudent: (id: string) => ({ type: 'DELETE_STUDENT' as const, payload: id }),
  addFaculty: (faculty: Faculty) => ({ type: 'ADD_FACULTY' as const, payload: faculty }),
  updateFaculty: (faculty: Faculty) => ({ type: 'UPDATE_FACULTY' as const, payload: faculty }),
  deleteFaculty: (id: string) => ({ type: 'DELETE_FACULTY' as const, payload: id }),
  addCourse: (course: Course) => ({ type: 'ADD_COURSE' as const, payload: course }),
  updateCourse: (course: Course) => ({ type: 'UPDATE_COURSE' as const, payload: course }),
  deleteCourse: (id: string) => ({ type: 'DELETE_COURSE' as const, payload: id }),
  addDepartment: (department: Department) => ({ type: 'ADD_DEPARTMENT' as const, payload: department }),
  updateDepartment: (department: Department) => ({ type: 'UPDATE_DEPARTMENT' as const, payload: department }),
  deleteDepartment: (id: string) => ({ type: 'DELETE_DEPARTMENT' as const, payload: id }),
  addLibraryBook: (book: LibraryBook) => ({ type: 'ADD_LIBRARY_BOOK' as const, payload: book }),
  updateLibraryBook: (book: LibraryBook) => ({ type: 'UPDATE_LIBRARY_BOOK' as const, payload: book }),
  deleteLibraryBook: (id: string) => ({ type: 'DELETE_LIBRARY_BOOK' as const, payload: id }),
  addLibraryMember: (member: LibraryMember) => ({ type: 'ADD_LIBRARY_MEMBER' as const, payload: member }),
  updateLibraryMember: (member: LibraryMember) => ({ type: 'UPDATE_LIBRARY_MEMBER' as const, payload: member }),
  deleteLibraryMember: (id: string) => ({ type: 'DELETE_LIBRARY_MEMBER' as const, payload: id }),
  addLibraryTransaction: (transaction: LibraryTransaction) => ({ type: 'ADD_LIBRARY_TRANSACTION' as const, payload: transaction }),
  updateLibraryTransaction: (transaction: LibraryTransaction) => ({ type: 'UPDATE_LIBRARY_TRANSACTION' as const, payload: transaction }),
  addUser: (user: any) => ({ type: 'ADD_USER' as const, payload: user }),
  updateUser: (user: any) => ({ type: 'UPDATE_USER' as const, payload: user }),
  deleteUser: (id: string) => ({ type: 'DELETE_USER' as const, payload: id }),
  addSignupRequest: (request: any) => ({ type: 'ADD_SIGNUP_REQUEST' as const, payload: request }),
  updateSignupRequest: (request: any) => ({ type: 'UPDATE_SIGNUP_REQUEST' as const, payload: request }),
  deleteSignupRequest: (id: string) => ({ type: 'DELETE_SIGNUP_REQUEST' as const, payload: id }),
  addNotification: (notification: Notification) => ({ type: 'ADD_NOTIFICATION' as const, payload: notification }),
  markNotificationRead: (id: string) => ({ type: 'MARK_NOTIFICATION_READ' as const, payload: id }),
  clearNotifications: () => ({ type: 'CLEAR_NOTIFICATIONS' as const })
};