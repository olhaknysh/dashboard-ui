import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  withComputed,
  withProps,
} from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { catchError, of, take, tap } from 'rxjs';

import { AccountsService } from '../../services/accounts';
import { NotificationService } from '../../services/notification';
import { StorageKeys } from '../../shared';
import { ACCOUNTS_INITIAL_STATE } from './accounts.constant';

import { AccountsState } from './accounts.interface';

export const AccountsStore = signalStore(
  { providedIn: 'root' },
  withState<AccountsState>(ACCOUNTS_INITIAL_STATE),
  withComputed((state) => ({
    getAccounts: computed(() => state.accounts()),
    getSelectedAccount: computed(() => state.selectedAccount()),
  })),
  withProps(() => ({
    accountsService: inject(AccountsService),
    notificationService: inject(NotificationService),
  })),
  withMethods(({ accountsService, notificationService, ...store }) => ({
    loadAccounts(): void {
      patchState(store, { isLoading: true, error: null });

      accountsService
        .getAccounts()
        .pipe(
          tap((accounts) => {
            patchState(store, { accounts, isLoading: false });
          }),
          take(1),
          catchError(() => {
            notificationService.error('Error loading accounts');
            return of([]);
          }),
        )
        .subscribe();
    },
    checkSelectedAccount(): void {
      const accountInfo = localStorage.getItem(StorageKeys.ACCOUNT_INFO);
      if (accountInfo) {
        patchState(store, { selectedAccount: JSON.parse(accountInfo) });
      }
    },
    selectAccountById(id: number): void {
      patchState(store, { isLoading: true, error: null });
      accountsService
        .getAccountById(id)
        .pipe(
          tap((account) => {
            localStorage.setItem(
              StorageKeys.ACCOUNT_INFO,
              JSON.stringify(account),
            );
            patchState(store, {
              selectedAccount: account ?? null,
              isLoading: false,
            });
          }),
          take(1),
          catchError(() => {
            notificationService.error('Error loading account');
            return of(null);
          }),
        )
        .subscribe();
    },
    deleteSelectedAccount(): void {
      localStorage.removeItem(StorageKeys.ACCOUNT_INFO);
    },
  })),
  withHooks({
    onInit({ loadAccounts, checkSelectedAccount }) {
      loadAccounts();
      checkSelectedAccount();
    },
    onDestroy({ deleteSelectedAccount }) {
      deleteSelectedAccount();
    },
  }),
);
