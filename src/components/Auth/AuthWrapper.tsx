import React, { useState } from 'react';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import { useAppContext, actions } from '../../context/AppContext';
import { useNotifications } from '../Notifications/NotificationService';

interface AuthWrapperProps {
  onAuthenticated: (user: any) => void;
}

export default function AuthWrapper({ onAuthenticated }: AuthWrapperProps) {
  const [currentPage, setCurrentPage] = useState<'signin' | 'signup'>('signin');
  const { dispatch } = useAppContext();
  const { sendEmailNotification } = useNotifications();

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
    // Create a signup request for admin approval
    const signupRequest = {
      id: Date.now().toString(),
      ...userData,
      status: 'pending_approval',
      submittedAt: new Date().toISOString(),
      type: 'signup_request'
    };
    
    // Add to pending requests (admin will see this)
    dispatch(actions.addSignupRequest(signupRequest));
    
    // Send confirmation email to the user
    sendEmailNotification(
      userData.email,
      'Account Registration Received - St. Dominic\'s College',
      `Dear ${userData.firstName} ${userData.lastName},

Thank you for registering with St. Dominic's College ERP System.

Your registration details:
- Name: ${userData.firstName} ${userData.lastName}
- Email: ${userData.email}
- Phone: ${userData.phone}
- Department: ${userData.department}
- Type: ${userData.userType}
- ${userData.userType === 'student' ? 'Roll Number' : 'Employee ID'}: ${userData.rollNumber || userData.employeeId}

Your account is currently under review by our administrators. You will receive your login credentials via email once your account is approved.

This process typically takes 1-2 business days.

If you have any questions, please contact the administration office.

Best regards,
St. Dominic's College Administration`
    );
    
    // Add notification for admin
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'New Signup Request',
      message: `${userData.firstName} ${userData.lastName} (${userData.userType}) has requested account access`,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    alert(`Account registration submitted successfully! 

A confirmation email has been sent to ${userData.email}.

Your account is now pending admin approval. You will receive your login credentials via email once approved.

Please check your email for confirmation details.`);
    
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