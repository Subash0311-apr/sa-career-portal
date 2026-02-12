import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { LOCATIONS, DEPARTMENTS, EXPERIENCE_LEVELS, JOB_TYPES } from '../../core/data/mock-data';
import { JobCardComponent } from './job-card.component';
import { ApplyModalComponent } from './apply-modal.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { Job } from '../../core/models';

@Component({
  selector: 'app-career-page',
  standalone: true,
  imports: [FormsModule, JobCardComponent, ApplyModalComponent, LogoComponent],
  template: `
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-sa-blue-dark via-sa-blue to-sa-blue-light text-white overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-72 h-72 bg-sa-orange rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-sa-blue-light rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <div class="animate-fade-in-up">
          <!-- Company Logo -->
         

          <span class="inline-block px-4 py-1.5 bg-sa-orange/20 text-sa-orange-light rounded-full text-sm font-medium mb-6 border border-sa-orange/30">
            🚀 We're Hiring!
          </span>
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Join <span class="text-sa-orange">Southern</span>
          </h1>
          <p class="text-lg md:text-xl text-sa-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Build the future of industrial automation. Explore opportunities in engineering,
            software, IoT, and more across India.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="#positions" class="inline-flex items-center gap-2 px-8 py-3 bg-sa-orange hover:bg-sa-orange-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-sa-orange/25 hover:shadow-xl hover:shadow-sa-orange/30 hover:-translate-y-0.5 no-underline">
              <span class="material-icons-outlined">work</span>
              View Positions
            </a>
            <a href="#" class="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20 no-underline">
              <span class="material-icons-outlined">info</span>
              About Us
            </a>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          @for (stat of heroStats; track stat.label) {
            <div class="animate-fade-in-up text-center" [style.animation-delay]="stat.delay">
              <div class="text-3xl md:text-4xl font-extrabold text-sa-orange">{{ stat.value }}</div>
              <div class="text-sm text-sa-gray-300 mt-1">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>

      <!-- Wave -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 55L1440 60V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z" fill="#f7fafc"/>
        </svg>
      </div>
    </section>

    <!-- Positions Section -->
    <section id="positions" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-10 animate-fade-in-up">
        <h2 class="text-3xl md:text-4xl font-extrabold text-sa-gray-800">
          Open <span class="text-sa-orange">Positions</span>
        </h2>
        <p class="text-sa-gray-500 mt-2">Find the perfect role that matches your skills and ambitions</p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl shadow-md border border-sa-gray-200 p-6 mb-8 animate-fade-in-up stagger-1">
        <!-- Search -->
        <div class="relative mb-4">
          <span class="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-sa-gray-400">search</span>
          <input type="text"
                 [ngModel]="searchValue"
                 (ngModelChange)="onSearch($event)"
                 placeholder="Search jobs by title, department, or location..."
                 class="w-full pl-12 pr-4 py-3 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 focus:border-sa-orange transition-all bg-sa-gray-50">
        </div>

        <!-- Filter Dropdowns -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <select [ngModel]="locationValue" (ngModelChange)="onFilter('location', $event)"
                  class="px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sa-orange/40 text-sa-gray-600 cursor-pointer">
            <option value="">All Locations</option>
            @for (loc of locations; track loc) {
              <option [value]="loc">{{ loc }}</option>
            }
          </select>

          <select [ngModel]="departmentValue" (ngModelChange)="onFilter('department', $event)"
                  class="px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sa-orange/40 text-sa-gray-600 cursor-pointer">
            <option value="">All Departments</option>
            @for (dep of departments; track dep) {
              <option [value]="dep">{{ dep }}</option>
            }
          </select>

          <select [ngModel]="experienceValue" (ngModelChange)="onFilter('experience', $event)"
                  class="px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sa-orange/40 text-sa-gray-600 cursor-pointer">
            <option value="">All Experience</option>
            @for (exp of experienceLevels; track exp) {
              <option [value]="exp">{{ exp }}</option>
            }
          </select>

          <select [ngModel]="typeValue" (ngModelChange)="onFilter('type', $event)"
                  class="px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sa-orange/40 text-sa-gray-600 cursor-pointer">
            <option value="">All Types</option>
            @for (t of jobTypes; track t) {
              <option [value]="t">{{ t }}</option>
            }
          </select>
        </div>

        <!-- Active filters & count -->
        <div class="flex flex-wrap items-center justify-between mt-4 text-sm text-sa-gray-500">
          <span>{{ jobService.filteredJobs().length }} positions found</span>
          <button (click)="resetFilters()"
                  class="text-sa-orange hover:underline font-medium cursor-pointer bg-transparent border-none text-sm">
            Clear All Filters
          </button>
        </div>
      </div>

      <!-- Job Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (job of jobService.paginatedJobs(); track job.id; let i = $index) {
          <app-job-card
            [job]="job"
            [animationDelay]="i * 100"
            (apply)="openApplyModal($event)" />
        } @empty {
          <div class="col-span-full text-center py-16 animate-fade-in">
            <span class="material-icons-outlined text-6xl text-sa-gray-300 mb-4">search_off</span>
            <h3 class="text-xl font-semibold text-sa-gray-600 mb-2">No positions found</h3>
            <p class="text-sa-gray-400">Try adjusting your filters or search terms</p>
          </div>
        }
      </div>

      <!-- Pagination -->
      @if (jobService.totalPages() > 1) {
        <div class="flex justify-center items-center gap-2 mt-10 animate-fade-in-up">
          <button (click)="jobService.goToPage(jobService.page() - 1)"
                  [disabled]="jobService.page() === 1"
                  class="p-2 rounded-lg border border-sa-gray-200 text-sa-gray-600 hover:bg-sa-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
            <span class="material-icons-outlined">chevron_left</span>
          </button>

          @for (p of pages(); track p) {
            <button (click)="jobService.goToPage(p)"
                    [class.bg-sa-orange]="p === jobService.page()"
                    [class.text-white]="p === jobService.page()"
                    [class.border-sa-orange]="p === jobService.page()"
                    class="w-10 h-10 rounded-lg border border-sa-gray-200 text-sm font-medium text-sa-gray-600 hover:bg-sa-gray-50 transition-colors cursor-pointer">
              {{ p }}
            </button>
          }

          <button (click)="jobService.goToPage(jobService.page() + 1)"
                  [disabled]="jobService.page() === jobService.totalPages()"
                  class="p-2 rounded-lg border border-sa-gray-200 text-sa-gray-600 hover:bg-sa-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
            <span class="material-icons-outlined">chevron_right</span>
          </button>
        </div>
      }
    </section>

    <!-- Apply Modal -->
    @if (selectedJob) {
      <app-apply-modal [job]="selectedJob" (close)="selectedJob = null" />
    }
  `
})
export class CareerPageComponent {
  readonly jobService = inject(JobService);

  readonly locations = LOCATIONS;
  readonly departments = DEPARTMENTS;
  readonly experienceLevels = EXPERIENCE_LEVELS;
  readonly jobTypes = JOB_TYPES;

  selectedJob: Job | null = null;

  // Two-way binding values
  searchValue = '';
  locationValue = '';
  departmentValue = '';
  experienceValue = '';
  typeValue = '';

  readonly heroStats = [
    { value: '200+', label: 'Engineers', delay: '0.1s' },
    { value: '50+', label: 'Projects', delay: '0.2s' },
    { value: '12+', label: 'Locations', delay: '0.3s' },
    { value: '15+', label: 'Years', delay: '0.4s' },
  ];

  onSearch(value: string): void {
    this.searchValue = value;
    this.jobService.updateFilters({ search: value });
  }

  onFilter(key: string, value: string): void {
    switch (key) {
      case 'location': this.locationValue = value; break;
      case 'department': this.departmentValue = value; break;
      case 'experience': this.experienceValue = value; break;
      case 'type': this.typeValue = value; break;
    }
    this.jobService.updateFilters({ [key]: value });
  }

  resetFilters(): void {
    this.searchValue = '';
    this.locationValue = '';
    this.departmentValue = '';
    this.experienceValue = '';
    this.typeValue = '';
    this.jobService.resetFilters();
  }

  openApplyModal(job: Job): void {
    this.selectedJob = job;
  }

  pages(): number[] {
    return Array.from({ length: this.jobService.totalPages() }, (_, i) => i + 1);
  }
}
