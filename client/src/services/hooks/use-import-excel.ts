import { queryKey } from "@/helpers/common.helper";
import { useSwal } from "@/hooks/use-swal";
import { FinancialPositionType, FinancialRatiosType, TResponseAction } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { ImportExcelService } from "..";

export const useImportExcel = () => {
  const { showError } = useSwal();
  const importExcelService = new ImportExcelService();

  const { mutateAsync: mutateImportExcelFinancialPosition } = useMutation<
    TResponseAction,
    Error,
    FinancialPositionType
  >({
    mutationKey: [queryKey.POST_IMPORT_EXCEL_FINANCIAL_POSITION],
    mutationFn: (Req: FinancialPositionType) => importExcelService.PostImportExcelFinancialPosition(Req),
    onError: (error) => {
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateImportExcelIcomeStatement } = useMutation<TResponseAction, Error, FinancialPositionType>({
    mutationKey: [queryKey.POST_IMPORT_EXCEL_ICOME_STATEMENT],
    mutationFn: (Req: FinancialPositionType) => importExcelService.PostImportExcelIcomeStatement(Req),
    onError: (error) => {
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateImportExcelFinancialRatios } = useMutation<TResponseAction, Error, FinancialRatiosType>({
    mutationKey: [queryKey.POST_IMPORT_EXCEL_FINANCIAL_RATIOS],
    mutationFn: (Req: FinancialRatiosType) => importExcelService.PostImportExcelFinancialRatios(Req),
    onError: (error) => {
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  return {
    mutateImportExcelFinancialPosition,
    mutateImportExcelIcomeStatement,
    mutateImportExcelFinancialRatios,
  };
};
