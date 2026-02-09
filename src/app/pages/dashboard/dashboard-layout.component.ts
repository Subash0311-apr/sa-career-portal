import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LogoComponent],
  template: `
    <div class="flex h-screen bg-sa-gray-50">
      <!-- Sidebar -->
      <aside class="hidden lg:flex flex-col w-64 bg-white border-r border-sa-gray-200 shadow-sm">
        <!-- Logo -->
        <div class="h-16 flex items-center px-6 border-b border-sa-gray-200">
          <app-logo size="llg" />
        </div>

        <!-- Nav Links -->
        <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          @for (item of navItems; track item.route) {
            <a [routerLink]="item.route"
               routerLinkActive="bg-sa-orange/10 text-sa-orange border-r-2 border-sa-orange"
               [routerLinkActiveOptions]="{ exact: item.exact }"
               class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-sa-gray-600 hover:bg-sa-gray-50 hover:text-sa-blue transition-all no-underline">
              <span class="material-icons-outlined text-xl">{{ item.icon }}</span>
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- User section -->
        <div class="p-4 border-t border-sa-gray-200">
          <div class="flex items-center gap-3 px-3 py-2">
            <div class="w-9 h-9 bg-sa-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
              HR
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-sa-gray-800 truncate">{{ auth.user()?.name }}</p>
              <p class="text-xs text-sa-gray-400 truncate">{{ auth.user()?.email }}</p>
            </div>
          </div>
          <button (click)="logout()"
                  class="w-full mt-2 flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer bg-transparent border-none">
            <span class="material-icons-outlined text-lg">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Top Navbar -->
        <header class="h-16 bg-white border-b border-sa-gray-200 flex items-center justify-between px-6 shadow-sm">
          <div class="flex items-center gap-3">
            <!-- Mobile menu toggle -->
            <button (click)="mobileMenuOpen = !mobileMenuOpen"
                    class="lg:hidden p-2 rounded-lg text-sa-gray-600 hover:bg-sa-gray-100 cursor-pointer bg-transparent border-none">
              <span class="material-icons-outlined">menu</span>
            </button>
            <h1 class="text-lg font-semibold text-sa-gray-800">HR Dashboard</h1>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-sa-gray-500 hidden sm:block">Welcome, {{ auth.user()?.name }}</span>
            <div class="w-8 h-8 bg-sa-orange rounded-full flex items-center justify-center text-white font-bold text-xs">
              {{ auth.user()?.name?.charAt(0) }}
            </div>
          </div>
        </header>

        <!-- Mobile Sidebar Overlay -->
        @if (mobileMenuOpen) {
          <div class="lg:hidden fixed inset-0 z-50 flex">
            <div class="absolute inset-0 bg-black/40" (click)="mobileMenuOpen = false"></div>
            <div class="relative w-64 bg-white shadow-xl animate-slide-in-left">
              <div class="h-16 flex items-center justify-between px-6 border-b border-sa-gray-200">
                <app-logo />
                <button (click)="mobileMenuOpen = false" class="p-1 rounded text-sa-gray-400 hover:text-sa-gray-600 cursor-pointer bg-transparent border-none">
                  <span class="material-icons-outlined">close</span>
                </button>
              </div>
              <nav class="px-4 py-6 space-y-1">
                @for (item of navItems; track item.route) {
                  <a [routerLink]="item.route"
                     (click)="mobileMenuOpen = false"
                     routerLinkActive="bg-sa-orange/10 text-sa-orange"
                     [routerLinkActiveOptions]="{ exact: item.exact }"
                     class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-sa-gray-600 hover:bg-sa-gray-50 no-underline">
                    <span class="material-icons-outlined text-xl">{{ item.icon }}</span>
                    {{ item.label }}
                  </a>
                }
              </nav>
            </div>
          </div>
        }

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  mobileMenuOpen = false;

  navItems = [
    { route: '/dashboard', label: 'Overview', icon: 'dashboard', exact: true },
    { route: '/dashboard/applications', label: 'Applications', icon: 'people', exact: false },
    { route: '/dashboard/jobs', label: 'Job Management', icon: 'work', exact: false },
    { route: '/dashboard/settings', label: 'Settings', icon: 'settings', exact: false },
  ];

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/internal-login']);
  }
}
