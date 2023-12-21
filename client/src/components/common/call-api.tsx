import { useForm, useUtils } from "@/services";
import { FC } from "react";

const CallApi: FC = () => {
  const {
    useGetBenefitsList,
    useGetBusinessTypeList,
    useGetCertificatedList,
    useGetCompanyList,
    useGetCompanyPolicyList,
    useGetCountryCodeList,
    useGetDeliveryTermsList,
    useGetDocumentKeyList,
  } = useUtils();

  const { useGetRegisList } = useForm();

  useGetBenefitsList();
  useGetBusinessTypeList();
  useGetCertificatedList();
  useGetCompanyList();
  useGetCompanyPolicyList();
  useGetCountryCodeList();
  useGetDeliveryTermsList();
  useGetDocumentKeyList();

  //? Get Regis List
  useGetRegisList();
  return <div style={{ display: "none" }} />;
};

export default CallApi;
