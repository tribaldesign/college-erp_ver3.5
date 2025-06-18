import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X, Mail, MessageSquare } from 'lucide-react';
import { useAppContext, actions } from '../../context/AppContext';

interface NotificationPanelProps {
  onClose: () => void;
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  const { state, dispatch } = useAppContext();
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleMarkAllRead = () => {
    state.notifications.forEach(notification => {
      if (!notification.read) {
        dispatch(actions.markNotificationRead(notification.id));
      }
    });
  };

  const handleClearAll = () => {
    dispatch(actions.clearNotifications());
  };

  const handleMarkRead = (id: string) => {
    dispatch(actions.markNotificationRead(id));
  };

  const handleSendEmail = (notification: any) => {
    // Simulate sending email notification
    alert(`Email notification sent about: ${notification.title}`);
  };

  const handleSendWhatsApp = (notification: any) => {
    // Simulate sending WhatsApp notification
    alert(`WhatsApp notification sent about: ${notification.title}`);
  };

  return (
    <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {state.notifications.filter(n => !n.read).length > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {state.notifications.filter(n => !n.read).length} new
            </span>
          )}
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {state.notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {state.notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 ${!notification.read ? 'bg-blue-50' : ''} hover:bg-gray-50 transition-colors`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTime(notification.timestamp)}</p>
                  </div>
                  <div className="flex-shrink-0 flex space-x-1">
                    {!notification.read && (
                      <button 
                        onClick={() => handleMarkRead(notification.id)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                        title="Mark as read"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleSendEmail(notification)}
                      className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100"
                      title="Send email notification"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleSendWhatsApp(notification)}
                      className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50"
                      title="Send WhatsApp notification"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-gray-200 flex justify-between">
        <button 
          onClick={handleMarkAllRead}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          disabled={!state.notifications.some(n => !n.read)}
        >
          Mark all as read
        </button>
        <button 
          onClick={handleClearAll}
          className="text-sm text-gray-600 hover:text-gray-800 font-medium"
          disabled={state.notifications.length === 0}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}