import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ButtonComponent],
  template: `
    <div class="p-4">
      <h2 class="text-lg font-bold mb-2">{{ data.title }}</h2>
      <p class="mb-4" [innerHTML]="data.message"></p>
      <div class="flex justify-end gap-2">
        <app-button variant="secondary" (clicked)="onCancel()">{{
          data.cancelText
        }}</app-button>
        <app-button variant="primary" (clicked)="onConfirm()">{{
          data.confirmText || 'Confirm'
        }}</app-button>
      </div>
    </div>
  `,
})
export class ConfirmDialogComponent {
  dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
