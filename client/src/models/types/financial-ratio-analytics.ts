export type TFinancialRatioAnalytics = {
  Topic: string;
  info: Info[];
};

export type Info = {
  FinancialRatio: string;
  ShortName: string;
  Meaning: string;
  Formula: string[];
  Target: string;
  Result: number;
  Unit: string;
  Reference: string;
};
