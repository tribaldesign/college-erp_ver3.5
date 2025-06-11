import { Student, Faculty, Course, Department, Subject } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@college.edu',
    phone: '+1-555-0101',
    rollNumber: 'CS21001',
    department: 'Computer Science',
    semester: 6,
    dateOfBirth: '2002-03-15',
    address: '123 College Ave, University City, State 12345',
    parentContact: '+1-555-0102',
    admissionDate: '2021-08-15',
    status: 'Active',
    gpa: 3.8,
    // Enhanced profile fields
    idNumber: 'STU001',
    bloodType: 'A+',
    age: 22,
    homeAddress: '456 Home Street, Hometown, State 54321',
    presentAddress: '123 College Ave, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Machine Learning'],
    facultyMembers: ['Dr. Sarah Johnson', 'Dr. Kevin Zhang', 'Dr. Michael Brown'],
    emergencyContact: {
      name: 'Mary Johnson',
      relationship: 'Mother',
      phone: '+1-555-0102'
    },
    medicalInfo: {
      allergies: ['Peanuts', 'Shellfish'],
      medications: ['Vitamin D'],
      conditions: []
    }
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@college.edu',
    phone: '+1-555-0103',
    rollNumber: 'EE21002',
    department: 'Electrical Engineering',
    semester: 4,
    dateOfBirth: '2002-07-22',
    address: '456 Oak Street, University City, State 12345',
    parentContact: '+1-555-0104',
    admissionDate: '2021-08-15',
    status: 'Active',
    gpa: 3.6,
    // Enhanced profile fields
    idNumber: 'STU002',
    bloodType: 'B+',
    age: 21,
    homeAddress: '789 Oak Avenue, Hometown, State 54321',
    presentAddress: '456 Oak Street, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Circuit Analysis', 'Digital Systems', 'Electronics', 'Signal Processing'],
    facultyMembers: ['Dr. Michael Brown', 'Dr. Emily Davis'],
    emergencyContact: {
      name: 'John Smith',
      relationship: 'Father',
      phone: '+1-555-0104'
    },
    medicalInfo: {
      allergies: [],
      medications: [],
      conditions: ['Asthma']
    }
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@college.edu',
    phone: '+1-555-0105',
    rollNumber: 'ME20001',
    department: 'Mechanical Engineering',
    semester: 8,
    dateOfBirth: '2001-11-08',
    address: '789 Pine Road, University City, State 12345',
    parentContact: '+1-555-0106',
    admissionDate: '2020-08-15',
    status: 'Active',
    gpa: 3.9,
    // Enhanced profile fields
    idNumber: 'STU003',
    bloodType: 'O-',
    age: 23,
    homeAddress: '321 Pine Street, Hometown, State 54321',
    presentAddress: '789 Pine Road, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Thermodynamics', 'Fluid Mechanics', 'Heat Transfer', 'Manufacturing Processes'],
    facultyMembers: ['Dr. Emily Davis', 'Dr. Robert Wilson'],
    emergencyContact: {
      name: 'Susan Davis',
      relationship: 'Mother',
      phone: '+1-555-0106'
    },
    medicalInfo: {
      allergies: ['Latex'],
      medications: ['Iron supplements'],
      conditions: []
    }
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@college.edu',
    phone: '+1-555-0107',
    rollNumber: 'CS22001',
    department: 'Computer Science',
    semester: 2,
    dateOfBirth: '2003-01-12',
    address: '321 Elm Street, University City, State 12345',
    parentContact: '+1-555-0108',
    admissionDate: '2022-08-15',
    status: 'Active',
    gpa: 3.7,
    // Enhanced profile fields
    idNumber: 'STU004',
    bloodType: 'AB+',
    age: 21,
    homeAddress: '654 Elm Road, Hometown, State 54321',
    presentAddress: '321 Elm Street, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Programming Fundamentals', 'Data Structures', 'Discrete Mathematics'],
    facultyMembers: ['Dr. Sarah Johnson', 'Dr. Robert Wilson'],
    emergencyContact: {
      name: 'Robert Wilson Sr.',
      relationship: 'Father',
      phone: '+1-555-0108'
    },
    medicalInfo: {
      allergies: [],
      medications: [],
      conditions: []
    }
  },
  {
    id: '5',
    name: 'Emma Thompson',
    email: 'emma.thompson@college.edu',
    phone: '+1-555-0109',
    rollNumber: 'CE21003',
    department: 'Civil Engineering',
    semester: 5,
    dateOfBirth: '2002-05-20',
    address: '654 Maple Drive, University City, State 12345',
    parentContact: '+1-555-0110',
    admissionDate: '2021-08-15',
    status: 'Active',
    gpa: 3.5,
    // Enhanced profile fields
    idNumber: 'STU005',
    bloodType: 'A-',
    age: 22,
    homeAddress: '987 Maple Avenue, Hometown, State 54321',
    presentAddress: '654 Maple Drive, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Structural Analysis', 'Concrete Technology', 'Surveying', 'Soil Mechanics'],
    facultyMembers: ['Dr. Robert Chen', 'Dr. Emily Davis'],
    emergencyContact: {
      name: 'James Thompson',
      relationship: 'Father',
      phone: '+1-555-0110'
    },
    medicalInfo: {
      allergies: ['Dust'],
      medications: ['Allergy medication'],
      conditions: ['Allergic rhinitis']
    }
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.miller@college.edu',
    phone: '+1-555-0111',
    rollNumber: 'EE20002',
    department: 'Electrical Engineering',
    semester: 7,
    dateOfBirth: '2001-09-14',
    address: '987 Cedar Lane, University City, State 12345',
    parentContact: '+1-555-0112',
    admissionDate: '2020-08-15',
    status: 'Active',
    gpa: 3.4,
    // Enhanced profile fields
    idNumber: 'STU006',
    bloodType: 'B-',
    age: 23,
    homeAddress: '147 Cedar Street, Hometown, State 54321',
    presentAddress: '987 Cedar Lane, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Circuit Analysis', 'Digital Systems', 'Power Systems', 'Control Systems'],
    facultyMembers: ['Dr. Michael Brown', 'Dr. James Taylor'],
    emergencyContact: {
      name: 'Linda Miller',
      relationship: 'Mother',
      phone: '+1-555-0112'
    },
    medicalInfo: {
      allergies: [],
      medications: [],
      conditions: []
    }
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace.lee@college.edu',
    phone: '+1-555-0113',
    rollNumber: 'CS23001',
    department: 'Computer Science',
    semester: 1,
    dateOfBirth: '2003-12-03',
    address: '147 Birch Street, University City, State 12345',
    parentContact: '+1-555-0114',
    admissionDate: '2023-08-15',
    status: 'Active',
    gpa: 3.9,
    // Enhanced profile fields
    idNumber: 'STU007',
    bloodType: 'O+',
    age: 20,
    homeAddress: '258 Birch Avenue, Hometown, State 54321',
    presentAddress: '147 Birch Street, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Programming Fundamentals', 'Mathematics I'],
    facultyMembers: ['Dr. Sarah Johnson', 'Dr. Robert Wilson'],
    emergencyContact: {
      name: 'Helen Lee',
      relationship: 'Mother',
      phone: '+1-555-0114'
    },
    medicalInfo: {
      allergies: [],
      medications: [],
      conditions: []
    }
  },
  {
    id: '8',
    name: 'Henry Brown',
    email: 'henry.brown@college.edu',
    phone: '+1-555-0115',
    rollNumber: 'ME21004',
    department: 'Mechanical Engineering',
    semester: 3,
    dateOfBirth: '2002-08-17',
    address: '258 Willow Way, University City, State 12345',
    parentContact: '+1-555-0116',
    admissionDate: '2021-08-15',
    status: 'Active',
    gpa: 3.2,
    // Enhanced profile fields
    idNumber: 'STU008',
    bloodType: 'A+',
    age: 22,
    homeAddress: '369 Willow Street, Hometown, State 54321',
    presentAddress: '258 Willow Way, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Engineering Mechanics', 'Thermodynamics', 'Materials Science'],
    facultyMembers: ['Dr. Emily Davis', 'Dr. Robert Wilson'],
    emergencyContact: {
      name: 'Patricia Brown',
      relationship: 'Mother',
      phone: '+1-555-0116'
    },
    medicalInfo: {
      allergies: ['Penicillin'],
      medications: [],
      conditions: []
    }
  },
  {
    id: '9',
    name: 'Isabella Garcia',
    email: 'isabella.garcia@college.edu',
    phone: '+1-555-0117',
    rollNumber: 'CHE22001',
    department: 'Chemical Engineering',
    semester: 4,
    dateOfBirth: '2002-04-25',
    address: '369 Spruce Court, University City, State 12345',
    parentContact: '+1-555-0118',
    admissionDate: '2022-08-15',
    status: 'Active',
    gpa: 3.7,
    // Enhanced profile fields
    idNumber: 'STU009',
    bloodType: 'B+',
    age: 22,
    homeAddress: '741 Spruce Avenue, Hometown, State 54321',
    presentAddress: '369 Spruce Court, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Chemical Process Principles', 'Organic Chemistry', 'Thermodynamics'],
    facultyMembers: ['Dr. Maria Rodriguez', 'Dr. Emily Davis'],
    emergencyContact: {
      name: 'Carlos Garcia',
      relationship: 'Father',
      phone: '+1-555-0118'
    },
    medicalInfo: {
      allergies: [],
      medications: [],
      conditions: []
    }
  },
  {
    id: '10',
    name: 'Jack Anderson',
    email: 'jack.anderson@college.edu',
    phone: '+1-555-0119',
    rollNumber: 'CS19001',
    department: 'Computer Science',
    semester: 8,
    dateOfBirth: '2001-01-30',
    address: '741 Aspen Avenue, University City, State 12345',
    parentContact: '+1-555-0120',
    admissionDate: '2019-08-15',
    status: 'Graduated',
    gpa: 3.8,
    // Enhanced profile fields
    idNumber: 'STU010',
    bloodType: 'AB-',
    age: 23,
    homeAddress: '852 Aspen Street, Hometown, State 54321',
    presentAddress: '741 Aspen Avenue, University City, State 12345',
    country: 'United States',
    subjectsTaken: ['Data Structures', 'Algorithms', 'Software Engineering', 'Machine Learning', 'Capstone Project'],
    facultyMembers: ['Dr. Sarah Johnson', 'Dr. Kevin Zhang'],
    emergencyContact: {
      name: 'Nancy Anderson',
      relationship: 'Mother',
      phone: '+1-555-0120'
    },
    medicalInfo: {
      allergies: [],
      medications: [],
      conditions: []
    }
  }
];

export const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    phone: '+1-555-0201',
    employeeId: 'FAC001',
    department: 'Computer Science',
    designation: 'Professor',
    qualification: 'Ph.D. in Computer Science',
    experience: 12,
    subjects: ['Data Structures', 'Algorithms', 'Machine Learning'],
    joiningDate: '2012-01-15',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC001',
    bloodType: 'A+',
    age: 45,
    dateOfBirth: '1978-05-20',
    homeAddress: '123 Faculty Lane, University City, State 12345',
    presentAddress: '123 Faculty Lane, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Spouse',
      phone: '+1-555-0301'
    },
    researchInterests: ['Machine Learning', 'Data Mining', 'Artificial Intelligence'],
    publications: [
      { title: 'Advanced Machine Learning Techniques', year: 2023, journal: 'IEEE Transactions on AI' },
      { title: 'Data Mining in Educational Systems', year: 2022, journal: 'Journal of Educational Technology' }
    ],
    awards: [
      { title: 'Best Teacher Award', year: 2023, organization: 'University Excellence Committee' },
      { title: 'Research Excellence Award', year: 2022, organization: 'Computer Science Department' }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Brown',
    email: 'michael.brown@college.edu',
    phone: '+1-555-0202',
    employeeId: 'FAC002',
    department: 'Electrical Engineering',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Electrical Engineering',
    experience: 8,
    subjects: ['Circuit Analysis', 'Digital Systems', 'Power Electronics'],
    joiningDate: '2016-08-01',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC002',
    bloodType: 'B+',
    age: 40,
    dateOfBirth: '1983-11-15',
    homeAddress: '456 Professor Street, University City, State 12345',
    presentAddress: '456 Professor Street, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Lisa Brown',
      relationship: 'Spouse',
      phone: '+1-555-0302'
    },
    researchInterests: ['Power Electronics', 'Renewable Energy Systems', 'Smart Grids'],
    publications: [
      { title: 'Smart Grid Technologies', year: 2023, journal: 'IEEE Power Systems' },
      { title: 'Renewable Energy Integration', year: 2022, journal: 'Energy Systems Journal' }
    ],
    awards: [
      { title: 'Outstanding Faculty Award', year: 2022, organization: 'Engineering Department' }
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@college.edu',
    phone: '+1-555-0203',
    employeeId: 'FAC003',
    department: 'Mechanical Engineering',
    designation: 'Professor',
    qualification: 'Ph.D. in Mechanical Engineering',
    experience: 15,
    subjects: ['Thermodynamics', 'Fluid Mechanics', 'Heat Transfer'],
    joiningDate: '2009-01-10',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC003',
    bloodType: 'O+',
    age: 48,
    dateOfBirth: '1975-08-30',
    homeAddress: '789 Academic Drive, University City, State 12345',
    presentAddress: '789 Academic Drive, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'David Davis',
      relationship: 'Spouse',
      phone: '+1-555-0303'
    },
    researchInterests: ['Thermal Systems', 'Energy Efficiency', 'Sustainable Engineering'],
    publications: [
      { title: 'Advanced Thermodynamics Applications', year: 2023, journal: 'Mechanical Engineering Review' },
      { title: 'Energy Efficient Systems Design', year: 2022, journal: 'Energy Engineering' },
      { title: 'Sustainable Manufacturing Processes', year: 2021, journal: 'Green Technology' }
    ],
    awards: [
      { title: 'Distinguished Professor Award', year: 2023, organization: 'University Board' },
      { title: 'Research Excellence in Engineering', year: 2021, organization: 'Engineering Society' }
    ]
  },
  {
    id: '4',
    name: 'Dr. Robert Wilson',
    email: 'robert.wilson@college.edu',
    phone: '+1-555-0204',
    employeeId: 'FAC004',
    department: 'Mathematics',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Applied Mathematics',
    experience: 10,
    subjects: ['Calculus', 'Linear Algebra', 'Discrete Mathematics'],
    joiningDate: '2014-03-20',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC004',
    bloodType: 'A-',
    age: 42,
    dateOfBirth: '1981-12-10',
    homeAddress: '321 Scholar Way, University City, State 12345',
    presentAddress: '321 Scholar Way, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Jennifer Wilson',
      relationship: 'Spouse',
      phone: '+1-555-0304'
    },
    researchInterests: ['Applied Mathematics', 'Numerical Analysis', 'Mathematical Modeling'],
    publications: [
      { title: 'Numerical Methods in Engineering', year: 2023, journal: 'Applied Mathematics Quarterly' },
      { title: 'Mathematical Modeling Techniques', year: 2022, journal: 'Mathematics in Science' }
    ],
    awards: [
      { title: 'Excellence in Teaching Mathematics', year: 2022, organization: 'Mathematics Department' }
    ]
  },
  {
    id: '5',
    name: 'Prof. Lisa Anderson',
    email: 'lisa.anderson@college.edu',
    phone: '+1-555-0205',
    employeeId: 'FAC005',
    department: 'English',
    designation: 'Assistant Professor',
    qualification: 'M.A. in English Literature',
    experience: 6,
    subjects: ['Technical Writing', 'Communication Skills', 'Literature'],
    joiningDate: '2018-07-15',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC005',
    bloodType: 'B-',
    age: 35,
    dateOfBirth: '1988-04-25',
    homeAddress: '654 Literature Lane, University City, State 12345',
    presentAddress: '654 Literature Lane, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Mark Anderson',
      relationship: 'Spouse',
      phone: '+1-555-0305'
    },
    researchInterests: ['Technical Communication', 'Digital Literacy', 'Academic Writing'],
    publications: [
      { title: 'Effective Technical Communication', year: 2023, journal: 'Communication Studies' },
      { title: 'Digital Age Writing Skills', year: 2022, journal: 'Educational Technology' }
    ],
    awards: [
      { title: 'Innovative Teaching Award', year: 2023, organization: 'English Department' }
    ]
  },
  {
    id: '6',
    name: 'Dr. James Taylor',
    email: 'james.taylor@college.edu',
    phone: '+1-555-0206',
    employeeId: 'FAC006',
    department: 'Physics',
    designation: 'Professor',
    qualification: 'Ph.D. in Physics',
    experience: 18,
    subjects: ['Classical Mechanics', 'Quantum Physics', 'Electromagnetism'],
    joiningDate: '2006-09-01',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC006',
    bloodType: 'AB+',
    age: 52,
    dateOfBirth: '1971-07-18',
    homeAddress: '987 Physics Plaza, University City, State 12345',
    presentAddress: '987 Physics Plaza, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Susan Taylor',
      relationship: 'Spouse',
      phone: '+1-555-0306'
    },
    researchInterests: ['Quantum Mechanics', 'Theoretical Physics', 'Particle Physics'],
    publications: [
      { title: 'Quantum Mechanics in Modern Physics', year: 2023, journal: 'Physical Review' },
      { title: 'Advanced Electromagnetic Theory', year: 2022, journal: 'Physics Today' },
      { title: 'Particle Physics Fundamentals', year: 2021, journal: 'Journal of Physics' }
    ],
    awards: [
      { title: 'Lifetime Achievement in Physics', year: 2023, organization: 'Physics Society' },
      { title: 'Distinguished Researcher Award', year: 2020, organization: 'University Research Committee' }
    ]
  },
  {
    id: '7',
    name: 'Dr. Maria Rodriguez',
    email: 'maria.rodriguez@college.edu',
    phone: '+1-555-0207',
    employeeId: 'FAC007',
    department: 'Chemistry',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Organic Chemistry',
    experience: 9,
    subjects: ['Organic Chemistry', 'Analytical Chemistry', 'Biochemistry'],
    joiningDate: '2015-01-12',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC007',
    bloodType: 'O-',
    age: 41,
    dateOfBirth: '1982-09-05',
    homeAddress: '147 Chemistry Circle, University City, State 12345',
    presentAddress: '147 Chemistry Circle, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Carlos Rodriguez',
      relationship: 'Spouse',
      phone: '+1-555-0307'
    },
    researchInterests: ['Organic Synthesis', 'Green Chemistry', 'Pharmaceutical Chemistry'],
    publications: [
      { title: 'Green Chemistry Applications', year: 2023, journal: 'Green Chemistry Letters' },
      { title: 'Organic Synthesis Methods', year: 2022, journal: 'Organic Chemistry Review' }
    ],
    awards: [
      { title: 'Green Chemistry Innovation Award', year: 2022, organization: 'Chemistry Department' }
    ]
  },
  {
    id: '8',
    name: 'Dr. Kevin Zhang',
    email: 'kevin.zhang@college.edu',
    phone: '+1-555-0208',
    employeeId: 'FAC008',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. in Artificial Intelligence',
    experience: 4,
    subjects: ['Artificial Intelligence', 'Neural Networks', 'Computer Vision'],
    joiningDate: '2020-08-25',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC008',
    bloodType: 'A+',
    age: 33,
    dateOfBirth: '1990-03-12',
    homeAddress: '258 Innovation Street, University City, State 12345',
    presentAddress: '258 Innovation Street, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Amy Zhang',
      relationship: 'Spouse',
      phone: '+1-555-0308'
    },
    researchInterests: ['Deep Learning', 'Computer Vision', 'Natural Language Processing'],
    publications: [
      { title: 'Deep Learning in Computer Vision', year: 2023, journal: 'AI Research Quarterly' },
      { title: 'Neural Network Architectures', year: 2022, journal: 'Machine Learning Today' }
    ],
    awards: [
      { title: 'Young Researcher Award', year: 2023, organization: 'AI Research Society' }
    ]
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    credits: 4,
    department: 'Computer Science',
    semester: 3,
    instructor: 'Dr. Sarah Johnson',
    schedule: [
      { day: 'Monday', time: '10:00 AM - 11:30 AM', room: 'CS Lab 1' },
      { day: 'Wednesday', time: '10:00 AM - 11:30 AM', room: 'CS Lab 1' },
      { day: 'Friday', time: '2:00 PM - 3:30 PM', room: 'Room 201' }
    ],
    description: 'Introduction to fundamental data structures and algorithms',
    prerequisites: ['Programming Fundamentals', 'Discrete Mathematics'],
    maxStudents: 60,
    enrolledStudents: 45
  },
  {
    id: '2',
    name: 'Circuit Analysis',
    code: 'EE201',
    credits: 3,
    department: 'Electrical Engineering',
    semester: 2,
    instructor: 'Dr. Michael Brown',
    schedule: [
      { day: 'Tuesday', time: '9:00 AM - 10:30 AM', room: 'EE Lab 1' },
      { day: 'Thursday', time: '9:00 AM - 10:30 AM', room: 'EE Lab 1' }
    ],
    description: 'Analysis of electrical circuits using various techniques',
    prerequisites: ['Physics I', 'Calculus I'],
    maxStudents: 40,
    enrolledStudents: 35
  },
  {
    id: '3',
    name: 'Thermodynamics',
    code: 'ME301',
    credits: 4,
    department: 'Mechanical Engineering',
    semester: 3,
    instructor: 'Dr. Emily Davis',
    schedule: [
      { day: 'Monday', time: '2:00 PM - 3:30 PM', room: 'ME Lab 1' },
      { day: 'Wednesday', time: '2:00 PM - 3:30 PM', room: 'ME Lab 1' },
      { day: 'Friday', time: '10:00 AM - 11:30 AM', room: 'Room 301' }
    ],
    description: 'Principles of thermodynamics and their applications',
    prerequisites: ['Physics I', 'Calculus II'],
    maxStudents: 50,
    enrolledStudents: 42
  },
  {
    id: '4',
    name: 'Machine Learning',
    code: 'CS501',
    credits: 3,
    department: 'Computer Science',
    semester: 5,
    instructor: 'Dr. Kevin Zhang',
    schedule: [
      { day: 'Monday', time: '3:30 PM - 5:00 PM', room: 'CS Lab 2' },
      { day: 'Wednesday', time: '3:30 PM - 5:00 PM', room: 'CS Lab 2' }
    ],
    description: 'Introduction to machine learning algorithms and applications',
    prerequisites: ['Data Structures', 'Statistics', 'Linear Algebra'],
    maxStudents: 30,
    enrolledStudents: 25
  },
  {
    id: '5',
    name: 'Digital Systems',
    code: 'EE301',
    credits: 4,
    department: 'Electrical Engineering',
    semester: 3,
    instructor: 'Dr. Michael Brown',
    schedule: [
      { day: 'Tuesday', time: '2:00 PM - 3:30 PM', room: 'EE Lab 2' },
      { day: 'Thursday', time: '2:00 PM - 3:30 PM', room: 'EE Lab 2' },
      { day: 'Friday', time: '11:00 AM - 12:30 PM', room: 'Room 302' }
    ],
    description: 'Design and analysis of digital systems and circuits',
    prerequisites: ['Circuit Analysis', 'Boolean Algebra'],
    maxStudents: 45,
    enrolledStudents: 38
  },
  {
    id: '6',
    name: 'Fluid Mechanics',
    code: 'ME401',
    credits: 3,
    department: 'Mechanical Engineering',
    semester: 4,
    instructor: 'Dr. Emily Davis',
    schedule: [
      { day: 'Tuesday', time: '11:00 AM - 12:30 PM', room: 'ME Lab 2' },
      { day: 'Thursday', time: '11:00 AM - 12:30 PM', room: 'ME Lab 2' }
    ],
    description: 'Study of fluid behavior and applications in engineering',
    prerequisites: ['Thermodynamics', 'Calculus III'],
    maxStudents: 35,
    enrolledStudents: 28
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    description: 'Department of Computer Science and Engineering focusing on software development, algorithms, and emerging technologies.',
    head: 'Dr. Sarah Johnson',
    establishedYear: 1995,
    totalStudents: 245,
    totalFaculty: 18,
    totalCourses: 42,
    building: 'Technology Building A',
    contactEmail: 'cs@college.edu',
    contactPhone: '+1-555-0301',
    status: 'Active',
    subjects: [
      {
        id: 'cs1',
        name: 'Programming Fundamentals',
        code: 'CS101',
        credits: 4,
        semester: 1,
        type: 'Core',
        description: 'Introduction to programming concepts and problem-solving techniques',
        prerequisites: [],
        status: 'Active'
      },
      {
        id: 'cs2',
        name: 'Data Structures',
        code: 'CS201',
        credits: 4,
        semester: 2,
        type: 'Core',
        description: 'Fundamental data structures and their applications',
        prerequisites: ['CS101'],
        status: 'Active'
      },
      {
        id: 'cs3',
        name: 'Algorithms',
        code: 'CS301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Design and analysis of algorithms',
        prerequisites: ['CS201'],
        status: 'Active'
      },
      {
        id: 'cs4',
        name: 'Database Systems',
        code: 'CS302',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Database design, implementation, and management',
        prerequisites: ['CS201'],
        status: 'Active'
      },
      {
        id: 'cs5',
        name: 'Machine Learning',
        code: 'CS501',
        credits: 3,
        semester: 5,
        type: 'Elective',
        description: 'Introduction to machine learning algorithms and applications',
        prerequisites: ['CS301', 'MATH201'],
        status: 'Active'
      },
      {
        id: 'cs6',
        name: 'Computer Networks',
        code: 'CS401',
        credits: 3,
        semester: 4,
        type: 'Core',
        description: 'Network protocols, architecture, and security',
        prerequisites: ['CS201'],
        status: 'Active'
      }
    ]
  },
  {
    id: '2',
    name: 'Electrical Engineering',
    code: 'EE',
    description: 'Department of Electrical Engineering specializing in electronics, power systems, and telecommunications.',
    head: 'Dr. Michael Brown',
    establishedYear: 1987,
    totalStudents: 189,
    totalFaculty: 15,
    totalCourses: 38,
    building: 'Engineering Complex B',
    contactEmail: 'ee@college.edu',
    contactPhone: '+1-555-0302',
    status: 'Active',
    subjects: [
      {
        id: 'ee1',
        name: 'Circuit Analysis',
        code: 'EE101',
        credits: 4,
        semester: 1,
        type: 'Core',
        description: 'Basic electrical circuit analysis and design',
        prerequisites: ['MATH101'],
        status: 'Active'
      },
      {
        id: 'ee2',
        name: 'Electronics',
        code: 'EE201',
        credits: 4,
        semester: 2,
        type: 'Core',
        description: 'Electronic devices and circuit design',
        prerequisites: ['EE101'],
        status: 'Active'
      },
      {
        id: 'ee3',
        name: 'Digital Systems',
        code: 'EE301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Digital logic design and computer architecture',
        prerequisites: ['EE201'],
        status: 'Active'
      },
      {
        id: 'ee4',
        name: 'Power Systems',
        code: 'EE401',
        credits: 3,
        semester: 4,
        type: 'Core',
        description: 'Power generation, transmission, and distribution',
        prerequisites: ['EE201'],
        status: 'Active'
      },
      {
        id: 'ee5',
        name: 'Control Systems',
        code: 'EE402',
        credits: 3,
        semester: 4,
        type: 'Elective',
        description: 'Automatic control systems design and analysis',
        prerequisites: ['EE301', 'MATH301'],
        status: 'Active'
      }
    ]
  },
  {
    id: '3',
    name: 'Mechanical Engineering',
    code: 'ME',
    description: 'Department of Mechanical Engineering covering thermodynamics, fluid mechanics, and manufacturing.',
    head: 'Dr. Emily Davis',
    establishedYear: 1982,
    totalStudents: 167,
    totalFaculty: 12,
    totalCourses: 35,
    building: 'Engineering Complex C',
    contactEmail: 'me@college.edu',
    contactPhone: '+1-555-0303',
    status: 'Active',
    subjects: [
      {
        id: 'me1',
        name: 'Engineering Mechanics',
        code: 'ME101',
        credits: 4,
        semester: 1,
        type: 'Core',
        description: 'Statics and dynamics of engineering systems',
        prerequisites: ['MATH101', 'PHYS101'],
        status: 'Active'
      },
      {
        id: 'me2',
        name: 'Thermodynamics',
        code: 'ME201',
        credits: 4,
        semester: 2,
        type: 'Core',
        description: 'Principles of thermodynamics and heat transfer',
        prerequisites: ['ME101'],
        status: 'Active'
      },
      {
        id: 'me3',
        name: 'Fluid Mechanics',
        code: 'ME301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Fluid statics, dynamics, and applications',
        prerequisites: ['ME201'],
        status: 'Active'
      },
      {
        id: 'me4',
        name: 'Manufacturing Processes',
        code: 'ME401',
        credits: 3,
        semester: 4,
        type: 'Core',
        description: 'Manufacturing techniques and process optimization',
        prerequisites: ['ME101'],
        status: 'Active'
      }
    ]
  },
  {
    id: '4',
    name: 'Civil Engineering',
    code: 'CE',
    description: 'Department of Civil Engineering focusing on infrastructure, construction, and environmental engineering.',
    head: 'Dr. Robert Chen',
    establishedYear: 1978,
    totalStudents: 134,
    totalFaculty: 10,
    totalCourses: 32,
    building: 'Engineering Complex D',
    contactEmail: 'ce@college.edu',
    contactPhone: '+1-555-0304',
    status: 'Active',
    subjects: [
      {
        id: 'ce1',
        name: 'Structural Analysis',
        code: 'CE101',
        credits: 4,
        semester: 1,
        type: 'Core',
        description: 'Analysis of structural systems and load calculations',
        prerequisites: ['MATH101', 'PHYS101'],
        status: 'Active'
      },
      {
        id: 'ce2',
        name: 'Concrete Technology',
        code: 'CE201',
        credits: 3,
        semester: 2,
        type: 'Core',
        description: 'Properties and applications of concrete materials',
        prerequisites: ['CE101'],
        status: 'Active'
      },
      {
        id: 'ce3',
        name: 'Transportation Engineering',
        code: 'CE301',
        credits: 3,
        semester: 3,
        type: 'Elective',
        description: 'Design and planning of transportation systems',
        prerequisites: ['CE101'],
        status: 'Active'
      }
    ]
  },
  {
    id: '5',
    name: 'Mathematics',
    code: 'MATH',
    description: 'Department of Mathematics providing foundational mathematical education and research.',
    head: 'Dr. Robert Wilson',
    establishedYear: 1975,
    totalStudents: 89,
    totalFaculty: 8,
    totalCourses: 28,
    building: 'Science Building A',
    contactEmail: 'math@college.edu',
    contactPhone: '+1-555-0305',
    status: 'Active',
    subjects: [
      {
        id: 'math1',
        name: 'Calculus I',
        code: 'MATH101',
        credits: 4,
        semester: 1,
        type: 'Core',
        description: 'Differential calculus and applications',
        prerequisites: [],
        status: 'Active'
      },
      {
        id: 'math2',
        name: 'Calculus II',
        code: 'MATH102',
        credits: 4,
        semester: 2,
        type: 'Core',
        description: 'Integral calculus and series',
        prerequisites: ['MATH101'],
        status: 'Active'
      },
      {
        id: 'math3',
        name: 'Linear Algebra',
        code: 'MATH201',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Vector spaces, matrices, and linear transformations',
        prerequisites: ['MATH102'],
        status: 'Active'
      },
      {
        id: 'math4',
        name: 'Discrete Mathematics',
        code: 'MATH301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Logic, sets, combinatorics, and graph theory',
        prerequisites: ['MATH201'],
        status: 'Active'
      }
    ]
  }
];

export const mockSubjects: Subject[] = mockDepartments.flatMap(dept => dept.subjects);