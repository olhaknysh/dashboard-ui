import { PortfolioGoal, TargetProgressBarData } from '../../services';

export interface PortfolioGoalsState {
  goals: PortfolioGoal[];
  isLoading: boolean;
  error: string | null;
  targetProgressBars: TargetProgressBarData[];
}
