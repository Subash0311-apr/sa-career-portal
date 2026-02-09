import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApplicationService } from '../../../services/application.service';
import { JobService } from '../../../services/job.service';

import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  template: `
    <div class="space-y-6 animate-fade-in-up">
      <div>
        <h2 class="text-2xl font-bold text-sa-gray-800">Dashboard Overview</h2>
        <p class="text-sm text-sa-gray-500 mt-1">Welcome to the HR management portal</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        @for (stat of statsCards; track stat.label) {
          <div class="bg-white rounded-xl border border-sa-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-sa-gray-500">{{ stat.label }}</p>
                <p class="text-3xl font-extrabold mt-1" [style.color]="stat.color">{{ stat.value }}</p>
              </div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center" [style.background-color]="stat.bgColor">
                <span class="material-icons-outlined text-2xl" [style.color]="stat.color">{{ stat.icon }}</span>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Applications by Status -->
        <div class="bg-white rounded-xl border border-sa-gray-200 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-sa-gray-800 mb-4">Applications by Status</h3>
          <div class="h-64 flex items-center justify-center">
            <canvas id="statusChart"></canvas>
          </div>
        </div>

        <!-- Applications by Department -->
        <div class="bg-white rounded-xl border border-sa-gray-200 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-sa-gray-800 mb-4">Applications by Department</h3>
          <div class="h-64 flex items-center justify-center">
            <canvas id="deptChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Applications -->
      <div class="bg-white rounded-xl border border-sa-gray-200 shadow-sm">
        <div class="px-6 py-4 border-b border-sa-gray-200">
          <h3 class="text-lg font-semibold text-sa-gray-800">Recent Applications</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-sa-gray-50 text-sa-gray-600">
              <tr>
                <th class="text-left px-6 py-3 font-medium">Candidate</th>
                <th class="text-left px-6 py-3 font-medium">Position</th>
                <th class="text-left px-6 py-3 font-medium">Date</th>
                <th class="text-left px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              @for (app of recentApps; track app.id) {
                <tr class="border-b border-sa-gray-100 hover:bg-sa-gray-50/50 transition-colors">
                  <td class="px-6 py-3">
                    <div>
                      <p class="font-medium text-sa-gray-800">{{ app.fullName }}</p>
                      <p class="text-xs text-sa-gray-400">{{ app.email }}</p>
                    </div>
                  </td>
                  <td class="px-6 py-3 text-sa-gray-600">{{ app.jobTitle }}</td>
                  <td class="px-6 py-3 text-sa-gray-500">{{ app.appliedDate }}</td>
                  <td class="px-6 py-3">
                    <span class="px-2.5 py-1 rounded-full text-xs font-medium" [class]="getStatusClass(app.status)">
                      {{ app.status }}
                    </span>
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
export class DashboardOverviewComponent implements OnInit {
  private readonly appService = inject(ApplicationService);
  private readonly jobService = inject(JobService);
  private readonly platformId = inject(PLATFORM_ID);

  get statsCards() {
    const s = this.appService.stats();
    return [
      { label: 'Total Applicants', value: s.totalApplicants, icon: 'people', color: '#1e3a5f', bgColor: '#edf2f7' },
      { label: 'Open Positions', value: this.jobService.getAllJobs().filter(j => j.isActive).length, icon: 'work', color: '#e8702a', bgColor: '#fef3e8' },
      { label: 'New Applications', value: s.newApplications, icon: 'fiber_new', color: '#38a169', bgColor: '#e8f5e9' },
      { label: 'Shortlisted', value: s.shortlisted, icon: 'star', color: '#d69e2e', bgColor: '#fff8e1' },
    ];
  }

  get recentApps() {
    return this.appService.allApplications().slice(0, 5);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Chart.register(...registerables);
      setTimeout(() => this.renderCharts(), 100);
    }
  }

  private renderCharts(): void {
    const apps = this.appService.allApplications();

    // Status chart
    const statusCounts: Record<string, number> = {};
    apps.forEach(a => statusCounts[a.status] = (statusCounts[a.status] || 0) + 1);

    const statusCtx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (statusCtx) {
      new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(statusCounts),
          datasets: [{
            data: Object.values(statusCounts),
            backgroundColor: ['#1e3a5f', '#e8702a', '#38a169', '#d69e2e', '#e53e3e', '#6b46c1'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    // Dept chart
    const deptCounts: Record<string, number> = {};
    apps.forEach(a => {
      const job = this.jobService.getJobById(a.jobId);
      const dept = job?.department || 'Other';
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });

    const deptCtx = document.getElementById('deptChart') as HTMLCanvasElement;
    if (deptCtx) {
      new Chart(deptCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(deptCounts),
          datasets: [{
            label: 'Applications',
            data: Object.values(deptCounts),
            backgroundColor: '#e8702a',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } }
          },
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Reviewed': return 'bg-yellow-100 text-yellow-700';
      case 'Shortlisted': return 'bg-green-100 text-green-700';
      case 'Interview': return 'bg-purple-100 text-purple-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'Hired': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
