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
