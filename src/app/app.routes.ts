import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard';
import { AuthComponent } from './features/auth';
import { DevelopmentComponent } from './features/development';
import { authGuard } from './guards';
import { AccountsComponent } from './features/accounts';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'auth', component: AuthComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'brokers',
    component: DevelopmentComponent,
    canActivate: [authGuard],
    data: {
      pageTitle: 'Brokers',
      pageDescription: 'Broker management system is being developed.',
    },
  },
  {
    path: 'submissions',
    component: DevelopmentComponent,
    canActivate: [authGuard],
    data: {
      pageTitle: 'Submissions',
      pageDescription:
        'Submission tracking and management features are coming soon.',
    },
  },
  {
    path: 'organization',
    component: DevelopmentComponent,
    canActivate: [authGuard],
    data: {
      pageTitle: 'Organization',
      pageDescription:
        'Organization settings and management tools are under development.',
    },
  },
  {
    path: 'goals-rules',
    component: DevelopmentComponent,
    canActivate: [authGuard],
    data: {
      pageTitle: 'Goals and Rules',
      pageDescription:
        'Goals and rules configuration system is being developed.',
    },
  },
  {
    path: 'admin',
    component: DevelopmentComponent,
    canActivate: [authGuard],
    data: {
      pageTitle: 'Admin Panel',
      pageDescription:
        'Administrative tools and system management features are coming soon.',
    },
  },
  { path: '**', redirectTo: 'auth' },
];
