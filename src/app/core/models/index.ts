// ── Job Model ──
export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
  experience: string;
  description: string;
  requirements: string[];
  postedDate: string;
  isActive: boolean;
}

// ── Application Model ──
export interface JobApplication {
  id: number;
  jobId: number;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeFileName: string;
  resumeData: string; // base64
  appliedDate: string;
  status: 'New' | 'Reviewed' | 'Shortlisted' | 'Interview' | 'Rejected' | 'Hired';
}

// ── Dashboard Stats ──
export interface DashboardStats {
  totalApplicants: number;
  openPositions: number;
  newApplications: number;
  shortlisted: number;
}

// ── Filter Options ──
export interface JobFilters {
  search: string;
  location: string;
  department: string;
  experience: string;
  type: string;
}

// ── Auth ──
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  name: string;
  role: string;
}
