import React, { useState } from 'react';
import { Mail, User, Phone, GraduationCap, Users, ArrowLeft, Check, School } from 'lucide-react';

interface SignUpPageProps {
  onSignUp: (userData: any) => void;
  onSwitchToSignIn: () => void;
}

export default function SignUpPage({ onSignUp, onSwitchToSignIn }: SignUpPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: 'student',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    rollNumber: '',
    employeeId: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate Indian phone number
    if (field === 'phone') {
      validateIndianPhone(value);
    }
  };

  const validateIndianPhone = (phone: string) => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Indian phone number patterns:
    // Mobile: 10 digits starting with 6,7,8,9
    // Landline: 10-11 digits with STD codes
    const mobilePattern = /^[6-9]\d{9}$/;
    const landlinePattern = /^0?[1-9]\d{8,9}$/;
    
    if (cleanPhone.length === 0) {
      setPhoneError('');
      return;
    }
    
    if (cleanPhone.length === 10 && mobilePattern.test(cleanPhone)) {
      setPhoneError('');
      return;
    }
    
    if ((cleanPhone.length === 10 || cleanPhone.length === 11) && landlinePattern.test(cleanPhone)) {
      setPhoneError('');
      return;
    }
    
    setPhoneError('Please enter a valid Indian phone number (10 digits starting with 6,7,8,9 for mobile)');
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Format as +91-XXXXX-XXXXX for mobile numbers
    if (cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone)) {
      return `+91-${cleanPhone.slice(0, 5)}-${cleanPhone.slice(5)}`;
    }
    
    return phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (phoneError) {
      alert('Please fix the phone number error before submitting.');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const signupRequest = {
        ...formData,
        phone: formatPhoneNumber(formData.phone),
        status: 'pending_approval',
        submittedAt: new Date().toISOString(),
        id: Date.now().toString()
      };
      
      onSignUp(signupRequest);
      setIsLoading(false);
    }, 2000);
  };

  const userTypes = [
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'bg-blue-500' },
    { id: 'faculty', label: 'Faculty', icon: Users, color: 'bg-green-500' }
  ];

  const departments = [
    'Computer Science',
    'Political Science',
    'English',
    'History',
    'Education',
    'Sociology',
    'Economics',
    'Geography',
    'Library',
    'Staff'
  ];

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.userType && formData.firstName && formData.lastName && formData.email;
      case 2:
        return formData.phone && !phoneError;
      case 3:
        return formData.department && 
               (formData.userType === 'student' ? formData.rollNumber : formData.employeeId) &&
               formData.agreeToTerms;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-lg border border-gray-100">
                  <School className="w-16 h-16 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">St. Dominic's College</h1>
                  <p className="text-gray-600">College ERP System</p>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Access your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Academic Profile</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Creating your account here and please note that the profile shall be previewed by the admin upon which you username and password shall be assigned to you for login.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Dashboard</h3>
                  <p className="text-sm text-gray-600">Access all your academic information in one centralized location</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Real-time Updates</h3>
                  <p className="text-sm text-gray-600">Stay informed with instant notifications and updates</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure & Reliable</h3>
                  <p className="text-sm text-gray-600">Your data is protected with enterprise-grade security</p>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="font-semibold text-gray-900 mb-4">Registration Progress</h3>
              <div className="flex items-center space-x-4">
                {[1,2,3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-12 h-1 mx-2 ${
                        step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>Basic Info</span>
                <span>Contact</span>
                <span>Academic</span>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-lg border border-gray-100">
                    <School className="w-12 h-12 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">St. Dominic's College</h1>
                    <p className="text-sm text-gray-600">College ERP System</p>
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-between mb-4">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </button>
                  )}
                  <div className="flex-1 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-600">Step {step} of 3</p>
                  </div>
                  <div className="w-16"></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <>
                    {/* User Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
                      <div className="grid grid-cols-2 gap-3">
                        {userTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => handleInputChange('userType', type.id)}
                              className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                                formData.userType === type.id
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <Icon className="h-5 w-5 mx-auto mb-1" />
                              <span className="text-sm font-medium">{type.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                          placeholder="First name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                          placeholder="Last name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Contact Information */}
                {step === 2 && (
                  <>
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number (Indian)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm ${
                            phoneError ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="10-digit mobile number (e.g., 9876543210)"
                          required
                        />
                      </div>
                      {phoneError && (
                        <p className="text-sm text-red-600 mt-1">{phoneError}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Enter 10-digit mobile number starting with 6, 7, 8, or 9
                      </p>
                    </div>

                    {/* Information Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="h-3 w-3 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-blue-900 mb-1">Account Credentials</h4>
                          <p className="text-sm text-blue-700">
                            Your login username and password will be assigned by the administrator after your account is reviewed and approved. You will receive an email notification once approved.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Academic Information */}
                {step === 3 && (
                  <>
                    {/* Department */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    {/* ID Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {formData.userType === 'student' ? 'Roll Number' : 'Employee ID'}
                      </label>
                      <input
                        type="text"
                        value={formData.userType === 'student' ? formData.rollNumber : formData.employeeId}
                        onChange={(e) => handleInputChange(
                          formData.userType === 'student' ? 'rollNumber' : 'employeeId', 
                          e.target.value
                        )}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                        placeholder={formData.userType === 'student' ? 'e.g., CS21001' : 'e.g., FAC001'}
                        required
                      />
                    </div>

                    {/* Terms Agreement */}
                    <div>
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                          className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          required
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the{' '}
                          <button type="button" className="text-green-600 hover:text-green-800 font-medium">
                            Terms of Service
                          </button>{' '}
                          and{' '}
                          <button type="button" className="text-green-600 hover:text-green-800 font-medium">
                            Privacy Policy
                          </button>
                        </span>
                      </label>
                    </div>

                    {/* Final Note */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-green-900 mb-1">Next Steps</h4>
                          <p className="text-sm text-green-700">
                            After submitting your application, an administrator will review your information and provide you with login credentials via email. You will also receive a confirmation email shortly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isStepValid() || isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : step < 3 ? (
                    'Continue'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToSignIn}
                    className="text-green-600 hover:text-green-800 font-semibold transition-colors"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
          <div>
            © {new Date().getFullYear()} St. Dominic's College. All rights reserved.
          </div>
          <div>
            Made by <a href="https://www.tribaldesignsolution.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 font-medium transition-colors">Tribal Design Solutions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}