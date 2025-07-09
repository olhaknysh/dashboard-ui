import { Component, effect, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { TabsComponent, Tab } from './shared';
import { UserStore } from './store';
import { HeaderComponent } from './core/components/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TabsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected readonly userStore = inject(UserStore);
  isAuthenticated = false;
  activeTabId = 'dashboard';
  private readonly router = inject(Router);

  navigationTabs: Tab[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      id: 'accounts',
      label: 'Accounts',
      icon: 'account_balance',
      route: '/accounts',
    },
    {
      id: 'brokers',
      label: 'Brokers',
      icon: 'business',
      route: '/brokers',
    },
    {
      id: 'submissions',
      label: 'Submissions',
      icon: 'assignment',
      route: '/submissions',
    },
    {
      id: 'organization',
      label: 'Organization',
      icon: 'corporate_fare',
      route: '/organization',
    },
    {
      id: 'goals-rules',
      label: 'Goals and Rules',
      icon: 'flag',
      route: '/goals-rules',
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: 'admin_panel_settings',
      route: '/admin',
    },
  ];

  constructor() {
    effect(() => {
      this.isAuthenticated = this.userStore.isAuthenticated();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.split('?')[0];
        const matchedTab = this.navigationTabs.find(
          (tab) => tab.route === currentRoute,
        );

        if (matchedTab) {
          this.activeTabId = matchedTab.id;
        }
      }
    });
  }

  onTabChange(tabId: string): void {
    this.activeTabId = tabId;
    const tab = this.navigationTabs.find((t) => t.id === tabId);
    if (tab && tab.route) {
      this.router.navigate([tab.route]);
    }
  }
}
