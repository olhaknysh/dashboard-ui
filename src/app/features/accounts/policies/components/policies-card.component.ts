import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { Policy } from '../../../../services';

@Component({
  selector: 'app-policies-card',
  standalone: true,
  imports: [MatIconModule, DatePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './policies-card.component.html',
})
export class PoliciesCardComponent {
  policy = input.required<Policy>();
}
