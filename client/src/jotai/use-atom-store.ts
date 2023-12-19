import { useAtom } from "jotai";
import {
  benefitsListAtom,
  businessTypeListAtom,
  certificatedListAtom,
  companyListAtom,
  companyPolicyListAtom,
  deliveryTermsListAtom,
  documentKeyListAtom,
  utilsAtom,
} from "./atom";

export const useAtomStore = () => {
  const [utils, setUtils] = useAtom(utilsAtom);
  const [benefitsList, setBenefitsList] = useAtom(benefitsListAtom);
  const [businessTypeList, setBusinessTypeList] = useAtom(businessTypeListAtom);
  const [certificatedList, setCertificatedList] = useAtom(certificatedListAtom);
  const [companyList, setCompanyList] = useAtom(companyListAtom);
  const [companyPolicyList, setCompanyPolicyList] = useAtom(
    companyPolicyListAtom,
  );
  const [deliveryTermsList, setDeliveryTermsList] = useAtom(
    deliveryTermsListAtom,
  );
  const [documentKeyList, setDocumentKeyList] = useAtom(documentKeyListAtom);

  return {
    utils,
    setUtils,
    benefitsList,
    setBenefitsList,
    businessTypeList,
    setBusinessTypeList,
    certificatedList,
    setCertificatedList,
    companyList,
    setCompanyList,
    companyPolicyList,
    setCompanyPolicyList,
    deliveryTermsList,
    setDeliveryTermsList,
    documentKeyList,
    setDocumentKeyList,
  };
};
