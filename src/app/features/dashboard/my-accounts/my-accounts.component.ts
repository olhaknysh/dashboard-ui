import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { AccountsStore } from '../../../store';
import {
  TableComponent,
  NumberToCurrencyAbbrPipe,
  ContainerComponent,
  ContainerTitleComponent,
  StatusComponent,
  ChipComponent,
  WinnabilityScoreComponent,
  DialogComponent,
} from '../../../shared';

import {
  MY_ACCOUNTS_COLUMNS,
  MY_ACCOUNTS_TABLE_ACTIONS,
  MY_ACCOUNTS_TABLE_HEADER_CONFIG,
} from './my-accounts.component.constant';
import { Account, NotificationService } from '../../../services';

@Component({
  selector: 'app-my-accounts',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    NumberToCurrencyAbbrPipe,
    ContainerComponent,
    ContainerTitleComponent,
    StatusComponent,
    ChipComponent,
    WinnabilityScoreComponent,
    TableComponent,
  ],
  templateUrl: './my-accounts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountsComponent {
  private readonly store = inject(AccountsStore);
  private readonly dialog = inject(MatDialog);
  private readonly notificationService = inject(NotificationService);
  search = signal('');

  columns = MY_ACCOUNTS_COLUMNS;
  headerConfig = MY_ACCOUNTS_TABLE_HEADER_CONFIG;
  tableActions = MY_ACCOUNTS_TABLE_ACTIONS;

  filteredAccounts = computed(() => {
    const accounts = this.store.getAccounts();
    const search = this.search().toLowerCase();

    if (!search) {
      return accounts;
    }

    return accounts.filter(
      (acc) =>
        acc.accountName.toLowerCase().includes(search) ||
        acc.accountType.toLowerCase().includes(search) ||
        acc.line.toLowerCase().includes(search) ||
        acc.broker.toLowerCase().includes(search),
    );
  });

  onSearch(term: string) {
    this.search.set(term);
  }

  onCreate() {
    // TODO: Implement create new account logic
    alert('Create new account clicked!');
  }

  onTableAction(_event: { action: string; row: unknown }) {
    if (_event.action === 'view') {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Account Details',
          items: [
            (_event.row as Account).accountName,
            (_event.row as Account).accountType,
            (_event.row as Account).line,
            (_event.row as Account).broker,
          ],
        },
      });
    }

    if (_event.action === 'delete') {
      this.store.deleteAccount((_event.row as Account).id);
    }

    if (_event.action === 'edit') {
      this.notificationService.show('Not implemented');
    }
  }
}
