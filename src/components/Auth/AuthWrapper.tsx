import React, { useState } from 'react';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

interface AuthWrapperProps {
  onAuthenticated: (user: any) => void;
}

export default function AuthWrapper({ onAuthenticated }: AuthWrapperProps) {
  const [currentPage, setCurrentPage] = useState<'signin' | 'signup'>('signin');

  const handleSignIn = (usernameOrEmail: string, password: string, userType: string) => {
    // Only allow admin login with specific credentials
    if (userType === 'admin' && usernameOrEmail === 'admin' && password === 'Tribalde@#53') {
      const user = {
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
      onAuthenticated(user);
    } else {
      // For non-admin users, show error message
      throw new Error('Invalid credentials. Only admin can sign in. Contact administrator for access.');
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