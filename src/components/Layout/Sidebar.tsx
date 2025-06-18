import React from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  ClipboardCheck, 
  BarChart3, 
  Settings,
  User,
  Building,
  X,
  Library,
  UserCog,
  UserPlus
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user?: any;
  onClose?: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'faculty', label: 'Faculty', icon: GraduationCap },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'departments', label: 'Departments', icon: Building },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'users', label: 'User Management', icon: UserCog, adminOnly: true },
  { id: 'signup-requests', label: 'Signup Requests', icon: UserPlus, adminOnly: true },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, user, onClose }: SidebarProps) {
  // Filter menu items based on user permissions
  const getFilteredMenuItems = () => {
    if (!user) return menuItems;
    
    // Admin can see everything
    if (user.userType === 'admin') return menuItems;
    
    // Faculty can see most items except settings and user management
    if (user.userType === 'faculty') {
      return menuItems.filter(item => !item.adminOnly && item.id !== 'settings');
    }
    
    // Students can only see limited items
    if (user.userType === 'student') {
      return menuItems.filter(item => 
        ['dashboard', 'courses', 'library', 'schedule', 'attendance', 'profile'].includes(item.id)
      );
    }
    
    // Staff can see most items except settings and user management
    if (user.userType === 'staff') {
      return menuItems.filter(item => !item.adminOnly && item.id !== 'settings');
    }
    
    return menuItems;
  };

  const filteredMenuItems = getFilteredMenuItems();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // Auto-close sidebar on mobile/tablet when a tab is clicked
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-sm border border-gray-100">
              <img 
                src="https://i.ibb.co/1GyxzVc0/logo.png" 
                alt="St. Dominic's College Logo" 
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  // Fallback to a colored div if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">SD</div>';
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">St. Dominic's College</h1>
              <p className="text-sm text-gray-500">College ERP</p>
            </div>
          </div>
          
          {/* Close button for mobile/tablet */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${
                    activeTab === item.id ? 'text-blue-700' : 'text-gray-500'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                  {item.adminOnly && (
                    <span className="ml-auto text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.userType || 'User'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}