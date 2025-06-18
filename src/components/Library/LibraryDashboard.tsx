import React, { useState, useEffect } from 'react';
import { 
  Library, 
  Book, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Mail,
  MessageSquare,
  Bell
} from 'lucide-react';
import { useAppContext, actions } from '../../context/AppContext';
import { LibraryBook, LibraryMember, LibraryTransaction } from '../../types';

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
  const [selectedTransaction, setSelectedTransaction] = useState<LibraryTransaction | null>(null);
  
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
    status: 'Available',
    addedDate: new Date().toISOString().split('T')[0],
    addedBy: user?.name || 'Admin'
  });
  
  const [memberFormData, setMemberFormData] = useState<Partial<LibraryMember>>({
    name: '',
    email: '',
    phone: '',
    memberType: 'Student',
    membershipId: '',
    department: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    booksIssued: 0,
    maxBooks: 5,
    fineAmount: 0
  });
  
  const [transactionFormData, setTransactionFormData] = useState({
    bookId: '',
    memberId: '',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days from now
  });

  // Check if user has library access
  const hasLibraryAccess = () => {
    if (user.userType === 'admin') return true;
    if (user.userType === 'faculty' && user.designation === 'Librarian') return true;
    if (user.userType === 'faculty' && user.department === 'Library') return true;
    return false;
  };

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
  
  // Get all categories from books
  const categories = [...new Set(state.libraryBooks.map(book => book.category))];
  
  // Handle book form submission
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
      status: bookFormData.availableCopies && bookFormData.availableCopies > 0 ? 'Available' : 'Out of Stock',
      addedDate: bookFormData.addedDate || new Date().toISOString().split('T')[0],
      addedBy: user?.name || 'Admin'
    };
    
    dispatch(actions.addLibraryBook(newBook));
    
    // Send notification
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'success',
      title: 'New Book Added',
      message: `"${newBook.title}" has been added to the library by ${user.name}`,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
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
      status: 'Available',
      addedDate: new Date().toISOString().split('T')[0],
      addedBy: user?.name || 'Admin'
    });
  };
  
  // Handle member form submission
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember: LibraryMember = {
      id: Date.now().toString(),
      name: memberFormData.name || '',
      email: memberFormData.email || '',
      phone: memberFormData.phone || '',
      memberType: memberFormData.memberType as 'Student' | 'Faculty' | 'Staff',
      membershipId: memberFormData.membershipId || `LIB${Date.now().toString().slice(-4)}`,
      department: memberFormData.department || '',
      joinDate: memberFormData.joinDate || new Date().toISOString().split('T')[0],
      status: 'Active',
      booksIssued: 0,
      maxBooks: memberFormData.memberType === 'Faculty' ? 10 : 5,
      fineAmount: 0
    };
    
    dispatch(actions.addLibraryMember(newMember));
    
    // Send notification
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'success',
      title: 'New Library Member',
      message: `${newMember.name} has been registered as a library member`,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    setIsAddMemberModalOpen(false);
    setMemberFormData({
      name: '',
      email: '',
      phone: '',
      memberType: 'Student',
      membershipId: '',
      department: '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      booksIssued: 0,
      maxBooks: 5,
      fineAmount: 0
    });
  };
  
  // Handle issue book form submission
  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    const book = state.libraryBooks.find(b => b.id === transactionFormData.bookId);
    const member = state.libraryMembers.find(m => m.id === transactionFormData.memberId);
    
    if (!book || !member) {
      alert('Please select both a book and a member');
      return;
    }
    
    if (book.availableCopies <= 0) {
      alert('This book is not available for issue');
      return;
    }
    
    if (member.booksIssued >= member.maxBooks) {
      alert(`Member has already issued maximum allowed books (${member.maxBooks})`);
      return;
    }
    
    const newTransaction: LibraryTransaction = {
      id: Date.now().toString(),
      bookId: book.id,
      bookTitle: book.title,
      memberId: member.id,
      memberName: member.name,
      memberType: member.memberType,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: transactionFormData.dueDate,
      status: 'Issued',
      fine: 0,
      issuedBy: user?.name || 'Admin'
    };
    
    // Update book available copies
    const updatedBook = {
      ...book,
      availableCopies: book.availableCopies - 1,
      status: book.availableCopies - 1 <= 0 ? 'Out of Stock' : book.availableCopies - 1 <= 2 ? 'Limited' : 'Available'
    };
    
    // Update member books issued count
    const updatedMember = {
      ...member,
      booksIssued: member.booksIssued + 1
    };
    
    dispatch(actions.addLibraryTransaction(newTransaction));
    dispatch(actions.updateLibraryBook(updatedBook));
    dispatch(actions.updateLibraryMember(updatedMember));
    
    // Send notification
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'Book Issued',
      message: `"${book.title}" has been issued to ${member.name}`,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    setIsIssueBookModalOpen(false);
    setTransactionFormData({
      bookId: '',
      memberId: '',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };
  
  // Handle book return
  const handleReturnBook = (transaction: LibraryTransaction) => {
    if (transaction.status === 'Returned') {
      alert('This book has already been returned');
      return;
    }
    
    const book = state.libraryBooks.find(b => b.id === transaction.bookId);
    const member = state.libraryMembers.find(m => m.id === transaction.memberId);
    
    if (!book || !member) {
      alert('Book or member information not found');
      return;
    }
    
    // Calculate fine if overdue
    const dueDate = new Date(transaction.dueDate);
    const today = new Date();
    let fine = 0;
    
    if (today > dueDate) {
      const daysLate = Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
      fine = daysLate * 5; // $5 per day late
    }
    
    // Update transaction
    const updatedTransaction = {
      ...transaction,
      returnDate: today.toISOString().split('T')[0],
      status: 'Returned' as const,
      fine,
      returnedBy: user?.name || 'Admin'
    };
    
    // Update book available copies
    const updatedBook = {
      ...book,
      availableCopies: book.availableCopies + 1,
      status: book.availableCopies + 1 > 0 ? book.availableCopies + 1 <= 2 ? 'Limited' : 'Available' : 'Out of Stock'
    };
    
    // Update member books issued count and fine amount
    const updatedMember = {
      ...member,
      booksIssued: Math.max(0, member.booksIssued - 1),
      fineAmount: member.fineAmount + fine
    };
    
    dispatch(actions.updateLibraryTransaction(updatedTransaction));
    dispatch(actions.updateLibraryBook(updatedBook));
    dispatch(actions.updateLibraryMember(updatedMember));
    
    // Send notification
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: fine > 0 ? 'warning' : 'success',
      title: fine > 0 ? 'Book Returned with Fine' : 'Book Returned',
      message: fine > 0 
        ? `"${book.title}" returned by ${member.name} with a fine of $${fine}`
        : `"${book.title}" has been returned by ${member.name}`,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    alert(`Book returned successfully${fine > 0 ? ` with a fine of $${fine}` : ''}`);
  };
  
  // Handle sending email notification
  const handleSendEmailNotification = (member: LibraryMember, message: string) => {
    // In a real application, this would connect to an email service
    console.log(`Sending email to ${member.email}: ${message}`);
    
    // Add notification about email being sent
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'Email Notification Sent',
      message: `Email notification sent to ${member.name} at ${member.email}`,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    alert(`Email notification sent to ${member.name} at ${member.email}`);
  };
  
  // Handle sending WhatsApp notification
  const handleSendWhatsAppNotification = (member: LibraryMember, message: string) => {
    // In a real application, this would connect to a WhatsApp API
    console.log(`Sending WhatsApp to ${member.phone}: ${message}`);
    
    // Add notification about WhatsApp being sent
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'WhatsApp Notification Sent',
      message: `WhatsApp notification sent to ${member.name} at ${member.phone}`,
      timestamp: new Date().toISOString(),
      read: false
    }));
    
    alert(`WhatsApp notification sent to ${member.name} at ${member.phone}`);
  };
  
  // Handle sending both email and WhatsApp notifications
  const handleSendAllNotifications = (member: LibraryMember, message: string) => {
    handleSendEmailNotification(member, message);
    handleSendWhatsAppNotification(member, message);
  };
  
  // Handle sending overdue notifications to all applicable members
  const handleSendOverdueNotifications = () => {
    const today = new Date();
    const overdueTransactions = state.libraryTransactions.filter(t => 
      t.status === 'Issued' && new Date(t.dueDate) < today
    );
    
    if (overdueTransactions.length === 0) {
      alert('No overdue books found');
      return;
    }
    
    // Group by member
    const memberOverdueMap = new Map<string, string[]>();
    
    overdueTransactions.forEach(transaction => {
      const books = memberOverdueMap.get(transaction.memberId) || [];
      books.push(transaction.bookTitle);
      memberOverdueMap.set(transaction.memberId, books);
    });
    
    // Send notifications to each member
    memberOverdueMap.forEach((books, memberId) => {
      const member = state.libraryMembers.find(m => m.id === memberId);
      if (member) {
        const message = `You have ${books.length} overdue book(s): ${books.join(', ')}. Please return them as soon as possible to avoid additional fines.`;
        handleSendAllNotifications(member, message);
      }
    });
    
    // Add system notification
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'warning',
      title: 'Overdue Notifications Sent',
      message: `Sent notifications for ${overdueTransactions.length} overdue books to ${memberOverdueMap.size} members`,
      timestamp: new Date().toISOString(),
      read: false
    }));
  };

  // If user doesn't have library access, show restricted access message
  if (!hasLibraryAccess()) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md w-full text-center">
          <Library className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Library Access Restricted</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the library management system. 
            Only administrators and library staff can access this section.
          </p>
          <p className="text-sm text-gray-500">
            Please contact the administrator if you believe you should have access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Library Management</h2>
            <p className="text-amber-100">Manage books, members, and transactions in the college library</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Book className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{state.libraryBooks.length}</p>
              <p className="text-sm text-amber-100">Total Books</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{state.libraryMembers.length}</p>
              <p className="text-sm text-amber-100">Members</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Calendar className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{state.libraryTransactions.filter(t => t.status === 'Issued').length}</p>
              <p className="text-sm text-amber-100">Books Issued</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button 
          onClick={() => setIsAddBookModalOpen(true)}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Plus className="h-5 w-5 text-amber-600" />
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
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Add Member</p>
              <p className="text-sm text-gray-600">Register new library member</p>
            </div>
          </div>
        </button>
        
        <button 
          onClick={() => setIsIssueBookModalOpen(true)}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Book className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Issue Book</p>
              <p className="text-sm text-gray-600">Issue book to member</p>
            </div>
          </div>
        </button>
        
        <button 
          onClick={handleSendOverdueNotifications}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Send Reminders</p>
              <p className="text-sm text-gray-600">Notify overdue members</p>
            </div>
          </div>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'books', label: 'Books' },
            { id: 'members', label: 'Members' },
            { id: 'transactions', label: 'Transactions' },
            { id: 'reports', label: 'Reports' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Books Available</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {state.libraryBooks.reduce((sum, book) => sum + book.availableCopies, 0)}
                    </p>
                    <p className="text-sm text-green-600">
                      {Math.round((state.libraryBooks.reduce((sum, book) => sum + book.availableCopies, 0) / 
                        state.libraryBooks.reduce((sum, book) => sum + book.totalCopies, 0)) * 100)}% of total
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Book className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Members</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {state.libraryMembers.filter(m => m.status === 'Active').length}
                    </p>
                    <p className="text-sm text-blue-600">
                      {state.libraryMembers.length > 0 
                        ? Math.round((state.libraryMembers.filter(m => m.status === 'Active').length / state.libraryMembers.length) * 100)
                        : 0}% of total
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overdue Books</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {state.libraryTransactions.filter(t => 
                        t.status === 'Issued' && new Date(t.dueDate) < new Date()
                      ).length}
                    </p>
                    <p className="text-sm text-red-600">
                      {state.libraryTransactions.filter(t => t.status === 'Issued').length > 0
                        ? Math.round((state.libraryTransactions.filter(t => 
                            t.status === 'Issued' && new Date(t.dueDate) < new Date()
                          ).length / state.libraryTransactions.filter(t => t.status === 'Issued').length) * 100)
                        : 0}% of issued books
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {state.libraryTransactions.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <Book className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p>No transactions yet</p>
                  </div>
                ) : (
                  state.libraryTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-gray-900">{transaction.bookTitle}</h4>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              transaction.status === 'Issued' 
                                ? new Date(transaction.dueDate) < new Date()
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {transaction.status === 'Issued' 
                                ? new Date(transaction.dueDate) < new Date()
                                  ? 'Overdue'
                                  : 'Issued'
                                : 'Returned'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Issued to: {transaction.memberName} ({transaction.memberType})
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Issue Date: {new Date(transaction.issueDate).toLocaleDateString()}</span>
                            <span>Due Date: {new Date(transaction.dueDate).toLocaleDateString()}</span>
                            {transaction.returnDate && (
                              <span>Return Date: {new Date(transaction.returnDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {transaction.status === 'Issued' && (
                            <button 
                              onClick={() => handleReturnBook(transaction)}
                              className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition-colors"
                            >
                              Return
                            </button>
                          )}
                          {transaction.status === 'Issued' && new Date(transaction.dueDate) < new Date() && (
                            <>
                              <button 
                                onClick={() => {
                                  const member = state.libraryMembers.find(m => m.id === transaction.memberId);
                                  if (member) {
                                    handleSendEmailNotification(
                                      member, 
                                      `Reminder: The book "${transaction.bookTitle}" is overdue. Please return it as soon as possible to avoid additional fines.`
                                    );
                                  }
                                }}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                                title="Send Email Reminder"
                              >
                                <Mail className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  const member = state.libraryMembers.find(m => m.id === transaction.memberId);
                                  if (member) {
                                    handleSendWhatsAppNotification(
                                      member, 
                                      `Reminder: The book "${transaction.bookTitle}" is overdue. Please return it as soon as possible to avoid additional fines.`
                                    );
                                  }
                                }}
                                className="text-green-600 hover:text-green-800 p-1 rounded-lg hover:bg-green-50 transition-colors"
                                title="Send WhatsApp Reminder"
                              >
                                <MessageSquare className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {state.libraryTransactions.length > 5 && (
                <div className="px-6 py-3 bg-gray-50 text-right">
                  <button 
                    onClick={() => setActiveTab('transactions')}
                    className="text-sm text-amber-600 hover:text-amber-800 font-medium"
                  >
                    View all transactions
                  </button>
                </div>
              )}
            </div>

            {/* Popular Books */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Books</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.libraryBooks
                  .sort((a, b) => (b.totalCopies - b.availableCopies) - (a.totalCopies - a.availableCopies))
                  .slice(0, 6)
                  .map((book) => (
                    <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">{book.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Available: {book.availableCopies}/{book.totalCopies}</span>
                        <span className={`${
                          book.status === 'Available' ? 'text-green-600' : 
                          book.status === 'Limited' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {book.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Books Tab */}
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Limited">Limited</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsAddBookModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Book</span>
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
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
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBooks.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          <Book className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p>No books found</p>
                        </td>
                      </tr>
                    ) : (
                      filteredBooks.map((book) => (
                        <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-semibold text-gray-900">{book.title}</p>
                              <p className="text-sm text-gray-600">by {book.author}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-mono text-sm">{book.isbn}</span>
                          </td>
                          <td className="py-4 px-6 text-gray-700">{book.category}</td>
                          <td className="py-4 px-6 text-gray-700">
                            <div>
                              <p>{book.publisher}</p>
                              <p className="text-sm text-gray-500">{book.publishYear}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium">{book.availableCopies} / {book.totalCopies}</p>
                              <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className={`h-2 rounded-full ${
                                    book.availableCopies === 0 ? 'bg-red-600' :
                                    book.availableCopies < book.totalCopies / 2 ? 'bg-yellow-600' : 'bg-green-600'
                                  }`}
                                  style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              book.status === 'Available' ? 'bg-green-100 text-green-800' :
                              book.status === 'Limited' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {book.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="text-gray-600 hover:text-amber-600 p-1 rounded">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-green-600 p-1 rounded">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-red-600 p-1 rounded">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members by name, email, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsAddMemberModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Member</span>
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
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
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Books</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Fine</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMembers.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-500">
                          <Users className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p>No members found</p>
                        </td>
                      </tr>
                    ) : (
                      filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-semibold text-gray-900">{member.name}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Mail className="h-3 w-3" />
                                <span>{member.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Phone className="h-3 w-3" />
                                <span>{member.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                              {member.membershipId}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-700">{member.memberType}</td>
                          <td className="py-4 px-6 text-gray-700">{member.department}</td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium">{member.booksIssued} / {member.maxBooks}</p>
                              <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className={`h-2 rounded-full ${
                                    member.booksIssued === member.maxBooks ? 'bg-red-600' :
                                    member.booksIssued > member.maxBooks / 2 ? 'bg-yellow-600' : 'bg-green-600'
                                  }`}
                                  style={{ width: `${(member.booksIssued / member.maxBooks) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`font-medium ${member.fineAmount > 0 ? 'text-red-600' : 'text-gray-700'}`}>
                              ${member.fineAmount.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              member.status === 'Active' ? 'bg-green-100 text-green-800' :
                              member.status === 'Suspended' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="text-gray-600 hover:text-amber-600 p-1 rounded">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-green-600 p-1 rounded">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleSendEmailNotification(
                                  member, 
                                  `Hello ${member.name}, this is a notification from the library. Please check your account for any updates.`
                                )}
                                className="text-gray-600 hover:text-blue-600 p-1 rounded"
                                title="Send Email"
                              >
                                <Mail className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleSendWhatsAppNotification(
                                  member, 
                                  `Hello ${member.name}, this is a notification from the library. Please check your account for any updates.`
                                )}
                                className="text-gray-600 hover:text-green-600 p-1 rounded"
                                title="Send WhatsApp"
                              >
                                <MessageSquare className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by book title or member name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="Issued">Issued</option>
                    <option value="Returned">Returned</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsIssueBookModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Issue Book</span>
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
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
                    {state.libraryTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-500">
                          <Book className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p>No transactions found</p>
                        </td>
                      </tr>
                    ) : (
                      state.libraryTransactions
                        .filter(transaction => {
                          const matchesSearch = transaction.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                              transaction.memberName.toLowerCase().includes(searchTerm.toLowerCase());
                          const matchesStatus = !filterStatus || 
                                              (filterStatus === 'Overdue' 
                                                ? transaction.status === 'Issued' && new Date(transaction.dueDate) < new Date()
                                                : transaction.status === filterStatus);
                          return matchesSearch && matchesStatus;
                        })
                        .map((transaction) => {
                          const isOverdue = transaction.status === 'Issued' && new Date(transaction.dueDate) < new Date();
                          return (
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
                                {transaction.returnDate 
                                  ? new Date(transaction.returnDate).toLocaleDateString()
                                  : '-'
                                }
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  transaction.status === 'Issued' 
                                    ? isOverdue
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-blue-100 text-blue-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {transaction.status === 'Issued' && isOverdue ? 'Overdue' : transaction.status}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`font-medium ${transaction.fine > 0 ? 'text-red-600' : 'text-gray-700'}`}>
                                  {transaction.fine > 0 ? `$${transaction.fine.toFixed(2)}` : '-'}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center space-x-2">
                                  {transaction.status === 'Issued' && (
                                    <button 
                                      onClick={() => handleReturnBook(transaction)}
                                      className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition-colors"
                                    >
                                      Return
                                    </button>
                                  )}
                                  {isOverdue && (
                                    <>
                                      <button 
                                        onClick={() => {
                                          const member = state.libraryMembers.find(m => m.id === transaction.memberId);
                                          if (member) {
                                            handleSendEmailNotification(
                                              member, 
                                              `Reminder: The book "${transaction.bookTitle}" is overdue. Please return it as soon as possible to avoid additional fines.`
                                            );
                                          }
                                        }}
                                        className="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                                        title="Send Email Reminder"
                                      >
                                        <Mail className="h-4 w-4" />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          const member = state.libraryMembers.find(m => m.id === transaction.memberId);
                                          if (member) {
                                            handleSendWhatsAppNotification(
                                              member, 
                                              `Reminder: The book "${transaction.bookTitle}" is overdue. Please return it as soon as possible to avoid additional fines.`
                                            );
                                          }
                                        }}
                                        className="text-green-600 hover:text-green-800 p-1 rounded-lg hover:bg-green-50 transition-colors"
                                        title="Send WhatsApp Reminder"
                                      >
                                        <MessageSquare className="h-4 w-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Books by Category</h3>
                <div className="space-y-3">
                  {categories.map(category => {
                    const count = state.libraryBooks.filter(book => book.category === category).length;
                    const percentage = Math.round((count / state.libraryBooks.length) * 100);
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-amber-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Members</span>
                    <span className="font-semibold">{state.libraryMembers.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Students</span>
                    <span className="font-semibold">{state.libraryMembers.filter(m => m.memberType === 'Student').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Faculty</span>
                    <span className="font-semibold">{state.libraryMembers.filter(m => m.memberType === 'Faculty').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Staff</span>
                    <span className="font-semibold">{state.libraryMembers.filter(m => m.memberType === 'Staff').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Members</span>
                    <span className="font-semibold">{state.libraryMembers.filter(m => m.status === 'Active').length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Transactions</span>
                    <span className="font-semibold">{state.libraryTransactions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Books Currently Issued</span>
                    <span className="font-semibold">{state.libraryTransactions.filter(t => t.status === 'Issued').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overdue Books</span>
                    <span className="font-semibold text-red-600">
                      {state.libraryTransactions.filter(t => 
                        t.status === 'Issued' && new Date(t.dueDate) < new Date()
                      ).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Fines Collected</span>
                    <span className="font-semibold">${state.libraryTransactions.reduce((sum, t) => sum + t.fine, 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Books</h3>
                <div className="space-y-3">
                  {state.libraryBooks
                    .sort((a, b) => (b.totalCopies - b.availableCopies) - (a.totalCopies - a.availableCopies))
                    .slice(0, 5)
                    .map((book, index) => (
                      <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-medium text-sm">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900">{book.title}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {book.totalCopies - book.availableCopies} issued
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generate Reports</h3>
                <div className="flex space-x-2">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export All Reports</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Books Inventory Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete inventory of all books with availability status</p>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">PDF / Excel</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Member Activity Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Member-wise borrowing history and current status</p>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">PDF / Excel</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Overdue Books Report</h4>
                  <p className="text-sm text-gray-600 mb-3">List of all overdue books with member details</p>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">PDF / Excel</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Fine Collection Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Summary of fines collected and pending</p>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">PDF / Excel</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Book Usage Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Analysis of book borrowing patterns</p>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">PDF / Excel</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Custom Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Generate a custom report with selected parameters</p>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">PDF / Excel</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Book Modal */}
      {isAddBookModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Book Title *
                    </label>
                    <input
                      type="text"
                      value={bookFormData.title}
                      onChange={(e) => setBookFormData({...bookFormData, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      value={bookFormData.author}
                      onChange={(e) => setBookFormData({...bookFormData, author: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ISBN *
                    </label>
                    <input
                      type="text"
                      value={bookFormData.isbn}
                      onChange={(e) => setBookFormData({...bookFormData, isbn: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 978-0123456789"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      value={bookFormData.category}
                      onChange={(e) => setBookFormData({...bookFormData, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="e.g., Computer Science"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publisher
                    </label>
                    <input
                      type="text"
                      value={bookFormData.publisher}
                      onChange={(e) => setBookFormData({...bookFormData, publisher: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Enter publisher name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publish Year
                    </label>
                    <input
                      type="number"
                      value={bookFormData.publishYear}
                      onChange={(e) => setBookFormData({...bookFormData, publishYear: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 2023"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Copies *
                    </label>
                    <input
                      type="number"
                      value={bookFormData.totalCopies}
                      onChange={(e) => {
                        const total = parseInt(e.target.value);
                        setBookFormData({
                          ...bookFormData, 
                          totalCopies: total,
                          availableCopies: Math.min(total, bookFormData.availableCopies || 0)
                        });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 5"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Copies *
                    </label>
                    <input
                      type="number"
                      value={bookFormData.availableCopies}
                      onChange={(e) => {
                        const available = parseInt(e.target.value);
                        setBookFormData({
                          ...bookFormData, 
                          availableCopies: Math.min(available, bookFormData.totalCopies || 1)
                        });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 5"
                      min="0"
                      max={bookFormData.totalCopies}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={bookFormData.location}
                      onChange={(e) => setBookFormData({...bookFormData, location: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="e.g., Section A, Shelf 3"
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
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Add New Library Member</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={memberFormData.name}
                      onChange={(e) => setMemberFormData({...memberFormData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={memberFormData.email}
                      onChange={(e) => setMemberFormData({...memberFormData, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={memberFormData.phone}
                      onChange={(e) => setMemberFormData({...memberFormData, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Type *
                    </label>
                    <select
                      value={memberFormData.memberType}
                      onChange={(e) => setMemberFormData({
                        ...memberFormData, 
                        memberType: e.target.value as 'Student' | 'Faculty' | 'Staff',
                        maxBooks: e.target.value === 'Faculty' ? 10 : 5
                      })}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      value={memberFormData.department}
                      onChange={(e) => setMemberFormData({...memberFormData, department: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Political Science">Political Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Education">Education</option>
                      <option value="Sociology">Sociology</option>
                      <option value="Economics">Economics</option>
                      <option value="Geography">Geography</option>
                      <option value="Library">Library</option>
                      <option value="Administration">Administration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membership ID
                    </label>
                    <input
                      type="text"
                      value={memberFormData.membershipId}
                      onChange={(e) => setMemberFormData({...memberFormData, membershipId: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Auto-generated if left blank"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Join Date
                    </label>
                    <input
                      type="date"
                      value={memberFormData.joinDate}
                      onChange={(e) => setMemberFormData({...memberFormData, joinDate: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Books Allowed
                    </label>
                    <input
                      type="number"
                      value={memberFormData.maxBooks}
                      onChange={(e) => setMemberFormData({...memberFormData, maxBooks: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      min="1"
                      max="20"
                    />
                    <p className="text-xs text-gray-500 mt-1">Default: 5 for students, 10 for faculty</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium text-blue-900">Notification Settings</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        checked={true}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="emailNotifications" className="ml-2 text-sm text-blue-800">
                        Send email notifications for due dates and reminders
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="whatsappNotifications"
                        checked={true}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="whatsappNotifications" className="ml-2 text-sm text-blue-800">
                        Send WhatsApp notifications for due dates and reminders
                      </label>
                    </div>
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
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Book Modal */}
      {isIssueBookModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <div className="flex items-center space-x-3">
                <Book className="h-6 w-6" />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Book *
                  </label>
                  <select
                    value={transactionFormData.bookId}
                    onChange={(e) => setTransactionFormData({...transactionFormData, bookId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Member *
                  </label>
                  <select
                    value={transactionFormData.memberId}
                    onChange={(e) => setTransactionFormData({...transactionFormData, memberId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={transactionFormData.dueDate}
                    onChange={(e) => setTransactionFormData({...transactionFormData, dueDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Bell className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium text-green-900">Notification Settings</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sendDueDateNotification"
                        checked={true}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="sendDueDateNotification" className="ml-2 text-sm text-green-800">
                        Send due date notification to member
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sendReminderNotification"
                        checked={true}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="sendReminderNotification" className="ml-2 text-sm text-green-800">
                        Send reminder 2 days before due date
                      </label>
                    </div>
                  </div>
                </div>
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
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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