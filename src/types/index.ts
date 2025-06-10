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