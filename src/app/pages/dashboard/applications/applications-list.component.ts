import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../../services/application.service';
import { ToastService } from '../../../services/toast.service';
import { JobApplication } from '../../../core/models';


import { ResumeViewerComponent } from './resume-viewer.component';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [FormsModule, ResumeViewerComponent],
  template: `
    <div class="space-y-6 animate-fade-in-up">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-sa-gray-800">Applications</h2>
          <p class="text-sm text-sa-gray-500 mt-1">Manage candidate applications</p>
        </div>
        <!-- Search -->
        <div class="relative">
          <span class="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sa-gray-400">search</span>
          <input type="text" [(ngModel)]="searchQuery" placeholder="Search candidates..."
                 class="pl-10 pr-4 py-2 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 w-full sm:w-72">
        </div>
      </div>

      <!-- Status Filter Pills -->
      <div class="flex flex-wrap gap-2">
        @for (status of statuses; track status) {
          <button (click)="statusFilter = statusFilter === status ? '' : status"
                  [class.bg-sa-orange]="statusFilter === status"
                  [class.text-white]="statusFilter === status"
                  class="px-4 py-1.5 rounded-full text-xs font-medium border border-sa-gray-200 hover:border-sa-orange transition-colors cursor-pointer bg-white text-sa-gray-600">
            {{ status || 'All' }}
          </button>
        }
      </div>

      <!-- Table -->
      <div class="bg-white rounded-xl border border-sa-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-sa-gray-50 text-sa-gray-600">
              <tr>
                <th class="text-left px-6 py-3 font-medium">Candidate</th>
                <th class="text-left px-6 py-3 font-medium">Position</th>
                <th class="text-left px-6 py-3 font-medium hidden md:table-cell">Date</th>
                <th class="text-left px-6 py-3 font-medium">Status</th>
                <th class="text-left px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (app of filteredApplications; track app.id) {
                <tr class="border-b border-sa-gray-100 hover:bg-sa-gray-50/50 transition-colors">
                  <td class="px-6 py-4">
                    <div>
                      <p class="font-medium text-sa-gray-800">{{ app.fullName }}</p>
                      <p class="text-xs text-sa-gray-400">{{ app.email }}</p>
                      <p class="text-xs text-sa-gray-400">{{ app.phone }}</p>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sa-gray-600">{{ app.jobTitle }}</td>
                  <td class="px-6 py-4 text-sa-gray-500 hidden md:table-cell">{{ app.appliedDate }}</td>
                  <td class="px-6 py-4">
                    <select [ngModel]="app.status"
                            (ngModelChange)="updateStatus(app.id, $event)"
                            class="px-2 py-1 rounded-lg text-xs border border-sa-gray-200 focus:outline-none focus:ring-1 focus:ring-sa-orange/40 cursor-pointer"
                            [class]="getStatusSelectClass(app.status)">
                      <option value="New">New</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview">Interview</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-1">
                      <button (click)="viewResume(app)"
                              title="View Resume"
                              class="p-2 rounded-lg text-sa-blue hover:bg-sa-blue/10 transition-colors cursor-pointer bg-transparent border-none">
                        <span class="material-icons-outlined text-lg">visibility</span>
                      </button>
                      <button (click)="downloadResume(app)"
                              title="Download Resume"
                              class="p-2 rounded-lg text-sa-orange hover:bg-sa-orange/10 transition-colors cursor-pointer bg-transparent border-none">
                        <span class="material-icons-outlined text-lg">download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="px-6 py-12 text-center">
                    <span class="material-icons-outlined text-4xl text-sa-gray-300 mb-2">inbox</span>
                    <p class="text-sa-gray-400">No applications found</p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Resume Viewer Modal -->
      @if (viewingResume) {
        <app-resume-viewer [application]="viewingResume" (close)="viewingResume = null" />
      }
    </div>
  `
})
export class ApplicationsListComponent {
  private readonly appService = inject(ApplicationService);
  private readonly toast = inject(ToastService);

  searchQuery = '';
  statusFilter = '';
  viewingResume: JobApplication | null = null;

  statuses = ['', 'New', 'Reviewed', 'Shortlisted', 'Interview', 'Hired', 'Rejected'];

  get filteredApplications(): JobApplication[] {
    let apps = this.appService.allApplications();
    if (this.statusFilter) {
      apps = apps.filter(a => a.status === this.statusFilter);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      apps = apps.filter(a =>
        a.fullName.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.jobTitle.toLowerCase().includes(q)
      );
    }
    return apps;
  }

  updateStatus(id: number, status: JobApplication['status']): void {
    this.appService.updateStatus(id, status);
    this.toast.success(`Application status updated to "${status}"`);
  }

  viewResume(app: JobApplication): void {
    this.viewingResume = app;
  }

  downloadResume(app: JobApplication): void {
    if (app.resumeData) {
      const link = document.createElement('a');
      link.href = app.resumeData;
      link.download = app.resumeFileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.toast.success('Resume download started');
    } else {
      this.toast.info('No resume file available for download');
    }
  }

  getStatusSelectClass(status: string): string {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700';
      case 'Reviewed': return 'bg-yellow-50 text-yellow-700';
      case 'Shortlisted': return 'bg-green-50 text-green-700';
      case 'Interview': return 'bg-purple-50 text-purple-700';
      case 'Rejected': return 'bg-red-50 text-red-700';
      case 'Hired': return 'bg-emerald-50 text-emerald-700';
      default: return '';
    }
  }
}
