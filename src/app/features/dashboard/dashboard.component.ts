import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WorkQueueComponent } from './work-queue';
import { PortfolioGoalsComponent } from './portfolio-goals';
import { QuickActionsComponent } from './quick-actions';
import { MarketIntelligenceComponent } from './market-intelligence';
import { MyAccountsComponent } from './my-accounts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WorkQueueComponent,
    PortfolioGoalsComponent,
    QuickActionsComponent,
    MarketIntelligenceComponent,
    MyAccountsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
