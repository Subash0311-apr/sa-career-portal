import { Injectable, signal, computed } from '@angular/core';
import { JobApplication, DashboardStats } from '../core/models';
import { MOCK_APPLICATIONS } from '../core/data/mock-data';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private readonly applications = signal<JobApplication[]>(MOCK_APPLICATIONS);

  readonly allApplications = this.applications.asReadonly();

  readonly stats = computed<DashboardStats>(() => {
    const apps = this.applications();
    return {
      totalApplicants: apps.length,
      openPositions: new Set(apps.map(a => a.jobId)).size,
      newApplications: apps.filter(a => a.status === 'New').length,
      shortlisted: apps.filter(a => a.status === 'Shortlisted').length
    };
  });

  submitApplication(application: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>): void {
    const newApp: JobApplication = {
      ...application,
      id: this.applications().length + 1,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    this.applications.update(apps => [newApp, ...apps]);
  }

  updateStatus(id: number, status: JobApplication['status']): void {
    this.applications.update(apps =>
      apps.map(a => a.id === id ? { ...a, status } : a)
    );
  }

  getApplicationById(id: number): JobApplication | undefined {
    return this.applications().find(a => a.id === id);
  }

  getApplicationsByJob(jobId: number): JobApplication[] {
    return this.applications().filter(a => a.jobId === jobId);
  }
}
