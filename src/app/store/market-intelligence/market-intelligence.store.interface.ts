import { MarketIntelligencePoint } from '../../services';

export interface MarketIntelligenceState {
  points: MarketIntelligencePoint[];
  isLoading: boolean;
  error: string | null;
}
