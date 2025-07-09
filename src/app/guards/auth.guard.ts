import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserStore } from '../store';

export const authGuard = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  if (userStore.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth']);
  return false;
};
