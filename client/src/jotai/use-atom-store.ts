import { useAtom } from "jotai";
import {
  approvalListAtom,
  benefitsListAtom,
  businessTypeListAtom,
  certificatedListAtom,
  commentAtom,
  commentR3Atom,
  commonAtom,
  companyListAtom,
  companyPolicyListAtom,
  companyProfileAtom,
  countryCodeListAtom,
  dbdSyncListAtom,
  deliveryTermsListAtom,
  docByRegisIdAtom,
  documentKeyListAtom,
  financialRatioAtom,
  generalAssessmentFormAtom,
  regisListAtom,
  regisListByAccountAtom,
  registrationAtom,
  summaryAtomPart1,
  summaryAtomPart2,
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
  const [common, setCommon] = useAtom(commonAtom);
  const [regisListByAccount, setRegisListByAccount] = useAtom(
    regisListByAccountAtom,
  );

  //! for general form
  const [approvalList, setApprovalList] = useAtom(approvalListAtom);
  const [generalAssessmentForm, setGeneralAssessmentForm] = useAtom(
    generalAssessmentFormAtom,
  );

  //! comment
  const [comment, setComment] = useAtom(commentAtom);

  //! dbd
  const [dbdSyncList, setDBDSyncList] = useAtom(dbdSyncListAtom);
  const [commentR3, setCommentR3] = useAtom(commentR3Atom);

  //! R3
  const [financialRatio, setFinancialRatio] = useAtom(financialRatioAtom);

  //! summary
  const [summaryPart1, setSummaryPart1] = useAtom(summaryAtomPart1);
  const [summaryPart2, setSummaryPart2] = useAtom(summaryAtomPart2);
  const [companyProfile, setCompanyProfile] = useAtom(companyProfileAtom);

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
    setRegisListByAccount,
    regisListByAccount,
    //! for general form
    approvalList,
    setApprovalList,
    generalAssessmentForm,
    setGeneralAssessmentForm,

    //! common
    common,
    setCommon,

    //! comment
    comment,
    setComment,
    commentR3,
    setCommentR3,

    //!  dbdSyncList
    dbdSyncList,
    setDBDSyncList,

    //! financialRatio
    financialRatio,
    setFinancialRatio,

    //! summary
    summaryPart1,
    setSummaryPart1,
    summaryPart2,
    setSummaryPart2,
    companyProfile,
    setCompanyProfile,
  };
};
