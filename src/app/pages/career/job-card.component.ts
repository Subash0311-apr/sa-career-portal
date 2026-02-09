import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../core/models';

@Component({
  selector: 'app-job-card',
  standalone: true,
  template: `
    <div class="group bg-white rounded-2xl border border-sa-gray-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up cursor-default"
         [style.animation-delay.ms]="animationDelay">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-lg font-bold text-sa-gray-800 group-hover:text-sa-blue transition-colors">
            {{ job.title }}
          </h3>
          <p class="text-sm text-sa-gray-500 mt-1">{{ job.department }}</p>
        </div>
        <span class="px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
              [class]="getTypeBadgeClass()">
          {{ job.type }}
        </span>
      </div>

      <!-- Details -->
      <div class="space-y-2 mb-5">
        <div class="flex items-center gap-2 text-sm text-sa-gray-600">
          <span class="material-icons-outlined text-base text-sa-orange">location_on</span>
          {{ job.location }}
        </div>
        <div class="flex items-center gap-2 text-sm text-sa-gray-600">
          <span class="material-icons-outlined text-base text-sa-orange">work_history</span>
          {{ job.experience }}
        </div>
        <div class="flex items-center gap-2 text-sm text-sa-gray-400">
          <span class="material-icons-outlined text-base">calendar_today</span>
          Posted {{ job.postedDate }}
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-sa-gray-500 line-clamp-2 mb-5">{{ job.description }}</p>

      <!-- Apply Button -->
      <button (click)="apply.emit(job)"
              class="w-full py-2.5 bg-sa-orange hover:bg-sa-orange-dark text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-sa-orange/20 cursor-pointer border-none">
        Apply Now
      </button>
    </div>
  `
})
export class JobCardComponent {
  @Input({ required: true }) job!: Job;
  @Input() animationDelay = 0;
  @Output() apply = new EventEmitter<Job>();

  getTypeBadgeClass(): string {
    switch (this.job.type) {
      case 'Full-time': return 'bg-green-100 text-green-700';
      case 'Contract': return 'bg-purple-100 text-purple-700';
      case 'Intern': return 'bg-blue-100 text-blue-700';
      case 'Part-time': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
