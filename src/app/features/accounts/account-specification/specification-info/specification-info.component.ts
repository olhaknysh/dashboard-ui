import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {
  AccountSpecificationInfo,
  NotificationService,
} from '../../../../services';
import {
  ButtonComponent,
  ChipComponent,
  LineChartComponent,
  MiniProgressBarColor,
  MiniProgressBarComponent,
  MiniProgressBarLabelPosition,
  UppercaseFirstPipe,
  WinnabilityScoreComponent,
} from '../../../../shared';

@Component({
  selector: 'app-specification-info',
  standalone: true,
  imports: [
    UppercaseFirstPipe,
    WinnabilityScoreComponent,
    ChipComponent,
    MiniProgressBarComponent,
    LineChartComponent,
    MatIconModule,
    ButtonComponent,
  ],
  templateUrl: './specification-info.component.html',
  styles: [
    `
      .increasing-icon {
        color: var(--green-bright) !important;
      }
      .decreasing-icon {
        color: var(--yellow-bright) !important;
      }
      ::ng-deep .ai-button button {
        background-color: var(--green-bright) !important;
      }
    `,
  ],
})
export class SpecificationInfoComponent {
  info = input<AccountSpecificationInfo | null>();
  notificationService = inject(NotificationService);

  labelPosition = MiniProgressBarLabelPosition.Above;
  increasingColor = MiniProgressBarColor.Green;
  decreasingColor = MiniProgressBarColor.Yellow;

  onApply(item: AccountSpecificationInfo['aiRecommendations'][number]) {
    this.notificationService.info(`${item.title} recommendation applied`);
  }
}
