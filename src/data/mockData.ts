import { Student, Faculty, Course, Department, Subject } from '../types';

export const mockStudents: Student[] = [];
export const mockFaculty: Faculty[] = [];
export const mockCourses: Course[] = [];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    description: 'Department of Computer Science focusing on software development, algorithms, and emerging technologies.',
    head: 'To be assigned',
    establishedYear: 2023,
    totalStudents: 0,
    totalFaculty: 0,
    totalCourses: 0,
    building: 'Technology Building A',
    contactEmail: 'cs@college.edu',
    contactPhone: '+91-98765-43210',
    status: 'Active',
    subjects: []
  },
  {
    id: '2',
    name: 'Political Science',
    code: 'PS',
    description: 'Department of Political Science specializing in political theory, international relations, and public administration.',
    head: 'To be assigned',
    establishedYear: 2023,
    totalStudents: 0,
    totalFaculty: 0,
    totalCourses: 0,
    building: 'Social Sciences Building',
    contactEmail: 'ps@college.edu',
    contactPhone: '+91-87654-32109',
    status: 'Active',
    subjects: []
  },
  {
    id: '3',
    name: 'English',
    code: 'EN',
    description: 'Department of English covering literature, creative writing, and language studies.',
    head: 'To be assigned',
    establishedYear: 2023,
    totalStudents: 0,
    totalFaculty: 0,
    totalCourses: 0,
    building: 'Humanities Building',
    contactEmail: 'english@college.edu',
    contactPhone: '+91-76543-21098',
    status: 'Active',
    subjects: []
  }
];

export const mockSubjects: Subject[] = [];