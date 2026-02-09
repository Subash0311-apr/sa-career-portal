import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/career/career-page.component').then(m => m.CareerPageComponent),
    title: 'Careers | Southern Automation'
  },
  {
    path: 'internal-login',
    loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent),
    title: 'HR Login | Southern Automation'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/overview/dashboard-overview.component').then(m => m.DashboardOverviewComponent),
        title: 'Dashboard | Southern Automation'
      },
      {
        path: 'applications',
        loadComponent: () => import('./pages/dashboard/applications/applications-list.component').then(m => m.ApplicationsListComponent),
        title: 'Applications | Southern Automation'
      },
      {
        path: 'jobs',
        loadComponent: () => import('./pages/dashboard/jobs/job-management.component').then(m => m.JobManagementComponent),
        title: 'Job Management | Southern Automation'
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/dashboard/settings/settings.component').then(m => m.SettingsComponent),
        title: 'Settings | Southern Automation'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
