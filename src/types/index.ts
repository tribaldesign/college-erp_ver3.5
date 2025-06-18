export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  department: string;
  semester: number;
  dateOfBirth: string;
  address: string;
  parentContact: string;
  admissionDate: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  gpa: number;
  profileImage?: string;
  // New fields for enhanced profile
  idNumber: string; // Admin only
  bloodType?: string;
  age: number;
  homeAddress: string;
  presentAddress: string;
  country: string;
  subjectsTaken: string[];
  facultyMembers: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalInfo?: {
    allergies: string[];
    medications: string[];
    conditions: string[];
  };
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  designation: string;
  qualification: string;
  experience: number;
  subjects: string[];
  joiningDate: string;
  status: 'Active' | 'Inactive';
  profileImage?: string;
  // New fields for enhanced profile
  idNumber: string; // Admin only
  bloodType?: string;
  age: number;
  dateOfBirth: string;
  homeAddress: string;
  presentAddress: string;
  country: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  researchInterests?: string[];
  publications?: {
    title: string;
    year: number;
    journal: string;
  }[];
  awards?: {
    title: string;
    year: number;
    organization: string;
  }[];
}

export interface UserProfile {
  id: string;
  type: 'student' | 'faculty' | 'admin';
  permissions: {
    canEditPersonalDetails: boolean;
    canEditAcademicDetails: boolean;
    canEditIdNumber: boolean;
    canViewAllProfiles: boolean;
    canDeleteProfiles: boolean;
  };
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  department: string;
  semester: number;
  instructor: string;
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
  description: string;
  prerequisites: string[];
  maxStudents: number;
  enrolledStudents: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  head: string;
  establishedYear: number;
  totalStudents: number;
  totalFaculty: number;
  totalCourses: number;
  subjects: Subject[];
  status: 'Active' | 'Inactive';
  building: string;
  contactEmail: string;
  contactPhone: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester: number;
  type: 'Core' | 'Elective' | 'Lab' | 'Project';
  description: string;
  prerequisites: string[];
  status: 'Active' | 'Inactive';
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  type: 'Assignment' | 'Quiz' | 'Midterm' | 'Final' | 'Project';
  score: number;
  maxScore: number;
  date: string;
}

// Library Management Types
export interface LibraryBook {
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
  addedDate: string;
  addedBy: string;
}

export interface LibraryMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberType: 'Student' | 'Faculty' | 'Staff';
  membershipId: string;
  department: string;
  joinDate: string;
  status: 'Active' | 'Suspended' | 'Expired';
  booksIssued: number;
  maxBooks: number;
  fineAmount: number;
}

export interface LibraryTransaction {
  id: string;
  bookId: string;
  bookTitle: string;
  memberId: string;
  memberName: string;
  memberType: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Issued' | 'Returned' | 'Overdue';
  fine: number;
  issuedBy: string;
  returnedBy?: string;
}