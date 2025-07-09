import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  ContainerComponent,
  ContainerTitleComponent,
  ErrorComponent,
  SpinnerComponent,
} from '../../../shared';
import { PortfolioGoalsStore } from '../../../store';

import {
  PortfolioGoalProgressBarComponent,
  TargetProgressBarComponent,
} from './components';

@Component({
  selector: 'app-portfolio-goals',
  standalone: true,
  imports: [
    ContainerComponent,
    PortfolioGoalProgressBarComponent,
    TargetProgressBarComponent,
    ContainerTitleComponent,
    SpinnerComponent,
    ErrorComponent,
  ],
  templateUrl: './portfolio-goals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioGoalsComponent {
  store = inject(PortfolioGoalsStore);
}
