import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { Message } from '../../../../services';
import {
  ButtonComponent,
  ChipComponent,
  ConfirmDialogComponent,
} from '../../../../shared';

@Component({
  selector: 'app-messages-element',
  templateUrl: './messages-element.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent, MatIconModule, ButtonComponent],
  styles: [
    `
      .message {
        border: 1px solid var(--dark-blue);
      }
    `,
  ],
})
export class MessagesElementComponent {
  message = input.required<Message>();

  dialog = inject(MatDialog);

  onReply() {
    if (this.dialog.openDialogs.length) {
      this.dialog.closeAll();
    }

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure?',
        message: `Do you want to proceed with <b>Reply</b>?`,
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
  }
}
