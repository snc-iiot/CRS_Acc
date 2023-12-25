import { queryKey } from "@/helpers/common.helper";
import { useQuery } from "@tanstack/react-query";
import { HomeService } from "..";
import { DataMainCustomerRatioType, DataObjectivePurchasingRatioType, DataRegisCountType, DataShareHolderRatioType } from "@/types";
import { useAtomStore } from "@/jotai/use-atom-store";

export const useHome = () => {
    const { setDataRegisCount, setDataMainCustomerRatio, setDataShareHolderRatio, setDataObjectivePurchasingRatio } = useAtomStore();
    const homeService = new HomeService();

    const { data: dataRegisCount, isFetching: isFetchingRegisCount, refetch: refetchRegisCount } = useQuery<DataRegisCountType[], Error>({
      queryKey: [queryKey.GET_ASSESSMENT_RESULT_REGIS_COUN],
      queryFn: async () => {
        const result = await homeService.getRegisCount();
        setDataRegisCount(result);
        return result;
      },})

    const { data: dataMainCustomerRatio, isFetching: isFetchingMainCustomerRatio, refetch: refetchMainCustomerRatio } = useQuery<DataMainCustomerRatioType[], Error>({
      queryKey: [queryKey.GET_MAIN_CUSTOMER_RATIO],
      queryFn: async () => {
        const result = await homeService.getMainCustomerRatio();
        setDataMainCustomerRatio(result);
        return result;
      },})

    const { data: dataShareHolderRatio, isFetching: isFetchingShareHolderRatio, refetch: refetchShareHolderRatio } = useQuery<DataShareHolderRatioType[], Error>({
      queryKey: [queryKey.GET_SHARE_HOLDER_RATIO],
      queryFn: async () => {
        const result = await homeService.getShareHolderRatio();
        setDataShareHolderRatio(result);
        return result;
      },})

    const { data: dataObjectivePurchasingRatio, isFetching: isFetchingObjectivePurchasingRatio, refetch: refetchObjectivePurchasingRatio } = useQuery<DataObjectivePurchasingRatioType[], Error>({
      queryKey: [queryKey.GET_OBJECTIVE_PURCHASING_RATIO],
      queryFn: async () => {
        const result = await homeService.getObjectivePurchasingRatio();
        setDataObjectivePurchasingRatio(result);
        return result;
      },})


  return {
      dataRegisCount, isFetchingRegisCount, refetchRegisCount,
      dataMainCustomerRatio, isFetchingMainCustomerRatio, refetchMainCustomerRatio,
      dataShareHolderRatio, isFetchingShareHolderRatio, refetchShareHolderRatio,
      dataObjectivePurchasingRatio, isFetchingObjectivePurchasingRatio, refetchObjectivePurchasingRatio,
  };
};
