import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  Book, 
  Users, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Save,
  X,
  BookOpen,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  FileText
} from 'lucide-react';
import { LibraryBook, LibraryMember, LibraryTransaction } from '../../types';
import { useAppContext, actions } from '../../context/AppContext';

interface LibraryDashboardProps {
  user: any;
}

export default function LibraryDashboard({ user }: LibraryDashboardProps) {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState('books');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isIssueBookModalOpen, setIsIssueBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<LibraryBook | null>(null);
  const [selectedMember, setSelectedMember] = useState<LibraryMember | null>(null);
  const [bookFormData, setBookFormData] = useState<Partial<LibraryBook>>({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    publishYear: new Date().getFullYear(),
    totalCopies: 1,
    availableCopies: 1,
    location: '',
    status: 'Available'
  });
  const [memberFormData, setMemberFormData] = useState<Partial<LibraryMember>>({
    name: '',
    email: '',
    phone: '',
    memberType: 'Student',
    membershipId: '',
    department: '',
    status: 'Active',
    booksIssued: 0,
    maxBooks: 5,
    fineAmount: 0
  });
  const [issueFormData, setIssueFormData] = useState({
    bookId: '',
    memberId: '',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days from now
  });

  // Check if user has library permissions
  const canManageLibrary = user?.userType === 'admin' || 
                          (user?.userType === 'faculty' && 
                           (user?.designation === 'Librarian' || user?.department === 'Library'));

  // Filter books based on search and filters
  const filteredBooks = state.libraryBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || book.category === filterCategory;
    const matchesStatus = !filterStatus || book.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filter members based on search
  const filteredMembers = state.libraryMembers.filter(member => {
    return member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           member.membershipId.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Filter transactions based on search
  const filteredTransactions = state.libraryTransactions.filter(transaction => {
    return transaction.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
           transaction.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           transaction.status.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get unique categories for filter
  const categories = [...new Set(state.libraryBooks.map(book => book.category))];

  // Handle book form input changes
  const handleBookInputChange = (field: keyof LibraryBook, value: any) => {
    setBookFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-update available copies when total copies change
    if (field === 'totalCopies') {
      setBookFormData(prev => ({ 
        ...prev, 
        availableCopies: value,
        status: value > 0 ? 'Available' : 'Out of Stock'
      }));
    }
  };

  // Handle member form input changes
  const handleMemberInputChange = (field: keyof LibraryMember, value: any) => {
    setMemberFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle issue form input changes
  const handleIssueInputChange = (field: string, value: any) => {
    setIssueFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-update book details when book is selected
    if (field === 'bookId') {
      const book = state.libraryBooks.find(b => b.id === value);
      if (book && book.availableCopies <= 0) {
        alert('This book is not available for issue!');
      }
    }
    
    // Auto-update member details when member is selected
    if (field === 'memberId') {
      const member = state.libraryMembers.find(m => m.id === value);
      if (member && member.booksIssued >= member.maxBooks) {
        alert(`This member has already issued the maximum allowed books (${member.maxBooks})!`);
      }
    }
  };

  // Add new book
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBook: LibraryBook = {
      id: Date.now().toString(),
      title: bookFormData.title || '',
      author: bookFormData.author || '',
      isbn: bookFormData.isbn || '',
      category: bookFormData.category || '',
      publisher: bookFormData.publisher || '',
      publishYear: bookFormData.publishYear || new Date().getFullYear(),
      totalCopies: bookFormData.totalCopies || 1,
      availableCopies: bookFormData.availableCopies || 1,
      location: bookFormData.location || '',
      status: bookFormData.totalCopies && bookFormData.totalCopies > 0 ? 'Available' : 'Out of Stock',
      addedDate: new Date().toISOString().split('T')[0],
      addedBy: user?.name || 'Admin'
    };
    
    dispatch(actions.addLibraryBook(newBook));
    setIsAddBookModalOpen(false);
    setBookFormData({
      title: '',
      author: '',
      isbn: '',
      category: '',
      publisher: '',
      publishYear: new Date().getFullYear(),
      totalCopies: 1,
      availableCopies: 1,
      location: '',
      status: 'Available'
    });
  };

  // Add new member
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember: LibraryMember = {
      id: Date.now().toString(),
      name: memberFormData.name || '',
      email: memberFormData.email || '',
      phone: memberFormData.phone || '',
      memberType: memberFormData.memberType as 'Student' | 'Faculty' | 'Staff',
      membershipId: memberFormData.membershipId || `LIB${Math.floor(1000 + Math.random() * 9000)}`,
      department: memberFormData.department || '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      booksIssued: 0,
      maxBooks: memberFormData.memberType === 'Student' ? 5 : 
                memberFormData.memberType === 'Faculty' ? 10 : 3,
      fineAmount: 0
    };
    
    dispatch(actions.addLibraryMember(newMember));
    setIsAddMemberModalOpen(false);
    setMemberFormData({
      name: '',
      email: '',
      phone: '',
      memberType: 'Student',
      membershipId: '',
      department: '',
      status: 'Active',
      booksIssued: 0,
      maxBooks: 5,
      fineAmount: 0
    });
  };

  // Issue book to member
  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    const book = state.libraryBooks.find(b => b.id === issueFormData.bookId);
    const member = state.libraryMembers.find(m => m.id === issueFormData.memberId);
    
    if (!book || !member) {
      alert('Please select both a book and a member!');
      return;
    }
    
    if (book.availableCopies <= 0) {
      alert('This book is not available for issue!');
      return;
    }
    
    if (member.booksIssued >= member.maxBooks) {
      alert(`This member has already issued the maximum allowed books (${member.maxBooks})!`);
      return;
    }
    
    // Create transaction
    const newTransaction: LibraryTransaction = {
      id: Date.now().toString(),
      bookId: book.id,
      bookTitle: book.title,
      memberId: member.id,
      memberName: member.name,
      memberType: member.memberType,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: issueFormData.dueDate,
      status: 'Issued',
      fine: 0,
      issuedBy: user?.name || 'Admin'
    };
    
    // Update book available copies
    const updatedBook: LibraryBook = {
      ...book,
      availableCopies: book.availableCopies - 1,
      status: book.availableCopies - 1 > 0 ? (book.availableCopies - 1 < 3 ? 'Limited' : 'Available') : 'Out of Stock'
    };
    
    // Update member books issued count
    const updatedMember: LibraryMember = {
      ...member,
      booksIssued: member.booksIssued + 1
    };
    
    // Dispatch actions
    dispatch(actions.addLibraryTransaction(newTransaction));
    dispatch(actions.updateLibraryBook(updatedBook));
    dispatch(actions.updateLibraryMember(updatedMember));
    
    setIsIssueBookModalOpen(false);
    setIssueFormData({
      bookId: '',
      memberId: '',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };

  // Return book
  const handleReturnBook = (transaction: LibraryTransaction) => {
    if (transaction.status === 'Returned') {
      alert('This book has already been returned!');
      return;
    }
    
    const book = state.libraryBooks.find(b => b.id === transaction.bookId);
    const member = state.libraryMembers.find(m => m.id === transaction.memberId);
    
    if (!book || !member) {
      alert('Book or member information not found!');
      return;
    }
    
    // Calculate fine if overdue
    const dueDate = new Date(transaction.dueDate);
    const today = new Date();
    const daysOverdue = Math.max(0, Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
    const finePerDay = 1; // $1 per day
    const fine = daysOverdue * finePerDay;
    
    // Update transaction
    const updatedTransaction: LibraryTransaction = {
      ...transaction,
      status: 'Returned',
      returnDate: today.toISOString().split('T')[0],
      fine: fine,
      returnedBy: user?.name || 'Admin'
    };
    
    // Update book available copies
    const updatedBook: LibraryBook = {
      ...book,
      availableCopies: book.availableCopies + 1,
      status: 'Available'
    };
    
    // Update member books issued count and fine amount
    const updatedMember: LibraryMember = {
      ...member,
      booksIssued: Math.max(0, member.booksIssued - 1),
      fineAmount: member.fineAmount + fine
    };
    
    // Dispatch actions
    dispatch(actions.updateLibraryTransaction(updatedTransaction));
    dispatch(actions.updateLibraryBook(updatedBook));
    dispatch(actions.updateLibraryMember(updatedMember));
    
    if (fine > 0) {
      alert(`Book returned successfully! A fine of $${fine} has been added to the member's account.`);
    } else {
      alert('Book returned successfully!');
    }
  };

  // Delete book
  const handleDeleteBook = (bookId: string) => {
    // Check if book is currently issued
    const isIssued = state.libraryTransactions.some(t => t.bookId === bookId && t.status === 'Issued');
    
    if (isIssued) {
      alert('This book cannot be deleted as it is currently issued to a member!');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      dispatch(actions.deleteLibraryBook(bookId));
    }
  };

  // Delete member
  const handleDeleteMember = (memberId: string) => {
    // Check if member has books issued
    const hasIssuedBooks = state.libraryTransactions.some(t => t.memberId === memberId && t.status === 'Issued');
    
    if (hasIssuedBooks) {
      alert('This member cannot be deleted as they have books currently issued!');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      dispatch(actions.deleteLibraryMember(memberId));
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'Limited': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Out of Stock': return 'bg-red-100 text-red-800 border-red-200';
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'Expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Issued': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Returned': return 'bg-green-100 text-green-800 border-green-200';
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get member type color
  const getMemberTypeColor = (type: string) => {
    switch (type) {
      case 'Student': return 'bg-blue-100 text-blue-800';
      case 'Faculty': return 'bg-purple-100 text-purple-800';
      case 'Staff': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate library statistics
  const totalBooks = state.libraryBooks.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableBooks = state.libraryBooks.reduce((sum, book) => sum + book.availableCopies, 0);
  const totalMembers = state.libraryMembers.length;
  const activeTransactions = state.libraryTransactions.filter(t => t.status === 'Issued').length;
  const overdueTransactions = state.libraryTransactions.filter(t => {
    if (t.status !== 'Issued') return false;
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    return dueDate < today;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Library Management</h2>
            <p className="text-blue-100">Manage books, members, and transactions</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Book className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{totalBooks}</p>
              <p className="text-sm text-blue-100">Total Books</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{totalMembers}</p>
              <p className="text-sm text-blue-100">Members</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Calendar className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{activeTransactions}</p>
              <p className="text-sm text-blue-100">Books Issued</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{overdueTransactions}</p>
              <p className="text-sm text-blue-100">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('books')}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'books'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Book className="h-4 w-4" />
            <span>Books</span>
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'members'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Members</span>
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'transactions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Transactions</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Reports</span>
          </button>
        </nav>
      </div>

      {/* Books Tab */}
      {activeTab === 'books' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              {canManageLibrary && (
                <button
                  onClick={() => setIsAddBookModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Book</span>
                </button>
              )}
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              {canManageLibrary && (
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
                  <Upload className="h-4 w-4" />
                  <span>Import</span>
                </button>
              )}
            </div>
            {canManageLibrary && (
              <button
                onClick={() => setIsIssueBookModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
              >
                <Calendar className="h-4 w-4" />
                <span>Issue Book</span>
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books by title, author, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Limited">Limited</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          {/* Books Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Book</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">ISBN</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Publisher</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Copies</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Location</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                            <Book className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{book.title}</p>
                            <p className="text-sm text-gray-600">{book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm">{book.isbn}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{book.category}</td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-gray-700">{book.publisher}</p>
                          <p className="text-sm text-gray-500">{book.publishYear}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{book.availableCopies} / {book.totalCopies}</p>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className={`h-2 rounded-full ${
                                book.availableCopies === 0 ? 'bg-red-500' :
                                book.availableCopies < book.totalCopies / 3 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(book.status)}`}>
                          {book.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{book.location}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-gray-600 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {canManageLibrary && (
                            <>
                              <button
                                className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                                title="Edit Book"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBook(book.id)}
                                className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                title="Delete Book"
                              >
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

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              {canManageLibrary && (
                <button
                  onClick={() => setIsAddMemberModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Member</span>
                </button>
              )}
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search members by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Member</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">ID</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Department</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Books Issued</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Fine Amount</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {member.membershipId}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${getMemberTypeColor(member.memberType)}`}>
                          {member.memberType}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{member.department}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{member.booksIssued}</span>
                          <span className="text-sm text-gray-500">/ {member.maxBooks}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-medium ${member.fineAmount > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                          ${member.fineAmount.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-gray-600 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {canManageLibrary && (
                            <>
                              <button
                                className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                                title="Edit Member"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                title="Delete Member"
                              >
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

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions by book title, member name, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
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
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Issue Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Due Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Return Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Fine</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => {
                    // Check if overdue
                    const isOverdue = transaction.status === 'Issued' && new Date(transaction.dueDate) < new Date();
                    const displayStatus = isOverdue ? 'Overdue' : transaction.status;
                    
                    return (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                              <Book className="h-5 w-5" />
                            </div>
                            <p className="font-semibold text-gray-900">{transaction.bookTitle}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{transaction.memberName}</p>
                            <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getMemberTypeColor(transaction.memberType)}`}>
                              {transaction.memberType}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{new Date(transaction.issueDate).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-gray-700">{new Date(transaction.dueDate).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-gray-700">
                          {transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : '-'}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(displayStatus)}`}>
                            {displayStatus}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-medium ${transaction.fine > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                            {transaction.fine > 0 ? `$${transaction.fine.toFixed(2)}` : '-'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-gray-600 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {canManageLibrary && transaction.status === 'Issued' && (
                              <button
                                onClick={() => handleReturnBook(transaction)}
                                className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                                title="Return Book"
                              >
                                <ArrowLeft className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Books Available</p>
                  <p className="text-2xl font-bold text-gray-900">{availableBooks} / {totalBooks}</p>
                  <p className="text-sm text-green-600">{Math.round((availableBooks / totalBooks) * 100)}% available</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Members</p>
                  <p className="text-2xl font-bold text-gray-900">{state.libraryMembers.filter(m => m.status === 'Active').length}</p>
                  <p className="text-sm text-blue-600">{Math.round((state.libraryMembers.filter(m => m.status === 'Active').length / totalMembers) * 100)}% of total</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue Books</p>
                  <p className="text-2xl font-bold text-gray-900">{overdueTransactions}</p>
                  <p className="text-sm text-red-600">{Math.round((overdueTransactions / activeTransactions) * 100) || 0}% of issued</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Fines</p>
                  <p className="text-2xl font-bold text-gray-900">${state.libraryMembers.reduce((sum, member) => sum + member.fineAmount, 0).toFixed(2)}</p>
                  <p className="text-sm text-purple-600">From {state.libraryMembers.filter(m => m.fineAmount > 0).length} members</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Books by Category</h3>
              <div className="space-y-4">
                {categories.map(category => {
                  const count = state.libraryBooks.filter(book => book.category === category).length;
                  const percentage = Math.round((count / state.libraryBooks.length) * 100);
                  
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{count} ({percentage}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Distribution</h3>
              <div className="space-y-4">
                {['Student', 'Faculty', 'Staff'].map(type => {
                  const count = state.libraryMembers.filter(member => member.memberType === type).length;
                  const percentage = Math.round((count / state.libraryMembers.length) * 100) || 0;
                  
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              type === 'Student' ? 'bg-blue-600' :
                              type === 'Faculty' ? 'bg-purple-600' : 'bg-green-600'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{count} ({percentage}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Monthly Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">42</p>
                <p className="text-sm text-blue-600">Books Added</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">128</p>
                <p className="text-sm text-green-600">Books Issued</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">15</p>
                <p className="text-sm text-purple-600">New Members</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {isAddBookModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center space-x-3">
                <Book className="h-6 w-6" />
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
              <form onSubmit={handleAddBook} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Book Title *</label>
                    <input
                      type="text"
                      value={bookFormData.title}
                      onChange={(e) => handleBookInputChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                    <input
                      type="text"
                      value={bookFormData.author}
                      onChange={(e) => handleBookInputChange('author', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                      value={bookFormData.isbn}
                      onChange={(e) => handleBookInputChange('isbn', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 978-0123456789"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <input
                      type="text"
                      value={bookFormData.category}
                      onChange={(e) => handleBookInputChange('category', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g., Computer Science"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
                    <input
                      type="text"
                      value={bookFormData.publisher}
                      onChange={(e) => handleBookInputChange('publisher', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter publisher name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publish Year</label>
                    <input
                      type="number"
                      value={bookFormData.publishYear}
                      onChange={(e) => handleBookInputChange('publishYear', parseInt(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 2023"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Copies *</label>
                    <input
                      type="number"
                      value={bookFormData.totalCopies}
                      onChange={(e) => handleBookInputChange('totalCopies', parseInt(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 5"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      value={bookFormData.location}
                      onChange={(e) => handleBookInputChange('location', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g., Section A, Shelf 3"
                      required
                    />
                  </div>
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
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Add Book</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Add New Member</h2>
              </div>
              <button
                onClick={() => setIsAddMemberModalOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleAddMember} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={memberFormData.name}
                      onChange={(e) => handleMemberInputChange('name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={memberFormData.email}
                      onChange={(e) => handleMemberInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={memberFormData.phone}
                      onChange={(e) => handleMemberInputChange('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Type *</label>
                    <select
                      value={memberFormData.memberType}
                      onChange={(e) => handleMemberInputChange('memberType', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Membership ID</label>
                    <input
                      type="text"
                      value={memberFormData.membershipId}
                      onChange={(e) => handleMemberInputChange('membershipId', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Auto-generated if left blank"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                    <select
                      value={memberFormData.department}
                      onChange={(e) => handleMemberInputChange('department', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Books Allowed</label>
                    <input
                      type="number"
                      value={memberFormData.maxBooks}
                      onChange={(e) => handleMemberInputChange('maxBooks', parseInt(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Default: 5 for students, 10 for faculty"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={memberFormData.status}
                      onChange={(e) => handleMemberInputChange('status', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
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
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Add Member</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Book Modal */}
      {isIssueBookModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6" />
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
              <form onSubmit={handleIssueBook} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Book *</label>
                  <select
                    value={issueFormData.bookId}
                    onChange={(e) => handleIssueInputChange('bookId', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select a book</option>
                    {state.libraryBooks
                      .filter(book => book.availableCopies > 0)
                      .map(book => (
                        <option key={book.id} value={book.id}>
                          {book.title} by {book.author} ({book.availableCopies} available)
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Member *</label>
                  <select
                    value={issueFormData.memberId}
                    onChange={(e) => handleIssueInputChange('memberId', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select a member</option>
                    {state.libraryMembers
                      .filter(member => member.status === 'Active' && member.booksIssued < member.maxBooks)
                      .map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name} ({member.memberType}) - {member.booksIssued}/{member.maxBooks} books
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                  <input
                    type="date"
                    value={issueFormData.dueDate}
                    onChange={(e) => handleIssueInputChange('dueDate', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                {/* Selected Book & Member Details */}
                {issueFormData.bookId && issueFormData.memberId && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Book Details</h4>
                      {(() => {
                        const book = state.libraryBooks.find(b => b.id === issueFormData.bookId);
                        return book ? (
                          <div className="space-y-2">
                            <p className="text-sm"><span className="font-medium">Title:</span> {book.title}</p>
                            <p className="text-sm"><span className="font-medium">Author:</span> {book.author}</p>
                            <p className="text-sm"><span className="font-medium">ISBN:</span> {book.isbn}</p>
                            <p className="text-sm"><span className="font-medium">Available:</span> {book.availableCopies} of {book.totalCopies}</p>
                          </div>
                        ) : null;
                      })()}
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-800 mb-2">Member Details</h4>
                      {(() => {
                        const member = state.libraryMembers.find(m => m.id === issueFormData.memberId);
                        return member ? (
                          <div className="space-y-2">
                            <p className="text-sm"><span className="font-medium">Name:</span> {member.name}</p>
                            <p className="text-sm"><span className="font-medium">ID:</span> {member.membershipId}</p>
                            <p className="text-sm"><span className="font-medium">Type:</span> {member.memberType}</p>
                            <p className="text-sm"><span className="font-medium">Books Issued:</span> {member.booksIssued} of {member.maxBooks}</p>
                          </div>
                        ) : null;
                      })()}
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
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Issue Book</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}