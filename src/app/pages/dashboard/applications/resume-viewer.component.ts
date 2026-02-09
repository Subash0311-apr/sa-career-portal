import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { JobApplication } from '../../../core/models';


@Component({
  selector: 'app-resume-viewer',
  standalone: true,
  template: `
    <div class="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" (click)="close.emit()"></div>

      <!-- Modal -->
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-scale-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-sa-gray-200">
          <div>
            <h2 class="text-lg font-bold text-sa-gray-800">Resume Viewer</h2>
            <p class="text-sm text-sa-gray-500">{{ application.fullName }} — {{ application.resumeFileName }}</p>
          </div>
          <div class="flex items-center gap-2">
            @if (application.resumeData) {
              <a [href]="application.resumeData" target="_blank"
                 class="inline-flex items-center gap-1 px-3 py-1.5 bg-sa-blue text-white text-sm rounded-lg hover:bg-sa-blue-dark transition-colors no-underline"
                 title="Open in new tab">
                <span class="material-icons-outlined text-base">open_in_new</span>
                Open
              </a>
              <a [href]="application.resumeData" [download]="application.resumeFileName"
                 class="inline-flex items-center gap-1 px-3 py-1.5 bg-sa-orange text-white text-sm rounded-lg hover:bg-sa-orange-dark transition-colors no-underline">
                <span class="material-icons-outlined text-base">download</span>
                Download
              </a>
            }
            <button (click)="close.emit()"
                    class="p-2 rounded-lg hover:bg-sa-gray-100 text-sa-gray-400 hover:text-sa-gray-600 transition-colors cursor-pointer bg-transparent border-none">
              <span class="material-icons-outlined">close</span>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6">
          @if (safeResumeUrl && isPdf) {
            <iframe [src]="safeResumeUrl" class="w-full h-[70vh] rounded-lg border border-sa-gray-200"></iframe>
          } @else if (application.resumeData) {
            <div class="flex flex-col items-center justify-center py-16 text-sa-gray-400">
              <span class="material-icons-outlined text-6xl mb-4">description</span>
              <h3 class="text-lg font-medium text-sa-gray-600 mb-2">{{ application.resumeFileName }}</h3>
              <p class="text-sm mb-4">Resume preview is not available for this file type</p>
              <a [href]="application.resumeData" [download]="application.resumeFileName"
                 class="inline-flex items-center gap-2 px-4 py-2 bg-sa-blue text-white rounded-lg hover:bg-sa-blue-dark transition-colors no-underline text-sm">
                <span class="material-icons-outlined text-base">download</span>
                Download to View
              </a>
            </div>
          } @else {
            <div class="flex flex-col items-center justify-center py-16 text-sa-gray-400">
              <span class="material-icons-outlined text-6xl mb-4">description</span>
              <h3 class="text-lg font-medium text-sa-gray-600 mb-2">{{ application.resumeFileName }}</h3>
              <p class="text-xs text-sa-gray-400">(No file data available)</p>
            </div>
          }

          <!-- Application Details -->
          <div class="mt-6 border-t border-sa-gray-200 pt-6">
            <h4 class="text-sm font-semibold text-sa-gray-700 mb-3">Application Details</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-sa-gray-400">Full Name</span>
                <p class="font-medium text-sa-gray-800">{{ application.fullName }}</p>
              </div>
              <div>
                <span class="text-sa-gray-400">Email</span>
                <p class="font-medium text-sa-gray-800">{{ application.email }}</p>
              </div>
              <div>
                <span class="text-sa-gray-400">Phone</span>
                <p class="font-medium text-sa-gray-800">{{ application.phone }}</p>
              </div>
              <div>
                <span class="text-sa-gray-400">Applied For</span>
                <p class="font-medium text-sa-gray-800">{{ application.jobTitle }}</p>
              </div>
              <div>
                <span class="text-sa-gray-400">Applied Date</span>
                <p class="font-medium text-sa-gray-800">{{ application.appliedDate }}</p>
              </div>
              <div>
                <span class="text-sa-gray-400">Status</span>
                <p class="font-medium text-sa-gray-800">{{ application.status }}</p>
              </div>
            </div>
            @if (application.coverLetter) {
              <div class="mt-4">
                <span class="text-sa-gray-400 text-sm">Cover Letter</span>
                <p class="mt-1 text-sm text-sa-gray-700 bg-sa-gray-50 rounded-lg p-3">{{ application.coverLetter }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ResumeViewerComponent implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);

  @Input({ required: true }) application!: JobApplication;
  @Output() close = new EventEmitter<void>();

  safeResumeUrl: SafeResourceUrl | null = null;

  ngOnInit(): void {
    if (this.application.resumeData && this.isPdf) {
      this.safeResumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.application.resumeData);
    }
  }

  get isPdf(): boolean {
    return this.application.resumeFileName?.toLowerCase().endsWith('.pdf');
  }
}
