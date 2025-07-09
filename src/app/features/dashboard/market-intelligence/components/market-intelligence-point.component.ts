import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

import { StatusComponent, StatusType } from '../../../../shared';

@Component({
  selector: 'app-market-intelligence-point',
  standalone: true,
  imports: [CommonModule, StatusComponent, MatDividerModule],
  template: `
    <div class="flex items-center gap-3 w-full pb-2">
      <app-status [status]="status()" [isTextShown]="false"></app-status>
      <div class="flex-1 text-base text-gray-200">{{ text() }}</div>
    </div>
    <mat-divider></mat-divider>
  `,
})
export class MarketIntelligencePointComponent {
  status = input<StatusType>(StatusType.New);
  text = input<string>('');
}
