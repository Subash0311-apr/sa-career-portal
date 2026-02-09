import { Injectable, signal, computed, PLATFORM_ID, inject, OnDestroy, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthUser, LoginCredentials } from '../core/models';

interface MockUser {
  email: string;
  password: string;
  name: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  // ── Mock token ──
  private readonly MOCK_TOKEN = 'sa-mock-token-2026';
  private readonly TOKEN_KEY = 'sa_token';
  private readonly USER_KEY = 'sa_auth';
  private readonly REMEMBER_KEY = 'sa_remember';

  // ── Hardcoded credentials (2 users) ──
  private readonly VALID_USERS: MockUser[] = [
    { email: 'hr@southernautomation.com', password: 'Admin@123', name: 'HR Admin', role: 'admin' },
    { email: 'admin@southernautomation.com', password: 'Admin@456', name: 'System Admin', role: 'superadmin' }
  ];

  // ── Auto-logout (15 min inactivity) ──
  private readonly INACTIVITY_LIMIT = 15 * 60 * 1000;
  private inactivityTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly activityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];
  private boundResetTimer = this.resetInactivityTimer.bind(this);

  private readonly currentUser = signal<AuthUser | null>(null);
  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    this.restoreSession();
  }

  login(credentials: LoginCredentials): { success: boolean; message: string } {
    const matched = this.VALID_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (matched) {
      const user: AuthUser = { email: matched.email, name: matched.name, role: matched.role };
      this.currentUser.set(user);

      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem(this.TOKEN_KEY, this.MOCK_TOKEN);
        sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.startInactivityWatcher();
      }
      return { success: true, message: 'Login successful' };
    }

    // Specific error messages
    const emailExists = this.VALID_USERS.some(u => u.email === credentials.email);
    if (emailExists) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }
    return { success: false, message: 'No account found with this email address.' };
  }

  logout(): void {
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.USER_KEY);
      this.stopInactivityWatcher();
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.TOKEN_KEY) === this.MOCK_TOKEN && !!this.currentUser();
    }
    return !!this.currentUser();
  }

  getUser(): AuthUser | null {
    return this.currentUser();
  }

  getRememberedEmail(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.REMEMBER_KEY) || '';
    }
    return '';
  }

  setRememberedEmail(email: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.REMEMBER_KEY, email);
    }
  }

  clearRememberedEmail(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.REMEMBER_KEY);
    }
  }

  // ── Session restore ──
  private restoreSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem(this.TOKEN_KEY);
      const stored = sessionStorage.getItem(this.USER_KEY);
      if (token === this.MOCK_TOKEN && stored) {
        try {
          this.currentUser.set(JSON.parse(stored));
          this.startInactivityWatcher();
        } catch {
          this.logout();
        }
      }
    }
  }

  // ── Inactivity auto-logout ──
  private startInactivityWatcher(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.ngZone.runOutsideAngular(() => {
      this.activityEvents.forEach(evt =>
        document.addEventListener(evt, this.boundResetTimer, { passive: true })
      );
      this.resetInactivityTimer();
    });
  }

  private stopInactivityWatcher(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
    if (isPlatformBrowser(this.platformId)) {
      this.activityEvents.forEach(evt =>
        document.removeEventListener(evt, this.boundResetTimer)
      );
    }
  }

  private resetInactivityTimer(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      this.ngZone.run(() => this.logout());
    }, this.INACTIVITY_LIMIT);
  }

  ngOnDestroy(): void {
    this.stopInactivityWatcher();
  }
}
