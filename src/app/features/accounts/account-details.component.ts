import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { AccountsStore, AccountInfoStore } from '../../store';

import { AccountHeaderComponent } from './account-header';
import { AccountAttentionComponent } from './account-attention';
import { PerformanceMetricsComponent } from './performance-metrics';
import { PoliciesComponent } from './policies';
import { AccountStatusComponent } from './account-status';
import { ComplianceComponent } from './compliance';
import { AccountSpecificationComponent } from './account-specification';
import { MessagesComponent } from './messages';
import { PoliciesTableComponent } from './policies-table';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [
    AccountHeaderComponent,
    AccountAttentionComponent,
    PerformanceMetricsComponent,
    PoliciesComponent,
    AccountStatusComponent,
    ComplianceComponent,
    AccountSpecificationComponent,
    MessagesComponent,
    PoliciesTableComponent,
  ],
  templateUrl: './account-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent {
  accountStore = inject(AccountsStore);
  accountInfoStore = inject(AccountInfoStore);

  account = computed(() => {
    return this.accountStore.getSelectedAccount();
  });

  accountInfo = computed(() => {
    return this.accountInfoStore.getSelectedAccountInfo();
  });
}
