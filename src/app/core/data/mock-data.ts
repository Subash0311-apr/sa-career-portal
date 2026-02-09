import { Job, JobApplication } from '../models';

// ── Mock Jobs ──
export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Senior PLC Programmer',
    department: 'Engineering',
    location: 'Chennai',
    type: 'Full-time',
    experience: '5-8 years',
    description: 'Design and implement PLC programs for industrial automation systems. Work with Siemens, Allen-Bradley, and Mitsubishi platforms.',
    requirements: ['PLC programming (Ladder, FBD, ST)', 'SCADA/HMI development', 'Industrial networking', 'AutoCAD Electrical'],
    postedDate: '2026-01-15',
    isActive: true
  },
  {
    id: 2,
    title: 'Angular Developer',
    department: 'Software',
    location: 'Chennai',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'Build modern, responsive web applications using Angular 16+ for internal tools and client-facing dashboards. Collaborate with the automation team to digitize plant operations.',
    requirements: ['Angular 16+', 'TypeScript', 'RxJS & Signals', 'REST API integration', 'Tailwind CSS / Angular Material'],
    postedDate: '2026-02-10',
    isActive: true
  },
  {
    id: 3,
    title: 'Automation Engineer',
    department: 'Engineering',
    location: 'Coimbatore',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'Develop and commission automated production lines. Integrate robotics, vision systems, and conveyor networks for manufacturing clients.',
    requirements: ['Industrial robotics', 'Machine vision', 'Electrical design', 'Project management', 'PLC troubleshooting'],
    postedDate: '2026-02-12',
    isActive: true
  },
  {
    id: 4,
    title: 'SCADA Developer',
    department: 'Software',
    location: 'Hyderabad',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'Build SCADA applications for monitoring and controlling industrial processes using Ignition and WinCC platforms.',
    requirements: ['Ignition SCADA', 'SQL databases', 'Python scripting', 'OPC UA/DA'],
    postedDate: '2026-01-25',
    isActive: true
  },
  {
    id: 5,
    title: 'Embedded Systems Intern',
    department: 'R&D',
    location: 'Chennai',
    type: 'Intern',
    experience: '0-1 years',
    description: 'Assist in developing firmware for IoT edge devices and industrial controllers. Learn embedded C and RTOS.',
    requirements: ['C/C++ basics', 'Microcontroller knowledge', 'Eagerness to learn', 'Currently pursuing B.E/B.Tech'],
    postedDate: '2026-02-01',
    isActive: true
  },
  {
    id: 6,
    title: 'Project Manager',
    department: 'Management',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '8-12 years',
    description: 'Lead cross-functional automation project teams. Manage timelines, budgets, and client relationships for large-scale industrial projects.',
    requirements: ['PMP certification preferred', 'Industrial automation background', 'Client management', 'Team leadership'],
    postedDate: '2026-02-03',
    isActive: true
  },
  {
    id: 7,
    title: 'Electrical Design Engineer',
    department: 'Engineering',
    location: 'Pune',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'Create electrical schematics, panel layouts, and wiring diagrams for automation systems using EPLAN and AutoCAD.',
    requirements: ['EPLAN P8', 'AutoCAD Electrical', 'Panel design', 'IEC standards'],
    postedDate: '2026-02-04',
    isActive: true
  },
  {
    id: 8,
    title: 'IoT Solutions Architect',
    department: 'Software',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '6-10 years',
    description: 'Architect cloud-connected IoT solutions for Industry 4.0. Design edge-to-cloud data pipelines and analytics dashboards.',
    requirements: ['Azure IoT / AWS IoT', 'MQTT/AMQP', 'Time-series databases', 'Docker/Kubernetes'],
    postedDate: '2026-02-06',
    isActive: true
  },
  {
    id: 9,
    title: 'HR Executive',
    department: 'Human Resources',
    location: 'Chennai',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'Manage recruitment, employee engagement, and HR operations. Support talent acquisition for engineering roles.',
    requirements: ['HR management', 'Recruitment experience', 'HRIS knowledge', 'Excellent communication'],
    postedDate: '2026-02-07',
    isActive: true
  },
  {
    id: 10,
    title: 'Field Service Technician',
    department: 'Service',
    location: 'Pan India',
    type: 'Contract',
    experience: '2-5 years',
    description: 'Provide on-site commissioning, maintenance, and troubleshooting support for automation systems across client facilities.',
    requirements: ['PLC troubleshooting', 'VFD/servo drives', 'Fieldbus networks', 'Willing to travel 70%'],
    postedDate: '2026-02-08',
    isActive: true
  },
  {
    id: 11,
    title: 'Full Stack Developer',
    department: 'Software',
    location: 'Hyderabad',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'Build web applications for internal tools and client dashboards. Angular frontend with Node.js/.NET backend.',
    requirements: ['Angular 16+', 'Node.js or .NET', 'SQL/NoSQL databases', 'REST API design'],
    postedDate: '2026-02-08',
    isActive: true
  },
  {
    id: 12,
    title: 'Quality Assurance Engineer',
    department: 'Quality',
    location: 'Coimbatore',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'Ensure quality of automation panels and systems. Conduct FAT/SAT testing and maintain quality documentation.',
    requirements: ['ISO 9001', 'Testing methodologies', 'Documentation skills', 'Attention to detail'],
    postedDate: '2026-02-09',
    isActive: true
  }
];

// ── Shared resume PDF path (mock — all candidates point to same demo PDF) ──
export const RESUME_PDF_URL = 'assets/pdf/Subash_D_Resume.pdf';

// ── Mock Applications ──
export const MOCK_APPLICATIONS: JobApplication[] = [
  {
    id: 1,
    jobId: 2,
    jobTitle: 'Angular Developer',
    fullName: 'Ravi Kumar',
    email: 'ravi.kumar@email.com',
    phone: '+91 98765 43210',
    coverLetter: 'I have 4 years of hands-on experience with Angular 14–18, RxJS, NgRx, and building large-scale enterprise applications. I am excited about the opportunity to build modern web applications at Southern Automation.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-02-15',
    status: 'Shortlisted'
  },
  {
    id: 2,
    jobId: 3,
    jobTitle: 'Automation Engineer',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 87654 32109',
    coverLetter: 'Experienced automation engineer with 4 years of expertise in robotic cell integration, Siemens S7-1500, and vision system deployment for automotive manufacturing lines.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-02-16',
    status: 'Interview'
  },
  {
    id: 3,
    jobId: 1,
    jobTitle: 'Senior PLC Programmer',
    fullName: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 76543 21098',
    coverLetter: 'I have 6 years of experience in PLC programming with Siemens S7-1500 and Allen-Bradley ControlLogix platforms. Strong in structured text and industrial networking.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-01-20',
    status: 'Shortlisted'
  },
  {
    id: 4,
    jobId: 4,
    jobTitle: 'SCADA Developer',
    fullName: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    phone: '+91 65432 10987',
    coverLetter: 'SCADA developer with 4 years on Ignition platform. Strong SQL and Python scripting skills.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-02-01',
    status: 'New'
  },
  {
    id: 5,
    jobId: 5,
    jobTitle: 'Embedded Systems Intern',
    fullName: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91 54321 09876',
    coverLetter: 'Final year B.Tech student passionate about embedded systems and IoT. Built multiple Arduino and ESP32 projects.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-02-03',
    status: 'Reviewed'
  },
  {
    id: 6,
    jobId: 6,
    jobTitle: 'Project Manager',
    fullName: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 43210 98765',
    coverLetter: 'PMP-certified project manager with 10 years in industrial automation. Led projects worth ₹50Cr+.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-02-05',
    status: 'Shortlisted'
  },
  {
    id: 7,
    jobId: 8,
    jobTitle: 'IoT Solutions Architect',
    fullName: 'Deepak Menon',
    email: 'deepak.menon@email.com',
    phone: '+91 32109 87654',
    coverLetter: 'Experienced IoT architect with Azure IoT Hub and AWS IoT Core expertise. Built edge-to-cloud solutions for 3 manufacturing plants.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-02-06',
    status: 'New'
  },
  {
    id: 8,
    jobId: 11,
    jobTitle: 'Full Stack Developer',
    fullName: 'Ananya Iyer',
    email: 'ananya.iyer@email.com',
    phone: '+91 21098 76543',
    coverLetter: 'Angular and Node.js developer with 4 years building enterprise web applications. Passionate about clean code and performance.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-02-07',
    status: 'New'
  },
  {
    id: 9,
    jobId: 7,
    jobTitle: 'Electrical Design Engineer',
    fullName: 'Karthik Nair',
    email: 'karthik.nair@email.com',
    phone: '+91 10987 65432',
    coverLetter: 'EPLAN P8 expert with 3 years experience designing automation panels for automotive industry.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-02-08',
    status: 'Reviewed'
  },
  {
    id: 10,
    jobId: 2,
    jobTitle: 'Angular Developer',
    fullName: 'Meera Krishnan',
    email: 'meera.krishnan@email.com',
    phone: '+91 99887 76655',
    coverLetter: 'Frontend developer with 3 years of Angular experience. Skilled in TypeScript, Angular Material, and responsive design. Eager to contribute to SA\'s digital transformation.',
    resumeFileName: 'Subash_D_Resume.pdf',
    resumeData: RESUME_PDF_URL,
    appliedDate: '2026-02-18',
    status: 'New'
  }
];

// ── Unique filter values derived from data ──
export const LOCATIONS = [...new Set(MOCK_JOBS.map(j => j.location))].sort();
export const DEPARTMENTS = [...new Set(MOCK_JOBS.map(j => j.department))].sort();
export const EXPERIENCE_LEVELS = [...new Set(MOCK_JOBS.map(j => j.experience))].sort();
export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Intern'];
