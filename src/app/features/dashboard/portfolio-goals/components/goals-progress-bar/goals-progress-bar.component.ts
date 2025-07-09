import {
  ChangeDetectionStrategy,
  Component,
  input,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentConfig } from '../../../../../services';
import { TypeCheckUtility } from '../../../../../shared';

import { TargetType } from './goals-progress-bar.component.interface';
import {
  INFO_STATUS_KEYWORDS,
  NEGATIVE_STATUS_KEYWORDS,
  POSITIVE_STATUS_KEYWORDS,
  STATUS_COLORS,
  WARNING_STATUS_KEYWORDS,
} from './goals-progress-bar.constant';

@Component({
  selector: 'app-goals-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goals-progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioGoalProgressBarComponent {
  currentValue = input<number>(0);
  maxValue = input<number>(100);
  segmentsConfig = input<SegmentConfig[]>([]);
  targetValue = input.required<number>();
  targetRange = input<{ min: number; max: number }>();
  title = input<string>('Progress Bar');

  segments: { width: number; color: string }[] = [];
  currentValueIndicatorPosition = 0;
  targetIndicatorPosition = 0;
  statusMessage = '';
  statusColorClass = '';
  targetType: TargetType = 'none';
  mainValueColorClass = '';
  lowerArrowText = '';
  lowerArrowColor = '#6B7280';
  lowerArrowTextColorClass = '';

  constructor() {
    effect(() => {
      this.calculateBarMetrics();
    });
  }

  private matchesStatus(status: string, keywords: string[]): boolean {
    const statusLower = status.toLowerCase();
    return keywords.some((keyword) => statusLower.includes(keyword));
  }

  private getStatusCategory(
    status: string,
  ): 'positive' | 'warning' | 'negative' | 'info' | 'neutral' {
    if (this.matchesStatus(status, POSITIVE_STATUS_KEYWORDS)) return 'positive';
    if (this.matchesStatus(status, WARNING_STATUS_KEYWORDS)) return 'warning';
    if (this.matchesStatus(status, NEGATIVE_STATUS_KEYWORDS)) return 'negative';
    if (this.matchesStatus(status, INFO_STATUS_KEYWORDS)) return 'info';
    return 'neutral';
  }

  private getColorForStatus(status: string): string {
    const category = this.getStatusCategory(status);
    return STATUS_COLORS[category];
  }

  private getTextClassForStatus(status: string): string {
    const category = this.getStatusCategory(status);
    switch (category) {
      case 'positive':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'negative':
        return 'text-red-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  }

  private clampPosition(percent: number, min = 5, max = 95): number {
    return Math.max(min, Math.min(max, percent));
  }

  private calculateBarMetrics(): void {
    const isSingleTarget = TypeCheckUtility.isDefined(this.targetValue());
    const isRangeTarget = TypeCheckUtility.isDefined(this.targetRange());

    this.targetType = isSingleTarget
      ? 'single'
      : isRangeTarget
        ? 'range'
        : 'none';
    this.segments = [];
    let previousEnd = 0;

    this.segmentsConfig().forEach((config) => {
      const [start, end] = config.range;
      const width = ((end - start) / this.maxValue()) * 100;
      const color = this.getColorForStatus(config.status);
      this.segments.push({ width: width, color: color });
      previousEnd = end;
    });

    const rawPosition = (this.currentValue() / this.maxValue()) * 100;
    this.currentValueIndicatorPosition = this.clampPosition(rawPosition);

    if (isSingleTarget) {
      const rawTarget = (this.targetValue() / this.maxValue()) * 100;
      this.targetIndicatorPosition = this.clampPosition(rawTarget);
    } else if (isRangeTarget) {
      const midPoint = (this.targetRange()!.min + this.targetRange()!.max) / 2;
      const rawTarget = (midPoint / this.maxValue()) * 100;
      this.targetIndicatorPosition = this.clampPosition(rawTarget);
    } else {
      this.targetIndicatorPosition = -100;
    }

    let foundStatus = false;
    let currentStatus = '';
    for (const config of this.segmentsConfig()) {
      const [start, end] = config.range;
      if (this.currentValue() >= start && this.currentValue() <= end) {
        currentStatus = config.status;
        foundStatus = true;
        break;
      }
    }
    if (!foundStatus) {
      currentStatus = '';
    }

    this.mainValueColorClass = this.getTextClassForStatus(currentStatus);

    if (isSingleTarget) {
      const diff = this.currentValue() - this.targetValue();
      const diffAbs = Math.abs(diff).toFixed(1);
      const diffText = (diff >= 0 ? '+' : '-') + diffAbs + '%';
      let statusText = '';
      if (currentStatus) {
        statusText = ' (' + currentStatus.toUpperCase() + ')';
      }
      this.lowerArrowText = diffText + statusText;
      this.lowerArrowColor = this.getColorForStatus(currentStatus);
      this.lowerArrowTextColorClass = 'text-white';
    } else if (isRangeTarget) {
      this.lowerArrowText = currentStatus ? currentStatus.toUpperCase() : '';
      this.lowerArrowColor = this.getColorForStatus(currentStatus);
      this.lowerArrowTextColorClass = 'text-white';
    } else {
      this.lowerArrowText = '';
      this.lowerArrowColor = '#6B7280';
      this.lowerArrowTextColorClass = 'text-white';
    }
  }
}
