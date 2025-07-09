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

import { MarketIntelligenceService } from '../../services/market-intelligence';
import { NotificationService } from '../../services/notification';

import { MarketIntelligenceState } from './market-intelligence.store.interface';
import { MARKET_INTELLIGENCE_INITIAL_STATE } from './market-intelligence.store.constant';

export const MarketIntelligenceStore = signalStore(
  { providedIn: 'root' },
  withState<MarketIntelligenceState>(MARKET_INTELLIGENCE_INITIAL_STATE),
  withComputed((state) => ({
    getPoints: computed(() => state.points()),
  })),
  withProps(() => ({
    marketService: inject(MarketIntelligenceService),
    notificationService: inject(NotificationService),
  })),
  withMethods(({ marketService, notificationService, ...store }) => ({
    loadPoints(): void {
      patchState(store, { isLoading: true, error: null });

      marketService
        .getMarketIntelligencePoints()
        .pipe(
          tap((points) => {
            patchState(store, { points, isLoading: false });
          }),
          catchError(() => {
            notificationService.error(
              'Error loading market intelligence points',
            );
            return of([]);
          }),
          takeUntilDestroyed(),
        )
        .subscribe();
    },
  })),
  withHooks({
    onInit({ loadPoints }) {
      loadPoints();
    },
  }),
);
