import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-sa-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex-shrink-0 no-underline">
            <app-logo size="llg" />
          </a>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-1">
            <a routerLink="/"
               routerLinkActive="text-sa-orange font-semibold"
               [routerLinkActiveOptions]="{ exact: true }"
               class="px-4 py-2 text-sm font-medium text-sa-gray-600 hover:text-sa-orange transition-colors rounded-lg hover:bg-sa-gray-50">
              Careers
            </a>
            @if (auth.isLoggedIn()) {
              <a routerLink="/dashboard"
                 routerLinkActive="text-sa-orange font-semibold"
                 class="px-4 py-2 text-sm font-medium text-sa-gray-600 hover:text-sa-orange transition-colors rounded-lg hover:bg-sa-gray-50">
                Dashboard
              </a>
              <button (click)="auth.logout()"
                      class="ml-2 px-4 py-2 text-sm font-medium text-white bg-sa-blue hover:bg-sa-blue-dark rounded-lg transition-colors cursor-pointer">
                Logout
              </button>
            } @else {
              <a routerLink="/internal-login"
                 class="ml-2 px-4 py-2 text-sm font-medium text-white bg-sa-orange hover:bg-sa-orange-dark rounded-lg transition-colors no-underline">
                HR Login
              </a>
            }
          </div>

          <!-- Mobile menu button -->
          <button (click)="mobileOpen = !mobileOpen"
                  class="md:hidden p-2 rounded-lg text-sa-gray-600 hover:bg-sa-gray-100 transition-colors cursor-pointer">
            <span class="material-icons-outlined">{{ mobileOpen ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      @if (mobileOpen) {
        <div class="md:hidden bg-white border-t border-sa-gray-200 animate-fade-in">
          <div class="px-4 py-3 space-y-2">
            <a routerLink="/" (click)="mobileOpen = false"
               class="block px-4 py-2 text-sm font-medium text-sa-gray-700 hover:bg-sa-gray-50 rounded-lg">
              Careers
            </a>
            @if (auth.isLoggedIn()) {
              <a routerLink="/dashboard" (click)="mobileOpen = false"
                 class="block px-4 py-2 text-sm font-medium text-sa-gray-700 hover:bg-sa-gray-50 rounded-lg">
                Dashboard
              </a>
              <button (click)="auth.logout(); mobileOpen = false"
                      class="w-full text-left px-4 py-2 text-sm font-medium text-white bg-sa-blue rounded-lg cursor-pointer">
                Logout
              </button>
            } @else {
              <a routerLink="/internal-login" (click)="mobileOpen = false"
                 class="block px-4 py-2 text-sm font-medium text-white bg-sa-orange rounded-lg text-center no-underline">
                HR Login
              </a>
            }
          </div>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  readonly auth = inject(AuthService);
  mobileOpen = false;
}
