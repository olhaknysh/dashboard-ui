import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumberToCurrencyAbbrPipe } from '../../../../../shared';

import {
  TargetProgressBarColorClass,
  TargetProgressBarColorType,
} from './target-progress-bar.component.interface';

@Component({
  selector: 'app-target-progress-bar',
  standalone: true,
  imports: [CommonModule, NumberToCurrencyAbbrPipe],
  templateUrl: './target-progress-bar.component.html',
  styleUrls: ['./target-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetProgressBarComponent {
  currentValue = input.required<string | number>();
  targetValue = input.required<string | number>();
  color = input<TargetProgressBarColorType>('blue');
  label = input<string>();
  percent = input<number>();

  getBarColor(): string {
    switch (this.color()) {
      case 'green':
        return TargetProgressBarColorClass.Green;
      case 'yellow':
        return TargetProgressBarColorClass.Yellow;
      default:
        return TargetProgressBarColorClass.Blue;
    }
  }
}
