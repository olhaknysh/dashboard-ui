import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  withComputed,
  withProps,
} from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { catchError, of, tap } from 'rxjs';

import { PortfolioGoalsService } from '../../services/portfolio-goals';
import { NotificationService } from '../../services/notification';

import { PORTFOLIO_GOALS_INITIAL_STATE } from './portfolio-goals.store.constant';
import { PortfolioGoalsState } from './portfolio-goals.store.interface';

export const PortfolioGoalsStore = signalStore(
  { providedIn: 'root' },
  withState<PortfolioGoalsState>(PORTFOLIO_GOALS_INITIAL_STATE),
  withComputed((state) => ({
    getGoals: computed(() => state.goals()),
    getTargetProgressBars: computed(() =>
      state.targetProgressBars().map((bar) => ({
        ...bar,
        percent: bar.targetValue
          ? (bar.currentValue / bar.targetValue) * 100
          : 0,
      })),
    ),
  })),
  withProps(() => ({
    goalsService: inject(PortfolioGoalsService),
    notificationService: inject(NotificationService),
  })),
  withMethods(({ goalsService, notificationService, ...store }) => ({
    loadGoals(): void {
      patchState(store, { isLoading: true, error: null });
      goalsService
        .getPortfolioGoals()
        .pipe(
          tap((goals) => {
            patchState(store, { goals, isLoading: false });
          }),
          takeUntilDestroyed(),
          catchError(() => {
            notificationService.error('Error loading portfolio goals');
            return of([]);
          }),
        )
        .subscribe();
    },
    loadTargetProgressBars(): void {
      patchState(store, { isLoading: true, error: null });
      goalsService
        .getTargetProgressBars()
        .pipe(
          tap((bars) => {
            patchState(store, { targetProgressBars: bars });
          }),
          takeUntilDestroyed(),
          catchError(() => {
            notificationService.error('Error loading target progress bars');
            return of([]);
          }),
        )
        .subscribe();
    },
  })),
  withHooks({
    onInit({ loadGoals, loadTargetProgressBars }) {
      loadGoals();
      loadTargetProgressBars();
    },
  }),
);
