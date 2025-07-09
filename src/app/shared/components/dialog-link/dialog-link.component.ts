import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../dialog';

@Component({
  selector: 'app-dialog-link',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="text-blue-400 cursor-pointer hover:underline inline-flex items-center gap-1 select-none"
      (click)="openDialog()"
    >
      {{ text() }}
      <mat-icon>arrow_forward</mat-icon>
    </button>
  `,
})
export class DialogLinkComponent {
  text = input.required<string>();
  dialogTitle = input.required<string>();
  dialogItems = input.required<string[]>();

  private readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        title: this.dialogTitle(),
        items: this.dialogItems(),
      },
    });
  }
}
