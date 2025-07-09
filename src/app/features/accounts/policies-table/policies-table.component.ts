import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { AccountInfoStore } from '../../../store';
import { AccountContainerComponent } from '../account-container';
import {
  TableComponent,
  ChipComponent,
  StatusComponent,
  NumberToCurrencyAbbrPipe,
  ContainerComponent,
  DialogComponent,
} from '../../../shared';
import {
  POLICIES_COLUMNS,
  POLICIES_TABLE_ACTIONS,
  POLICIES_TABLE_HEADER_CONFIG,
} from './policies-table.component.constant';
import { NotificationService, Policy } from '../../../services';

@Component({
  selector: 'app-policies-table',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ChipComponent,
    StatusComponent,
    NumberToCurrencyAbbrPipe,
    MatIconModule,
    AccountContainerComponent,
    ContainerComponent,
  ],
  templateUrl: './policies-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesTableComponent {
  private readonly store = inject(AccountInfoStore);
  private readonly dialog = inject(MatDialog);
  private readonly notificationService = inject(NotificationService);
  search = signal('');
  policies = this.store.getSpecificPolicies;

  columns = POLICIES_COLUMNS;
  headerConfig = POLICIES_TABLE_HEADER_CONFIG;
  tableActions = POLICIES_TABLE_ACTIONS;

  filteredPolicies = computed(() => {
    const policies = this.policies();
    const search = this.search().toLowerCase();
    if (!search) return policies;
    return policies.filter(
      (p: Policy) =>
        p.line.toLowerCase().includes(search) ||
        (p.status && p.status.toLowerCase().includes(search)),
    );
  });

  onSearch(term: string) {
    this.search.set(term);
  }

  onTableAction(_event: { action: string; row: unknown }) {
    if (_event.action === 'view') {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Policy Details',
          items: [(_event.row as Policy).line, (_event.row as Policy).status],
        },
      });
    }

    if (_event.action === 'delete') {
      this.store.deletePolicy((_event.row as Policy).id);
    }

    if (_event.action === 'edit') {
      this.notificationService.show('Not implemented');
    }
  }
}
