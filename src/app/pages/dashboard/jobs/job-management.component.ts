import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../services/job.service';
import { ToastService } from '../../../services/toast.service';
import { Job } from '../../../core/models';
import { DEPARTMENTS, LOCATIONS, EXPERIENCE_LEVELS, JOB_TYPES } from '../../../core/data/mock-data';


@Component({
  selector: 'app-job-management',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in-up">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-sa-gray-800">Job Management</h2>
          <p class="text-sm text-sa-gray-500 mt-1">Create and manage job postings</p>
        </div>
        <button (click)="showAddForm = !showAddForm"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-sa-orange hover:bg-sa-orange-dark text-white text-sm font-medium rounded-xl transition-colors cursor-pointer border-none">
          <span class="material-icons-outlined text-lg">add</span>
          Add New Position
        </button>
      </div>

      <!-- Add Job Form -->
      @if (showAddForm) {
        <div class="bg-white rounded-xl border border-sa-gray-200 p-6 shadow-sm animate-fade-in-up">
          <h3 class="text-lg font-semibold text-sa-gray-800 mb-4">{{ editingJob ? 'Edit' : 'New' }} Position</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Job Title *</label>
              <input [(ngModel)]="formData.title" type="text"
                     class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40"
                     placeholder="e.g., Senior PLC Programmer">
            </div>
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Department *</label>
              <select [(ngModel)]="formData.department"
                      class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 cursor-pointer">
                <option value="">Select Department</option>
                @for (d of departments; track d) { <option [value]="d">{{ d }}</option> }
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Location *</label>
              <select [(ngModel)]="formData.location"
                      class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 cursor-pointer">
                <option value="">Select Location</option>
                @for (l of locations; track l) { <option [value]="l">{{ l }}</option> }
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Experience *</label>
              <select [(ngModel)]="formData.experience"
                      class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 cursor-pointer">
                <option value="">Select Experience</option>
                @for (e of experienceLevels; track e) { <option [value]="e">{{ e }}</option> }
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Job Type *</label>
              <select [(ngModel)]="formData.type"
                      class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 cursor-pointer">
                @for (t of jobTypes; track t) { <option [value]="t">{{ t }}</option> }
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Description *</label>
              <textarea [(ngModel)]="formData.description" rows="3"
                        class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 resize-none"
                        placeholder="Job description..."></textarea>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-4">
            <button (click)="cancelForm()"
                    class="px-4 py-2 text-sm text-sa-gray-600 hover:bg-sa-gray-100 rounded-xl transition-colors cursor-pointer bg-transparent border border-sa-gray-200">
              Cancel
            </button>
            <button (click)="saveJob()"
                    [disabled]="!isFormValid()"
                    class="px-6 py-2 text-sm bg-sa-orange hover:bg-sa-orange-dark text-white font-medium rounded-xl transition-colors cursor-pointer border-none disabled:opacity-50">
              {{ editingJob ? 'Update' : 'Create' }} Position
            </button>
          </div>
        </div>
      }

      <!-- Jobs Table -->
      <div class="bg-white rounded-xl border border-sa-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-sa-gray-50 text-sa-gray-600">
              <tr>
                <th class="text-left px-6 py-3 font-medium">Position</th>
                <th class="text-left px-6 py-3 font-medium hidden md:table-cell">Department</th>
                <th class="text-left px-6 py-3 font-medium hidden md:table-cell">Location</th>
                <th class="text-left px-6 py-3 font-medium">Type</th>
                <th class="text-left px-6 py-3 font-medium">Status</th>
                <th class="text-left px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (job of allJobs; track job.id) {
                <tr class="border-b border-sa-gray-100 hover:bg-sa-gray-50/50 transition-colors">
                  <td class="px-6 py-4">
                    <p class="font-medium text-sa-gray-800">{{ job.title }}</p>
                    <p class="text-xs text-sa-gray-400 md:hidden">{{ job.department }} • {{ job.location }}</p>
                  </td>
                  <td class="px-6 py-4 text-sa-gray-600 hidden md:table-cell">{{ job.department }}</td>
                  <td class="px-6 py-4 text-sa-gray-600 hidden md:table-cell">{{ job.location }}</td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-0.5 rounded-full text-xs font-medium" [class]="getTypeBadge(job.type)">
                      {{ job.type }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-0.5 rounded-full text-xs font-medium"
                          [class]="job.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                      {{ job.isActive ? 'Active' : 'Closed' }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-1">
                      <button (click)="editJob(job)"
                              class="p-2 rounded-lg text-sa-blue hover:bg-sa-blue/10 transition-colors cursor-pointer bg-transparent border-none"
                              title="Edit">
                        <span class="material-icons-outlined text-lg">edit</span>
                      </button>
                      <button (click)="toggleStatus(job.id)"
                              class="p-2 rounded-lg transition-colors cursor-pointer bg-transparent border-none"
                              [class]="job.isActive ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'"
                              [title]="job.isActive ? 'Close Position' : 'Reopen Position'">
                        <span class="material-icons-outlined text-lg">{{ job.isActive ? 'pause_circle' : 'play_circle' }}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class JobManagementComponent {
  private readonly jobService = inject(JobService);
  private readonly toast = inject(ToastService);

  showAddForm = false;
  editingJob: Job | null = null;

  departments = DEPARTMENTS;
  locations = LOCATIONS;
  experienceLevels = EXPERIENCE_LEVELS;
  jobTypes = JOB_TYPES;

  formData = this.getEmptyForm();

  get allJobs(): Job[] {
    return this.jobService.getAllJobs();
  }

  private getEmptyForm() {
    return {
      title: '',
      department: '',
      location: '',
      experience: '',
      type: 'Full-time' as Job['type'],
      description: '',
    };
  }

  isFormValid(): boolean {
    const f = this.formData;
    return !!(f.title && f.department && f.location && f.experience && f.description);
  }

  editJob(job: Job): void {
    this.editingJob = job;
    this.formData = {
      title: job.title,
      department: job.department,
      location: job.location,
      experience: job.experience,
      type: job.type,
      description: job.description,
    };
    this.showAddForm = true;
  }

  cancelForm(): void {
    this.showAddForm = false;
    this.editingJob = null;
    this.formData = this.getEmptyForm();
  }

  saveJob(): void {
    if (!this.isFormValid()) return;

    if (this.editingJob) {
      this.jobService.updateJob({
        ...this.editingJob,
        ...this.formData
      });
      this.toast.success('Position updated successfully');
    } else {
      this.jobService.addJob({
        ...this.formData,
        requirements: [],
        postedDate: new Date().toISOString().split('T')[0],
        isActive: true
      });
      this.toast.success('New position created successfully');
    }
    this.cancelForm();
  }

  toggleStatus(id: number): void {
    this.jobService.toggleJobStatus(id);
    this.toast.success('Position status updated');
  }

  getTypeBadge(type: string): string {
    switch (type) {
      case 'Full-time': return 'bg-green-100 text-green-700';
      case 'Contract': return 'bg-purple-100 text-purple-700';
      case 'Intern': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
