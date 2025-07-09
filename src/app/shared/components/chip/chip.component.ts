import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { NgClass } from '@angular/common';

import { TypeCheckUtility } from '../../utility';

import { CHIP_RADIO_POINTS } from './chip.component.constant';
import { ChipClass, ChipMode } from './chip.component.interface';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [MatChipsModule, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-chip [disabled]="true" [ngClass]="chipClass">
      <ng-content></ng-content>
    </mat-chip>
  `,
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  mode = input<ChipMode>('default');
  value = input<number>();

  get chipClass(): string {
    switch (this.mode()) {
      case 'ratio':
        if (
          TypeCheckUtility.isUndefined(this.value()) ||
          TypeCheckUtility.isNull(this.value())
        ) {
          return ChipClass.Default;
        }

        return this.value()! <= CHIP_RADIO_POINTS.NORMAL
          ? ChipClass.RatioGreen
          : this.value()! <= CHIP_RADIO_POINTS.WARNING
            ? ChipClass.RatioYellow
            : ChipClass.RatioRed;
      case 'appetite':
        return ChipClass.Appetite;
      case 'attachments':
        return ChipClass.Attachments;
      default:
        return ChipClass.Default;
    }
  }
}
