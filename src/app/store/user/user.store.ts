import { computed } from '@angular/core';
import { inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  withComputed,
  withProps,
} from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { Router } from '@angular/router';

import { NotificationService } from '../../services/notification';
import { StorageKeys } from '../../shared';

import {
  GUEST_NAME,
  MOCK_USER,
  USER_INITIAL_STATE,
} from './user.store.constant';
import { LoginCredentials, User, UserState } from './user.store.interface';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>(USER_INITIAL_STATE),
  withComputed((state) => ({
    isAuthenticated: computed(() => state.user() !== null),
    displayName: computed(() => state.user()?.name || GUEST_NAME),
  })),
  withProps(() => ({
    notificationService: inject(NotificationService),
    router: inject(Router),
  })),
  withMethods(({ notificationService, router, ...store }) => ({
    loadUser(): void {
      const savedUser = localStorage.getItem(StorageKeys.CURRENT_USER);
      patchState(store, { isLoading: true, error: null });

      if (!savedUser) {
        patchState(store, { user: null, isLoading: false });
        return;
      }

      try {
        const user = JSON.parse(savedUser);
        patchState(store, { user, isLoading: false });
      } catch (_error) {
        localStorage.removeItem(StorageKeys.CURRENT_USER);
      }
    },

    login(credentials: LoginCredentials): void {
      patchState(store, { isLoggingIn: true, error: null });

      const user = this.getUserByCredentials(credentials);

      if (!user) {
        notificationService.error('Invalid email or password');
        patchState(store, {
          isLoggingIn: false,
          error: 'Invalid email or password',
        });
        return;
      }

      const storeUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      patchState(store, {
        user: storeUser,
        isLoggingIn: false,
        error: null,
      });
      localStorage.setItem(StorageKeys.CURRENT_USER, JSON.stringify(user));
      router.navigate(['/dashboard']);
    },

    logout(): void {
      localStorage.removeItem(StorageKeys.CURRENT_USER);

      patchState(store, {
        user: null,
        isLoading: false,
        error: null,
        isLoggingIn: false,
      });
    },

    getUserByCredentials(credentials: LoginCredentials): User | null {
      const { email, password } = credentials;
      const isUserValid =
        email === MOCK_USER.email && password === MOCK_USER.password;

      return isUserValid ? MOCK_USER : null;
    },
  })),
  withHooks({
    onInit({ loadUser }) {
      loadUser();
    },
  }),
);
