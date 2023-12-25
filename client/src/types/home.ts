export type DataRegisCountType = {
  company: string;
  regis_count: number
}

export type DataMainCustomerRatioType = {
  main_customer: "foreign" | "internal",
  amount: number
}

export type DataShareHolderRatioType = {
  nationality: string,
  country: string,
  percent: string
}

export type DataObjectivePurchasingRatioType = {
  objective_purchasing: "other" | "produce" | "trade",
  amount: number
}