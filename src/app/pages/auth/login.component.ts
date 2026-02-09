import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, LogoComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sa-blue-dark via-sa-blue to-sa-blue-light relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-20 w-64 h-64 bg-sa-orange rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-80 h-80 bg-sa-blue-light rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div class="relative w-full max-w-md mx-4 animate-scale-in">
        <!-- Success overlay -->
        @if (loginSuccess) {
          <div class="absolute inset-0 z-10 flex items-center justify-center bg-white rounded-2xl animate-fade-in">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
                <span class="material-icons-outlined text-green-600 text-3xl">check_circle</span>
              </div>
              <p class="text-lg font-semibold text-sa-gray-800">Welcome back!</p>
              <p class="text-sm text-sa-gray-500 mt-1">Redirecting to dashboard...</p>
            </div>
          </div>
        }

        <!-- Card -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <!-- Logo & Header -->
          <div class="text-center mb-8">
            <div class="flex justify-center mb-4">
              <app-logo size="xl" />
            </div>
            <h1 class="text-2xl font-bold text-sa-gray-800 mt-4">HR Portal Login</h1>
            <p class="text-sm text-sa-gray-500 mt-1">Sign in to access the dashboard</p>
          </div>

          <!-- Form -->
          <form [formGroup]="form" (ngSubmit)="onLogin()" class="space-y-5">
            <!-- Email (floating label) -->
            <div class="relative">
              <div class="relative">
                <span class="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sa-gray-400 text-xl pointer-events-none z-[1]">email</span>
                <input formControlName="email" type="email" id="loginEmail"
                       class="peer w-full pl-11 pr-4 pt-5 pb-2 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 focus:border-sa-orange transition-all bg-white placeholder-transparent"
                       placeholder="Email Address">
                <label for="loginEmail"
                       class="absolute left-11 top-1/2 -translate-y-1/2 text-sa-gray-400 text-sm pointer-events-none transition-all duration-200
                              peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-sa-orange
                              peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs">
                  Email Address
                </label>
              </div>
              @if (form.get('email')?.touched && form.get('email')?.invalid) {
                <p class="text-xs text-red-500 mt-1 animate-fade-in">
                  @if (form.get('email')?.errors?.['required']) {
                    Email is required
                  } @else {
                    Please enter a valid email address
                  }
                </p>
              }
            </div>

            <!-- Password (floating label) -->
            <div class="relative">
              <div class="relative">
                <span class="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sa-gray-400 text-xl pointer-events-none z-[1]">lock</span>
                <input formControlName="password" [type]="showPassword ? 'text' : 'password'" id="loginPassword"
                       class="peer w-full pl-11 pr-12 pt-5 pb-2 border border-sa-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sa-orange/40 focus:border-sa-orange transition-all bg-white placeholder-transparent"
                       placeholder="Password"
                       (copy)="$event.preventDefault()" (cut)="$event.preventDefault()">
                <label for="loginPassword"
                       class="absolute left-11 top-1/2 -translate-y-1/2 text-sa-gray-400 text-sm pointer-events-none transition-all duration-200
                              peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-sa-orange
                              peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs">
                  Password
                </label>
                <button type="button" (click)="showPassword = !showPassword"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-sa-gray-400 hover:text-sa-gray-600 cursor-pointer bg-transparent border-none">
                  <span class="material-icons-outlined text-xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
              @if (form.get('password')?.touched && form.get('password')?.invalid) {
                <p class="text-xs text-red-500 mt-1 animate-fade-in">Password is required</p>
              }
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" [(ngModel)]="rememberMe" [ngModelOptions]="{standalone: true}"
                       class="w-4 h-4 rounded border-sa-gray-300 text-sa-orange focus:ring-sa-orange/40 cursor-pointer accent-[#e8702a]">
                <span class="text-sm text-sa-gray-600">Remember me</span>
              </label>
            </div>

            <!-- Error -->
            @if (errorMessage) {
              <div class="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm flex items-center gap-2 animate-fade-in">
                <span class="material-icons-outlined text-base">error</span>
                {{ errorMessage }}
              </div>
            }

            <!-- Submit -->
            <button type="submit" [disabled]="form.invalid || isLoading"
                    class="w-full py-3.5 bg-sa-orange hover:bg-sa-orange-dark text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-sa-orange/25 cursor-pointer border-none text-sm active:scale-[0.98]">
              @if (isLoading) {
                <span class="inline-flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
                  Signing in...
                </span>
              } @else {
                <span class="inline-flex items-center gap-2">
                  <span class="material-icons-outlined text-lg">login</span>
                  Sign In
                </span>
              }
            </button>
          </form>

          <!-- Hint -->
          <div class="mt-6 p-4 bg-sa-gray-50 rounded-xl text-xs text-sa-gray-500">
            <p class="font-semibold text-sa-gray-600 mb-2 flex items-center gap-1">
              <span class="material-icons-outlined text-sm">info</span>
              Demo Credentials
            </p>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-0.5">
                <p class="font-medium text-sa-gray-600">HR Admin</p>
                <p>hr&#64;southernautomation.com</p>
                <p>Admin&#64;123</p>
              </div>
              <div class="space-y-0.5">
                <p class="font-medium text-sa-gray-600">System Admin</p>
                <p>admin&#64;southernautomation.com</p>
                <p>Admin&#64;456</p>
              </div>
            </div>
          </div>

          <!-- Security badge -->
          <div class="mt-3 text-center">
            <span class="inline-flex items-center gap-1 text-xs text-sa-gray-400">
              <span class="material-icons-outlined text-sm">verified_user</span>
              Session auto-expires after 15 min of inactivity
            </span>
          </div>
        </div>

        <!-- Back link -->
        <div class="text-center mt-6">
          <a routerLink="/" class="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
            <span class="material-icons-outlined text-base">arrow_back</span>
            Back to Careers
          </a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  showPassword = false;
  isLoading = false;
  loginSuccess = false;
  errorMessage = '';
  rememberMe = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
    const saved = this.authService.getRememberedEmail();
    if (saved) {
      this.form.patchValue({ email: saved });
      this.rememberMe = true;
    }
  }

  onLogin(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate network delay
    setTimeout(() => {
      const email = this.form.value.email!;
      const result = this.authService.login({
        email,
        password: this.form.value.password!
      });

      this.isLoading = false;

      if (result.success) {
        // Handle remember me
        if (this.rememberMe) {
          this.authService.setRememberedEmail(email);
        } else {
          this.authService.clearRememberedEmail();
        }

        this.loginSuccess = true;
        this.toast.success('Welcome back, ' + (this.authService.getUser()?.name || '') + '!');

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1200);
      } else {
        this.errorMessage = result.message;
      }
    }, 800);
  }
}
