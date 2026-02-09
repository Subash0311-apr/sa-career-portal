import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);

  private readonly isDashboard = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects.startsWith('/dashboard'))
    ),
    { initialValue: false }
  );

  private readonly isLogin = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects.startsWith('/internal-login'))
    ),
    { initialValue: false }
  );

  get showNavbar(): boolean {
    return !this.isDashboard() && !this.isLogin();
  }

  get showFooter(): boolean {
    return !this.isDashboard() && !this.isLogin();
  }

  get isFullscreen(): boolean {
    return this.isDashboard() || this.isLogin() || false;
  }
}
