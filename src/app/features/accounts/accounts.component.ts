import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './account-details.component';

import { AccountsStore } from '../../store';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, AccountDetailsComponent],
  standalone: true,
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
  protected readonly accountsStore = inject(AccountsStore);

  selectedAccountId = signal<number | null>(null);
  accounts = computed(() => this.accountsStore.getAccounts());

  constructor() {
    if (this.accountsStore.getSelectedAccount()) {
      this.selectedAccountId.set(this.accountsStore.getSelectedAccount()!.id);
    }
  }

  selectAccount(id: number) {
    this.selectedAccountId.set(id);
    this.accountsStore.selectAccountById(id);
  }

  clearSelection() {
    this.selectedAccountId.set(null);
    this.accountsStore.deleteSelectedAccount();
  }

  selectedAccountName = computed(() => {
    const id = this.selectedAccountId();

    if (!id) {
      return null;
    }

    return this.accountsStore.getSelectedAccount()?.accountName;
  });
}
