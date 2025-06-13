import React, { useState } from 'react';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

interface AuthWrapperProps {
  onAuthenticated: (user: any) => void;
}

export default function AuthWrapper({ onAuthenticated }: AuthWrapperProps) {
  const [currentPage, setCurrentPage] = useState<'signin' | 'signup'>('signin');

  const handleSignIn = (email: string, password: string, userType: string) => {
    // Simulate authentication
    const user = {
      id: '1',
      email,
      userType,
      name: userType === 'student' ? 'John Doe' : userType === 'faculty' ? 'Dr. Jane Smith' : 'Admin User',
      isAuthenticated: true
    };
    onAuthenticated(user);
  };

  const handleSignUp = (userData: any) => {
    // Simulate account creation
    const user = {
      id: Date.now().toString(),
      email: userData.email,
      userType: userData.userType,
      name: `${userData.firstName} ${userData.lastName}`,
      isAuthenticated: true
    };
    onAuthenticated(user);
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