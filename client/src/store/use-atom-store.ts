import { useAtom } from "jotai";
import { businessTypeAtom, registrationAtom, utilsAtom } from "./atom";
import { thaiProvinceAtom } from "./atom/thai-province-atom";

export const useAtomStore = () => {
  const [registration, setRegistration] = useAtom(registrationAtom);
  const [thaiProvince, setThaiProvince] = useAtom(thaiProvinceAtom);
  const [businessTypeList, setBusinessTypeList] = useAtom(businessTypeAtom);
  const [utils, setUtils] = useAtom(utilsAtom);

  return {
    registration,
    setRegistration,
    thaiProvince,
    setThaiProvince,
    businessTypeList,
    setBusinessTypeList,
    utils,
    setUtils,
  };
};
