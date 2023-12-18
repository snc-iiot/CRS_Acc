export type TBusinessTypeList = {
  business_id: string;
  business_type: string;
};

export type TResponseAction = {
  status: "success" | "error";
  message: string;
  data?: any;
};
