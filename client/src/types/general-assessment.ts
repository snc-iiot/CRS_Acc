export type TApprovalSet = {
  approvals_set_id: string;
  company_group: string;
  business_unit: string;
  approvals: TApproval[];
};

export type TApproval = {
  order_no: number;
  position: string;
  issued_at: string | null;
  issued_by: string;
  is_approved: null | boolean;
  issued_by_id: string;
};
