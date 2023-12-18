import { useAtom } from "jotai";
import { businessTypeAtom, registrationAtom } from "./atom";
import { thaiProvinceAtom } from "./atom/thai-province-atom";

export const useAtomStore = () => {
  const [registration, setRegistration] = useAtom(registrationAtom);
  const [thaiProvince, setThaiProvince] = useAtom(thaiProvinceAtom);
  const [businessTypeList, setBusinessTypeList] = useAtom(businessTypeAtom);

  return {
    registration,
    setRegistration,
    thaiProvince,
    setThaiProvince,
    businessTypeList,
    setBusinessTypeList,
  };
};
