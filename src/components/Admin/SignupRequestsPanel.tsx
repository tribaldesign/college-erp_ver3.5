import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  GraduationCap,
  Building,
  User,
  Clock,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useAppContext, actions } from '../../context/AppContext';
import { useNotifications } from '../Notifications/NotificationService';

export default function SignupRequestsPanel() {
  const { state, dispatch } = useAppContext();
  const { sendEmailNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending_approval');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signupRequests = state.signupRequests || [];

  const filteredRequests = signupRequests.filter(request => {
    const matchesSearch = request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (request.rollNumber && request.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (request.employeeId && request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !filterType || request.userType === filterType;
    const matchesStatus = !filterStatus || request.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleApproveRequest = async (request: any) => {
    // Generate temporary password
    const tempPassword = `${request.firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
    
    // Create user account
    const newUser = {
      id: Date.now().toString(),
      name: `${request.firstName} ${request.lastName}`,
      email: request.email,
      phone: request.phone,
      userType: request.userType,
      department: request.department,
      rollNumber: request.rollNumber,
      employeeId: request.employeeId,
      status: 'Active',
      hasPassword: true,
      createdDate: new Date().toISOString().split('T')[0],
      approvedBy: 'Admin',
      approvedDate: new Date().toISOString()
    };

    // Add user to system
    dispatch(actions.addUser(newUser));

    // Update request status
    const updatedRequest = {
      ...request,
      status: 'approved',
      approvedAt: new Date().toISOString(),
      approvedBy: 'Admin',
      assignedPassword: tempPassword
    };
    dispatch(actions.updateSignupRequest(updatedRequest));

    // Send approval email with credentials
    sendEmailNotification(
      request.email,
      'Account Approved - Login Credentials - St. Dominic\'s College',
      `Dear ${request.firstName} ${request.lastName},

Congratulations! Your account has been approved by the administration.

Your login credentials:
- Username: ${request.email}
- Temporary Password: ${tempPassword}
- User Type: ${request.userType}

Please log in to the system using these credentials. You will be prompted to change your password on first login for security purposes.

Login URL: ${window.location.origin}

Important Security Notes:
- Please change your password immediately after first login
- Do not share your credentials with anyone
- Contact IT support if you face any login issues

Welcome to St. Dominic's College ERP System!

Best regards,
St. Dominic's College Administration`
    );

    // Add notification
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'success',
      title: 'Account Approved',
      message: `${request.firstName} ${request.lastName}'s account has been approved and credentials sent`,
      timestamp: new Date().toISOString(),
      read: false
    }));

    alert(`Account approved successfully! Login credentials have been sent to ${request.email}`);
  };

  const handleRejectRequest = async (request: any, reason: string = '') => {
    // Update request status
    const updatedRequest = {
      ...request,
      status: 'rejected',
      rejectedAt: new Date().toISOString(),
      rejectedBy: 'Admin',
      rejectionReason: reason
    };
    dispatch(actions.updateSignupRequest(updatedRequest));

    // Send rejection email
    sendEmailNotification(
      request.email,
      'Account Registration Update - St. Dominic\'s College',
      `Dear ${request.firstName} ${request.lastName},

Thank you for your interest in St. Dominic's College ERP System.

After careful review, we are unable to approve your account registration at this time.

${reason ? `Reason: ${reason}` : ''}

If you believe this is an error or would like to reapply, please contact the administration office for further assistance.

Contact Information:
- Email: admin@college.edu
- Phone: +91-XXXXX-XXXXX

Best regards,
St. Dominic's College Administration`
    );

    // Add notification
    dispatch(actions.addNotification({
      id: Date.now().toString(),
      type: 'warning',
      title: 'Account Rejected',
      message: `${request.firstName} ${request.lastName}'s account request has been rejected`,
      timestamp: new Date().toISOString(),
      read: false
    }));

    alert(`Account request rejected. Notification email sent to ${request.email}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'student': return <GraduationCap className="h-4 w-4" />;
      case 'faculty': return <Users className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Signup Requests</h2>
            <p className="text-orange-100">Review and approve new user registration requests</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{signupRequests.filter(r => r.status === 'pending_approval').length}</p>
              <p className="text-sm text-orange-100">Pending</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <CheckCircle className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{signupRequests.filter(r => r.status === 'approved').length}</p>
              <p className="text-sm text-orange-100">Approved</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2">
                <XCircle className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold">{signupRequests.filter(r => r.status === 'rejected').length}</p>
              <p className="text-sm text-orange-100">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
            >
              <option value="">All Types</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
            >
              <option value="">All Status</option>
              <option value="pending_approval">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Applicant</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Department</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">ID/Roll</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Submitted</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {request.firstName[0]}{request.lastName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{request.firstName} {request.lastName}</p>
                        <p className="text-sm text-gray-600">{request.email}</p>
                        <p className="text-sm text-gray-600">{request.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getUserTypeIcon(request.userType)}
                      <span className="font-medium text-gray-900 capitalize">{request.userType}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{request.department}</td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {request.rollNumber || request.employeeId}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsModalOpen(true);
                        }}
                        className="text-gray-600 hover:text-orange-600 p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {request.status === 'pending_approval' && (
                        <>
                          <button
                            onClick={() => handleApproveRequest(request)}
                            className="text-gray-600 hover:text-green-600 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                            title="Approve Request"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Enter rejection reason (optional):');
                              if (reason !== null) {
                                handleRejectRequest(request, reason);
                              }
                            }}
                            className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            title="Reject Request"
                          >
                            <XCircle className="h-4 w-4" />
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

      {filteredRequests.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No signup requests found</h3>
          <p className="text-gray-600">No requests match your current filters</p>
        </div>
      )}

      {/* Request Details Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-600 to-red-600 text-white">
              <h2 className="text-xl font-semibold">Signup Request Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Name:</span>
                      <p className="font-medium">{selectedRequest.firstName} {selectedRequest.lastName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="font-medium">{selectedRequest.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <p className="font-medium">{selectedRequest.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Academic Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Type:</span>
                      <p className="font-medium capitalize">{selectedRequest.userType}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Department:</span>
                      <p className="font-medium">{selectedRequest.department}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">{selectedRequest.userType === 'student' ? 'Roll Number' : 'Employee ID'}:</span>
                      <p className="font-medium">{selectedRequest.rollNumber || selectedRequest.employeeId}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Request Status</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`ml-2 inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Submitted:</span>
                    <p className="font-medium">{new Date(selectedRequest.submittedAt).toLocaleString()}</p>
                  </div>
                  {selectedRequest.approvedAt && (
                    <div>
                      <span className="text-sm text-gray-500">Approved:</span>
                      <p className="font-medium">{new Date(selectedRequest.approvedAt).toLocaleString()}</p>
                    </div>
                  )}
                  {selectedRequest.rejectedAt && (
                    <div>
                      <span className="text-sm text-gray-500">Rejected:</span>
                      <p className="font-medium">{new Date(selectedRequest.rejectedAt).toLocaleString()}</p>
                      {selectedRequest.rejectionReason && (
                        <p className="text-sm text-red-600 mt-1">Reason: {selectedRequest.rejectionReason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedRequest.status === 'pending_approval' && (
                <>
                  <button
                    onClick={() => {
                      const reason = prompt('Enter rejection reason (optional):');
                      if (reason !== null) {
                        handleRejectRequest(selectedRequest, reason);
                        setIsModalOpen(false);
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleApproveRequest(selectedRequest);
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}