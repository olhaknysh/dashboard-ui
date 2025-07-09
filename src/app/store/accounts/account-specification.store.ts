import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  withHooks,
  withProps,
} from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { catchError, of, tap, take } from 'rxjs';

import { AccountSpecificationService } from '../../services';
import { AccountSpecificationState } from './accounts.interface';
import { ACCOUNT_SPECIFICATION_INITIAL_STATE } from './accounts.constant';

export const AccountSpecificationStore = signalStore(
  { providedIn: 'root' },
  withState<AccountSpecificationState>(ACCOUNT_SPECIFICATION_INITIAL_STATE),
  withComputed((state) => ({
    getTree: computed(() => state.tree()),
    getIsLoading: computed(() => state.isLoading()),
    getError: computed(() => state.error()),
  })),
  withProps(() => ({
    accountSpecificationService: inject(AccountSpecificationService),
  })),
  withMethods(({ accountSpecificationService, ...store }) => ({
    loadTree() {
      patchState(store, { isLoading: true, error: null });
      accountSpecificationService
        .getSpecificationTree()
        .pipe(
          tap((tree) => {
            patchState(store, { tree, isLoading: false });
          }),
          take(1),
          catchError(() => {
            patchState(store, {
              error: 'Error loading specification tree',
              isLoading: false,
            });
            return of([]);
          }),
        )
        .subscribe();
    },
  })),
  withHooks({
    onInit({ loadTree }) {
      loadTree();
    },
  }),
);
