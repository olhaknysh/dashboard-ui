import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  show(message: string, action = 'Close', config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...config,
    });
  }

  success(message: string) {
    this.show(message, 'Close', { panelClass: ['snackbar-success'] });
  }

  error(message: string) {
    this.show(message, 'Close', { panelClass: ['snackbar-error'] });
  }

  info(message: string) {
    this.show(message, 'Close', { panelClass: ['snackbar-info'] });
  }
}
