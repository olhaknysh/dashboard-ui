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
import { NotificationService } from '../../services';

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
    getCurrentStep: computed(() => {
      if (!state.selectedAccountInfo()) {
        return 0;
      }
      return state.selectedAccountInfo()!.currentStep;
    }),
    getCompliance: computed(() => {
      if (!state.selectedAccountInfo()) {
        return [];
      }
      return state.selectedAccountInfo()!.compliance;
    }),
    getMessages: computed(() => state.messages()),
    getSpecificPolicies: computed(() => state.policies()),
  })),
  withProps(() => ({
    accountInfoService: inject(AccountInfoService),
    notificationService: inject(NotificationService),
  })),
  withMethods(({ accountInfoService, notificationService, ...store }) => ({
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
    loadMessages(): void {
      patchState(store, { isLoading: true, error: null });
      accountInfoService
        .getMessages()
        .pipe(
          tap((messages) => {
            patchState(store, { messages, isLoading: false });
          }),
        )
        .subscribe();
    },
    loadPolicies(): void {
      patchState(store, { isLoading: true, error: null });
      accountInfoService
        .getPolicies()
        .pipe(
          tap((policies) => {
            patchState(store, { policies, isLoading: false });
          }),
        )
        .subscribe();
    },
    deletePolicy(policyId: number): void {
      patchState(store, {
        policies: store.policies().filter((policy) => policy.id !== policyId),
      });
      notificationService.show('Policy deleted successfully');
    },
  })),
  withHooks({
    onInit({ loadAccountInfo, loadMessages, loadPolicies }) {
      loadAccountInfo();
      loadMessages();
      loadPolicies();
    },
  }),
);
