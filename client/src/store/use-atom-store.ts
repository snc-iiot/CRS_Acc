import { useAtom } from "jotai";
import {
  benefitsListAtom,
  businessTypeAtom,
  certificatedListAtom,
  companyListAtom,
  companyPolicyListAtom,
  countryCodeListAtom,
  deliveryTermsListAtom,
  registrationAtom,
  utilsAtom,
} from "./atom";
import { thaiProvinceAtom } from "./atom/thai-province-atom";

export const useAtomStore = () => {
  const [registration, setRegistration] = useAtom(registrationAtom);
  const [thaiProvince, setThaiProvince] = useAtom(thaiProvinceAtom);
  const [businessTypeList, setBusinessTypeList] = useAtom(businessTypeAtom);
  const [utils, setUtils] = useAtom(utilsAtom);

  const [certificatedList, setCertificatedList] = useAtom(certificatedListAtom);
  const [companyList, setCompanyList] = useAtom(companyListAtom);
  const [companyPolicyList, setCompanyPolicyList] = useAtom(
    companyPolicyListAtom,
  );
  const [deliveryTermsList, setDeliveryTermsList] = useAtom(
    deliveryTermsListAtom,
  );
  const [benefitsList, setBenefitsList] = useAtom(benefitsListAtom);
  const [countryCodeList, setCountryCodeList] = useAtom(countryCodeListAtom);

  return {
    registration,
    setRegistration,
    thaiProvince,
    setThaiProvince,
    businessTypeList,
    setBusinessTypeList,
    utils,
    setUtils,
    certificatedList,
    setCertificatedList,
    companyList,
    setCompanyList,
    companyPolicyList,
    setCompanyPolicyList,
    deliveryTermsList,
    setDeliveryTermsList,
    benefitsList,
    setBenefitsList,
    countryCodeList,
    setCountryCodeList,
  };
};
