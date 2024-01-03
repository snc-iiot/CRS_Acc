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
  dataDBDSyncListAtom,
  dbdSyncListAtom,
  deliveryTermsListAtom,
  docByRegisIdAtom,
  documentKeyListAtom,
  financialRatioAtom,
  generalAssessmentFormAtom,
  mainCustomerRatioAtom,
  objectivePurchasingRatioAtom,
  regisCountAtom,
  regisListAtom,
  regisListByAccountAtom,
  regisStatAtom,
  registrationAtom,
  sendInviteAtom,
  shareHolderRatioAtom,
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

  //! for external customer
  const [sendInvite, setSendInvite] = useAtom(sendInviteAtom);

  //! comment
  const [comment, setComment] = useAtom(commentAtom);

  //! dbd
  const [dbdSyncList, setDBDSyncList] = useAtom(dbdSyncListAtom);
  const [dataDBDSyncList, setDataDBDSyncList] = useAtom(dataDBDSyncListAtom);
  const [commentR3, setCommentR3] = useAtom(commentR3Atom);

  //! R3
  const [financialRatio, setFinancialRatio] = useAtom(financialRatioAtom);

  //! summary
  const [summaryPart1, setSummaryPart1] = useAtom(summaryAtomPart1);
  const [summaryPart2, setSummaryPart2] = useAtom(summaryAtomPart2);
  const [companyProfile, setCompanyProfile] = useAtom(companyProfileAtom);

  //! home
  const [dataRegisCount, setDataRegisCount] = useAtom(regisCountAtom);
  const [dataMainCustomerRatio, setDataMainCustomerRatio] = useAtom(
    mainCustomerRatioAtom,
  );
  const [dataShareHolderRatio, setDataShareHolderRatio] =
    useAtom(shareHolderRatioAtom);
  const [dataObjectivePurchasingRatio, setDataObjectivePurchasingRatio] =
    useAtom(objectivePurchasingRatioAtom);
  const [dataRegisStat, setDataRegisStat] = useAtom(regisStatAtom);

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
    dataDBDSyncList,
    setDataDBDSyncList,

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

    //! home
    dataRegisCount,
    setDataRegisCount,
    dataMainCustomerRatio,
    setDataMainCustomerRatio,
    dataShareHolderRatio,
    setDataShareHolderRatio,
    dataObjectivePurchasingRatio,
    setDataObjectivePurchasingRatio,
    dataRegisStat,
    setDataRegisStat,

    sendInvite,
    setSendInvite,
  };
};
