import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountContainerComponent } from '../account-container';
import { AccountInfoStore } from '../../../store';
import {
  MiniProgressBarComponent,
  WinnabilityScoreComponent,
  NumberToCurrencyAbbrPipe,
} from '../../../shared';
import { PerformanceMetricCardComponent } from './components/performance-metric-card.component';

@Component({
  selector: 'app-performance-metrics',
  standalone: true,
  imports: [
    CommonModule,
    AccountContainerComponent,
    WinnabilityScoreComponent,
    PerformanceMetricCardComponent,
    NumberToCurrencyAbbrPipe,
    MiniProgressBarComponent,
  ],
  templateUrl: './performance-metrics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceMetricsComponent {
  private readonly store = inject(AccountInfoStore);

  performanceMetrics = this.store.getPerformanceMetrics;

  winnability = this.performanceMetrics()?.winnability;
  lossRatio = this.performanceMetrics()?.lossRatio;
  premiumGrowth = this.performanceMetrics()?.premiumGrowth;
  exposureDistribution = this.performanceMetrics()?.exposureDistribution;
}
