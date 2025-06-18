import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  User,
  Book,
  RefreshCw,
  Archive,
  Star,
  MapPin,
  Phone,
  Mail,
  Hash,
  FileText,
  Award,
  Target,
  UserPlus,
  Shield,
  Settings
} from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  publishYear: number;
  totalCopies: number;
  availableCopies: number;
  location: string;
  status: 'Available' | 'Limited' | 'Out of Stock';
  rating: number;
  borrowCount: number;
}

interface Member {
  id: string;
  name: string;
  membershipId: string;
  type: 'Student' | 'Faculty' | 'Staff';
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'Suspended' | 'Expired';
  booksIssued: number;
  maxBooks: number;
  fineAmount: number;
}

interface LibraryStaff {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  role: 'Librarian' | 'Assistant Librarian' | 'Library Assistant';
  department: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
  permissions: {
    canAddBooks: boolean;
    canIssueBooks: boolean;
    canManageMembers: boolean;
    canGenerateReports: boolean;
    canManageFines: boolean;
  };
}

interface Transaction {
  id: string;
  bookId: string;
  bookTitle: string;
  memberId: string;
  memberName: string;
  type: 'Issue' | 'Return' | 'Renew';
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Active' | 'Returned' | 'Overdue';
  fine: number;
}

interface LibraryDashboardProps {
  user?: {
    userType: 'admin' | 'faculty' | 'student' | 'staff';
    id: string;
    name: string;
    permissions?: any;
  };
}

export default function LibraryDashboard({ user }: LibraryDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  // Check if user has library management permissions
  const isLibraryStaff = user?.userType === 'faculty' || user?.userType === 'admin';
  const isAdmin = user?.userType === 'admin';

  const mockBooks: Book[] = [
    {
      id: '1',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0262033848',
      category: 'Computer Science',
      publisher: 'MIT Press',
      publishYear: 2009,
      totalCopies: 5,
      availableCopies: 2,
      location: 'CS Section - A1',
      status: 'Available',
      rating: 4.8,
      borrowCount: 45
    },
    {
      id: '2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      category: 'Software Engineering',
      publisher: 'Prentice Hall',
      publishYear: 2008,
      totalCopies: 3,
      availableCopies: 0,
      location: 'CS Section - A2',
      status: 'Out of Stock',
      rating: 4.6,
      borrowCount: 38
    },
    {
      id: '3',
      title: 'Digital Signal Processing',
      author: 'John G. Proakis',
      isbn: '978-0131873742',
      category: 'Electrical Engineering',
      publisher: 'Pearson',
      publishYear: 2006,
      totalCopies: 4,
      availableCopies: 1,
      location: 'EE Section - B1',
      status: 'Limited',
      rating: 4.4,
      borrowCount: 28
    },
    {
      id: '4',
      title: 'Thermodynamics: An Engineering Approach',
      author: 'Yunus A. Cengel',
      isbn: '978-0073398174',
      category: 'Mechanical Engineering',
      publisher: 'McGraw-Hill',
      publishYear: 2014,
      totalCopies: 6,
      availableCopies: 4,
      location: 'ME Section - C1',
      status: 'Available',
      rating: 4.5,
      borrowCount: 32
    },
    {
      id: '5',
      title: 'Calculus: Early Transcendentals',
      author: 'James Stewart',
      isbn: '978-1285741550',
      category: 'Mathematics',
      publisher: 'Cengage Learning',
      publishYear: 2015,
      totalCopies: 8,
      availableCopies: 6,
      location: 'Math Section - D1',
      status: 'Available',
      rating: 4.3,
      borrowCount: 52
    }
  ];

  const mockMembers: Member[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      membershipId: 'LIB001',
      type: 'Student',
      department: 'Computer Science',
      email: 'alice.johnson@college.edu',
      phone: '+1-555-0101',
      joinDate: '2023-08-15',
      status: 'Active',
      booksIssued: 2,
      maxBooks: 5,
      fineAmount: 0
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      membershipId: 'LIB002',
      type: 'Faculty',
      department: 'Computer Science',
      email: 'sarah.johnson@college.edu',
      phone: '+1-555-0201',
      joinDate: '2022-01-10',
      status: 'Active',
      booksIssued: 4,
      maxBooks: 10,
      fineAmount: 0
    },
    {
      id: '3',
      name: 'Bob Smith',
      membershipId: 'LIB003',
      type: 'Student',
      department: 'Electrical Engineering',
      email: 'bob.smith@college.edu',
      phone: '+1-555-0103',
      joinDate: '2023-08-15',
      status: 'Active',
      booksIssued: 1,
      maxBooks: 5,
      fineAmount: 15.50
    },
    {
      id: '4',
      name: 'Carol Davis',
      membershipId: 'LIB004',
      type: 'Student',
      department: 'Mechanical Engineering',
      email: 'carol.davis@college.edu',
      phone: '+1-555-0105',
      joinDate: '2023-01-20',
      status: 'Active',
      booksIssued: 3,
      maxBooks: 5,
      fineAmount: 0
    }
  ];

  const mockLibraryStaff: LibraryStaff[] = [
    {
      id: '1',
      name: 'Dr. Michael Brown',
      employeeId: 'LIB_FAC001',
      email: 'michael.brown@college.edu',
      phone: '+1-555-0301',
      role: 'Librarian',
      department: 'Library Services',
      joiningDate: '2020-01-15',
      status: 'Active',
      permissions: {
        canAddBooks: true,
        canIssueBooks: true,
        canManageMembers: true,
        canGenerateReports: true,
        canManageFines: true
      }
    },
    {
      id: '2',
      name: 'Dr. Emily Davis',
      employeeId: 'LIB_FAC002',
      email: 'emily.davis@college.edu',
      phone: '+1-555-0302',
      role: 'Assistant Librarian',
      department: 'Library Services',
      joiningDate: '2021-03-10',
      status: 'Active',
      permissions: {
        canAddBooks: true,
        canIssueBooks: true,
        canManageMembers: true,
        canGenerateReports: true,
        canManageFines: false
      }
    }
  ];

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      bookId: '1',
      bookTitle: 'Introduction to Algorithms',
      memberId: '1',
      memberName: 'Alice Johnson',
      type: 'Issue',
      issueDate: '2024-01-10',
      dueDate: '2024-01-24',
      status: 'Active',
      fine: 0
    },
    {
      id: '2',
      bookId: '2',
      bookTitle: 'Clean Code',
      memberId: '2',
      memberName: 'Dr. Sarah Johnson',
      type: 'Issue',
      issueDate: '2024-01-08',
      dueDate: '2024-02-08',
      status: 'Active',
      fine: 0
    },
    {
      id: '3',
      bookId: '3',
      bookTitle: 'Digital Signal Processing',
      memberId: '3',
      memberName: 'Bob Smith',
      type: 'Return',
      issueDate: '2023-12-15',
      dueDate: '2024-01-05',
      returnDate: '2024-01-12',
      status: 'Returned',
      fine: 15.50
    }
  ];

  const getBookStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'Limited': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Out of Stock': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMemberStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'Expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Returned': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStaffRoleColor = (role: string) => {
    switch (role) {
      case 'Librarian': return 'bg-purple-100 text-purple-800';
      case 'Assistant Librarian': return 'bg-blue-100 text-blue-800';
      case 'Library Assistant': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Define tabs based on user permissions
  const getAvailableTabs = () => {
    const baseTabs = [
      { id: 'overview', label: 'Overview', icon: BarChart3 },
      { id: 'books', label: 'Books', icon: BookOpen },
      { id: 'members', label: 'Members', icon: Users },
      { id: 'transactions', label: 'Transactions', icon: RefreshCw },
      { id: 'reports', label: 'Reports', icon: FileText },
    ];

    // Add staff management tab only for admin
    if (isAdmin) {
      baseTabs.push({ id: 'staff', label: 'Library Staff', icon: Shield });
    }

    return baseTabs;
  };

  const tabs = getAvailableTabs();

  const categories = [...new Set(mockBooks.map(book => book.category))];
  const totalBooks = mockBooks.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableBooks = mockBooks.reduce((sum, book) => sum + book.availableCopies, 0);
  const issuedBooks = totalBooks - availableBooks;
  const activeMembers = mockMembers.filter(member => member.status === 'Active').length;
  const overdueBooks = mockTransactions.filter(t => t.status === 'Overdue').length;
  const totalFines = mockMembers.reduce((sum, member) => sum + member.fineAmount, 0);

  // Permission check functions
  const canAddBooks = isLibraryStaff;
  const canIssueBooks = isLibraryStaff;
  const canManageMembers = isLibraryStaff;
  const canGenerateReports = isLibraryStaff;
  const canManageStaff = isAdmin;

  // Show access denied for non-library staff
  if (!isLibraryStaff && user?.userType !== 'student') {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600">You don't have permission to access the library management system.</p>
          <p className="text-sm text-gray-500 mt-2">Contact the administrator to request library staff access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Library Management</h2>
            <p className="text-emerald-100">
              {user?.userType === 'student' 
                ? 'Browse books and manage your library account'
                : 'Comprehensive library system for books, members, and transactions'
              }
            </p>
            {isLibraryStaff && (
              <div className="mt-2 flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Library Staff Access</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{totalBooks}</p>
              <p className="text-sm text-emerald-100">Total Books</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{activeMembers}</p>
              <p className="text-sm text-emerald-100">Active Members</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <RefreshCw className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{issuedBooks}</p>
              <p className="text-sm text-emerald-100">Books Issued</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <AlertCircle className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{overdueBooks}</p>
              <p className="text-sm text-emerald-100">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Only for library staff */}
      {isLibraryStaff && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {canIssueBooks && (
            <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Issue Book</p>
                  <p className="text-sm text-gray-600">Issue book to member</p>
                </div>
              </div>
            </button>
          )}
          
          {canIssueBooks && (
            <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Return Book</p>
                  <p className="text-sm text-gray-600">Process book return</p>
                </div>
              </div>
            </button>
          )}
          
          {canManageMembers && (
            <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Add Member</p>
                  <p className="text-sm text-gray-600">Register new member</p>
                </div>
              </div>
            </button>
          )}
          
          {canAddBooks && (
            <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Add Book</p>
                  <p className="text-sm text-gray-600">Add new book to catalog</p>
                </div>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Books</p>
                    <p className="text-2xl font-bold text-gray-900">{totalBooks}</p>
                    <p className="text-sm text-blue-600">{availableBooks} available</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Members</p>
                    <p className="text-2xl font-bold text-gray-900">{activeMembers}</p>
                    <p className="text-sm text-green-600">+12 this month</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Books Issued</p>
                    <p className="text-2xl font-bold text-gray-900">{issuedBooks}</p>
                    <p className="text-sm text-purple-600">{((issuedBooks/totalBooks)*100).toFixed(1)}% utilization</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Fines</p>
                    <p className="text-2xl font-bold text-gray-900">${totalFines.toFixed(2)}</p>
                    <p className="text-sm text-orange-600">{overdueBooks} overdue books</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity & Popular Books */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  {mockTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'Issue' ? 'bg-blue-100' :
                          transaction.type === 'Return' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          {transaction.type === 'Issue' && <Plus className="h-4 w-4 text-blue-600" />}
                          {transaction.type === 'Return' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {transaction.type === 'Renew' && <RefreshCw className="h-4 w-4 text-purple-600" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.bookTitle}</p>
                          <p className="text-xs text-gray-600">{transaction.memberName} • {transaction.type}</p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTransactionStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Books</h3>
                <div className="space-y-4">
                  {mockBooks
                    .sort((a, b) => b.borrowCount - a.borrowCount)
                    .slice(0, 5)
                    .map((book, index) => (
                    <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-emerald-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{book.title}</p>
                          <p className="text-xs text-gray-600">{book.author}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{book.borrowCount}</p>
                        <p className="text-xs text-gray-600">borrows</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => {
                  const categoryBooks = mockBooks.filter(book => book.category === category);
                  const totalCategoryBooks = categoryBooks.reduce((sum, book) => sum + book.totalCopies, 0);
                  const availableCategoryBooks = categoryBooks.reduce((sum, book) => sum + book.availableCopies, 0);
                  
                  return (
                    <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="h-6 w-6 text-emerald-600" />
                      </div>
                      <p className="font-semibold text-gray-900">{category}</p>
                      <p className="text-sm text-gray-600">{totalCategoryBooks} books</p>
                      <p className="text-xs text-emerald-600">{availableCategoryBooks} available</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'books' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books by title, author, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Limited">Limited</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                {canAddBooks && (
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add Book</span>
                  </button>
                )}
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getBookStatusColor(book.status)}`}>
                      {book.status}
                    </span>
                    <div className="flex space-x-1">
                      <button className="text-gray-600 hover:text-emerald-600 p-1 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      {canAddBooks && (
                        <>
                          <button className="text-gray-600 hover:text-blue-600 p-1 rounded">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-red-600 p-1 rounded">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{book.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className={`h-3 w-3 ${star <= Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">({book.rating})</span>
                    </div>
                    <p className="text-xs text-gray-500">{book.category} • {book.publisher}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">ISBN:</span>
                      <span className="font-mono text-xs">{book.isbn}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Location:</span>
                      <span className="text-gray-900">{book.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Available:</span>
                      <span className="font-semibold text-gray-900">{book.availableCopies}/{book.totalCopies}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Borrowed:</span>
                      <span className="text-gray-900">{book.borrowCount} times</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full" 
                      style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex space-x-2">
                    {canIssueBooks && book.availableCopies > 0 && (
                      <button className="flex-1 bg-emerald-100 text-emerald-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors">
                        Issue Book
                      </button>
                    )}
                    <button className="flex-1 bg-blue-100 text-blue-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members by name, ID, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option value="">All Types</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Staff">Staff</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Expired">Expired</option>
                </select>
                {canManageMembers && (
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add Member</span>
                  </button>
                )}
              </div>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Member</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Department</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Books Issued</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Fine Amount</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{member.name}</p>
                              <p className="text-sm text-gray-600">{member.membershipId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            member.type === 'Student' ? 'bg-blue-100 text-blue-800' :
                            member.type === 'Faculty' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {member.type}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{member.department}</td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-gray-900">{member.booksIssued}/{member.maxBooks}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-semibold ${member.fineAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ${member.fineAmount.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getMemberStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-emerald-600 p-1 rounded">
                              <Eye className="h-4 w-4" />
                            </button>
                            {canManageMembers && (
                              <>
                                <button className="text-gray-600 hover:text-blue-600 p-1 rounded">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="text-gray-600 hover:text-red-600 p-1 rounded">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Transaction Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option value="">All Types</option>
                  <option value="Issue">Issue</option>
                  <option value="Return">Return</option>
                  <option value="Renew">Renew</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Returned">Returned</option>
                  <option value="Overdue">Overdue</option>
                </select>
                {canGenerateReports && (
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                )}
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Book</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Member</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Issue Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Due Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Fine</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-semibold text-gray-900">{transaction.bookTitle}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-gray-900">{transaction.memberName}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            transaction.type === 'Issue' ? 'bg-blue-100 text-blue-800' :
                            transaction.type === 'Return' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{new Date(transaction.issueDate).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-gray-700">{new Date(transaction.dueDate).toLocaleDateString()}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTransactionStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-semibold ${transaction.fine > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ${transaction.fine.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-emerald-600 p-1 rounded">
                              <Eye className="h-4 w-4" />
                            </button>
                            {canIssueBooks && transaction.status === 'Active' && (
                              <button className="text-gray-600 hover:text-green-600 p-1 rounded">
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && canGenerateReports && (
          <div className="space-y-6">
            {/* Report Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Book Reports</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Generate reports on book inventory, circulation, and popularity</p>
                <div className="space-y-2">
                  <button className="w-full text-left bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                    Inventory Report
                  </button>
                  <button className="w-full text-left bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                    Popular Books Report
                  </button>
                  <button className="w-full text-left bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                    Category Analysis
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Member Reports</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Analyze member activity, borrowing patterns, and demographics</p>
                <div className="space-y-2">
                  <button className="w-full text-left bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm hover:bg-green-100 transition-colors">
                    Member Activity Report
                  </button>
                  <button className="w-full text-left bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm hover:bg-green-100 transition-colors">
                    Borrowing Patterns
                  </button>
                  <button className="w-full text-left bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm hover:bg-green-100 transition-colors">
                    Fine Collection Report
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Analytics Reports</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Statistical analysis and performance metrics</p>
                <div className="space-y-2">
                  <button className="w-full text-left bg-purple-50 text-purple-800 px-3 py-2 rounded-lg text-sm hover:bg-purple-100 transition-colors">
                    Usage Statistics
                  </button>
                  <button className="w-full text-left bg-purple-50 text-purple-800 px-3 py-2 rounded-lg text-sm hover:bg-purple-100 transition-colors">
                    Overdue Analysis
                  </button>
                  <button className="w-full text-left bg-purple-50 text-purple-800 px-3 py-2 rounded-lg text-sm hover:bg-purple-100 transition-colors">
                    Monthly Summary
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats for Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Library Performance Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{((availableBooks/totalBooks)*100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Availability Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{((issuedBooks/totalBooks)*100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Utilization Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{mockBooks.reduce((sum, book) => sum + book.borrowCount, 0)}</p>
                  <p className="text-sm text-gray-600">Total Borrows</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">${totalFines.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Fines Collected</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'staff' && isAdmin && (
          <div className="space-y-6">
            {/* Staff Management Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Library Staff Management</h3>
                <p className="text-sm text-gray-600">Manage library faculty members and their permissions</p>
              </div>
              <button 
                onClick={() => setIsStaffModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Library Staff</span>
              </button>
            </div>

            {/* Staff List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Staff Member</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Department</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Permissions</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockLibraryStaff.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {staff.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{staff.name}</p>
                              <p className="text-sm text-gray-600">{staff.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStaffRoleColor(staff.role)}`}>
                            {staff.role}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{staff.department}</td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {staff.permissions.canAddBooks && (
                              <span className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Add Books</span>
                            )}
                            {staff.permissions.canIssueBooks && (
                              <span className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Issue Books</span>
                            )}
                            {staff.permissions.canManageMembers && (
                              <span className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Manage Members</span>
                            )}
                            {staff.permissions.canGenerateReports && (
                              <span className="inline-flex px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">Reports</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                            staff.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
                          }`}>
                            {staff.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-emerald-600 p-1 rounded">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-blue-600 p-1 rounded">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-red-600 p-1 rounded">
                              <Settings className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Staff Permissions Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Permission Levels</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-medium text-purple-900 mb-2">Librarian</h5>
                  <p className="text-sm text-purple-700">Full access to all library functions including fine management</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Assistant Librarian</h5>
                  <p className="text-sm text-blue-700">Can manage books, members, and generate reports</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">Library Assistant</h5>
                  <p className="text-sm text-green-700">Basic book issuing and member management</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}