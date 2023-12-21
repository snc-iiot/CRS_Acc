import { useAtom } from "jotai";
import {
  approvalListAtom,
  benefitsListAtom,
  businessTypeListAtom,
  certificatedListAtom,
  companyListAtom,
  companyPolicyListAtom,
  countryCodeListAtom,
  deliveryTermsListAtom,
  docByRegisIdAtom,
  documentKeyListAtom,
  generalAssessmentFormAtom,
  regisListAtom,
  registrationAtom,
  thaiProvinceAtom,
} from "./atom";

export const useAtomStore = () => {
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
  const [registration, setRegistration] = useAtom(registrationAtom);
  const [thaiProvince] = useAtom(thaiProvinceAtom);
  const [countryCodeList, setCountryCodeList] = useAtom(countryCodeListAtom);
  const [docByRegisId, setDocByRegisId] = useAtom(docByRegisIdAtom);
  const [regisList, setRegisList] = useAtom(regisListAtom);

  //! for general form
  const [approvalList, setApprovalList] = useAtom(approvalListAtom);
  const [generalAssessmentForm, setGeneralAssessmentForm] = useAtom(
    generalAssessmentFormAtom,
  );

  return {
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
    registration,
    setRegistration,
    thaiProvince,
    countryCodeList,
    setCountryCodeList,
    docByRegisId,
    setDocByRegisId,
    regisList,
    setRegisList,
    //! for general form
    approvalList,
    setApprovalList,
    generalAssessmentForm,
    setGeneralAssessmentForm,
  };
};
