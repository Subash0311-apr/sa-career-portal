import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Job } from '../../core/models';
import { ApplicationService } from '../../services/application.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-apply-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" (click)="close.emit()"></div>

      <!-- Modal -->
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <!-- Header -->
        <div class="sticky top-0 bg-white border-b border-sa-gray-200 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <div>
            <h2 class="text-xl font-bold text-sa-gray-800">Apply for Position</h2>
            <p class="text-sm text-sa-orange font-medium mt-0.5">{{ job.title }}</p>
          </div>
          <button (click)="close.emit()"
                  class="p-2 rounded-lg hover:bg-sa-gray-100 text-sa-gray-400 hover:text-sa-gray-600 transition-colors cursor-pointer bg-transparent border-none">
            <span class="material-icons-outlined">close</span>
          </button>
        </div>

        @if (submitted) {
          <!-- Success State -->
          <div class="p-10 text-center animate-scale-in">
            <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span class="material-icons-outlined text-4xl text-green-600">check_circle</span>
            </div>
            <h3 class="text-2xl font-bold text-sa-gray-800 mb-2">Application Submitted!</h3>
            <p class="text-sa-gray-500 mb-6">Thank you for applying. We'll review your application and get back to you soon.</p>
            <button (click)="close.emit()"
                    class="px-6 py-2.5 bg-sa-blue hover:bg-sa-blue-dark text-white font-medium rounded-xl transition-colors cursor-pointer border-none">
              Close
            </button>
          </div>
        } @else {
          <!-- Form -->
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="p-6 space-y-4">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Full Name *</label>
              <input formControlName="fullName" type="text"
                     class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 focus:border-sa-orange transition-all"
                     placeholder="Enter your full name">
              @if (form.get('fullName')?.touched && form.get('fullName')?.invalid) {
                <p class="text-xs text-red-500 mt-1">Full name is required</p>
              }
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Email Address *</label>
              <input formControlName="email" type="email"
                     class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 focus:border-sa-orange transition-all"
                     placeholder="your.email@example.com">
              @if (form.get('email')?.touched && form.get('email')?.invalid) {
                <p class="text-xs text-red-500 mt-1">Valid email is required</p>
              }
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Phone Number *</label>
              <input formControlName="phone" type="tel"
                     class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 focus:border-sa-orange transition-all"
                     placeholder="+91 98765 43210">
              @if (form.get('phone')?.touched && form.get('phone')?.invalid) {
                <p class="text-xs text-red-500 mt-1">Phone number is required (min 10 digits)</p>
              }
            </div>

            <!-- Resume Upload -->
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Resume (PDF/DOC) *</label>
              <div class="relative border-2 border-dashed border-sa-gray-300 rounded-xl p-6 text-center hover:border-sa-orange transition-colors cursor-pointer"
                   (click)="fileInput.click()"
                   (dragover)="$event.preventDefault()"
                   (drop)="onFileDrop($event)">
                <input #fileInput type="file" accept=".pdf,.doc,.docx" (change)="onFileSelect($event)" class="hidden">
                @if (selectedFileName) {
                  <div class="flex items-center justify-center gap-2 text-sa-blue">
                    <span class="material-icons-outlined">description</span>
                    <span class="text-sm font-medium">{{ selectedFileName }}</span>
                    <button type="button" (click)="removeFile($event)"
                            class="ml-2 text-red-400 hover:text-red-600 cursor-pointer bg-transparent border-none">
                      <span class="material-icons-outlined text-base">close</span>
                    </button>
                  </div>
                } @else {
                  <span class="material-icons-outlined text-3xl text-sa-gray-300 mb-2">cloud_upload</span>
                  <p class="text-sm text-sa-gray-500">Drag & drop or <span class="text-sa-orange font-medium">click to browse</span></p>
                  <p class="text-xs text-sa-gray-400 mt-1">PDF, DOC, DOCX (max 5MB)</p>
                }
              </div>
              @if (form.get('resumeFileName')?.touched && form.get('resumeFileName')?.invalid) {
                <p class="text-xs text-red-500 mt-1">Resume is required</p>
              }
            </div>

            <!-- Cover Letter -->
            <div>
              <label class="block text-sm font-medium text-sa-gray-700 mb-1">Cover Letter</label>
              <textarea formControlName="coverLetter" rows="3"
                        class="w-full px-4 py-2.5 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 focus:border-sa-orange transition-all resize-none"
                        placeholder="Tell us why you're a great fit for this role..."></textarea>
            </div>

            <!-- Submit -->
            <button type="submit" [disabled]="form.invalid || !selectedFileName"
                    class="w-full py-3 bg-sa-orange hover:bg-sa-orange-dark text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg cursor-pointer border-none text-sm">
              Submit Application
            </button>
          </form>
        }
      </div>
    </div>
  `
})
export class ApplyModalComponent {
  @Input({ required: true }) job!: Job;
  @Output() close = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  private readonly appService = inject(ApplicationService);
  private readonly toast = inject(ToastService);

  submitted = false;
  selectedFileName = '';
  private resumeBase64 = '';

  form: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    coverLetter: [''],
    resumeFileName: ['', Validators.required],
    resumeData: ['']
  });

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.processFile(input.files[0]);
    }
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files?.length) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  private processFile(file: File): void {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!allowed.includes(ext)) {
      this.toast.error('Only PDF, DOC, and DOCX files are allowed');
      return;
    }
    if (file.size > maxSize) {
      this.toast.error('File size must be under 5MB');
      return;
    }

    this.selectedFileName = file.name;
    this.form.patchValue({ resumeFileName: file.name });

    const reader = new FileReader();
    reader.onload = () => {
      this.resumeBase64 = reader.result as string;
      this.form.patchValue({ resumeData: this.resumeBase64 });
    };
    reader.readAsDataURL(file);
  }

  removeFile(event: Event): void {
    event.stopPropagation();
    this.selectedFileName = '';
    this.resumeBase64 = '';
    this.form.patchValue({ resumeFileName: '', resumeData: '' });
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedFileName) {
      this.appService.submitApplication({
        jobId: this.job.id,
        jobTitle: this.job.title,
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        phone: this.form.value.phone,
        coverLetter: this.form.value.coverLetter || '',
        resumeFileName: this.selectedFileName,
        resumeData: this.resumeBase64
      });
      this.submitted = true;
      this.toast.success('Application submitted successfully!');
    }
  }
}
