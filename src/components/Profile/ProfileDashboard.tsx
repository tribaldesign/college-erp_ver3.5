import React, { useState } from 'react';
import { User, Camera, Edit3, Save, X, Shield, Users, GraduationCap, BookOpen, Phone, MapPin, Calendar, Heart, Globe, Award, FileText, Plus, Trash2 } from 'lucide-react';
import { Student, Faculty, UserProfile } from '../../types';
import { mockStudents, mockFaculty } from '../../data/mockData';

// Mock current user - in real app this would come from auth context
const currentUser: UserProfile = {
  id: '1',
  type: 'student', // Change to 'faculty' or 'admin' to test different views
  permissions: {
    canEditPersonalDetails: true,
    canEditAcademicDetails: false, // Only admin can edit academic details
    canEditIdNumber: false, // Only admin can edit ID numbers
    canViewAllProfiles: false, // Only admin can view all profiles
    canDeleteProfiles: false // Only admin can delete profiles
  }
};

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Student | Faculty | null>(null);
  const [profileData, setProfileData] = useState<Student | Faculty>(
    currentUser.type === 'student' ? mockStudents[0] : mockFaculty[0]
  );

  const isAdmin = currentUser.type === 'admin';
  const isStudent = currentUser.type === 'student';
  const isFaculty = currentUser.type === 'faculty';

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'contact', label: 'Contact & Address', icon: MapPin },
    { id: 'medical', label: 'Medical Info', icon: Heart },
    ...(isFaculty ? [{ id: 'research', label: 'Research & Awards', icon: Award }] : []),
    ...(isAdmin ? [{ id: 'management', label: 'Profile Management', icon: Shield }] : [])
  ];

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [parent]: {
        ...(prev as any)[parent],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setProfileData(prev => {
      const array = [...((prev as any)[field] || [])];
      array[index] = value;
      return { ...prev, [field]: array };
    });
  };

  const addArrayItem = (field: string, defaultValue: any = '') => {
    setProfileData(prev => ({
      ...prev,
      [field]: [...((prev as any)[field] || []), defaultValue]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: ((prev as any)[field] || []).filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSave = () => {
    // In real app, this would save to backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('profileImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const canEditField = (fieldType: 'personal' | 'academic' | 'id') => {
    if (isAdmin) return true;
    if (fieldType === 'personal') return currentUser.permissions.canEditPersonalDetails;
    if (fieldType === 'academic') return currentUser.permissions.canEditAcademicDetails;
    if (fieldType === 'id') return currentUser.permissions.canEditIdNumber;
    return false;
  };

  const getBloodTypeOptions = () => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                {profileData.profileImage ? (
                  <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-10 w-10 text-white" />
                )}
              </div>
              {canEditField('personal') && (
                <label className="absolute bottom-0 right-0 bg-white text-indigo-600 rounded-full p-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Camera className="h-3 w-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-indigo-100">
                {isStudent ? `${(profileData as Student).rollNumber} • ${profileData.department}` : 
                 `${(profileData as Faculty).employeeId} • ${(profileData as Faculty).designation}`}
              </p>
              <p className="text-indigo-200 text-sm">
                {isStudent ? `Semester ${(profileData as Student).semester}` : 
                 `${(profileData as Faculty).experience} years experience`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white rounded-lg">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing && canEditField('personal') ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing && canEditField('personal') ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                {isEditing && canEditField('personal') ? (
                  <input
                    type="date"
                    value={isStudent ? (profileData as Student).dateOfBirth : (profileData as Faculty).dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">
                    {new Date(isStudent ? (profileData as Student).dateOfBirth : (profileData as Faculty).dateOfBirth).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                {isEditing && canEditField('personal') ? (
                  <input
                    type="number"
                    value={(profileData as any).age || ''}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{(profileData as any).age || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                {isEditing && canEditField('personal') ? (
                  <select
                    value={(profileData as any).bloodType || ''}
                    onChange={(e) => handleInputChange('bloodType', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Blood Type</option>
                    {getBloodTypeOptions().map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900 py-2">{(profileData as any).bloodType || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                {isEditing && canEditField('personal') ? (
                  <input
                    type="text"
                    value={(profileData as any).country || ''}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{(profileData as any).country || 'Not specified'}</p>
                )}
              </div>
            </div>

            {/* ID Number - Admin Only */}
            <div className="border-t pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-red-500" />
                <h4 className="font-medium text-gray-900">Administrative Information</h4>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Admin Only</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
                {isEditing && canEditField('id') ? (
                  <input
                    type="text"
                    value={(profileData as any).idNumber || ''}
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{(profileData as any).idNumber || 'Not assigned'}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
            
            {isStudent ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                    {isEditing && canEditField('academic') ? (
                      <input
                        type="text"
                        value={(profileData as Student).rollNumber}
                        onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{(profileData as Student).rollNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    {isEditing && canEditField('academic') ? (
                      <select
                        value={profileData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 py-2">{profileData.department}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
                    {isEditing && canEditField('academic') ? (
                      <select
                        value={(profileData as Student).semester}
                        onChange={(e) => handleInputChange('semester', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        {[1,2,3,4,5,6,7,8].map(sem => (
                          <option key={sem} value={sem}>Semester {sem}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900 py-2">Semester {(profileData as Student).semester}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current GPA</label>
                    <p className="text-gray-900 py-2 font-semibold text-lg">{(profileData as Student).gpa.toFixed(2)}</p>
                  </div>
                </div>

                {/* Subjects Taken */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Taken</label>
                  {isEditing && canEditField('academic') ? (
                    <div className="space-y-2">
                      {((profileData as any).subjectsTaken || []).map((subject: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={subject}
                            onChange={(e) => handleArrayInputChange('subjectsTaken', index, e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => removeArrayItem('subjectsTaken', index)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addArrayItem('subjectsTaken')}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Subject</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {((profileData as any).subjectsTaken || []).map((subject: string, index: number) => (
                        <span key={index} className="inline-flex px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Faculty Members */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Faculty Members</label>
                  {isEditing && canEditField('academic') ? (
                    <div className="space-y-2">
                      {((profileData as any).facultyMembers || []).map((faculty: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={faculty}
                            onChange={(e) => handleArrayInputChange('facultyMembers', index, e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => removeArrayItem('facultyMembers', index)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addArrayItem('facultyMembers')}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Faculty Member</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {((profileData as any).facultyMembers || []).map((faculty: string, index: number) => (
                        <span key={index} className="inline-flex px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                          {faculty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Faculty Academic Information
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                    {isEditing && canEditField('academic') ? (
                      <input
                        type="text"
                        value={(profileData as Faculty).employeeId}
                        onChange={(e) => handleInputChange('employeeId', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{(profileData as Faculty).employeeId}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    {isEditing && canEditField('academic') ? (
                      <select
                        value={(profileData as Faculty).designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Lecturer">Lecturer</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 py-2">{(profileData as Faculty).designation}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                    {isEditing && canEditField('academic') ? (
                      <input
                        type="text"
                        value={(profileData as Faculty).qualification}
                        onChange={(e) => handleInputChange('qualification', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{(profileData as Faculty).qualification}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                    {isEditing && canEditField('academic') ? (
                      <input
                        type="number"
                        value={(profileData as Faculty).experience}
                        onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{(profileData as Faculty).experience} years</p>
                    )}
                  </div>
                </div>

                {/* Subjects Teaching */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Teaching</label>
                  {isEditing && canEditField('academic') ? (
                    <div className="space-y-2">
                      {(profileData as Faculty).subjects.map((subject: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={subject}
                            onChange={(e) => handleArrayInputChange('subjects', index, e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => removeArrayItem('subjects', index)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addArrayItem('subjects')}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Subject</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(profileData as Faculty).subjects.map((subject: string, index: number) => (
                        <span key={index} className="inline-flex px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Address Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing && canEditField('personal') ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.phone}</p>
                )}
              </div>

              {isStudent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Contact</label>
                  {isEditing && canEditField('personal') ? (
                    <input
                      type="tel"
                      value={(profileData as Student).parentContact}
                      onChange={(e) => handleInputChange('parentContact', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{(profileData as Student).parentContact}</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Address</label>
              {isEditing && canEditField('personal') ? (
                <textarea
                  value={(profileData as any).homeAddress || ''}
                  onChange={(e) => handleInputChange('homeAddress', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 py-2">{(profileData as any).homeAddress || 'Not specified'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Present Address</label>
              {isEditing && canEditField('personal') ? (
                <textarea
                  value={(profileData as any).presentAddress || ''}
                  onChange={(e) => handleInputChange('presentAddress', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 py-2">{(profileData as any).presentAddress || 'Not specified'}</p>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  {isEditing && canEditField('personal') ? (
                    <input
                      type="text"
                      value={(profileData as any).emergencyContact?.name || ''}
                      onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{(profileData as any).emergencyContact?.name || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  {isEditing && canEditField('personal') ? (
                    <input
                      type="text"
                      value={(profileData as any).emergencyContact?.relationship || ''}
                      onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{(profileData as any).emergencyContact?.relationship || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing && canEditField('personal') ? (
                    <input
                      type="tel"
                      value={(profileData as any).emergencyContact?.phone || ''}
                      onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{(profileData as any).emergencyContact?.phone || 'Not specified'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
            
            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
              {isEditing && canEditField('personal') ? (
                <div className="space-y-2">
                  {((profileData as any).medicalInfo?.allergies || []).map((allergy: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={allergy}
                        onChange={(e) => {
                          const newAllergies = [...((profileData as any).medicalInfo?.allergies || [])];
                          newAllergies[index] = e.target.value;
                          handleNestedInputChange('medicalInfo', 'allergies', newAllergies);
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newAllergies = ((profileData as any).medicalInfo?.allergies || []).filter((_: any, i: number) => i !== index);
                          handleNestedInputChange('medicalInfo', 'allergies', newAllergies);
                        }}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newAllergies = [...((profileData as any).medicalInfo?.allergies || []), ''];
                      handleNestedInputChange('medicalInfo', 'allergies', newAllergies);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Allergy</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {((profileData as any).medicalInfo?.allergies || []).map((allergy: string, index: number) => (
                    <span key={index} className="inline-flex px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                      {allergy}
                    </span>
                  ))}
                  {((profileData as any).medicalInfo?.allergies || []).length === 0 && (
                    <p className="text-gray-500">No allergies recorded</p>
                  )}
                </div>
              )}
            </div>

            {/* Medications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
              {isEditing && canEditField('personal') ? (
                <div className="space-y-2">
                  {((profileData as any).medicalInfo?.medications || []).map((medication: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={medication}
                        onChange={(e) => {
                          const newMedications = [...((profileData as any).medicalInfo?.medications || [])];
                          newMedications[index] = e.target.value;
                          handleNestedInputChange('medicalInfo', 'medications', newMedications);
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newMedications = ((profileData as any).medicalInfo?.medications || []).filter((_: any, i: number) => i !== index);
                          handleNestedInputChange('medicalInfo', 'medications', newMedications);
                        }}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newMedications = [...((profileData as any).medicalInfo?.medications || []), ''];
                      handleNestedInputChange('medicalInfo', 'medications', newMedications);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Medication</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {((profileData as any).medicalInfo?.medications || []).map((medication: string, index: number) => (
                    <span key={index} className="inline-flex px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      {medication}
                    </span>
                  ))}
                  {((profileData as any).medicalInfo?.medications || []).length === 0 && (
                    <p className="text-gray-500">No medications recorded</p>
                  )}
                </div>
              )}
            </div>

            {/* Medical Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              {isEditing && canEditField('personal') ? (
                <div className="space-y-2">
                  {((profileData as any).medicalInfo?.conditions || []).map((condition: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={condition}
                        onChange={(e) => {
                          const newConditions = [...((profileData as any).medicalInfo?.conditions || [])];
                          newConditions[index] = e.target.value;
                          handleNestedInputChange('medicalInfo', 'conditions', newConditions);
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newConditions = ((profileData as any).medicalInfo?.conditions || []).filter((_: any, i: number) => i !== index);
                          handleNestedInputChange('medicalInfo', 'conditions', newConditions);
                        }}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newConditions = [...((profileData as any).medicalInfo?.conditions || []), ''];
                      handleNestedInputChange('medicalInfo', 'conditions', newConditions);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Condition</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {((profileData as any).medicalInfo?.conditions || []).map((condition: string, index: number) => (
                    <span key={index} className="inline-flex px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                      {condition}
                    </span>
                  ))}
                  {((profileData as any).medicalInfo?.conditions || []).length === 0 && (
                    <p className="text-gray-500">No medical conditions recorded</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'research' && isFaculty && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Research & Awards</h3>
            
            {/* Research Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Research Interests</label>
              {isEditing && canEditField('personal') ? (
                <div className="space-y-2">
                  {((profileData as any).researchInterests || []).map((interest: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={interest}
                        onChange={(e) => handleArrayInputChange('researchInterests', index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeArrayItem('researchInterests', index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('researchInterests')}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Research Interest</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {((profileData as any).researchInterests || []).map((interest: string, index: number) => (
                    <span key={index} className="inline-flex px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Publications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publications</label>
              {isEditing && canEditField('personal') ? (
                <div className="space-y-4">
                  {((profileData as any).publications || []).map((pub: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Publication Title"
                            value={pub.title || ''}
                            onChange={(e) => {
                              const newPubs = [...((profileData as any).publications || [])];
                              newPubs[index] = { ...newPubs[index], title: e.target.value };
                              handleInputChange('publications', newPubs);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Year"
                            value={pub.year || ''}
                            onChange={(e) => {
                              const newPubs = [...((profileData as any).publications || [])];
                              newPubs[index] = { ...newPubs[index], year: parseInt(e.target.value) };
                              handleInputChange('publications', newPubs);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Journal/Conference"
                            value={pub.journal || ''}
                            onChange={(e) => {
                              const newPubs = [...((profileData as any).publications || [])];
                              newPubs[index] = { ...newPubs[index], journal: e.target.value };
                              handleInputChange('publications', newPubs);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              const newPubs = ((profileData as any).publications || []).filter((_: any, i: number) => i !== index);
                              handleInputChange('publications', newPubs);
                            }}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newPubs = [...((profileData as any).publications || []), { title: '', year: '', journal: '' }];
                      handleInputChange('publications', newPubs);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Publication</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {((profileData as any).publications || []).map((pub: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">{pub.title}</h4>
                      <p className="text-sm text-gray-600">{pub.journal} • {pub.year}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Awards */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Awards & Recognition</label>
              {isEditing && canEditField('personal') ? (
                <div className="space-y-4">
                  {((profileData as any).awards || []).map((award: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Award Title"
                            value={award.title || ''}
                            onChange={(e) => {
                              const newAwards = [...((profileData as any).awards || [])];
                              newAwards[index] = { ...newAwards[index], title: e.target.value };
                              handleInputChange('awards', newAwards);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Year"
                            value={award.year || ''}
                            onChange={(e) => {
                              const newAwards = [...((profileData as any).awards || [])];
                              newAwards[index] = { ...newAwards[index], year: parseInt(e.target.value) };
                              handleInputChange('awards', newAwards);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Organization"
                            value={award.organization || ''}
                            onChange={(e) => {
                              const newAwards = [...((profileData as any).awards || [])];
                              newAwards[index] = { ...newAwards[index], organization: e.target.value };
                              handleInputChange('awards', newAwards);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              const newAwards = ((profileData as any).awards || []).filter((_: any, i: number) => i !== index);
                              handleInputChange('awards', newAwards);
                            }}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newAwards = [...((profileData as any).awards || []), { title: '', year: '', organization: '' }];
                      handleInputChange('awards', newAwards);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Award</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {((profileData as any).awards || []).map((award: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">{award.title}</h4>
                      <p className="text-sm text-gray-600">{award.organization} • {award.year}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'management' && isAdmin && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Management</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">Administrator Controls</h4>
              </div>
              <p className="text-yellow-700 text-sm mt-2">
                As an administrator, you have full access to edit all profile information including academic details and ID numbers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                    <Users className="h-4 w-4" />
                    <span>View All Profiles</span>
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Create New Profile</span>
                  </button>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Profile</span>
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Profile Statistics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Students:</span>
                    <span className="font-semibold">{mockStudents.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Faculty:</span>
                    <span className="font-semibold">{mockFaculty.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Profiles:</span>
                    <span className="font-semibold">{mockStudents.filter(s => s.status === 'Active').length + mockFaculty.filter(f => f.status === 'Active').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}