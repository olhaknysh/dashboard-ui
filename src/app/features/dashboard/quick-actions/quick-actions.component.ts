import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import {
  ButtonComponent,
  ContainerTitleComponent,
  ContainerComponent,
  ConfirmDialogComponent,
} from '../../../shared';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonComponent,
    ContainerTitleComponent,
    ContainerComponent,
  ],
  template: `
    <app-container>
      <app-container-title>Quick Actions</app-container-title>
      <div class="flex gap-4 flex-col">
        <app-button
          appearance="filled"
          [fullWidth]="true"
          (clicked)="confirm('New Submission')"
          >New Submission</app-button
        >
        <app-button
          appearance="filled"
          [fullWidth]="true"
          (clicked)="confirm('Quote Builder')"
          >Quote Builder</app-button
        >
        <app-button
          appearance="filled"
          [fullWidth]="true"
          (clicked)="confirm('Risk Models')"
          >Risk Models</app-button
        >
        <app-button
          appearance="filled"
          [fullWidth]="true"
          (clicked)="confirm('Documents Upload')"
          >Documents Upload</app-button
        >
      </div>
    </app-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsComponent {
  dialog = inject(MatDialog);

  confirm(action: string) {
    if (this.dialog.openDialogs.length) {
      this.dialog.closeAll();
    }

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure?',
        message: `Do you want to proceed with <b>${action}</b>?`,
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
  }
}
