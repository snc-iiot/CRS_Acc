import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select-custom";
import { Textarea } from "@/components/ui/textarea";
import { ICompanyForm, TCompanyInformation, TRegistrationForm } from "@/types";
import { ChangeEvent } from "react";

export const HeaderConditions: {
  [key in "register" | "login"]: {
    title: string;
    description: string;
  };
} = {
  register: {
    title: "ลงทะเบียนผู้ซื้อ",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  login: {
    title: "เข้าสู่ระบบ",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
};

export const Sections: {
  id: string;
  title: string;
  description: string;
}[] = [
  {
    id: "company-info",
    title: "ข้อมูลบริษัท / Company Information",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "shareholder-info",
    title: "สัดส่วนผู้ถือหุ้น / Shareholder Proportion",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "contract-info",
    title: "บุคคลติดต่อ / Contact Person",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "relationship-info",
    title: "ความสัมพันธ์กับบริษัท / Relationship with Company",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "standard-certification-info",
    title:
      "มาตรฐานและการรับรองที่ได้รับในปัจจุบัน / Standards and Certifications",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "upload-documents",
    title: "เอกสารอัพโหลด / Upload Documents",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "consent-form",
    title: "ศึกษาและให้ความยินยอม / Consent Form",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
];

export const ConditionalInput = (
  item: ICompanyForm,
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void,
  value: TCompanyInformation,
) => {
  switch (item?.type) {
    case "select": {
      return (
        <div className="w-full">
          <Select
            name={item?.name}
            id={item?.name}
            placeholder={item?.placeholder}
            className="text-sm"
            required={item?.required}
            onChange={(e) => {
              handleOnChange(e);
            }}
            value={
              value?.[item?.name as keyof TCompanyInformation] as
                | string
                | undefined
            }
            disabled={item?.disabled}
          >
            {item?.options?.map((option, index) => (
              <option value={option?.value} key={index}>
                {option?.label}
              </option>
            ))}
          </Select>
        </div>
      );
    }
    case "text": {
      return (
        <Input
          type="text"
          name={item?.name}
          id={item?.name}
          placeholder={item?.placeholder}
          className="text-sm"
          required={item?.required}
          onChange={(e) => handleOnChange(e)}
          value={
            value?.[item?.name as keyof TCompanyInformation] as
              | string
              | undefined
          }
          disabled={item?.disabled}
        />
      );
    }
    case "tel": {
      return (
        <Input
          name={item?.name}
          id={item?.name}
          type="tel"
          placeholder={item?.placeholder}
          className="text-sm"
          required={item?.required}
          onChange={handleOnChange}
          value={
            value?.[item?.name as keyof TCompanyInformation] as
              | string
              | undefined
          }
          disabled={item?.disabled}
        />
      );
    }
    case "number": {
      return (
        <Input
          name={item?.name}
          id={item?.name}
          type="number"
          placeholder={item?.placeholder}
          className="text-sm"
          required={item?.required}
          onChange={handleOnChange}
          value={
            value?.[item?.name as keyof TCompanyInformation] as
              | string
              | undefined
          }
          disabled={item?.disabled}
        />
      );
    }
    case "url": {
      return (
        <Input
          name={item?.name}
          id={item?.name}
          type="url"
          placeholder={item?.placeholder}
          className="text-sm"
          required={item?.required}
          onChange={handleOnChange}
          value={
            value?.[item?.name as keyof TCompanyInformation] as
              | string
              | undefined
          }
          disabled={item?.disabled}
        />
      );
    }
    case "textarea": {
      return (
        <Textarea
          name={item?.name}
          id={item?.name}
          placeholder={item?.placeholder}
          className="max-h-[100px] text-sm"
          required={item?.required}
          onChange={handleOnChange}
          value={
            value?.[item?.name as keyof TCompanyInformation] as
              | string
              | undefined
          }
          disabled={item?.disabled}
        />
      );
    }
  }
};

export const InitialRegistration: TRegistrationForm = {
  regis_id: "",
  informant_name: "",
  company_information: {
    company_admin: "",
    company_name: "",
    address: "",
    country: "",
    province: "",
    district: "",
    sub_district: "",
    zip_code: "",
    phone_number: "",
    juristic_id: "",
    website: "",
    nature_of_business: 0,
    company_registration: {
      is_thai: true,
      country: "",
    },
  },
  share_holder: {
    hight_nationalities: {
      nationalities: "",
      percentage: 0,
    },
    thai_nationalities: 0,
    other_nationalities: 0,
  },
  contact_person: [
    {
      position_th: "ฝ่ายจัดซื้อ",
      position_en: "scm_officer",
      name: "",
      tel: "",
      email: "",
    },
    {
      position_th: "ผู้จัดการฝ่ายจัดซื้อ",
      position_en: "scm_department_manager",
      name: "",
      tel: "",
      email: "",
    },
    {
      position_th: "ฝ่ายบัญชีและการเงิน",
      position_en: "accounting_officer",
      name: "",
      tel: "",
      email: "",
    },
    {
      position_th: "ผู้จัดการฝ่ายบัญชีและการเงิน",
      position_en: "accounting_department_manager",
      name: "",
      tel: "",
      email: "",
    },
    {
      position_th: "กรรมการผู้จัดการ",
      position_en: "managing_director",
      name: "",
      tel: "",
      email: "",
    },
  ],
  relationship: {
    is_relationship: false,
    relationship_name: "",
  },
  standard: {
    certificate: [],
    benefit: [],
  },
  payment_term: {
    credit_term: {
      name: "",
      value: 0,
    },
    billing_term: {
      name: "",
      value: "",
    },
    currency: "",
    incoterm: "",
    lc_term: {
      is_lc: false,
      lc_type: "",
    },
    delivery_term: [],
    deposit_term: {
      is_deposit: false,
      deposit_type: "",
    },
    product_warranty: {
      is_warranty: false,
      value: 0,
    },
    company_policy: [],
    objective_purchasing: {
      name: "",
      value: "",
    },
    main_customer: {
      name: "",
      value: "",
    },
  },
};
