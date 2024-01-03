import { queryKey } from "@/helpers/common.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import {
  DataMainCustomerRatioType,
  DataObjectivePurchasingRatioType,
  DataRegisCountType,
  DataRegisStatType,
  DataShareHolderRatioType,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { HomeService } from "..";

export const useHome = () => {
  const {
    setDataRegisCount,
    setDataMainCustomerRatio,
    setDataShareHolderRatio,
    setDataObjectivePurchasingRatio,
    setDataRegisStat,
  } = useAtomStore();
  const homeService = new HomeService();

  const {
    data: dataRegisCount,
    isFetching: isFetchingRegisCount,
    refetch: refetchRegisCount,
  } = useQuery<DataRegisCountType[], Error>({
    queryKey: [queryKey.GET_ASSESSMENT_RESULT_REGIS_COUN],
    queryFn: async () => {
      const result = await homeService.getRegisCount();
      setDataRegisCount(result);
      return result;
    },
    refetchInterval: 60000,
  });

  const {
    data: dataMainCustomerRatio,
    isFetching: isFetchingMainCustomerRatio,
    refetch: refetchMainCustomerRatio,
  } = useQuery<DataMainCustomerRatioType[], Error>({
    queryKey: [queryKey.GET_MAIN_CUSTOMER_RATIO],
    queryFn: async () => {
      const result = await homeService.getMainCustomerRatio();
      setDataMainCustomerRatio(result);
      return result;
    },
    refetchInterval: 60000,
  });

  const {
    data: dataShareHolderRatio,
    isFetching: isFetchingShareHolderRatio,
    refetch: refetchShareHolderRatio,
  } = useQuery<DataShareHolderRatioType[], Error>({
    queryKey: [queryKey.GET_SHARE_HOLDER_RATIO],
    queryFn: async () => {
      const result = await homeService.getShareHolderRatio();
      setDataShareHolderRatio(result);
      return result;
    },
    refetchInterval: 60000,
  });

  const {
    data: dataObjectivePurchasingRatio,
    isFetching: isFetchingObjectivePurchasingRatio,
    refetch: refetchObjectivePurchasingRatio,
  } = useQuery<DataObjectivePurchasingRatioType[], Error>({
    queryKey: [queryKey.GET_OBJECTIVE_PURCHASING_RATIO],
    queryFn: async () => {
      const result = await homeService.getObjectivePurchasingRatio();
      setDataObjectivePurchasingRatio(result);
      return result;
    },
    refetchInterval: 60000,
  });

  const {
    data: dataRegisStat,
    isFetching: isFetchingRegisStat,
    refetch: refetchRegisStat,
  } = useQuery<DataRegisStatType[], Error>({
    queryKey: [queryKey.GET_REGIS_STAT],
    queryFn: async () => {
      const result = await homeService.getRegisStat();
      setDataRegisStat(result);
      return result;
    },
    refetchInterval: 60000,
  });

  return {
    dataRegisCount,
    isFetchingRegisCount,
    refetchRegisCount,
    dataMainCustomerRatio,
    isFetchingMainCustomerRatio,
    refetchMainCustomerRatio,
    dataShareHolderRatio,
    isFetchingShareHolderRatio,
    refetchShareHolderRatio,
    dataObjectivePurchasingRatio,
    isFetchingObjectivePurchasingRatio,
    refetchObjectivePurchasingRatio,
    dataRegisStat,
    isFetchingRegisStat,
    refetchRegisStat,
  };
};
