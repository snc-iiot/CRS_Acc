export type TDBDSyncList = {
  regis_id: string;
  juristic_id: string;
  financial_position: TFinancialPosition[];
  income_statement: TIncomeStatement[];
  start_year: number;
  last_year: number;
  created_at: string;
  financial_ratios_latest: TFinancialRatiosLatest[];
};

export type TFinancialRatio = {
  regis_id: string;
  juristic_id: string;
  financial_ratios: {
    info: { year: number; ratio: number }[];
    topic_en: string;
    topic_no: number;
    topic_th: string;
    short_key: string;
  }[];

  start_year: number;
  last_year: number;
  created_at: string;
};

export type TFinancialPosition = {
  info: TInfo[];
  topic_en: string;
  topic_no: number;
  topic_th: string;
  short_key: string;
};

export type TInfo = {
  year: number;
  amount: number;
  change: number;
};

export type TIncomeStatement = {
  info: TInfo2[];
  topic_en: string;
  topic_no: number;
  topic_th: string;
  short_key: string;
};

export type TInfo2 = {
  year: number;
  amount: number;
  change: number;
};

export type TFinancialRatiosLatest = {
  year: number;
  ratio: number;
  topic_en: string;
  topic_no: number;
  topic_th: string;
  short_key: string;
};
