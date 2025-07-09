import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative bg-[#191c26] rounded-2xl p-8 min-w-[320px] max-w-[90vw] shadow-xl border border-gray-700"
    >
      <button
        mat-icon-button
        (click)="closeDialog()"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-200 focus:outline-none"
      >
        <mat-icon>close</mat-icon>
      </button>
      <h2 class="text-2xl font-semibold text-white mb-4">{{ data.title }}</h2>
      <ul class="space-y-2">
        @for (item of data.items; track $index) {
          <li class="text-base text-gray-200 flex items-center gap-2">
            {{ item }}
          </li>
        }
      </ul>
    </div>
  `,
})
export class DialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DialogComponent>);

  closeDialog() {
    this.dialogRef.close();
  }
}
