export interface TargetProgressBarData {
  label: string;
  percent: number;
  currentValue: number;
  targetValue: number;
}

export interface PortfolioGoal {
  title: string;
  currentValue: number;
  targetValue: number;
  segmentsConfig: SegmentConfig[];
}

export interface SegmentConfig {
  range: [number, number];
  status: string;
}
