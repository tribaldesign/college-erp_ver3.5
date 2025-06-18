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
    rollNumber: 'PS21002',
    department: 'Political Science',
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
    subjectsTaken: ['Political Theory', 'International Relations', 'Comparative Politics', 'Public Administration'],
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
    rollNumber: 'EN20001',
    department: 'English',
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
    subjectsTaken: ['English Literature', 'Creative Writing', 'Linguistics', 'American Literature'],
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
    rollNumber: 'HI22001',
    department: 'History',
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
    subjectsTaken: ['World History', 'American History', 'Historical Research Methods'],
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
    rollNumber: 'ED21003',
    department: 'Education',
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
    subjectsTaken: ['Educational Psychology', 'Curriculum Development', 'Teaching Methods', 'Child Development'],
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
    rollNumber: 'SO20002',
    department: 'Sociology',
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
    subjectsTaken: ['Social Theory', 'Research Methods', 'Urban Sociology', 'Social Psychology'],
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
    rollNumber: 'EC23001',
    department: 'Economics',
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
    subjectsTaken: ['Microeconomics', 'Mathematics for Economics'],
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
    rollNumber: 'GE21004',
    department: 'Geography',
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
    subjectsTaken: ['Physical Geography', 'Human Geography', 'Cartography'],
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
    rollNumber: 'CS22001',
    department: 'Computer Science',
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
    subjectsTaken: ['Programming Fundamentals', 'Data Structures', 'Web Development'],
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
    rollNumber: 'PS19001',
    department: 'Political Science',
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
    subjectsTaken: ['Political Theory', 'International Relations', 'Public Policy', 'Comparative Politics', 'Capstone Project'],
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
    department: 'Political Science',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Political Science',
    experience: 8,
    subjects: ['Political Theory', 'International Relations', 'Comparative Politics'],
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
    researchInterests: ['International Relations', 'Political Theory', 'Comparative Government'],
    publications: [
      { title: 'Modern Political Theory', year: 2023, journal: 'Political Science Quarterly' },
      { title: 'International Relations in the 21st Century', year: 2022, journal: 'Foreign Affairs Review' }
    ],
    awards: [
      { title: 'Outstanding Faculty Award', year: 2022, organization: 'Political Science Department' }
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@college.edu',
    phone: '+1-555-0203',
    employeeId: 'FAC003',
    department: 'English',
    designation: 'Professor',
    qualification: 'Ph.D. in English Literature',
    experience: 15,
    subjects: ['English Literature', 'Creative Writing', 'American Literature'],
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
    researchInterests: ['Modern Literature', 'Creative Writing', 'Literary Criticism'],
    publications: [
      { title: 'Contemporary American Literature', year: 2023, journal: 'Literary Review' },
      { title: 'Creative Writing in the Digital Age', year: 2022, journal: 'Writing Studies' },
      { title: 'Narrative Techniques in Modern Fiction', year: 2021, journal: 'Literature Today' }
    ],
    awards: [
      { title: 'Distinguished Professor Award', year: 2023, organization: 'University Board' },
      { title: 'Excellence in Literature Teaching', year: 2021, organization: 'English Department' }
    ]
  },
  {
    id: '4',
    name: 'Dr. Robert Wilson',
    email: 'robert.wilson@college.edu',
    phone: '+1-555-0204',
    employeeId: 'FAC004',
    department: 'History',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in History',
    experience: 10,
    subjects: ['World History', 'American History', 'Historical Research Methods'],
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
    researchInterests: ['American History', 'Social History', 'Historical Methodology'],
    publications: [
      { title: 'Social Movements in American History', year: 2023, journal: 'Historical Studies' },
      { title: 'Research Methods in Historical Analysis', year: 2022, journal: 'History and Method' }
    ],
    awards: [
      { title: 'Excellence in Teaching History', year: 2022, organization: 'History Department' }
    ]
  },
  {
    id: '5',
    name: 'Prof. Lisa Anderson',
    email: 'lisa.anderson@college.edu',
    phone: '+1-555-0205',
    employeeId: 'FAC005',
    department: 'Education',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. in Education',
    experience: 6,
    subjects: ['Educational Psychology', 'Curriculum Development', 'Teaching Methods'],
    joiningDate: '2018-07-15',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC005',
    bloodType: 'B-',
    age: 35,
    dateOfBirth: '1988-04-25',
    homeAddress: '654 Education Lane, University City, State 12345',
    presentAddress: '654 Education Lane, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Mark Anderson',
      relationship: 'Spouse',
      phone: '+1-555-0305'
    },
    researchInterests: ['Educational Psychology', 'Learning Theory', 'Curriculum Design'],
    publications: [
      { title: 'Modern Teaching Methods', year: 2023, journal: 'Education Today' },
      { title: 'Psychology in the Classroom', year: 2022, journal: 'Educational Psychology Review' }
    ],
    awards: [
      { title: 'Innovative Teaching Award', year: 2023, organization: 'Education Department' }
    ]
  },
  {
    id: '6',
    name: 'Dr. James Taylor',
    email: 'james.taylor@college.edu',
    phone: '+1-555-0206',
    employeeId: 'FAC006',
    department: 'Sociology',
    designation: 'Professor',
    qualification: 'Ph.D. in Sociology',
    experience: 18,
    subjects: ['Social Theory', 'Research Methods', 'Urban Sociology'],
    joiningDate: '2006-09-01',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC006',
    bloodType: 'AB+',
    age: 52,
    dateOfBirth: '1971-07-18',
    homeAddress: '987 Sociology Plaza, University City, State 12345',
    presentAddress: '987 Sociology Plaza, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Susan Taylor',
      relationship: 'Spouse',
      phone: '+1-555-0306'
    },
    researchInterests: ['Social Theory', 'Urban Studies', 'Social Research Methods'],
    publications: [
      { title: 'Contemporary Social Theory', year: 2023, journal: 'Sociological Review' },
      { title: 'Urban Sociology in the Modern Era', year: 2022, journal: 'Urban Studies' },
      { title: 'Research Methods in Social Science', year: 2021, journal: 'Methodology Today' }
    ],
    awards: [
      { title: 'Lifetime Achievement in Sociology', year: 2023, organization: 'Sociology Society' },
      { title: 'Distinguished Researcher Award', year: 2020, organization: 'University Research Committee' }
    ]
  },
  {
    id: '7',
    name: 'Dr. Maria Rodriguez',
    email: 'maria.rodriguez@college.edu',
    phone: '+1-555-0207',
    employeeId: 'FAC007',
    department: 'Economics',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Economics',
    experience: 9,
    subjects: ['Microeconomics', 'Macroeconomics', 'Economic Theory'],
    joiningDate: '2015-01-12',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC007',
    bloodType: 'O-',
    age: 41,
    dateOfBirth: '1982-09-05',
    homeAddress: '147 Economics Circle, University City, State 12345',
    presentAddress: '147 Economics Circle, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Carlos Rodriguez',
      relationship: 'Spouse',
      phone: '+1-555-0307'
    },
    researchInterests: ['Economic Theory', 'Development Economics', 'Behavioral Economics'],
    publications: [
      { title: 'Modern Economic Theory', year: 2023, journal: 'Economic Review' },
      { title: 'Behavioral Economics Applications', year: 2022, journal: 'Economics Today' }
    ],
    awards: [
      { title: 'Economics Research Award', year: 2022, organization: 'Economics Department' }
    ]
  },
  {
    id: '8',
    name: 'Dr. Kevin Zhang',
    email: 'kevin.zhang@college.edu',
    phone: '+1-555-0208',
    employeeId: 'FAC008',
    department: 'Geography',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. in Geography',
    experience: 4,
    subjects: ['Physical Geography', 'Human Geography', 'Geographic Information Systems'],
    joiningDate: '2020-08-25',
    status: 'Active',
    // Enhanced profile fields
    idNumber: 'FAC008',
    bloodType: 'A+',
    age: 33,
    dateOfBirth: '1990-03-12',
    homeAddress: '258 Geography Street, University City, State 12345',
    presentAddress: '258 Geography Street, University City, State 12345',
    country: 'United States',
    emergencyContact: {
      name: 'Amy Zhang',
      relationship: 'Spouse',
      phone: '+1-555-0308'
    },
    researchInterests: ['Geographic Information Systems', 'Environmental Geography', 'Spatial Analysis'],
    publications: [
      { title: 'GIS Applications in Environmental Studies', year: 2023, journal: 'Geography Today' },
      { title: 'Spatial Analysis Methods', year: 2022, journal: 'Geographic Research' }
    ],
    awards: [
      { title: 'Young Researcher Award', year: 2023, organization: 'Geography Research Society' }
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
    name: 'Political Theory',
    code: 'PS201',
    credits: 3,
    department: 'Political Science',
    semester: 2,
    instructor: 'Dr. Michael Brown',
    schedule: [
      { day: 'Tuesday', time: '9:00 AM - 10:30 AM', room: 'Room 301' },
      { day: 'Thursday', time: '9:00 AM - 10:30 AM', room: 'Room 301' }
    ],
    description: 'Introduction to major political theories and concepts',
    prerequisites: ['Introduction to Political Science'],
    maxStudents: 40,
    enrolledStudents: 35
  },
  {
    id: '3',
    name: 'English Literature',
    code: 'EN301',
    credits: 4,
    department: 'English',
    semester: 3,
    instructor: 'Dr. Emily Davis',
    schedule: [
      { day: 'Monday', time: '2:00 PM - 3:30 PM', room: 'Literature Hall' },
      { day: 'Wednesday', time: '2:00 PM - 3:30 PM', room: 'Literature Hall' },
      { day: 'Friday', time: '10:00 AM - 11:30 AM', room: 'Room 401' }
    ],
    description: 'Survey of English literature from medieval to modern times',
    prerequisites: ['Introduction to Literature'],
    maxStudents: 50,
    enrolledStudents: 42
  },
  {
    id: '4',
    name: 'World History',
    code: 'HI501',
    credits: 3,
    department: 'History',
    semester: 5,
    instructor: 'Dr. Robert Wilson',
    schedule: [
      { day: 'Monday', time: '3:30 PM - 5:00 PM', room: 'History Hall' },
      { day: 'Wednesday', time: '3:30 PM - 5:00 PM', room: 'History Hall' }
    ],
    description: 'Comprehensive study of world civilizations and their development',
    prerequisites: ['Introduction to History', 'Research Methods'],
    maxStudents: 30,
    enrolledStudents: 25
  },
  {
    id: '5',
    name: 'Educational Psychology',
    code: 'ED301',
    credits: 4,
    department: 'Education',
    semester: 3,
    instructor: 'Prof. Lisa Anderson',
    schedule: [
      { day: 'Tuesday', time: '2:00 PM - 3:30 PM', room: 'Education Building' },
      { day: 'Thursday', time: '2:00 PM - 3:30 PM', room: 'Education Building' },
      { day: 'Friday', time: '11:00 AM - 12:30 PM', room: 'Room 302' }
    ],
    description: 'Psychological principles applied to teaching and learning',
    prerequisites: ['Introduction to Psychology', 'Introduction to Education'],
    maxStudents: 45,
    enrolledStudents: 38
  },
  {
    id: '6',
    name: 'Social Theory',
    code: 'SO401',
    credits: 3,
    department: 'Sociology',
    semester: 4,
    instructor: 'Dr. James Taylor',
    schedule: [
      { day: 'Tuesday', time: '11:00 AM - 12:30 PM', room: 'Social Sciences Building' },
      { day: 'Thursday', time: '11:00 AM - 12:30 PM', room: 'Social Sciences Building' }
    ],
    description: 'Major sociological theories and their contemporary applications',
    prerequisites: ['Introduction to Sociology', 'Research Methods'],
    maxStudents: 35,
    enrolledStudents: 28
  },
  {
    id: '7',
    name: 'Microeconomics',
    code: 'EC201',
    credits: 3,
    department: 'Economics',
    semester: 2,
    instructor: 'Dr. Maria Rodriguez',
    schedule: [
      { day: 'Monday', time: '9:00 AM - 10:30 AM', room: 'Economics Hall' },
      { day: 'Wednesday', time: '9:00 AM - 10:30 AM', room: 'Economics Hall' }
    ],
    description: 'Principles of microeconomic theory and market analysis',
    prerequisites: ['Mathematics for Economics'],
    maxStudents: 50,
    enrolledStudents: 45
  },
  {
    id: '8',
    name: 'Physical Geography',
    code: 'GE301',
    credits: 4,
    department: 'Geography',
    semester: 3,
    instructor: 'Dr. Kevin Zhang',
    schedule: [
      { day: 'Tuesday', time: '10:00 AM - 11:30 AM', room: 'Geography Lab' },
      { day: 'Thursday', time: '10:00 AM - 11:30 AM', room: 'Geography Lab' },
      { day: 'Friday', time: '2:00 PM - 3:30 PM', room: 'Room 501' }
    ],
    description: 'Study of Earth\'s physical systems and processes',
    prerequisites: ['Introduction to Geography'],
    maxStudents: 40,
    enrolledStudents: 32
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    description: 'Department of Computer Science focusing on software development, algorithms, and emerging technologies.',
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
        prerequisites: ['CS301'],
        status: 'Active'
      }
    ]
  },
  {
    id: '2',
    name: 'Political Science',
    code: 'PS',
    description: 'Department of Political Science specializing in political theory, international relations, and public administration.',
    head: 'Dr. Michael Brown',
    establishedYear: 1987,
    totalStudents: 189,
    totalFaculty: 15,
    totalCourses: 38,
    building: 'Social Sciences Building',
    contactEmail: 'ps@college.edu',
    contactPhone: '+1-555-0302',
    status: 'Active',
    subjects: [
      {
        id: 'ps1',
        name: 'Introduction to Political Science',
        code: 'PS101',
        credits: 3,
        semester: 1,
        type: 'Core',
        description: 'Basic concepts and principles of political science',
        prerequisites: [],
        status: 'Active'
      },
      {
        id: 'ps2',
        name: 'Political Theory',
        code: 'PS201',
        credits: 3,
        semester: 2,
        type: 'Core',
        description: 'Major political theories from ancient to modern times',
        prerequisites: ['PS101'],
        status: 'Active'
      },
      {
        id: 'ps3',
        name: 'International Relations',
        code: 'PS301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Study of international politics and diplomacy',
        prerequisites: ['PS201'],
        status: 'Active'
      },
      {
        id: 'ps4',
        name: 'Comparative Politics',
        code: 'PS401',
        credits: 3,
        semester: 4,
        type: 'Core',
        description: 'Comparative analysis of political systems',
        prerequisites: ['PS201'],
        status: 'Active'
      }
    ]
  },
  {
    id: '3',
    name: 'English',
    code: 'EN',
    description: 'Department of English covering literature, creative writing, and language studies.',
    head: 'Dr. Emily Davis',
    establishedYear: 1982,
    totalStudents: 167,
    totalFaculty: 12,
    totalCourses: 35,
    building: 'Humanities Building',
    contactEmail: 'english@college.edu',
    contactPhone: '+1-555-0303',
    status: 'Active',
    subjects: [
      {
        id: 'en1',
        name: 'Introduction to Literature',
        code: 'EN101',
        credits: 3,
        semester: 1,
        type: 'Core',
        description: 'Introduction to literary analysis and major works',
        prerequisites: [],
        status: 'Active'
      },
      {
        id: 'en2',
        name: 'English Literature',
        code: 'EN201',
        credits: 4,
        semester: 2,
        type: 'Core',
        description: 'Survey of English literature from medieval to modern',
        prerequisites: ['EN101'],
        status: 'Active'
      },
      {
        id: 'en3',
        name: 'Creative Writing',
        code: 'EN301',
        credits: 3,
        semester: 3,
        type: 'Elective',
        description: 'Workshop in creative writing techniques',
        prerequisites: ['EN201'],
        status: 'Active'
      },
      {
        id: 'en4',
        name: 'American Literature',
        code: 'EN401',
        credits: 3,
        semester: 4,
        type: 'Core',
        description: 'Survey of American literature and authors',
        prerequisites: ['EN201'],
        status: 'Active'
      }
    ]
  },
  {
    id: '4',
    name: 'History',
    code: 'HI',
    description: 'Department of History focusing on world history, American history, and historical research methods.',
    head: 'Dr. Robert Wilson',
    establishedYear: 1978,
    totalStudents: 134,
    totalFaculty: 10,
    totalCourses: 32,
    building: 'Humanities Building',
    contactEmail: 'history@college.edu',
    contactPhone: '+1-555-0304',
    status: 'Active',
    subjects: [
      {
        id: 'hi1',
        name: 'Introduction to History',
        code: 'HI101',
        credits: 3,
        semester: 1,
        type: 'Core',
        description: 'Introduction to historical thinking and methodology',
        prerequisites: [],
        status: 'Active'
      },
      {
        id: 'hi2',
        name: 'World History',
        code: 'HI201',
        credits: 4,
        semester: 2,
        type: 'Core',
        description: 'Survey of world civilizations and cultures',
        prerequisites: ['HI101'],
        status: 'Active'
      },
      {
        id: 'hi3',
        name: 'American History',
        code: 'HI301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'History of the United States from colonial times to present',
        prerequisites: ['HI201'],
        status: 'Active'
      }
    ]
  },
  {
    id: '5',
    name: 'Education',
    code: 'ED',
    description: 'Department of Education providing teacher preparation and educational research.',
    head: 'Prof. Lisa Anderson',
    establishedYear: 1975,
    totalStudents: 89,
    totalFaculty: 8,
    totalCourses: 28,
    building: 'Education Building',
    contactEmail: 'education@college.edu',
    contactPhone: '+1-555-0305',
    status: 'Active',
    subjects: [
      {
        id: 'ed1',
        name: 'Introduction to Education',
        code: 'ED101',
        credits: 3,
        semester: 1,
        type: 'Core',
        description: 'Foundations of education and teaching',
        prerequisites: [],
        status: 'Active'
      },
      {
        id: 'ed2',
        name: 'Educational Psychology',
        code: 'ED201',
        credits: 3,
        semester: 2,
        type: 'Core',
        description: 'Psychology applied to learning and teaching',
        prerequisites: ['ED101'],
        status: 'Active'
      },
      {
        id: 'ed3',
        name: 'Curriculum Development',
        code: 'ED301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Design and development of educational curricula',
        prerequisites: ['ED201'],
        status: 'Active'
      },
      {
        id: 'ed4',
        name: 'Teaching Methods',
        code: 'ED401',
        credits: 4,
        semester: 4,
        type: 'Core',
        description: 'Effective teaching strategies and classroom management',
        prerequisites: ['ED301'],
        status: 'Active'
      }
    ]
  },
  {
    id: '6',
    name: 'Sociology',
    code: 'SO',
    description: 'Department of Sociology studying social behavior, institutions, and social change.',
    head: 'Dr. James Taylor',
    establishedYear: 1985,
    totalStudents: 156,
    totalFaculty: 11,
    totalCourses: 30,
    building: 'Social Sciences Building',
    contactEmail: 'sociology@college.edu',
    contactPhone: '+1-555-0306',
    status: 'Active',
    subjects: [
      {
        id: 'so1',
        name: 'Introduction to Sociology',
        code: 'SO101',
        credits: 3,
        semester: 1,
        type: 'Core',
        description: 'Basic concepts and principles of sociology',
        prerequisites: [],
        status: 'Active'
      },
      {
        id: 'so2',
        name: 'Social Theory',
        code: 'SO201',
        credits: 3,
        semester: 2,
        type: 'Core',
        description: 'Major sociological theories and theorists',
        prerequisites: ['SO101'],
        status: 'Active'
      },
      {
        id: 'so3',
        name: 'Research Methods',
        code: 'SO301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Quantitative and qualitative research methods',
        prerequisites: ['SO201'],
        status: 'Active'
      },
      {
        id: 'so4',
        name: 'Urban Sociology',
        code: 'SO401',
        credits: 3,
        semester: 4,
        type: 'Elective',
        description: 'Study of urban communities and social issues',
        prerequisites: ['SO301'],
        status: 'Active'
      }
    ]
  },
  {
    id: '7',
    name: 'Economics',
    code: 'EC',
    description: 'Department of Economics covering microeconomics, macroeconomics, and economic theory.',
    head: 'Dr. Maria Rodriguez',
    establishedYear: 1990,
    totalStudents: 198,
    totalFaculty: 14,
    totalCourses: 36,
    building: 'Business Building',
    contactEmail: 'economics@college.edu',
    contactPhone: '+1-555-0307',
    status: 'Active',
    subjects: [
      {
        id: 'ec1',
        name: 'Introduction to Economics',
        code: 'EC101',
        credits: 3,
        semester: 1,
        type: 'Core',
        description: 'Basic economic principles and concepts',
        prerequisites: [],
        status: 'Active'
      },
      {
        id: 'ec2',
        name: 'Microeconomics',
        code: 'EC201',
        credits: 3,
        semester: 2,
        type: 'Core',
        description: 'Individual and firm economic behavior',
        prerequisites: ['EC101'],
        status: 'Active'
      },
      {
        id: 'ec3',
        name: 'Macroeconomics',
        code: 'EC301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'National and international economic systems',
        prerequisites: ['EC201'],
        status: 'Active'
      },
      {
        id: 'ec4',
        name: 'Economic Theory',
        code: 'EC401',
        credits: 4,
        semester: 4,
        type: 'Core',
        description: 'Advanced economic theory and applications',
        prerequisites: ['EC301'],
        status: 'Active'
      }
    ]
  },
  {
    id: '8',
    name: 'Geography',
    code: 'GE',
    description: 'Department of Geography studying physical and human geography, GIS, and environmental systems.',
    head: 'Dr. Kevin Zhang',
    establishedYear: 1988,
    totalStudents: 112,
    totalFaculty: 9,
    totalCourses: 25,
    building: 'Science Building',
    contactEmail: 'geography@college.edu',
    contactPhone: '+1-555-0308',
    status: 'Active',
    subjects: [
      {
        id: 'ge1',
        name: 'Introduction to Geography',
        code: 'GE101',
        credits: 3,
        semester: 1,
        type: 'Core',
        description: 'Basic concepts in physical and human geography',
        prerequisites: [],
        status: 'Active'
      },
      {
        id: 'ge2',
        name: 'Physical Geography',
        code: 'GE201',
        credits: 4,
        semester: 2,
        type: 'Core',
        description: 'Earth\'s physical systems and processes',
        prerequisites: ['GE101'],
        status: 'Active'
      },
      {
        id: 'ge3',
        name: 'Human Geography',
        code: 'GE301',
        credits: 3,
        semester: 3,
        type: 'Core',
        description: 'Human activities and their spatial patterns',
        prerequisites: ['GE201'],
        status: 'Active'
      },
      {
        id: 'ge4',
        name: 'Geographic Information Systems',
        code: 'GE401',
        credits: 4,
        semester: 4,
        type: 'Elective',
        description: 'GIS technology and spatial analysis',
        prerequisites: ['GE301'],
        status: 'Active'
      }
    ]
  }
];

export const mockSubjects: Subject[] = mockDepartments.flatMap(dept => dept.subjects);