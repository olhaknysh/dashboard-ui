import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusClass, StatusType } from './status.interface';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2">
      <div class="status-dot" [ngClass]="statusClass()"></div>
      @if (isTextShown()) {
        <span class="status-text">{{ status() }}</span>
      }
    </div>
  `,
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  status = input.required<StatusType>();
  isTextShown = input<boolean>(true);

  private defaultClassMap: Record<StatusType, StatusClass> = {
    [StatusType.New]: StatusClass.New,
    [StatusType.PendingReview]: StatusClass.Pending,
    [StatusType.Completed]: StatusClass.Completed,
    [StatusType.Active]: StatusClass.Completed,
    [StatusType.UnderReview]: StatusClass.New,
    [StatusType.Inactive]: StatusClass.Inactive,
  };

  statusClass = computed(() => this.defaultClassMap[this.status()]);
}
