import React, { useState } from 'react';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

interface AuthWrapperProps {
  onAuthenticated: (user: any) => void;
}

export default function AuthWrapper({ onAuthenticated }: AuthWrapperProps) {
  const [currentPage, setCurrentPage] = useState<'signin' | 'signup'>('signin');

  const handleSignIn = (usernameOrEmail: string, password: string, userType: string) => {
    // Simulate authentication with proper credential checking
    let user = null;
    
    if (userType === 'admin' && usernameOrEmail === 'admin' && password === 'Tribalde@#53') {
      user = {
        id: 'admin-1',
        username: 'admin',
        email: 'admin@college.edu',
        userType: 'admin',
        name: 'System Administrator',
        isAuthenticated: true,
        permissions: {
          canManageUsers: true,
          canAssignCredentials: true,
          canViewAllData: true,
          canModifySystem: true
        }
      };
    } else if (userType === 'student' && (usernameOrEmail === 'student@college.edu') && password === 'demo123') {
      user = {
        id: 'student-1',
        email: usernameOrEmail,
        userType: 'student',
        name: 'John Doe',
        isAuthenticated: true,
        permissions: {
          canViewOwnData: true,
          canUpdateProfile: true
        }
      };
    } else if (userType === 'faculty' && (usernameOrEmail === 'faculty@college.edu') && password === 'demo123') {
      user = {
        id: 'faculty-1',
        email: usernameOrEmail,
        userType: 'faculty',
        name: 'Dr. Jane Smith',
        isAuthenticated: true,
        permissions: {
          canViewStudents: true,
          canManageCourses: true,
          canUpdateGrades: true
        }
      };
    } else if (userType === 'staff' && (usernameOrEmail === 'staff@college.edu') && password === 'demo123') {
      user = {
        id: 'staff-1',
        email: usernameOrEmail,
        userType: 'staff',
        name: 'Staff Member',
        isAuthenticated: true,
        permissions: {
          canViewReports: true,
          canManageSchedule: true
        }
      };
    }

    if (user) {
      onAuthenticated(user);
    }
  };

  const handleSignUp = (userData: any) => {
    // For sign up, create a pending user that needs admin approval
    const user = {
      id: Date.now().toString(),
      email: userData.email,
      userType: userData.userType,
      name: `${userData.firstName} ${userData.lastName}`,
      isAuthenticated: false,
      status: 'pending_approval',
      message: 'Your account has been created and is pending admin approval. You will receive your login credentials once approved.'
    };
    
    // In a real app, this would be sent to the server for admin review
    alert('Account created successfully! Please wait for admin approval to receive your login credentials.');
    setCurrentPage('signin');
  };

  if (currentPage === 'signin') {
    return (
      <SignInPage
        onSignIn={handleSignIn}
        onSwitchToSignUp={() => setCurrentPage('signup')}
      />
    );
  }

  return (
    <SignUpPage
      onSignUp={handleSignUp}
      onSwitchToSignIn={() => setCurrentPage('signin')}
    />
  );
}