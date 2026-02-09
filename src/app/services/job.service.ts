import { Injectable, signal, computed } from '@angular/core';
import { Job, JobFilters } from '../core/models';
import { MOCK_JOBS } from '../core/data/mock-data';

@Injectable({ providedIn: 'root' })
export class JobService {
  private readonly allJobs = signal<Job[]>(MOCK_JOBS);
  private readonly filters = signal<JobFilters>({
    search: '', location: '', department: '', experience: '', type: ''
  });
  private readonly currentPage = signal(1);
  readonly pageSize = 6;

  readonly filteredJobs = computed(() => {
    const f = this.filters();
    let jobs = this.allJobs().filter(j => j.isActive);

    if (f.search) {
      const q = f.search.toLowerCase();
      jobs = jobs.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    }
    if (f.location) jobs = jobs.filter(j => j.location === f.location);
    if (f.department) jobs = jobs.filter(j => j.department === f.department);
    if (f.experience) jobs = jobs.filter(j => j.experience === f.experience);
    if (f.type) jobs = jobs.filter(j => j.type === f.type);

    return jobs;
  });

  readonly paginatedJobs = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredJobs().slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.filteredJobs().length / this.pageSize)
  );

  readonly page = this.currentPage.asReadonly();

  updateFilters(f: Partial<JobFilters>): void {
    this.filters.update(prev => ({ ...prev, ...f }));
    this.currentPage.set(1);
  }

  resetFilters(): void {
    this.filters.set({ search: '', location: '', department: '', experience: '', type: '' });
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  getJobById(id: number): Job | undefined {
    return this.allJobs().find(j => j.id === id);
  }

  // HR: get all jobs including inactive
  getAllJobs(): Job[] {
    return this.allJobs();
  }

  addJob(job: Omit<Job, 'id'>): void {
    const newId = Math.max(...this.allJobs().map(j => j.id)) + 1;
    this.allJobs.update(jobs => [...jobs, { ...job, id: newId }]);
  }

  updateJob(updatedJob: Job): void {
    this.allJobs.update(jobs =>
      jobs.map(j => j.id === updatedJob.id ? updatedJob : j)
    );
  }

  toggleJobStatus(id: number): void {
    this.allJobs.update(jobs =>
      jobs.map(j => j.id === id ? { ...j, isActive: !j.isActive } : j)
    );
  }
}
