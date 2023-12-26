export type DataRegisCountType = {
  company: string;
  regis_count: number
}

export type DataMainCustomerRatioType = {
  main_customer: "foreign" | "internal";
  amount: number
}

export type DataShareHolderRatioType = {
  nationality: string;
  country: string;
  percent: string;
  regis_amount: string
}

export type DataObjectivePurchasingRatioType = {
  objective_purchasing: "other" | "produce" | "trade";
  amount: number
}
export type DataRegisStatType = {
  regis_id: string;
  company_name: string;
  score: number;
  approved_at: string
}