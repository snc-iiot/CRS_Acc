export type DataRegisCountType = {
  company: string;
  regis_count: number;
  company_full_name_th: string;
  company_full_name_en: string;
  province: "SAMUTPAKAN" | "RAYONG"
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
  province: string;
  amount: number
}