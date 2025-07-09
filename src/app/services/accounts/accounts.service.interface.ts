export interface Winnability {
  score: number;
  label: string;
}

export interface Account {
  id: number;
  accountName: string;
  accountType: string;
  line: string;
  broker: string;
  renewalDate: string;
  premium: number;
  ratedPremium: number;
  lossRatio: number;
  appetite: string;
  status: string;
  triage: number;
  winnability: Winnability;
  logoUrl: string;
  address: string;
  accountNumber: string;
  underwriter: string;
}

export interface AccountSpecificationNode {
  id: string;
  label: string;
  count?: number;
  content?: string;
  children?: AccountSpecificationNode[];
}

export interface AccountSpecificationInfo {
  id: string;
  overallScore: Winnability & { value: number };
  historicalTrend: {
    labels: string[];
    data: number[];
  };
  position: {
    label: string;
    value: number;
  }[];
  increasingWinnability: {
    label: string;
    value: number;
  }[];
  decreasingWinnability: {
    label: string;
    value: number;
  }[];
  aiRecommendations: {
    title: string;
    description: string;
    action: string;
  }[];
}
