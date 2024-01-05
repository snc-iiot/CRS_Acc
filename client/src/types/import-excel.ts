export type ImportExcelTDBDList = {
  regis_id: string;
  financial_position: ContentFinancialPositionType[];
  income_statement: ContentIcomeStatementType[];
  financial_ratio: ContentFinancialRatiosType[];
};

export type FinancialPositionType = {
  regis_id: string;
  content: ContentFinancialPositionType[];
};

export type ContentFinancialPositionType = {
  topic_no: number;
  topic_en: string;
  topic_th: string;
  short_key: string;
  info: InfoContentFinancialPositionType[];
};

export type InfoContentFinancialPositionType = {
  year: number;
  amount: number | null;
  change: number | null;
};

export type IcomeStatementType = {
  regis_id: string;
  content: ContentIcomeStatementType[];
};

export type ContentIcomeStatementType = {
  topic_no: number;
  topic_en: string;
  topic_th: string;
  short_key: string;
  info: InfoContentIcomeStatementType[];
};

export type InfoContentIcomeStatementType = {
  year: number;
  amount: number | null;
  change: number | null;
};

export type FinancialRatiosType = {
  regis_id: string;
  content: ContentFinancialRatiosType[];
};

export type ContentFinancialRatiosType = {
  topic_no: number;
  topic_en: string;
  topic_th: string;
  short_key: string;
  info: InfoContentFinancialRatiosType[];
};

export type InfoContentFinancialRatiosType = {
  year: number;
  ratio: number | null;
};
