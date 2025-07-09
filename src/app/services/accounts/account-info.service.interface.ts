export interface AdditionalInfo {
  linkText: string;
  additionalInfo: string[];
  title?: string;
}

export interface AccountAttention extends AdditionalInfo {
  subtitle: string;
}

export interface Policy {
  label: string;
  icon: string;
  iconColor: string;
  premium: number;
  effDate: number | null;
}

export interface PerformanceMetrics {
  winnability: {
    label: string;
    score: number;
    info: AdditionalInfo;
  };
  lossRatio: {
    value: number;
    target: number;
    info: AdditionalInfo;
  };
  premiumGrowth: {
    percent: number;
    yoy: string;
    value: number;
    target: number;
    info: AdditionalInfo;
  };
  exposureDistribution: {
    label: string;
    percent: number;
  }[];
}

export interface AccountInfo {
  id: number;
  attention: AccountAttention[];
  performanceMetrics: PerformanceMetrics;
  policies: Policy[];
}
