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

import { AccountInfoService } from '../../services/accounts';
import { AccountInfoState } from './accounts.interface';
import { ACCOUNT_INFO_INITIAL_STATE } from './accounts.constant';

export const AccountInfoStore = signalStore(
  { providedIn: 'root' },
  withState<AccountInfoState>(ACCOUNT_INFO_INITIAL_STATE),
  withComputed((state) => ({
    getSelectedAccountInfo: computed(() => state.selectedAccountInfo()),
    getPerformanceMetrics: computed(() => {
      if (!state.selectedAccountInfo()) {
        return null;
      }
      return state.selectedAccountInfo()!.performanceMetrics;
    }),
    getPolicies: computed(() => {
      if (!state.selectedAccountInfo()) {
        return null;
      }
      return state.selectedAccountInfo()!.policies;
    }),
  })),
  withProps(() => ({
    accountInfoService: inject(AccountInfoService),
  })),
  withMethods(({ accountInfoService, ...store }) => ({
    loadAccountInfo(): void {
      patchState(store, { isLoading: true, error: null });
      accountInfoService
        .getAccountInfo()
        .pipe(
          tap((accountInfo) => {
            patchState(store, {
              selectedAccountInfo: accountInfo,
              isLoading: false,
            });
          }),
          take(1),
          catchError(() => {
            patchState(store, {
              error: 'Error loading account info',
              isLoading: false,
            });
            return of([]);
          }),
        )
        .subscribe();
    },
  })),
  withHooks({
    onInit({ loadAccountInfo }) {
      loadAccountInfo();
    },
  }),
);
