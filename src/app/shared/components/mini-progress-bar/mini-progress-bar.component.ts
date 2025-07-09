import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MiniBarClass,
  MiniProgressBarColor,
  MiniProgressBarLabelPosition,
} from './mini-progress-bar.component.interface';

@Component({
  selector: 'app-mini-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-progress-bar.component.html',
  styleUrls: ['./mini-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniProgressBarComponent {
  value = input<number>(0);
  label = input<string>('');
  color = input<MiniProgressBarColor>(MiniProgressBarColor.Blue);
  labelPosition = input<MiniProgressBarLabelPosition>(
    MiniProgressBarLabelPosition.Right,
  );

  getBarClass(): string {
    switch (this.color()) {
      case MiniProgressBarColor.Green:
        return MiniBarClass.Green;
      case MiniProgressBarColor.Yellow:
        return MiniBarClass.Yellow;
      default:
        return MiniBarClass.Blue;
    }
  }
}
