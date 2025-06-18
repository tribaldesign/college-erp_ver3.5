import React, { createContext, useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, MessageSquare, Bell } from 'lucide-react';
import { useAppContext, actions } from '../../context/AppContext';

// Define the context type
interface NotificationContextType {
  sendEmailNotification: (recipient: string, subject: string, message: string) => void;
  sendWhatsAppNotification: (phoneNumber: string, message: string) => void;
  sendSystemNotification: (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  sendAllNotifications: (recipient: { email: string; phone: string; name: string }, subject: string, message: string) => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextType | null>(null);

// Provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { dispatch } = useAppContext();

  // Send email notification
  const sendEmailNotification = (recipient: string, subject: string, message: string) => {
    // In a real app, this would connect to an email service API
    console.log(`Sending email to ${recipient}:`, { subject, message });
    
    // Show toast notification
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Email Notification Sent</p>
              <p className="mt-1 text-sm text-gray-500">
                Email sent to {recipient.split('@')[0]}...
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
          >
            Dismiss
          </button>
        </div>
      </div>
    ));
    
    // Add to system notifications
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'Email Notification Sent',
      message: `Email sent to ${recipient} with subject: ${subject}`,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    return true;
  };

  // Send WhatsApp notification
  const sendWhatsAppNotification = (phoneNumber: string, message: string) => {
    // In a real app, this would connect to a WhatsApp API
    console.log(`Sending WhatsApp to ${phoneNumber}:`, message);
    
    // Show toast notification
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">WhatsApp Notification Sent</p>
              <p className="mt-1 text-sm text-gray-500">
                Message sent to {phoneNumber}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none"
          >
            Dismiss
          </button>
        </div>
      </div>
    ));
    
    // Add to system notifications
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'WhatsApp Notification Sent',
      message: `WhatsApp message sent to ${phoneNumber}`,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    return true;
  };

  // Send system notification
  const sendSystemNotification = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    // Add to system notifications
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    // Show toast notification
    const toastType = type === 'error' ? toast.error : 
                     type === 'success' ? toast.success : 
                     type === 'warning' ? toast.custom : toast.custom;
    
    if (type === 'warning' || type === 'info') {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className={`h-10 w-10 rounded-full ${type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'} flex items-center justify-center`}>
                  <Bell className={`h-6 w-6 ${type === 'warning' ? 'text-yellow-600' : 'text-blue-600'}`} />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className={`w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium ${type === 'warning' ? 'text-yellow-600 hover:text-yellow-500' : 'text-blue-600 hover:text-blue-500'} focus:outline-none`}
            >
              Dismiss
            </button>
          </div>
        </div>
      ));
    } else {
      toastType(message, {
        duration: 4000,
        position: 'top-right',
      });
    }
    
    return true;
  };

  // Send all notifications (email, WhatsApp, and system)
  const sendAllNotifications = (recipient: { email: string; phone: string; name: string }, subject: string, message: string) => {
    sendEmailNotification(recipient.email, subject, message);
    sendWhatsAppNotification(recipient.phone, message);
    sendSystemNotification(subject, message, 'info');
    return true;
  };

  return (
    <NotificationContext.Provider value={{
      sendEmailNotification,
      sendWhatsAppNotification,
      sendSystemNotification,
      sendAllNotifications
    }}>
      <Toaster />
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};