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
  currentStep: number;
  attention: AccountAttention[];
  performanceMetrics: PerformanceMetrics;
  policies: Policy[];
  compliance: string[];
}

export interface Message {
  id: number;
  status: string;
  title: string;
  sender: string;
  date: string;
  body: string;
  attachments: number;
  reply: boolean;
}

export interface Policy {
  id: number;
  line: string;
  icon: string;
  iconColor: string;
  effDate: number | null;
  expDate: number | null;
  status: string;
  statusColor: string;
}
