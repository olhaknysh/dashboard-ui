import { Component, input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Policy } from '../../../../services/accounts';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-policies-card',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col gap-4 rounded-lg p-4 border border-state-600 bg-state-400"
    >
      <div class="flex flex-row gap-2 items-end">
        <mat-icon
          [attr.style]="'color: ' + policy().iconColor + ' !important'"
          class="text-2xl"
          >{{ policy().icon }}</mat-icon
        >
        <h3 class="title">{{ policy().label }}</h3>
      </div>
      <p class="text-sm text-gray-500">
        Current Premium:
        {{ policy().premium | currency: 'USD' : 'symbol' : '1.0-0' }}
      </p>
      <p class="text-sm text-gray-500">
        Effective Date:
        @if (policy().effDate) {
          {{ policy().effDate | date: 'MM/dd/yyyy' }}
        } @else {
          ---
        }
      </p>
    </div>
  `,
})
export class PoliciesCardComponent {
  policy = input.required<Policy>();
}
