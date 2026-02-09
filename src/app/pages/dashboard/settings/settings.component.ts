import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
  template: `
    <div class="space-y-6 max-w-3xl animate-fade-in-up">
      <div>
        <h2 class="text-2xl font-bold text-sa-gray-800">Settings</h2>
        <p class="text-sm text-sa-gray-500 mt-1">Manage your preferences</p>
      </div>

      <!-- Profile Section -->
      <div class="bg-white rounded-xl border border-sa-gray-200 p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-sa-gray-800 mb-4">Profile Information</h3>
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 bg-sa-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
            HR
          </div>
          <div>
            <p class="text-lg font-medium text-sa-gray-800">{{ auth.user()?.name }}</p>
            <p class="text-sm text-sa-gray-500">{{ auth.user()?.email }}</p>
            <span class="inline-block px-2 py-0.5 bg-sa-orange/10 text-sa-orange text-xs font-medium rounded-full mt-1">
              {{ auth.user()?.role | uppercase }}
            </span>
          </div>
        </div>
      </div>

      <!-- Notification Preferences -->
      <div class="bg-white rounded-xl border border-sa-gray-200 p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-sa-gray-800 mb-4">Notification Preferences</h3>
        <div class="space-y-4">
          @for (pref of notificationPrefs; track pref.label) {
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-sa-gray-700">{{ pref.label }}</p>
                <p class="text-xs text-sa-gray-400">{{ pref.description }}</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" [(ngModel)]="pref.enabled" class="sr-only peer">
                <div class="w-11 h-6 bg-sa-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-sa-orange transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>
          }
        </div>
        <button (click)="saveSettings()"
                class="mt-6 px-6 py-2.5 bg-sa-orange hover:bg-sa-orange-dark text-white text-sm font-medium rounded-xl transition-colors cursor-pointer border-none">
          Save Preferences
        </button>
      </div>

      <!-- About -->
      <div class="bg-white rounded-xl border border-sa-gray-200 p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-sa-gray-800 mb-2">About</h3>
        <p class="text-sm text-sa-gray-500">Southern Automation Career Portal v1.0.0</p>
        <p class="text-sm text-sa-gray-400 mt-1">Built with Angular 20</p>
      </div>
    </div>
  `
})
export class SettingsComponent {
  readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);

  notificationPrefs = [
    { label: 'New Applications', description: 'Get notified when a new application is submitted', enabled: true },
    { label: 'Status Updates', description: 'Notify when application status changes', enabled: true },
    { label: 'Job Expiry Alerts', description: 'Alert before job postings expire', enabled: false },
    { label: 'Weekly Summary', description: 'Receive a weekly summary email', enabled: true },
  ];

  saveSettings(): void {
    this.toast.success('Settings saved successfully');
  }
}
