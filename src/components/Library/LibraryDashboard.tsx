import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Upload, 
  BarChart3, 
  TrendingUp,
  UserPlus,
  BookPlus,
  RefreshCw,
  FileText,
  Star,
  Award,
  Target,
  Library,
  Bookmark,
  UserCheck,
  BookMarked,
  ArrowUpDown,
  X
} from 'lucide-react';
import { LibraryBook, LibraryMember, LibraryTransaction } from '../../types';
import { useAppContext, actions } from '../../context/AppContext';

interface LibraryDashboardProps {
  user: any;
}

export default function LibraryDashboard({ user }: LibraryDashboardProps) {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isIssueBookModalOpen, setIsIssueBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<LibraryBook | null>(null);
  const [selectedMember, setSelectedMember] = useState<LibraryMember | null>(null);
  const [newBookData, setNewBookData] = useState<Partial<LibraryBook>>({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    publishYear: new Date().getFullYear(),
    totalCopies: 1,
    location: '',
  });
  const [newMemberData, setNewMemberData] = useState<Partial<LibraryMember>>({
    name: '',
    email: '',
    phone: '',
    memberType: 'Student',
    department: '',
  });

  // Check if user can manage library (admin or library faculty)
  const canManageLibrary = user?.userType === 'admin' || 
    (user?.userType === 'faculty' && user?.department === 'Library');

  const categories = [
    'Computer Science',
    'Political Science', 
    'English',
    'History',
    'Education',
    'Sociology',
    'Economics',
    'Geography',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'General'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': case 'Active': case 'Returned': 
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Limited': case 'Suspended': case 'Issued': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Out of Stock': case 'Expired': case 'Overdue': 
        return 'bg-red-100 text-red-800 border-red-200';
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMemberTypeColor = (type: string) => {
    switch (type) {
      case 'Student': return 'bg-blue-100 text-blue-800';
      case 'Faculty': return 'bg-purple-100 text-purple-800';
      case 'Staff': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: ArrowUpDown },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const totalBooks = state.libraryBooks.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableBooks = state.libraryBooks.reduce((sum, book) => sum + book.availableCopies, 0);
  const issuedBooks = totalBooks - availableBooks;
  const activeMembers = state.libraryMembers.filter(m => m.status === 'Active').length;
  const overdueBooks = state.libraryTransactions.filter(t => t.status === 'Overdue').length;
  const totalFines = state.libraryMembers.reduce((sum, member) => sum + member.fineAmount, 0);

  const handleAddBook = () => {
    const newBook: LibraryBook = {
      id: Date.now().toString(),
      title: newBookData.title || '',
      author: newBookData.author || '',
      isbn: newBookData.isbn || '',
      category: newBookData.category || '',
      publisher: newBookData.publisher || '',
      publishYear: newBookData.publishYear || new Date().getFullYear(),
      totalCopies: newBookData.totalCopies || 1,
      availableCopies: newBookData.totalCopies || 1,
      location: newBookData.location || '',
      status: 'Available',
      addedDate: new Date().toISOString().split('T')[0],
      addedBy: user?.name || 'Admin'
    };
    
    dispatch(actions.addLibraryBook(newBook));
    setIsAddBookModalOpen(false);
    setNewBookData({
      title: '',
      author: '',
      isbn: '',
      category: '',
      publisher: '',
      publishYear: new Date().getFullYear(),
      totalCopies: 1,
      location: '',
    });
  };

  const handleAddMember = () => {
    const newMember: LibraryMember = {
      id: Date.now().toString(),
      name: newMemberData.name || '',
      email: newMemberData.email || '',
      phone: newMemberData.phone || '',
      memberType: newMemberData.memberType as 'Student' | 'Faculty' | 'Staff',
      membershipId: `LIB${String(state.libraryMembers.length + 1).padStart(3, '0')}`,
      department: newMemberData.department || '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      booksIssued: 0,
      maxBooks: newMemberData.memberType === 'Faculty' ? 10 : 5,
      fineAmount: 0
    };
    
    dispatch(actions.addLibraryMember(newMember));
    setIsAddMemberModalOpen(false);
    setNewMemberData({
      name: '',
      email: '',
      phone: '',
      memberType: 'Student',
      department: '',
    });
  };

  const handleIssueBook = () => {
    if (!selectedBook || !selectedMember) return;
    
    // Update book available copies
    const updatedBook = {
      ...selectedBook,
      availableCopies: selectedBook.availableCopies - 1,
      status: selectedBook.availableCopies <= 1 ? 'Out of Stock' : 
              selectedBook.availableCopies <= 3 ? 'Limited' : 'Available'
    };
    
    // Update member books issued
    const updatedMember = {
      ...selectedMember,
      booksIssued: selectedMember.booksIssued + 1
    };
    
    // Create transaction
    const newTransaction: LibraryTransaction = {
      id: Date.now().toString(),
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      memberId: selectedMember.id,
      memberName: selectedMember.name,
      memberType: selectedMember.memberType,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Issued',
      fine: 0,
      issuedBy: user?.name || 'Librarian'
    };
    
    dispatch(actions.updateLibraryBook(updatedBook));
    dispatch(actions.updateLibraryMember(updatedMember));
    dispatch(actions.addLibraryTransaction(newTransaction));
    
    setIsIssueBookModalOpen(false);
    setSelectedBook(null);
    setSelectedMember(null);
  };

  const handleBookInputChange = (field: keyof LibraryBook, value: any) => {
    setNewBookData(prev => ({ ...prev, [field]: value }));
  };

  const handleMemberInputChange = (field: keyof LibraryMember, value: any) => {
    setNewMemberData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Library Management</h2>
            <p className="text-emerald-100">Manage books, members, and library transactions</p>
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
                <BookMarked className="h-6 w-6" />
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

      {/* Quick Actions - Only for admin and library faculty */}
      {canManageLibrary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setIsAddBookModalOpen(true)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Add Book</p>
                <p className="text-sm text-gray-600">Add new book to library</p>
              </div>
            </div>
          </button>
          
          <button 
            onClick={() => setIsAddMemberModalOpen(true)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Register Member</p>
                <p className="text-sm text-gray-600">Add new library member</p>
              </div>
            </div>
          </button>
          
          <button 
            onClick={() => setIsIssueBookModalOpen(true)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bookmark className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Issue Book</p>
                <p className="text-sm text-gray-600">Issue book to member</p>
              </div>
            </div>
          </button>
          
          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Generate Report</p>
                <p className="text-sm text-gray-600">Library analytics</p>
              </div>
            </div>
          </button>
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
                    <p className="text-sm text-green-600">Library members</p>
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
                    <p className="text-sm text-purple-600">Currently out</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookMarked className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Fines</p>
                    <p className="text-2xl font-bold text-gray-900">${totalFines.toFixed(2)}</p>
                    <p className="text-sm text-orange-600">{overdueBooks} overdue</p>
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
                  {state.libraryTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.status === 'Issued' ? 'bg-blue-100' :
                          transaction.status === 'Returned' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.status === 'Issued' && <BookMarked className="h-4 w-4 text-blue-600" />}
                          {transaction.status === 'Returned' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {transaction.status === 'Overdue' && <AlertCircle className="h-4 w-4 text-red-600" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.bookTitle}</p>
                          <p className="text-xs text-gray-600">{transaction.memberName}</p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
                <div className="space-y-3">
                  {categories.slice(0, 6).map((category, index) => {
                    const categoryBooks = state.libraryBooks.filter(book => book.category === category).length;
                    const percentage = totalBooks > 0 ? (categoryBooks / totalBooks) * 100 : 0;
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{categoryBooks}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                {canManageLibrary && (
                  <div className="flex space-x-2">
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </button>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>Import</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.libraryBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(book.status)}`}>
                      {book.status}
                    </span>
                    {canManageLibrary && (
                      <div className="flex space-x-1">
                        <button className="text-gray-600 hover:text-emerald-600 p-1 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600 p-1 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-red-600 p-1 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{book.title}</h3>
                    <p className="text-gray-600 text-sm">by {book.author}</p>
                    <p className="text-gray-500 text-xs mt-1">{book.publisher} • {book.publishYear}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">ISBN:</span>
                      <span className="font-mono text-gray-900">{book.isbn}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span className="text-gray-900">{book.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Location:</span>
                      <span className="text-gray-900">{book.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Available:</span>
                      <span className="font-semibold text-gray-900">{book.availableCopies}/{book.totalCopies}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full" 
                      style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                    ></div>
                  </div>

                  {canManageLibrary && book.availableCopies > 0 && (
                    <button 
                      onClick={() => {
                        setSelectedBook(book);
                        setIsIssueBookModalOpen(true);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Issue Book
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
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
                    {state.libraryMembers.map((member) => (
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
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getMemberTypeColor(member.memberType)}`}>
                            {member.memberType}
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
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-emerald-600 p-1 rounded">
                              <Eye className="h-4 w-4" />
                            </button>
                            {canManageLibrary && (
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
            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Book</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Member</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Issue Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Due Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Return Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Fine</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {state.libraryTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-semibold text-gray-900">{transaction.bookTitle}</p>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{transaction.memberName}</p>
                            <p className="text-sm text-gray-600">{transaction.memberType}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">
                          {new Date(transaction.issueDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-gray-700">
                          {new Date(transaction.dueDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-gray-700">
                          {transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : '-'}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-semibold ${transaction.fine > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ${transaction.fine.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {canManageLibrary && transaction.status === 'Issued' && (
                              <button className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition-colors">
                                Return
                              </button>
                            )}
                            {canManageLibrary && transaction.status === 'Overdue' && (
                              <button className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-sm hover:bg-red-200 transition-colors">
                                Collect Fine
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

        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Report Generation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Library Statistics</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Generate comprehensive library usage statistics</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Popular Books</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Most issued and popular books report</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Overdue Report</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Books overdue and fine collection report</p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
            </div>

            {/* Quick Analytics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Library Analytics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{((availableBooks / totalBooks) * 100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Availability Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{((issuedBooks / totalBooks) * 100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Utilization Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{(state.libraryMembers.reduce((sum, m) => sum + m.booksIssued, 0) / activeMembers || 0).toFixed(1)}</p>
                  <p className="text-sm text-gray-600">Avg Books/Member</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{((overdueBooks / issuedBooks) * 100 || 0).toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Overdue Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Book Modal */}
      {isAddBookModalOpen && canManageLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div className="flex items-center space-x-3">
                <BookPlus className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Add New Book</h2>
              </div>
              <button
                onClick={() => setIsAddBookModalOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Book Title *</label>
                    <input
                      type="text"
                      value={newBookData.title}
                      onChange={(e) => handleBookInputChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                    <input
                      type="text"
                      value={newBookData.author}
                      onChange={(e) => handleBookInputChange('author', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ISBN *</label>
                    <input
                      type="text"
                      value={newBookData.isbn}
                      onChange={(e) => handleBookInputChange('isbn', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="978-0123456789"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select 
                      value={newBookData.category}
                      onChange={(e) => handleBookInputChange('category', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
                    <input
                      type="text"
                      value={newBookData.publisher}
                      onChange={(e) => handleBookInputChange('publisher', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Publisher name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publish Year</label>
                    <input
                      type="number"
                      value={newBookData.publishYear}
                      onChange={(e) => handleBookInputChange('publishYear', parseInt(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="2024"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Copies *</label>
                    <input
                      type="number"
                      value={newBookData.totalCopies}
                      onChange={(e) => handleBookInputChange('totalCopies', parseInt(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="1"
                      min="1"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={newBookData.location}
                    onChange={(e) => handleBookInputChange('location', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., CS Section - A1"
                    required
                  />
                </div>
              </form>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsAddBookModalOpen(false)}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddBook}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && canManageLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div className="flex items-center space-x-3">
                <UserPlus className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Register New Member</h2>
              </div>
              <button
                onClick={() => setIsAddMemberModalOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={newMemberData.name}
                      onChange={(e) => handleMemberInputChange('name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={newMemberData.email}
                      onChange={(e) => handleMemberInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="email@college.edu"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={newMemberData.phone}
                      onChange={(e) => handleMemberInputChange('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="+1-555-0123"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Type *</label>
                    <select 
                      value={newMemberData.memberType}
                      onChange={(e) => handleMemberInputChange('memberType', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select 
                    value={newMemberData.department}
                    onChange={(e) => handleMemberInputChange('department', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
                    required
                  >
                    <option value="">Select Department</option>
                    {categories.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsAddMemberModalOpen(false)}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddMember}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Register Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Book Modal */}
      {isIssueBookModalOpen && canManageLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div className="flex items-center space-x-3">
                <Bookmark className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Issue Book</h2>
              </div>
              <button
                onClick={() => setIsIssueBookModalOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Book *</label>
                  <select 
                    value={selectedBook?.id || ''}
                    onChange={(e) => {
                      const book = state.libraryBooks.find(b => b.id === e.target.value);
                      setSelectedBook(book || null);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a book</option>
                    {state.libraryBooks
                      .filter(book => book.availableCopies > 0)
                      .map(book => (
                        <option key={book.id} value={book.id}>
                          {book.title} by {book.author} ({book.availableCopies} available)
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Member *</label>
                  <select 
                    value={selectedMember?.id || ''}
                    onChange={(e) => {
                      const member = state.libraryMembers.find(m => m.id === e.target.value);
                      setSelectedMember(member || null);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a member</option>
                    {state.libraryMembers
                      .filter(member => member.status === 'Active' && member.booksIssued < member.maxBooks)
                      .map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name} ({member.memberType}) - {member.booksIssued}/{member.maxBooks} books
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                {selectedBook && selectedMember && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Book:</span>
                      <span className="text-sm text-gray-900">{selectedBook.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Member:</span>
                      <span className="text-sm text-gray-900">{selectedMember.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Issue Date:</span>
                      <span className="text-sm text-gray-900">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Due Date:</span>
                      <span className="text-sm text-gray-900">{new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsIssueBookModalOpen(false)}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleIssueBook}
                disabled={!selectedBook || !selectedMember}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Issue Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}